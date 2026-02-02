import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Save, Play, Undo, Redo, Download } from 'lucide-react'

export function WorkflowBuilderPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-background">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">Workflow Builder</h1>
          <span className="text-muted-foreground text-sm">
            {id ? 'Edit Workflow' : 'New Workflow'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="h-4 w-4 mr-2" />
            Redo
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Test
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Builder Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Node Palette */}
        <div className="w-64 border-r bg-muted/50 p-4">
          <h2 className="font-semibold mb-4">Nodes</h2>
          <div className="space-y-2">
            <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Trigger</span>
              </div>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">AI Text</span>
              </div>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm">AI Image</span>
              </div>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm">Logic</span>
              </div>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">Output</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Drag nodes from the sidebar to start building your workflow
              </p>
              <p className="text-sm text-muted-foreground">
                Canvas implementation with React Flow coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l bg-muted/50 p-4">
          <h2 className="font-semibold mb-4">Properties</h2>
          <p className="text-sm text-muted-foreground">
            Select a node to edit its properties
          </p>
        </div>
      </div>
    </div>
  )
}
