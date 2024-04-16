import Router from 'express';
import { cartDeviceController } from '../controllers/CartDeviceController';

const cartDeviceRouter = Router();

cartDeviceRouter.post('/', cartDeviceController.create);
cartDeviceRouter.get('/', cartDeviceController.getAll);
cartDeviceRouter.delete('/:id?', cartDeviceController.delete);

export { cartDeviceRouter };
