/**
 * Order and Payment Status Constants
 * Single source of truth for all order-related enums and configurations
 */

// Order Status
export const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/**
 * UI configuration for order status badges
 */
export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    icon: string;
    description?: string;
  }
> = {
  pending: {
    label: 'Oczekujące',
    color: 'bg-gray-100 text-gray-800',
    icon: '⏳',
    description: 'Zamówienie oczekuje na realizację',
  },
  processing: {
    label: 'W realizacji',
    color: 'bg-blue-100 text-blue-800',
    icon: '🔄',
    description: 'Zamówienie jest pakowane',
  },
  shipped: {
    label: 'Wysłane',
    color: 'bg-purple-100 text-purple-800',
    icon: '📦',
    description: 'Zamówienie zostało wysłane',
  },
  delivered: {
    label: 'Dostarczone',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
    description: 'Zamówienie zostało dostarczone',
  },
  cancelled: {
    label: 'Anulowane',
    color: 'bg-red-100 text-red-800',
    icon: '❌',
    description: 'Zamówienie zostało anulowane',
  },
};

// Payment Status
export const PAYMENT_STATUSES = ['pending', 'paid', 'failed'] as const;

/**
 * TypeScript type derived from PAYMENT_STATUSES array
 */
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

/**
 * UI configuration for payment status badges
 */
export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    color: string;
    icon: string;
    description?: string;
  }
> = {
  pending: {
    label: 'Oczekuje płatności',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '💳',
    description: 'Płatność nie została jeszcze zrealizowana',
  },
  paid: {
    label: 'Opłacone',
    color: 'bg-green-100 text-green-800',
    icon: '✓',
    description: 'Płatność została potwierdzona',
  },
  failed: {
    label: 'Płatność nieudana',
    color: 'bg-red-100 text-red-800',
    icon: '✗',
    description: 'Płatność nie powiodła się',
  },
};

// Helper Functions
/**
 * Check if a string is a valid order status
 */
export function isValidOrderStatus(status: string): status is OrderStatus {
  return ORDER_STATUSES.includes(status as OrderStatus);
}

/**
 * Check if a string is a valid payment status
 */
export function isValidPaymentStatus(
  status: string
): status is PaymentStatus {
  return PAYMENT_STATUSES.includes(status as PaymentStatus);
}

/**
 * Get order status configuration
 */
export function getOrderStatusConfig(status: OrderStatus) {
  return ORDER_STATUS_CONFIG[status];
}

/**
 * Get payment status configuration
 */
export function getPaymentStatusConfig(status: PaymentStatus) {
  return PAYMENT_STATUS_CONFIG[status];
}
