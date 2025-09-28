import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors.js';
import mongoose from 'mongoose';

// Validation MongoDB ObjectId
export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(`Nieprawidłowy format ID: ${id}`);
    }

    next();
  };
};

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const validCategories = ['kilty', 'poncha', 'spodnie', 'bluzy', 'akcesoria', 'zestawy'];
  const { category } = req.params;

  if (category && !validCategories.includes(category)) {
    throw new ValidationError(`Nieprawidłowa kategoria: ${category}`);
  }

  next();
}

// Product data validation
export const validateProductData = (req: Request, res: Response, next: NextFunction) => {
  const { name, category, description, basePrice, images } = req.body;

  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Nazwa produktu jest wymagana');
  }

  if (!category) {
    errors.push('Kategoria jest wymagana');
  }

  if (!description || description.trim().length === 0) {
    errors.push('Opis produktu jest wymagany');
  }

  if (basePrice === undefined || basePrice < 0) {
    errors.push('Cena musi być liczbą nieujemną');
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    errors.push('Produkt musi mieć przynajmniej jedno zdjęcie');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  next();
}