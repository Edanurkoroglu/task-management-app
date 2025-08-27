import { z } from 'zod';

// Enum tanımı
export const TaskStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

export const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters'),
  description: z.string()
    .max(1000, 'Description must be at most 1000 characters')
    .optional()
    .or(z.literal('')),
  status: z.enum([TaskStatus.PENDING, TaskStatus.COMPLETED]).default(TaskStatus.PENDING), // Güncellendi
});

export const updateTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters')
    .optional(),
  description: z.string()
    .max(1000, 'Description must be at most 1000 characters')
    .optional()
    .nullable(),
  status: z.enum([TaskStatus.PENDING, TaskStatus.COMPLETED]).optional(), // Güncellendi
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
