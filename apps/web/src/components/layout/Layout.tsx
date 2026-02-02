import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FolderOpen, 
  Home, 
  LayoutTemplate, 
  Menu, 
  Settings, 
  LogOut, 
  Plus,
  ChevronRight,
  Sparkles,
  Bell,
  Search,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Overview & analytics' },
  { name: 'Projects', href: '/projects', icon: FolderOpen, description: 'Manage your workflows' },
  { name: 'Templates', href: '/templates', icon: LayoutTemplate, description: 'Pre-built solutions' },
  { name: 'Settings', href: '/settings', icon: Settings, description: 'Configure your account' },
]

export function Layout(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-700 to-fuchsia-700 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              NoCode AI
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-16 bottom-0 w-72 z-50 glass-strong border-l"
            >
              <div className="p-4 space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25"
                  onClick={() => {
                    navigate('/projects')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>

                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                        location.pathname === item.href
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                    <LogOut className="h-5 w-5" />
                    Sign out
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex h-screen pt-16 lg:pt-0">
          {/* Sidebar */}
          <motion.aside 
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="hidden lg:flex flex-col border-r bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl"
          >
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b">
              <Link to="/" className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold text-lg bg-gradient-to-r from-violet-700 to-fuchsia-700 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent whitespace-nowrap"
                    >
                      NoCode AI
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>

            {/* New Project Button */}
            <div className="p-4">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button 
                    className={cn(
                      "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30",
                      isCollapsed ? "w-10 h-10 p-0" : "w-full"
                    )}
                    onClick={() => navigate('/projects')}
                  >
                    <Plus className="h-4 w-4 shrink-0" />
                    {!isCollapsed && <span className="ml-2">New Project</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="font-medium">
                    New Project
                  </TooltipContent>
                )}
              </Tooltip>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group',
                          isActive
                            ? 'bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 text-violet-700 dark:text-violet-400'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        <div className={cn(
                          "p-1.5 rounded-lg transition-all duration-200 shrink-0",
                          isActive 
                            ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30" 
                            : "bg-muted group-hover:bg-white dark:group-hover:bg-slate-800"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        {!isCollapsed && (
                          <div className="flex flex-col overflow-hidden">
                            <span className="truncate">{item.name}</span>
                            <span className="text-[10px] text-muted-foreground truncate">{item.description}</span>
                          </div>
                        )}
                        {!isCollapsed && isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-600"
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" className="font-medium">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                )
              })}
            </nav>

            {/* Collapse Button */}
            <div className="p-3 border-t">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <motion.div
                      animate={{ rotate: isCollapsed ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {isCollapsed ? 'Expand' : 'Collapse'} sidebar
                </TooltipContent>
              </Tooltip>
            </div>

            {/* User Profile */}
            <div className="p-3 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(
                    "w-full justify-start gap-3 h-auto py-2 hover:bg-muted/50",
                    isCollapsed && "justify-center p-2"
                  )}>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-medium text-sm shrink-0">
                      U
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 text-left overflow-hidden">
                        <p className="text-sm font-medium truncate">User Name</p>
                        <p className="text-xs text-muted-foreground truncate">user@example.com</p>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Desktop Header */}
            <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-30">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search projects, templates..." 
                    className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-violet-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
                </Button>
              </div>
            </header>

            {/* Page Content */}
            <div className="p-4 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
