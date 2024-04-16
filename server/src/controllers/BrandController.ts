import { Request, Response } from 'express';
import { Brand } from '../models';

class BrandController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    res.json(brand);
  }

  async getAll(req: Request, res: Response) {
    const brands = await Brand.findAll();

    res.json(brands);
  }
}

export const brandController = new BrandController();
