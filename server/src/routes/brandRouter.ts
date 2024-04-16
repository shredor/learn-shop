import Router from 'express';
import { brandController } from '../controllers/BrandController';
import { checkRoleMiddleware } from '../middleware/CheckRoleMiddleware';

const brandRouter = Router();

brandRouter.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
brandRouter.get('/', brandController.getAll);

export { brandRouter };
