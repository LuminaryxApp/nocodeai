// apps/api/src/services/workflow-engine.ts
import { PrismaClient } from '@prisma/client'
import type { Node, Edge } from './types'

const prisma = new PrismaClient()

// Node type handlers
interface NodeHandler {
  execute: (node: Node, inputs: Record<string, any>, context: ExecutionContext) => Promise<any>
}

interface ExecutionContext {
  executionId: string
  workflowId: string
  variables: Record<string, any>
  log: (message: string, level?: 'info' | 'error' | 'warn') => void
}

const nodeHandlers: Record<string, NodeHandler> = {
  trigger: {
    execute: async (node, inputs, context) => {
      context.log(`Trigger node executed: ${node.data.label}`)
      return inputs
    }
  },
  
  aiText: {
    execute: async (node, inputs, context) => {
      context.log(`AI Text node: ${node.data.label}`)
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const model = node.data.model || 'gpt-4'
      const prompt = node.data.prompt || 'Process input'
      
      // Mock AI response
      return {
        text: `AI processed with ${model}: "${prompt}"`,
        model,
        tokens: Math.floor(Math.random() * 1000) + 100
      }
    }
  },
  
  aiImage: {
    execute: async (node, inputs, context) => {
      context.log(`AI Image node: ${node.data.label}`)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return {
        imageUrl: 'https://example.com/generated-image.jpg',
        size: node.data.size || '1024x1024',
        prompt: node.data.prompt
      }
    }
  },
  
  logic: {
    execute: async (node, inputs, context) => {
      context.log(`Logic node: ${node.data.label}`)
      
      const condition = node.data.condition || 'equals'
      const variable = node.data.variable || ''
      const value = node.data.value || ''
      
      // Get variable value from inputs or context
      const varValue = context.variables[variable] || inputs[variable]
      
      let result = false
      switch (condition) {
        case 'equals':
          result = varValue == value
          break
        case 'not-equals':
          result = varValue != value
          break
        case 'greater':
          result = Number(varValue) > Number(value)
          break
        case 'less':
          result = Number(varValue) < Number(value)
          break
        case 'contains':
          result = String(varValue).includes(value)
          break
      }
      
      context.log(`Condition ${condition} evaluated to: ${result}`)
      return { result, condition, variable, value }
    }
  },
  
  delay: {
    execute: async (node, inputs, context) => {
      const duration = node.data.duration || '5m'
      context.log(`Delay node: waiting ${duration}`)
      
      // Parse duration (simplified)
      const match = duration.match(/(\d+)([mhs])/)
      if (match) {
        const [, amount, unit] = match
        let ms = parseInt(amount) * 1000
        if (unit === 'm') ms *= 60
        if (unit === 'h') ms *= 3600
        
        // Cap at 10 seconds for demo
        await new Promise(resolve => setTimeout(resolve, Math.min(ms, 10000)))
      }
      
      return { delayed: true, duration }
    }
  },
  
  output: {
    execute: async (node, inputs, context) => {
      context.log(`Output node: ${node.data.label}`)
      
      const outputType = node.data.outputType || 'webhook'
      const message = node.data.message || 'Workflow completed'
      
      // Process template variables
      const processedMessage = message.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => {
        return inputs[key] || context.variables[key] || match
      })
      
      context.log(`Output sent via ${outputType}: ${processedMessage}`)
      
      return {
        type: outputType,
        message: processedMessage,
        timestamp: new Date().toISOString()
      }
    }
  },
  
  webhook: {
    execute: async (node, inputs, context) => {
      context.log(`Webhook node: ${node.data.label}`)
      
      // Simulate webhook call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        status: 'success',
        webhookUrl: node.data.url || 'https://api.example.com/webhook',
        payload: inputs
      }
    }
  },
  
  filter: {
    execute: async (node, inputs, context) => {
      context.log(`Filter node: ${node.data.label}`)
      
      // Simple pass-through for now
      return inputs
    }
  }
}

export class WorkflowEngine {
  async executeWorkflow(workflowId: string, inputs: Record<string, any> = {}, triggeredBy?: string) {
    // Get workflow from database
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId }
    })
    
    if (!workflow) {
      throw new Error('Workflow not found')
    }
    
    // Create execution record
    const execution = await prisma.execution.create({
      data: {
        workflowId,
        status: 'running',
        inputs,
        logs: [],
        triggeredBy
      }
    })
    
    const logs: Array<{ timestamp: string; level: string; message: string }> = []
    const context: ExecutionContext = {
      executionId: execution.id,
      workflowId,
      variables: { ...inputs },
      log: (message: string, level: 'info' | 'error' | 'warn' = 'info') => {
        logs.push({
          timestamp: new Date().toISOString(),
          level,
          message
        })
      }
    }
    
    const startTime = Date.now()
    let outputs: Record<string, any> = {}
    let error: Error | null = null
    
    try {
      const nodes = workflow.nodes as Node[]
      const edges = workflow.edges as Edge[]
      
      // Find trigger node(s)
      const triggerNodes = nodes.filter(n => n.type === 'trigger')
      
      if (triggerNodes.length === 0) {
        throw new Error('No trigger node found in workflow')
      }
      
      // Execute from each trigger
      for (const triggerNode of triggerNodes) {
        const result = await this.executeNode(triggerNode, inputs, nodes, edges, context)
        outputs[triggerNode.id] = result
      }
      
      // Update execution as completed
      await prisma.execution.update({
        where: { id: execution.id },
        data: {
          status: 'completed',
          outputs,
          logs,
          completedAt: new Date(),
          durationMs: Date.now() - startTime
        }
      })
      
      context.log('Workflow execution completed successfully')
      
    } catch (err) {
      error = err as Error
      context.log(`Workflow execution failed: ${error.message}`, 'error')
      
      await prisma.execution.update({
        where: { id: execution.id },
        data: {
          status: 'failed',
          outputs,
          logs,
          errorMessage: error.message,
          completedAt: new Date(),
          durationMs: Date.now() - startTime
        }
      })
      
      throw error
    }
    
    return {
      executionId: execution.id,
      status: 'completed',
      outputs,
      logs,
      durationMs: Date.now() - startTime
    }
  }
  
  private async executeNode(
    node: Node,
    inputs: Record<string, any>,
    allNodes: Node[],
    edges: Edge[],
    context: ExecutionContext
  ): Promise<any> {
    context.log(`Executing node: ${node.type} - ${node.data.label}`)
    
    const handler = nodeHandlers[node.type]
    if (!handler) {
      throw new Error(`Unknown node type: ${node.type}`)
    }
    
    // Execute the node
    const result = await handler.execute(node, inputs, context)
    
    // Store result in variables
    context.variables[node.id] = result
    context.variables[`node_${node.id}`] = result
    
    // Find connected nodes
    const outgoingEdges = edges.filter(e => e.source === node.id)
    
    // Execute connected nodes
    for (const edge of outgoingEdges) {
      const targetNode = allNodes.find(n => n.id === edge.target)
      if (targetNode) {
        // For logic nodes, check condition before proceeding
        if (node.type === 'logic') {
          const conditionResult = result.result
          const isTrueBranch = edge.sourceHandle === 'true' || !edge.sourceHandle
          const isFalseBranch = edge.sourceHandle === 'false'
          
          if ((conditionResult && isTrueBranch) || (!conditionResult && isFalseBranch)) {
            await this.executeNode(targetNode, result, allNodes, edges, context)
          }
        } else {
          await this.executeNode(targetNode, result, allNodes, edges, context)
        }
      }
    }
    
    return result
  }
  
  async getExecutionStatus(executionId: string) {
    return await prisma.execution.findUnique({
      where: { id: executionId },
      include: {
        workflow: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }
  
  async getWorkflowExecutions(workflowId: string, limit: number = 10) {
    return await prisma.execution.findMany({
      where: { workflowId },
      orderBy: { startedAt: 'desc' },
      take: limit
    })
  }
}

export const workflowEngine = new WorkflowEngine()
