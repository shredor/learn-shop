import Router from 'express';
import { basketDeviceController } from '../controllers/BasketDeviceController';

const basketDeviceRouter = Router();

basketDeviceRouter.post('/', basketDeviceController.create);
basketDeviceRouter.get('/', basketDeviceController.getAll);
basketDeviceRouter.delete('/:id?', basketDeviceController.delete);

export { basketDeviceRouter };
