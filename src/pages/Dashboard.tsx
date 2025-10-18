import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TaskCard } from '@/components/kanban/TaskCard';
import { Task, TaskStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create a modern, responsive landing page design',
    status: 'todo',
    priority: 'high',
    projectId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [],
    comments: [],
    attachments: [],
    timeTracked: 0,
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Set up JWT authentication with refresh tokens',
    status: 'in_progress',
    priority: 'high',
    projectId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 's1', title: 'Setup backend endpoints', completed: true },
      { id: 's2', title: 'Create login UI', completed: false },
    ],
    comments: [{ id: 'c1', author: { id: '1', email: 'user@example.com', firstName: 'John', lastName: 'Doe', role: 'employee' }, content: 'Making good progress', createdAt: new Date().toISOString() }],
    attachments: [],
    timeTracked: 180,
  },
  {
    id: '3',
    title: 'Code review',
    description: 'Review pull request #42',
    status: 'review',
    priority: 'medium',
    projectId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [],
    comments: [],
    attachments: [],
    timeTracked: 30,
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    status: 'done',
    priority: 'low',
    projectId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [],
    comments: [],
    attachments: [],
    timeTracked: 60,
  },
];

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

const Dashboard = () => {
  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
    // TODO: Open task detail modal
  };

  return (
    <div className="min-h-screen bg-solvero-panel">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Project Board</h2>
              <p className="text-muted-foreground">Manage your tasks and workflow</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => {
              const columnTasks = mockTasks.filter((task) => task.status === column.id);
              
              return (
                <Card key={column.id} className="shadow-solvero">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm font-medium">
                      <span>{column.title}</span>
                      <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                        {columnTasks.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {columnTasks.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-8">
                        No tasks
                      </p>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onClick={() => handleTaskClick(task)}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
