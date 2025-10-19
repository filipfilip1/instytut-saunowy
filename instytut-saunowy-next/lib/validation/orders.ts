import { z } from 'zod';
import { ORDER_STATUSES, PAYMENT_STATUSES } from '@/lib/constants/orderStatuses';

/**
 * Schema for validating order query parameters in GET /api/admin/orders
 */
export const orderQuerySchema = z.object({
  // Filter by order status
  status: z
    .enum(ORDER_STATUSES)
    .optional(),

  // Filter by payment status
  paymentStatus: z
    .enum(PAYMENT_STATUSES)
    .optional(),

  // Search by email or order ID
  search: z
    .string()
    .trim()
    .optional(),

  // Sort field (prefix with - for descending)
  sortBy: z
    .string()
    .default('-createdAt'),

  // Number of items per page (1-100)
  limit: z
    .coerce
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(20),

  // Page number (1-based)
  page: z
    .coerce
    .number()
    .int()
    .min(1, 'Page must be at least 1')
    .default(1),
});

export type OrderQueryParams = z.infer<typeof orderQuerySchema>;