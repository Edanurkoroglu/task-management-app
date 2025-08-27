import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateTaskInput, UpdateTaskInput } from '../validation/task';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body as CreateTaskInput;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status,
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Önce görevin var olup olmadığını ve kullanıcıya ait olduğunu kontrol et
    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), userId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    // Görevi güncelle ve güncellenmiş halini döndür
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body as UpdateTaskInput,
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const task = await prisma.task.deleteMany({
      where: { id: Number(id), userId },
    });

    if (!task.count) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
