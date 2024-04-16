import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { Cart, CartDevice, Device } from '../models';

class CartDeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { deviceId } = req.body;
    const userId = req.user.id;

    if (!deviceId) {
      return next(ApiError.badRequest('Device not provided'));
    }

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return next(ApiError.badRequest('Cart not found'));
    }

    const device = await Device.findOne({ where: { id: deviceId }, attributes: ['id'] });

    if (!device) {
      return next(ApiError.badRequest('Device not found'));
    }

    const existingCartDevice = await CartDevice.findOne({
      where: { deviceId, cartId: cart.id },
    });

    if (existingCartDevice) {
      return next(ApiError.badRequest('Device already in cart'));
    }

    const cartDevice = await CartDevice.create({ deviceId, cartId: cart.id });

    res.json(cartDevice);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    const cart = await Cart.findOne({ where: { userId }, attributes: ['id'] });

    if (!cart) {
      return next(ApiError.badRequest('Cart not found'));
    }

    const cartDevices = await CartDevice.findAll({
      where: { cartId: cart.id },
      include: [{ model: Device }],
    });

    res.json(cartDevices);
  }

  async getAllIds(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    const cart = await Cart.findOne({ where: { userId }, attributes: ['id'] });

    if (!cart) {
      return next(ApiError.badRequest('Cart not found'));
    }

    const cartDevices = await CartDevice.findAll({
      where: { cartId: cart.id },
      attributes: ['deviceId'],
    });

    res.json(cartDevices);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    const { id } = req.params;
    const { deviceId } = req.body;

    const cart = await Cart.findOne({ where: { userId }, attributes: ['id'] });

    if (!cart) {
      return next(ApiError.badRequest('Cart not found'));
    }

    const result = await CartDevice.destroy({
      where: id ? { id, cartId: cart.id } : { deviceId, cartId: cart.id },
    });

    if (!result) {
      return next(ApiError.badRequest('Cart device not found'));
    }

    res.json({
      message: 'Cart device deleted',
    });
  }
}

export const cartDeviceController = new CartDeviceController();
