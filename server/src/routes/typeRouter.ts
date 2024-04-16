import Router from 'express';
import { typeController } from '../controllers/TypeController';
import { checkRoleMiddleware } from '../middleware/CheckRoleMiddleware';

const typeRouter = Router();

typeRouter.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
typeRouter.get('/', typeController.getAll);

export { typeRouter };
