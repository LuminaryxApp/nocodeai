import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Sparkles, Zap, TrendingUp, Clock, ArrowRight, Workflow, GitBranch, Play, MoreHorizontal, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
const stats = [
    {
        name: 'Total Projects',
        value: '12',
        change: '+3',
        icon: FolderOpen,
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-500/10'
    },
    {
        name: 'Active Workflows',
        value: '8',
        change: '+2',
        icon: Workflow,
        color: 'from-fuchsia-500 to-fuchsia-600',
        bgColor: 'bg-fuchsia-500/10'
    },
    {
        name: 'Executions Today',
        value: '1,234',
        change: '+15%',
        icon: Zap,
        color: 'from-pink-500 to-rose-600',
        bgColor: 'bg-pink-500/10'
    },
    {
        name: 'Success Rate',
        value: '99.2%',
        change: '+0.5%',
        icon: TrendingUp,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-500/10'
    },
];
const recentWorkflows = [
    {
        id: 1,
        name: 'Customer Support AI',
        status: 'active',
        lastRun: '2 min ago',
        executions: '45.2K',
        icon: Sparkles
    },
    {
        id: 2,
        name: 'Data Processing Pipeline',
        status: 'active',
        lastRun: '15 min ago',
        executions: '12.8K',
        icon: GitBranch
    },
    {
        id: 3,
        name: 'Email Automation',
        status: 'paused',
        lastRun: '2 hours ago',
        executions: '8.4K',
        icon: Workflow
    },
];
const quickActions = [
    {
        title: 'Create Workflow',
        description: 'Build a new AI-powered workflow from scratch',
        icon: Plus,
        href: '/projects',
        color: 'from-violet-600 to-fuchsia-600',
        iconBg: 'bg-violet-100 dark:bg-violet-900/30'
    },
    {
        title: 'Browse Templates',
        description: 'Start with pre-built templates for common use cases',
        icon: Sparkles,
        href: '/templates',
        color: 'from-blue-600 to-cyan-600',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
        title: 'View Documentation',
        description: 'Learn more about features and capabilities',
        icon: Zap,
        href: '#',
        color: 'from-orange-600 to-amber-600',
        iconBg: 'bg-orange-100 dark:bg-orange-900/30'
    },
];
export function HomePage() {
    return (_jsxs(motion.div, { className: "space-y-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: _jsx("span", { className: "gradient-text", children: "Dashboard" }) }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Welcome back! Here's what's happening with your workflows." })] }), _jsx(Button, { asChild: true, className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30", children: _jsxs(Link, { to: "/projects", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Project"] }) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: stats.map((stat, index) => (_jsxs(Card, { className: "relative overflow-hidden border-0 shadow-soft hover:shadow-lg transition-shadow duration-300", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: stat.name }), _jsx("div", { className: cn("p-2 rounded-lg", stat.bgColor), children: _jsx(stat.icon, { className: cn("h-4 w-4", `text-${stat.color.split('-')[1]}-600`) }) })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold", children: stat.value }), _jsxs("div", { className: "flex items-center gap-1 mt-1", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-emerald-500" }), _jsx("span", { className: "text-xs text-emerald-600 font-medium", children: stat.change }), _jsx("span", { className: "text-xs text-muted-foreground", children: "from last week" })] })] }), _jsx("div", { className: cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r", stat.color) })] }, stat.name))) }), _jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 }, className: "lg:col-span-2 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Recent Workflows" }), _jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "gap-1", children: _jsxs(Link, { to: "/projects", children: ["View all", _jsx(ArrowRight, { className: "h-4 w-4" })] }) })] }), _jsx("div", { className: "space-y-3", children: recentWorkflows.map((workflow, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors", children: _jsx(workflow.icon, { className: "h-5 w-5 text-violet-600" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-semibold truncate", children: workflow.name }), _jsx(Badge, { variant: workflow.status === 'active' ? 'default' : 'secondary', className: cn("text-xs", workflow.status === 'active' && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"), children: workflow.status })] }), _jsxs("div", { className: "flex items-center gap-4 mt-1 text-sm text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), workflow.lastRun] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Play, { className: "h-3 w-3" }), workflow.executions, " runs"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Play, { className: "h-4 w-4" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { children: "Edit" }), _jsx(DropdownMenuItem, { children: "Duplicate" }), _jsx(DropdownMenuItem, { className: "text-red-600", children: "Delete" })] })] })] })] }) }) }) }, workflow.id))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 }, className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Quick Start" }), _jsx("div", { className: "space-y-3", children: quickActions.map((action, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 + index * 0.1 }, children: _jsx(Link, { to: action.href, children: _jsxs(Card, { className: "group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden", children: [_jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", action.iconBg), children: _jsx(action.icon, { className: cn("h-5 w-5", `text-${action.color.split('-')[1]}-600`) }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold group-hover:text-violet-600 transition-colors", children: action.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: action.description })] }), _jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-1 transition-all" })] }) }), _jsx("div", { className: cn("h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r", action.color) })] }) }) }, action.title))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, children: _jsx(Card, { className: "border-0 shadow-lg overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white", children: _jsxs(CardContent, { className: "p-6 relative", children: [_jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" }), _jsxs("div", { className: "relative z-10", children: [_jsx(Sparkles, { className: "h-8 w-8 mb-3" }), _jsx("h3", { className: "text-lg font-semibold mb-1", children: "Upgrade to Pro" }), _jsx("p", { className: "text-white/80 text-sm mb-4", children: "Get unlimited workflows, priority support, and advanced analytics." }), _jsx(Button, { variant: "secondary", className: "w-full bg-white text-violet-600 hover:bg-white/90", children: "Upgrade Now" })] })] }) }) })] })] })] }));
}
function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
