import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { Basket, BasketDevice, Device } from '../models';

class BasketDeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { deviceId } = req.body;
    const userId = req.user.id;

    if (!deviceId) {
      return next(ApiError.badRequest('Device not provided'));
    }

    const basket = await Basket.findOne({ where: { userId } });

    if (!basket) {
      return next(ApiError.badRequest('Basket not found'));
    }

    const device = await Device.findOne({ where: { id: deviceId }, attributes: ['id'] });

    if (!device) {
      return next(ApiError.badRequest('Device not found'));
    }

    const existingBasketDevice = await BasketDevice.findOne({
      where: { deviceId, basketId: basket.id },
    });

    if (existingBasketDevice) {
      return next(ApiError.badRequest('Device already in basket'));
    }

    const basketDevice = await BasketDevice.create({ deviceId, basketId: basket.id });

    res.json(basketDevice);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    const basket = await Basket.findOne({ where: { userId }, attributes: ['id'] });

    if (!basket) {
      return next(ApiError.badRequest('Basket not found'));
    }

    const basketDevices = await BasketDevice.findAll({
      where: { basketId: basket.id },
      include: [{ model: Device }],
    });

    res.json(basketDevices);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    const { id } = req.params;
    const { deviceId } = req.body;

    const basket = await Basket.findOne({ where: { userId }, attributes: ['id'] });

    if (!basket) {
      return next(ApiError.badRequest('Basket not found'));
    }

    const result = await BasketDevice.destroy({
      where: id ? { id, basketId: basket.id } : { deviceId, basketId: basket.id },
    });

    if (!result) {
      return next(ApiError.badRequest('Basket device not found'));
    }

    res.json({
      message: 'Basket device deleted',
    });
  }
}

export const basketDeviceController = new BasketDeviceController();
