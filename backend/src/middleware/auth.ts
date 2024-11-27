import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader !== 'mysecrettoken') {
    res.status(403).json({ error: 'Forbidden: Invalid Authorization Header' });
  } else {
    next();
  }
};
