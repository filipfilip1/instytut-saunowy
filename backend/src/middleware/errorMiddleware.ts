import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import mongoose from "mongoose";

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Nie można znaleźć ${req.originalUrl} na tym serwerze`, 404);
  next(error);
};

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err } as any;
  error.message = err.message;

  // TODO: use logger in production
  console.error('Error: ', err);

  // Moongose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Nieprawidłowy format ID';
    error = new AppError(message, 404);
  }

  // Moongos duplicate key
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    const message = `Wartość pola ${field} już istnieje`;
    error = new AppError(message, 400);
  }

  // Moongose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values((err as any).errors).map(
      (e: any) => e.message
    );
    const message = errors.join('. ');
    error = new AppError(message, 400);
  }

  // Check if it's AppError
  const statusCode = (error as AppError).statusCode || 500;
  const message = error.message || 'Wewnętrzny błąd serwera';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err
    })
  });
}