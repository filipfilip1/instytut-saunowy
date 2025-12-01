import { z } from 'zod';

/**
 * Validation schema for checkout shipping address form
 * Reusable across client-side and server-side validation
 */
export const checkoutShippingSchema = z.object({
  name: z.string()
    .min(1, 'Imię i nazwisko jest wymagane')
    .min(3, 'Imię i nazwisko musi mieć co najmniej 3 znaki')
    .max(100, 'Imię i nazwisko jest zbyt długie'),

  email: z.string()
    .min(1, 'Email jest wymagany')
    .email('Nieprawidłowy format email')
    .toLowerCase(),

  phone: z.string()
    .min(1, 'Telefon jest wymagany')
    .regex(
      /^(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/,
      'Nieprawidłowy format telefonu (np. 123 456 789)'
    ),

  street: z.string()
    .min(1, 'Ulica jest wymagana')
    .min(3, 'Adres jest zbyt krótki')
    .max(200, 'Adres jest zbyt długi'),

  city: z.string()
    .min(1, 'Miasto jest wymagane')
    .min(2, 'Nazwa miasta jest zbyt krótka')
    .max(100, 'Nazwa miasta jest zbyt długa'),

  zipCode: z.string()
    .min(1, 'Kod pocztowy jest wymagany')
    .regex(/^\d{2}-\d{3}$/, 'Nieprawidłowy format kodu pocztowego (XX-XXX)'),

  country: z.string()
    .min(1, 'Kraj jest wymagany')
    .default('Polska'),
});

/**
 * Schema for checkout line items
 */
export const checkoutItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  productName: z.string().min(1, 'Product name is required'),
  variantSelections: z.record(z.string(), z.string()),
  quantity: z.number().int().positive('Quantity must be positive'),
  pricePerItem: z.number().positive('Price must be positive'),
});

/**
 * Complete checkout session creation schema
 * Used for API validation
 */
export const createCheckoutSessionSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, 'At least one item is required'),
  shippingAddress: checkoutShippingSchema,
});

// Inferred TypeScript types
export type CheckoutShippingData = z.infer<typeof checkoutShippingSchema>;
export type CheckoutItem = z.infer<typeof checkoutItemSchema>;
export type CreateCheckoutSession = z.infer<typeof createCheckoutSessionSchema>;