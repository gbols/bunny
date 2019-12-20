import { Router } from 'express';
import { TaskController } from '../controllers';
import { asyncMiddleware, verifyToken } from '../../utils/helpers';


const taskRoutes = Router();

taskRoutes.post('/add', verifyToken, asyncMiddleware(TaskController.createTask));

taskRoutes.get('/:id', asyncMiddleware(TaskController.getTasksByUser));
taskRoutes.get('/', asyncMiddleware(TaskController.getAllTasks));

taskRoutes.put('/:id', verifyToken ,asyncMiddleware(TaskController.updateTask));
taskRoutes.delete('/:id', verifyToken ,asyncMiddleware(TaskController.deleteTask));

export { taskRoutes  };