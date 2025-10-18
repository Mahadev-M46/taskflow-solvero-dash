import { Task } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-primary-light text-accent-foreground',
  high: 'bg-destructive/10 text-destructive',
};

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <Card
      className="cursor-pointer p-4 hover:shadow-solvero-md transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
          <Badge className={cn('text-xs', priorityColors[task.priority])}>
            {task.priority}
          </Badge>
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {task.subtasks.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
              </span>
              <span>subtasks</span>
            </div>
          )}

          {task.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.comments.length}</span>
            </div>
          )}

          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              <span>{task.attachments.length}</span>
            </div>
          )}

          {task.timeTracked > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{Math.round(task.timeTracked / 60)}h</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {task.assignee && (
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {task.assignee.firstName[0]}{task.assignee.lastName[0]}
              </div>
              <span className="text-xs text-muted-foreground">
                {task.assignee.firstName}
              </span>
            </div>
          )}

          {task.dueDate && (
            <span className="text-xs text-muted-foreground">
              Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
