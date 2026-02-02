import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { HomePage } from './pages/home-page'
import { ProjectsPage } from './pages/projects-page'
import { TemplatesPage } from './pages/templates-page'
import { WorkflowBuilderPage } from './pages/workflow-builder-page'
import { SettingsPage } from './pages/settings-page'
import { LoginPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<WorkflowBuilderPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
