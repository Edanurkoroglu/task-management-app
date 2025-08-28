import axios from 'axios';
import type { LoginCredentials, RegisterCredentials, CreateTaskData, UpdateTaskData, Task } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';
// fetch data from backend
// defining functions to interact with the backend endpoints.
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const taskAPI = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    const tasks = response.data.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }));
    return tasks;
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    const task = {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt)
    };
    return task;
  },

  updateTask: async (id: number, taskData: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    const task = {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt)
    };
    return task;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;
