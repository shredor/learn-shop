import Router from 'express';
import { brandRouter } from './brandRouter';
import { deviceRouter } from './deviceRouter';
import { typeRouter } from './typeRouter';
import { userRouter } from './userRouter';
import { basketDeviceRouter } from './basketDeviceRouter';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { ratingRouter } from './ratingRouter';

const apiRouter = Router();

apiRouter.use('/brand', brandRouter);
apiRouter.use('/device', deviceRouter);
apiRouter.use('/type', typeRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/rating', ratingRouter);
apiRouter.use('/basket-device', authMiddleware, basketDeviceRouter);

export { apiRouter };
