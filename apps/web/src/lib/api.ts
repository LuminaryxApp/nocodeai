// apps/web/src/lib/api.ts
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Projects API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: { orgId: string; name: string; description?: string }) => 
    api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  duplicate: (id: string) => api.post(`/projects/${id}/duplicate`),
}

// Workflows API
export const workflowsApi = {
  getAll: () => api.get('/workflows'),
  getById: (id: string) => api.get(`/workflows/${id}`),
  create: (data: {
    projectId: string
    name: string
    description?: string
    nodes: any[]
    edges: any[]
    config?: Record<string, any>
  }) => api.post('/workflows', data),
  update: (id: string, data: any) => api.put(`/workflows/${id}`, data),
  delete: (id: string) => api.delete(`/workflows/${id}`),
  execute: (id: string, inputs?: Record<string, any>) => 
    api.post(`/workflows/${id}/execute`, { inputs }),
  validate: (id: string) => api.post(`/workflows/${id}/validate`),
  publish: (id: string) => api.post(`/workflows/${id}/publish`),
  getExecutions: (id: string) => api.get(`/workflows/${id}/executions`),
  getExecution: (executionId: string) => api.get(`/workflows/executions/${executionId}`),
}

// Templates API
export const templatesApi = {
  getAll: () => api.get('/templates'),
  getById: (id: string) => api.get(`/templates/${id}`),
}

// Auth API
export const authApi = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: { email: string; password: string; name: string }) => 
    api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
}
