export type UserRole = 'admin' | 'scrum_master' | 'employee';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  scrumMaster: User;
  members: User[];
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assignee?: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  subtasks: Subtask[];
  comments: Comment[];
  attachments: Attachment[];
  timeTracked: number; // in minutes
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  uploadedBy: User;
  uploadedAt: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  description?: string;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline_reminder' | 'status_update' | 'comment';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedTaskId?: string;
}
