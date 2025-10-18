import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

const Calendar = () => {
  return (
    <div className="min-h-screen bg-solvero-panel">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
            <p className="text-muted-foreground">View all tasks with due dates</p>
          </div>

          <Card className="shadow-solvero">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Task Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[600px] flex items-center justify-center">
              <p className="text-muted-foreground">Calendar view coming soon - ready for integration</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
