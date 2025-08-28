export interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status: 'pending' | 'completed';
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
}
