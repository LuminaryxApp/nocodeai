import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, Plus, Search, MoreHorizontal, Play, Pause, Edit3, Trash2, Clock, Activity, Filter, Grid3X3, List, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
const mockProjects = [
    {
        id: '1',
        name: 'Customer Support AI',
        description: 'Automated customer support workflow with GPT-4 integration',
        status: 'active',
        lastModified: '2 hours ago',
        executions: 45231,
        successRate: 98.5
    },
    {
        id: '2',
        name: 'Data Processing Pipeline',
        description: 'ETL workflow for processing sales data',
        status: 'active',
        lastModified: '5 hours ago',
        executions: 12843,
        successRate: 99.2
    },
    {
        id: '3',
        name: 'Email Automation',
        description: 'Smart email sorting and response automation',
        status: 'paused',
        lastModified: '1 day ago',
        executions: 8392,
        successRate: 96.8
    },
    {
        id: '4',
        name: 'Social Media Manager',
        description: 'Content scheduling and analytics workflow',
        status: 'draft',
        lastModified: '3 days ago',
        executions: 0,
        successRate: 0
    }
];
export function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const filteredProjects = mockProjects.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleCreateProject = () => {
        // TODO: Implement project creation
        setIsCreateDialogOpen(false);
        setNewProjectName('');
    };
    return (_jsxs(motion.div, { className: "space-y-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: _jsx("span", { className: "gradient-text", children: "Projects" }) }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage and monitor your AI workflow projects" })] }), _jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Project"] }) }), _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Create New Project" }), _jsx(DialogDescription, { children: "Give your project a name to get started with building AI workflows." })] }), _jsx("div", { className: "space-y-4 py-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Project Name" }), _jsx(Input, { id: "name", placeholder: "e.g., Customer Support Bot", value: newProjectName, onChange: (e) => setNewProjectName(e.target.value) })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleCreateProject, className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white", children: "Create Project" })] })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search projects...", className: "pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-violet-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [_jsx(Filter, { className: "h-4 w-4" }), "Filter"] }), _jsxs("div", { className: "flex items-center border rounded-lg p-1", children: [_jsx(Button, { variant: viewMode === 'grid' ? 'secondary' : 'ghost', size: "sm", className: "h-8 px-2", onClick: () => setViewMode('grid'), children: _jsx(Grid3X3, { className: "h-4 w-4" }) }), _jsx(Button, { variant: viewMode === 'list' ? 'secondary' : 'ghost', size: "sm", className: "h-8 px-2", onClick: () => setViewMode('list'), children: _jsx(List, { className: "h-4 w-4" }) })] })] })] }), filteredProjects.length === 0 ? (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, delay: 0.3 }, children: _jsx(Card, { className: "border-0 shadow-soft", children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-16", children: [_jsx("div", { className: "h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mb-6", children: _jsx(Folder, { className: "h-10 w-10 text-violet-600" }) }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: "No projects found" }), _jsx("p", { className: "text-muted-foreground text-center max-w-md mb-6", children: "Get started by creating your first AI workflow project" }), _jsxs(Button, { onClick: () => setIsCreateDialogOpen(true), className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Project"] })] }) }) })) : (_jsx("div", { className: viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-3', children: filteredProjects.map((project, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 * index }, children: _jsx(Link, { to: `/projects/${project.id}`, children: _jsx(Card, { className: "group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx("div", { className: "h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors", children: _jsx(Sparkles, { className: "h-6 w-6 text-violet-600" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: project.status === 'active' ? 'default' : 'secondary', className: project.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' : '', children: project.status }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, onClick: (e) => e.preventDefault(), children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Edit3, { className: "mr-2 h-4 w-4" }), "Edit"] }), project.status === 'active' ? (_jsxs(DropdownMenuItem, { children: [_jsx(Pause, { className: "mr-2 h-4 w-4" }), "Pause"] })) : (_jsxs(DropdownMenuItem, { children: [_jsx(Play, { className: "mr-2 h-4 w-4" }), "Resume"] })), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-red-600", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] })] })] })] })] }), _jsx("h3", { className: "text-lg font-semibold mb-1 group-hover:text-violet-600 transition-colors", children: project.name }), _jsx("p", { className: "text-sm text-muted-foreground mb-4 line-clamp-2", children: project.description }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Activity, { className: "h-3.5 w-3.5" }), project.executions.toLocaleString(), " runs"] }), project.successRate > 0 && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }), project.successRate, "% success"] }))] }), _jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3" }), project.lastModified] })] })] }) }) }) }, project.id))) }))] }));
}
