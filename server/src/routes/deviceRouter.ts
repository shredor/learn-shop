import Router from 'express';
import { deviceController } from '../controllers/DeviceController';
import { maybeAuthMiddleware } from '../middleware/AuthMiddleware';
import { checkRoleMiddleware } from '../middleware/CheckRoleMiddleware';

const deviceRouter = Router();

deviceRouter.post('/', checkRoleMiddleware('ADMIN'), deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', maybeAuthMiddleware, deviceController.getOne);

export { deviceRouter };
