import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorkflowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, unknown>
}

interface WorkflowEdge {
  id: string
  source: string
  target: string
}

interface WorkflowState {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNode: string | null
  isExecuting: boolean
  executionLogs: string[]
  
  // Actions
  setNodes: (nodes: WorkflowNode[]) => void
  setEdges: (edges: WorkflowEdge[]) => void
  addNode: (node: WorkflowNode) => void
  removeNode: (nodeId: string) => void
  updateNode: (nodeId: string, data: Record<string, unknown>) => void
  addEdge: (edge: WorkflowEdge) => void
  removeEdge: (edgeId: string) => void
  setSelectedNode: (nodeId: string | null) => void
  setExecuting: (executing: boolean) => void
  addExecutionLog: (log: string) => void
  clearExecutionLogs: () => void
  reset: () => void
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      selectedNode: null,
      isExecuting: false,
      executionLogs: [],

      setNodes: (nodes) => { set({ nodes }); },
      setEdges: (edges) => { set({ edges }); },
      addNode: (node) => { set((state) => ({ nodes: [...state.nodes, node] })); },
      removeNode: (nodeId) =>
        { set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== nodeId),
          edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        })); },
      updateNode: (nodeId, data) =>
        { set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
          ),
        })); },
      addEdge: (edge) => { set((state) => ({ edges: [...state.edges, edge] })); },
      removeEdge: (edgeId) =>
        { set((state) => ({
          edges: state.edges.filter((e) => e.id !== edgeId),
        })); },
      setSelectedNode: (nodeId) => { set({ selectedNode: nodeId }); },
      setExecuting: (executing) => { set({ isExecuting: executing }); },
      addExecutionLog: (log) =>
        { set((state) => ({ executionLogs: [...state.executionLogs, log] })); },
      clearExecutionLogs: () => { set({ executionLogs: [] }); },
      reset: () => { set({ nodes: [], edges: [], selectedNode: null, executionLogs: [] }); },
    }),
    {
      name: 'workflow-storage',
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
    }
  )
)
