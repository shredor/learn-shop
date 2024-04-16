import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../error/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkRoleMiddleware =
  (role: string): RequestHandler =>
  (req, _res, next) => {
    console.log('authMiddleware');

    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(ApiError.unauthorized('Unauthorized'));
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as JwtPayload;

      if (decoded.role !== role) {
        return next(ApiError.forbidden('Forbidden'));
      }

      next();
    } catch {
      return next(ApiError.unauthorized('Unauthorized'));
    }
  };
