import Router from 'express';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { ratingController } from '../controllers/RatingController';

const ratingRouter = Router();

ratingRouter.post('/', authMiddleware, ratingController.create);

export { ratingRouter };
