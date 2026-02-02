export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  orgId: string | null;
  role: 'owner' | 'admin' | 'member';
  emailVerified: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  settings: Record<string, unknown>;
  billingEmail: string | null;
  subscriptionStatus: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  orgId: string;
  name: string;
  description: string | null;
  workflowData: WorkflowData;
  status: 'draft' | 'active' | 'archived';
  version: number;
  isArchived: boolean;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  config?: Record<string, unknown>;
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
  width?: number;
  height?: number;
}

export interface NodeData {
  label: string;
  description?: string;
  config?: Record<string, unknown>;
  inputs?: NodePort[];
  outputs?: NodePort[];
}

export interface NodePort {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
}

export interface Workflow {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  config: Record<string, unknown>;
  version: number;
  isActive: boolean;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Execution {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  inputs: Record<string, unknown> | null;
  outputs: Record<string, unknown> | null;
  logs: ExecutionLog[];
  errorMessage: string | null;
  startedAt: Date;
  completedAt: Date | null;
  durationMs: number | null;
  triggeredBy: string | null;
}

export interface ExecutionLog {
  timestamp: Date;
  nodeId: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  description: string | null;
  thumbnailUrl: string | null;
  workflowData: WorkflowData;
  tags: string[];
  category: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  usageCount: number;
  isFeatured: boolean;
  isPublic: boolean;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKey {
  id: string;
  orgId: string;
  provider: string;
  keyHash: string;
  name: string | null;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Credential {
  id: string;
  orgId: string;
  provider: string;
  name: string;
  encryptedData: string;
  type: string;
  isActive: boolean;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
