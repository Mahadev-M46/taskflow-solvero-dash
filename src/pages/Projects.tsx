import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FolderKanban } from 'lucide-react';

const Projects = () => {
  return (
    <div className="min-h-screen bg-solvero-panel">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
              <p className="text-muted-foreground">Manage all your projects</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-solvero hover:shadow-solvero-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light">
                    <FolderKanban className="h-6 w-6 text-primary" />
                  </div>
                  <span className="rounded-full bg-success-light px-2 py-1 text-xs font-medium text-success">
                    Active
                  </span>
                </div>
                <CardTitle className="mt-4">Website Redesign</CardTitle>
                <CardDescription>
                  Complete redesign of the company website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">12 tasks</span>
                  <span className="text-muted-foreground">3 members</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
