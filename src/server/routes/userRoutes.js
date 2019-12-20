import { Router } from 'express';
import { UserController } from '../controllers';
import { asyncMiddleware, verifyToken } from '../../utils/helpers';


const userRoutes = Router();

userRoutes.post('/signup', asyncMiddleware(UserController.signup));
userRoutes.post('/login', asyncMiddleware(UserController.login));

userRoutes.get('/' , asyncMiddleware(UserController.getAllUsers));
userRoutes.get('/:id', asyncMiddleware(UserController.getUserById));

userRoutes.put('/:id', asyncMiddleware(UserController.updateUser));
userRoutes.delete('/:id', verifyToken, asyncMiddleware(UserController.deleteUser));

export { userRoutes };