import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { LandingPage } from './pages/landing-page'
import { HomePage } from './pages/home-page'
import { ProjectsPage } from './pages/projects-page'
import { TemplatesPage } from './pages/templates-page'
import { WorkflowBuilderPage } from './pages/workflow-builder-page'
import { SettingsPage } from './pages/settings-page'
import { LoginPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'

// Simple auth check - replace with your actual auth logic
function isAuthenticated() {
  return !!localStorage.getItem('token')
}

function App(): JSX.Element {
  const authenticated = isAuthenticated()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={authenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={authenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={authenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={authenticated ? <Layout /> : <Navigate to="/" replace />}>
        <Route path="dashboard" element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<WorkflowBuilderPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
