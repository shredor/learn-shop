import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Basket, User } from '../models';

function generateJwt({ id, role, email }: { id: number; role: string; email: string }) {
  return jwt.sign({ id, role, email }, process.env.SECRET_KEY || '', {
    expiresIn: '24h',
  });
}

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'));
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.badRequest('User with this email already exists'));
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, role, password: hashPassword });
    await Basket.create({ userId: user.id });
    const token = generateJwt({ id: user.id, role: user.role, email: user.email });

    res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return next(ApiError.badRequest('Incorrect password'));
    }

    const token = generateJwt({ id: user.id, role: user.role, email: user.email });

    res.json({ token });
  }

  async check(req: Request, res: Response) {
    const user = req.user;

    if (!user) return res.json({});

    const token = generateJwt({ id: user.id, role: user.role, email: user.email });

    return res.json({ token });
  }
}

export const userController = new UserController();
