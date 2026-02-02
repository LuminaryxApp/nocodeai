import { useState } from 'react'
import { LayoutTemplate, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export function TemplatesPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Start with pre-built workflow templates
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); }}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Empty state - will be replaced with actual templates */}
        <Card className="col-span-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <LayoutTemplate className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-lg mb-2">Templates coming soon</CardTitle>
            <CardDescription className="text-center mb-4">
              We&apos;re working on building a library of pre-built templates for you
            </CardDescription>
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              Browse Featured
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
