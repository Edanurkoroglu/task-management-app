import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Get all tasks for the logged-in user
router.get('/', getTasks);

// Create a new task
router.post('/', createTask);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

export default router;
