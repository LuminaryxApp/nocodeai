import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// Define node data type
interface NodeData {
  label: string
  model?: string
  size?: string
  condition?: string
  duration?: string
}
import {
  Play,
  Save,
  Download,
  Undo,
  Redo,
  Settings,
  Trash2,
  Copy,
  Zap,
  MessageSquare,
  Image as ImageIcon,
  GitBranch,
  Database,
  Send,
  Webhook,
  Clock,
  Filter,
  FileText,
  Variable,
  Sparkles,
  Plus,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Node types configuration
const nodeTypes = {
  trigger: TriggerNode,
  aiText: AITextNode,
  aiImage: AIImageNode,
  logic: LogicNode,
  output: OutputNode,
  webhook: WebhookNode,
  delay: DelayNode,
  filter: FilterNode,
}

// Custom Node Components
function TriggerNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[180px] ${
      selected 
        ? 'border-emerald-500 shadow-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30' 
        : 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-emerald-500 text-white">
          <Zap className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">Trigger</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.label}</p>
      <div className="mt-2 flex items-center gap-1">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-emerald-600 font-medium">Active</span>
      </div>
    </div>
  )
}

function AITextNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[200px] ${
      selected 
        ? 'border-violet-500 shadow-violet-500/30 bg-violet-50 dark:bg-violet-950/30' 
        : 'border-violet-200 dark:border-violet-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">AI Text</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{data.label}</p>
      {data.model && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {data.model}
        </Badge>
      )}
    </div>
  )
}

function AIImageNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[200px] ${
      selected 
        ? 'border-fuchsia-500 shadow-fuchsia-500/30 bg-fuchsia-50 dark:bg-fuchsia-950/30' 
        : 'border-fuchsia-200 dark:border-fuchsia-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white">
          <ImageIcon className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">AI Image</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{data.label}</p>
      {data.size && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {data.size}
        </Badge>
      )}
    </div>
  )
}

function LogicNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[180px] ${
      selected 
        ? 'border-orange-500 shadow-orange-500/30 bg-orange-50 dark:bg-orange-950/30' 
        : 'border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-orange-500 text-white">
          <GitBranch className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">Logic</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.label}</p>
      {data.condition && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {data.condition}
        </Badge>
      )}
    </div>
  )
}

function OutputNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[180px] ${
      selected 
        ? 'border-red-500 shadow-red-500/30 bg-red-50 dark:bg-red-950/30' 
        : 'border-red-200 dark:border-red-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-red-500 text-white">
          <Send className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">Output</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.label}</p>
    </div>
  )
}

function WebhookNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[180px] ${
      selected 
        ? 'border-blue-500 shadow-blue-500/30 bg-blue-50 dark:bg-blue-950/30' 
        : 'border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-blue-500 text-white">
          <Webhook className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">Webhook</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.label}</p>
    </div>
  )
}

function DelayNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[180px] ${
      selected 
        ? 'border-amber-500 shadow-amber-500/30 bg-amber-50 dark:bg-amber-950/30' 
        : 'border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-amber-500 text-white">
          <Clock className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">Delay</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.label}</p>
      {data.duration && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {data.duration}
        </Badge>
      )}
    </div>
  )
}

function FilterNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 min-w-[180px] ${
      selected 
        ? 'border-cyan-500 shadow-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/30' 
        : 'border-cyan-200 dark:border-cyan-800 bg-white dark:bg-slate-900'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-cyan-500 text-white">
          <Filter className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">Filter</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.label}</p>
    </div>
  )
}

// Node palette items
const paletteItems = [
  { type: 'trigger', label: 'Trigger', icon: Zap, color: 'emerald', description: 'Start your workflow' },
  { type: 'aiText', label: 'AI Text', icon: MessageSquare, color: 'violet', description: 'Generate text with AI' },
  { type: 'aiImage', label: 'AI Image', icon: ImageIcon, color: 'fuchsia', description: 'Generate images' },
  { type: 'logic', label: 'Logic', icon: GitBranch, color: 'orange', description: 'Conditional logic' },
  { type: 'output', label: 'Output', icon: Send, color: 'red', description: 'Send output' },
  { type: 'webhook', label: 'Webhook', icon: Webhook, color: 'blue', description: 'HTTP webhook' },
  { type: 'delay', label: 'Delay', icon: Clock, color: 'amber', description: 'Wait timer' },
  { type: 'filter', label: 'Filter', icon: Filter, color: 'cyan', description: 'Filter data' },
]

// Initial nodes
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { label: 'When webhook received' },
  },
  {
    id: '2',
    type: 'aiText',
    position: { x: 100, y: 250 },
    data: { label: 'Generate response', model: 'GPT-4' },
  },
  {
    id: '3',
    type: 'output',
    position: { x: 100, y: 400 },
    data: { label: 'Send to user' },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

function FlowBuilder() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const { screenToFlowPosition } = useReactFlow()

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId))
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
    setSelectedNode(null)
  }, [setNodes, setEdges])

  const duplicateNode = useCallback((node: Node) => {
    const newNode: Node = {
      ...node,
      id: `${node.type}-${Date.now()}`,
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      selected: false,
    }
    setNodes((nds) => nds.concat(newNode))
  }, [setNodes])

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...newData } } : n))
    )
    if (selectedNode?.id === nodeId) {
      setSelectedNode((prev) => (prev ? { ...prev, data: { ...prev.data, ...newData } } : null))
    }
  }, [setNodes, selectedNode])

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Toolbar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b px-4 py-3 flex items-center justify-between bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-10"
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="font-semibold">{id ? 'Edit Workflow' : 'New Workflow'}</h1>
              <p className="text-xs text-muted-foreground">Drag nodes to build your workflow</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
            
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export workflow</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Test
                </Button>
              </TooltipTrigger>
              <TooltipContent>Test workflow</TooltipContent>
            </Tooltip>
            
            <Button 
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </motion.div>

        {/* Builder Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Node Palette */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-72 border-r bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl flex flex-col"
          >
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Node Palette
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Drag nodes to the canvas
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {paletteItems.map((item) => (
                <div
                  key={item.type}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('application/reactflow', item.type)
                    event.dataTransfer.effectAllowed = 'move'
                  }}
                  className="group cursor-move"
                >
                  <Card className="border-0 shadow-soft hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Canvas */}
          <div className="flex-1 relative bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onDragOver={onDragOver}
              onDrop={onDrop}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              className="react-flow-wrapper"
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
              <Controls className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border shadow-lg" />
              <MiniMap 
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border shadow-lg rounded-xl"
                maskColor="rgb(0, 0, 0, 0.1)"
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'trigger': return '#10b981'
                    case 'aiText': return '#8b5cf6'
                    case 'aiImage': return '#d946ef'
                    case 'logic': return '#f97316'
                    case 'output': return '#ef4444'
                    case 'webhook': return '#3b82f6'
                    case 'delay': return '#f59e0b'
                    case 'filter': return '#06b6d4'
                    default: return '#8b5cf6'
                  }
                }}
              />
              
              {/* Empty State */}
              {nodes.length === 0 && (
                <Panel position="top-center" className="mt-20">
                  <Card className="border-0 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Start Building Your Workflow</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Drag nodes from the left sidebar and drop them here. Connect them to create your automation.
                    </p>
                  </Card>
                </Panel>
              )}
            </ReactFlow>
          </div>

          {/* Right Sidebar - Properties */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 border-l bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl flex flex-col"
          >
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Properties
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {selectedNode ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{selectedNode.type}</Badge>
                    <div className="flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => duplicateNode(selectedNode)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                            onClick={() => deleteNode(selectedNode.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Node Name</Label>
                    <Input
                      value={selectedNode?.data?.label || ''}
                      onChange={(e) => selectedNode && updateNodeData(selectedNode.id, { label: e.target.value })}
                      placeholder="Enter node name"
                    />
                  </div>

                  {selectedNode.type === 'aiText' && (
                    <>
                      <div className="space-y-2">
                        <Label>AI Model</Label>
                        <Select 
                          value={selectedNode.data.model || 'gpt-4'}
                          onValueChange={(value) => updateNodeData(selectedNode.id, { model: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>System Prompt</Label>
                        <Textarea
                          placeholder="Enter system prompt..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Temperature</Label>
                        <Input type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                      </div>
                    </>
                  )}

                  {selectedNode.type === 'aiImage' && (
                    <>
                      <div className="space-y-2">
                        <Label>Image Size</Label>
                        <Select 
                          value={selectedNode.data.size || '1024x1024'}
                          onValueChange={(value) => updateNodeData(selectedNode.id, { size: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1024x1024">1024x1024</SelectItem>
                            <SelectItem value="1024x1792">1024x1792</SelectItem>
                            <SelectItem value="1792x1024">1792x1024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Prompt</Label>
                        <Textarea
                          placeholder="Describe the image you want to generate..."
                          rows={4}
                        />
                      </div>
                    </>
                  )}

                  {selectedNode.type === 'logic' && (
                    <>
                      <div className="space-y-2">
                        <Label>Condition Type</Label>
                        <Select 
                          value={selectedNode.data.condition || 'equals'}
                          onValueChange={(value) => updateNodeData(selectedNode.id, { condition: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not-equals">Not Equals</SelectItem>
                            <SelectItem value="greater">Greater Than</SelectItem>
                            <SelectItem value="less">Less Than</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Variable</Label>
                        <Input placeholder="{{input.value}}" />
                      </div>
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input placeholder="Compare value" />
                      </div>
                    </>
                  )}

                  {selectedNode.type === 'delay' && (
                    <>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Select 
                          value={selectedNode.data.duration || '5m'}
                          onValueChange={(value) => updateNodeData(selectedNode.id, { duration: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1m">1 minute</SelectItem>
                            <SelectItem value="5m">5 minutes</SelectItem>
                            <SelectItem value="15m">15 minutes</SelectItem>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedNode.type === 'output' && (
                    <>
                      <div className="space-y-2">
                        <Label>Output Type</Label>
                        <Select defaultValue="webhook">
                          <SelectTrigger>
                            <SelectValue placeholder="Select output type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="webhook">Webhook Response</SelectItem>
                            <SelectItem value="email">Send Email</SelectItem>
                            <SelectItem value="slack">Send Slack Message</SelectItem>
                            <SelectItem value="database">Save to Database</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Message Template</Label>
                        <Textarea
                          placeholder="Use {{variable}} syntax for dynamic content"
                          rows={4}
                        />
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Enabled</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                    <Settings className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select a node to edit its properties
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export function WorkflowBuilderPage(): JSX.Element {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  )
}
