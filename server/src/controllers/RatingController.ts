import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { Device, Rating } from '../models';

class RatingController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { rate, deviceId } = req.body;
    const userId = req.user.id;
    const isValidRate = typeof rate === 'number' && rate >= 1 && rate <= 5;

    if (!isValidRate) {
      return next(ApiError.badRequest('Invalid rate'));
    }

    if (!deviceId) {
      return next(ApiError.badRequest('Device not provided'));
    }

    const device = await Device.findOne({ where: { id: deviceId }, attributes: ['id'] });

    if (!device) {
      return next(ApiError.badRequest('Device not found'));
    }

    const rating = await Rating.findOne({ where: { deviceId, userId } });

    if (rating) {
      return next(ApiError.badRequest('You have already rated this device'));
    }

    const newRating = await Rating.create({ rate, deviceId, userId });

    res.json(newRating);
  }
}

export const ratingController = new RatingController();
