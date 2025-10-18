import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, BarChart, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-background">
      <nav className="container mx-auto flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">TF</span>
          </div>
          <span className="text-xl font-semibold">TaskFlow</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
            Streamline Your Workflow with{' '}
            <span className="text-primary">TaskFlow</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Professional task management, time tracking, and team collaboration 
            in one powerful platform. Built for teams that value productivity.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6 shadow-solvero">
            <CheckCircle2 className="mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 font-semibold">Kanban Boards</h3>
            <p className="text-sm text-muted-foreground">
              Drag-and-drop task management with customizable workflows
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-solvero">
            <Clock className="mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 font-semibold">Time Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track time spent on tasks with built-in timers and reports
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-solvero">
            <BarChart className="mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 font-semibold">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Gain insights with powerful analytics and reporting tools
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-solvero">
            <Users className="mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 font-semibold">Team Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Role-based access control and real-time notifications
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
