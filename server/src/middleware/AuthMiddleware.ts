import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../error/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authMiddleware: RequestHandler = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(ApiError.unauthorized('Unauthorized'));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY || '');

    req.user = decoded;

    next();
  } catch {
    return next(ApiError.unauthorized('Unauthorized'));
  }
};

export const maybeAuthMiddleware: RequestHandler = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '');
    req.user = decoded;
  }

  next();
};
