import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Workflow,
  GitBranch,
  Play,
  MoreHorizontal,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'



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
]

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
]

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
]

export function HomePage(): JSX.Element {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your workflows.
          </p>
        </div>
        <Button 
          asChild
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30"
        >
          <Link to="/projects">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.name} className="relative overflow-hidden border-0 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                <stat.icon className={cn("h-4 w-4", `text-${stat.color.split('-')[1]}-600`)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                <span className="text-xs text-muted-foreground">from last week</span>
              </div>
            </CardContent>
            <div className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r", stat.color)} />
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Workflows */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Workflows</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link to="/projects">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentWorkflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors">
                        <workflow.icon className="h-5 w-5 text-violet-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{workflow.name}</h3>
                          <Badge 
                            variant={workflow.status === 'active' ? 'default' : 'secondary'}
                            className={cn(
                              "text-xs",
                              workflow.status === 'active' && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                            )}
                          >
                            {workflow.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {workflow.lastRun}
                          </span>
                          <span className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            {workflow.executions} runs
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Start</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link to={action.href}>
                  <Card className="group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", action.iconBg)}>
                          <action.icon className={cn("h-5 w-5", `text-${action.color.split('-')[1]}-600`)} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold group-hover:text-violet-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                    <div className={cn("h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r", action.color)} />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Upgrade Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <Sparkles className="h-8 w-8 mb-3" />
                  <h3 className="text-lg font-semibold mb-1">Upgrade to Pro</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Get unlimited workflows, priority support, and advanced analytics.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-violet-600 hover:bg-white/90"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ')
}
