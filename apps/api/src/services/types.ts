// apps/api/src/services/types.ts
export interface Node {
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  data: {
    label: string
    model?: string
    size?: string
    condition?: string
    duration?: string
    prompt?: string
    variable?: string
    value?: string
    outputType?: string
    message?: string
    url?: string
    [key: string]: any
  }
}

export interface Edge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  animated?: boolean
}
