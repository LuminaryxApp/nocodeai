interface WorkflowNode {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: Record<string, unknown>;
}
interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
}
interface WorkflowState {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    selectedNode: string | null;
    isExecuting: boolean;
    executionLogs: string[];
    setNodes: (nodes: WorkflowNode[]) => void;
    setEdges: (edges: WorkflowEdge[]) => void;
    addNode: (node: WorkflowNode) => void;
    removeNode: (nodeId: string) => void;
    updateNode: (nodeId: string, data: Record<string, unknown>) => void;
    addEdge: (edge: WorkflowEdge) => void;
    removeEdge: (edgeId: string) => void;
    setSelectedNode: (nodeId: string | null) => void;
    setExecuting: (executing: boolean) => void;
    addExecutionLog: (log: string) => void;
    clearExecutionLogs: () => void;
    reset: () => void;
}
export declare const useWorkflowStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<WorkflowState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<WorkflowState, {
            nodes: WorkflowNode[];
            edges: WorkflowEdge[];
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: WorkflowState) => void) => () => void;
        onFinishHydration: (fn: (state: WorkflowState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<WorkflowState, {
            nodes: WorkflowNode[];
            edges: WorkflowEdge[];
        }>>;
    };
}>;
export {};
//# sourceMappingURL=workflow-store.d.ts.map