import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import * as uuid from 'uuid';
import { NextFunction } from 'webpack-dev-server';
import { ApiError } from '../error/ApiError';
import { Device, DeviceInfo } from '../models';

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, brandId, typeId, info: infoParam } = req.body;

      if (!req.files?.img) {
        return next(ApiError.badRequest('Image not provided'));
      }

      console.log('---------', infoParam);

      const image = req.files.img as UploadedFile;
      const fileName = `${uuid.v4()}.jpg`;
      image.mv(path.resolve(__dirname, '../..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (infoParam) {
        const info: {
          title: string;
          description: string;
        }[] = JSON.parse(infoParam);

        info.forEach(({ title, description }) =>
          DeviceInfo.create({ title, description, deviceId: device.id }),
        );
      }

      res.json(device);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';

      return next(ApiError.badRequest(message));
    }
  }

  async getAll(req: Request, res: Response) {
    const { brandId, typeId, page: pageParam = 1, limit: limitParam = 999 } = req.query;

    const page = Number(pageParam);
    const limit = Number(limitParam);
    const offset = page * limit - limit;

    const where: Record<string, string> = {};

    if (brandId) {
      where.brandId = String(brandId);
    }

    if (typeId) {
      where.typeId = String(typeId);
    }

    const devices = await Device.findAndCountAll({
      where,
      limit,
      offset,
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COALESCE(AVG(rate)::FLOAT, 0) FROM ratings WHERE "ratings"."deviceId" = "Device"."id")`,
            ),
            'avgRating',
          ],
        ],
      },
    });

    res.json(devices);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo }],
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COALESCE(AVG(rate)::FLOAT, 0) FROM ratings WHERE "ratings"."deviceId" = "Device"."id")`,
            ),
            'avgRating',
          ],
        ],
      },
    });

    res.json(device);
  }
}

export const deviceController = new DeviceController();
