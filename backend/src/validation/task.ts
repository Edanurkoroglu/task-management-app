import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  status: z.enum(['PENDING', 'COMPLETED']).default('PENDING'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional().nullable(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
