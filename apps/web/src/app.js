import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { HomePage } from './pages/home-page';
import { ProjectsPage } from './pages/projects-page';
import { TemplatesPage } from './pages/templates-page';
import { WorkflowBuilderPage } from './pages/workflow-builder-page';
import { SettingsPage } from './pages/settings-page';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "projects", element: _jsx(ProjectsPage, {}) }), _jsx(Route, { path: "projects/:id", element: _jsx(WorkflowBuilderPage, {}) }), _jsx(Route, { path: "templates", element: _jsx(TemplatesPage, {}) }), _jsx(Route, { path: "settings", element: _jsx(SettingsPage, {}) })] })] }));
}
export default App;
