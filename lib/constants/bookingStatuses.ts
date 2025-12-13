/**
 * Training Booking Status Constants
 * Single source of truth for all booking-related enums and configurations
 */

// Booking Status
export const BOOKING_STATUSES = [
  'confirmed',
  'cancelled',
  'pending_approval',
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/**
 * UI configuration for booking status badges
 */
export const BOOKING_STATUS_CONFIG: Record<
  BookingStatus,
  {
    label: string;
    color: string;
    icon: string;
    description?: string;
  }
> = {
  confirmed: {
    label: 'Potwierdzone',
    color: 'bg-forest-100 text-forest-800 border border-forest-200',
    icon: '✓',
    description: 'Rezerwacja potwierdzona',
  },
  cancelled: {
    label: 'Anulowane',
    color: 'bg-warmwood-100 text-warmwood-800 border border-warmwood-200',
    icon: '✗',
    description: 'Rezerwacja została anulowana',
  },
  pending_approval: {
    label: 'Oczekuje',
    color: 'bg-gold-100 text-gold-800 border border-gold-200',
    icon: '⏳',
    description: 'Oczekuje na zatwierdzenie',
  },
};

// Booking Payment Status
export const BOOKING_PAYMENT_STATUSES = [
  'pending',
  'paid',
  'failed',
  'refunded',
] as const;

export type BookingPaymentStatus = (typeof BOOKING_PAYMENT_STATUSES)[number];

/**
 * UI configuration for booking payment status badges
 */
export const BOOKING_PAYMENT_CONFIG: Record<
  BookingPaymentStatus,
  {
    label: string;
    color: string;
    icon: string;
    description?: string;
  }
> = {
  pending: {
    label: 'Oczekuje',
    color: 'bg-gold-100 text-gold-800 border border-gold-200',
    icon: '💳',
    description: 'Płatność oczekuje',
  },
  paid: {
    label: 'Opłacone',
    color: 'bg-forest-100 text-forest-800 border border-forest-200',
    icon: '✓',
    description: 'Płatność potwierdzona',
  },
  failed: {
    label: 'Błąd płatności',
    color: 'bg-warmwood-100 text-warmwood-800 border border-warmwood-200',
    icon: '✗',
    description: 'Płatność nie powiodła się',
  },
  refunded: {
    label: 'Zwrócone',
    color: 'bg-nordic-100 text-nordic-800 border border-nordic-200',
    icon: '↩',
    description: 'Płatność została zwrócona',
  },
};

// Booking Payment Type
export const BOOKING_PAYMENT_TYPES = ['full', 'deposit'] as const;

export type BookingPaymentType = (typeof BOOKING_PAYMENT_TYPES)[number];

/**
 * UI configuration for booking payment types
 */
export const BOOKING_PAYMENT_TYPE_CONFIG: Record<
  BookingPaymentType,
  {
    label: string;
  }
> = {
  full: {
    label: 'Pełna płatność',
  },
  deposit: {
    label: 'Zaliczka',
  },
};

// Helper Functions
/**
 * Check if a string is a valid booking status
 */
export function isValidBookingStatus(
  status: string
): status is BookingStatus {
  return BOOKING_STATUSES.includes(status as BookingStatus);
}

/**
 * Check if a string is a valid booking payment status
 */
export function isValidBookingPaymentStatus(
  status: string
): status is BookingPaymentStatus {
  return BOOKING_PAYMENT_STATUSES.includes(status as BookingPaymentStatus);
}

/**
 * Check if a string is a valid booking payment type
 */
export function isValidBookingPaymentType(
  type: string
): type is BookingPaymentType {
  return BOOKING_PAYMENT_TYPES.includes(type as BookingPaymentType);
}

/**
 * Get booking status configuration
 */
export function getBookingStatusConfig(status: BookingStatus) {
  return BOOKING_STATUS_CONFIG[status];
}

/**
 * Get booking payment status configuration
 */
export function getBookingPaymentConfig(status: BookingPaymentStatus) {
  return BOOKING_PAYMENT_CONFIG[status];
}

/**
 * Get booking payment type configuration
 */
export function getBookingPaymentTypeConfig(type: BookingPaymentType) {
  return BOOKING_PAYMENT_TYPE_CONFIG[type];
}
