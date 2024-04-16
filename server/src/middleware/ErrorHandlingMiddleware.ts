import { ErrorRequestHandler } from 'express';
import { ApiError } from '../error/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlingMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Unexpected error' });
};
