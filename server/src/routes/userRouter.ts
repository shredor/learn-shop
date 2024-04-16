import Router from 'express';
import { userController } from '../controllers/UserController';
import { maybeAuthMiddleware } from '../middleware/AuthMiddleware';

const userRouter = Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', maybeAuthMiddleware, userController.check);

export { userRouter };
