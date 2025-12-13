'use client';

import {
  BookingStatus,
  BookingPaymentStatus,
  BOOKING_STATUS_CONFIG,
  BOOKING_PAYMENT_CONFIG,
} from '@/lib/constants/bookingStatuses';

interface BookingStatusBadgeProps {
  bookingStatus: BookingStatus;
  paymentStatus?: BookingPaymentStatus;
  size?: 'sm' | 'md' | 'lg';
}

export default function BookingStatusBadge({
  bookingStatus,
  paymentStatus,
  size = 'md',
}: BookingStatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const statusInfo = BOOKING_STATUS_CONFIG[bookingStatus];

  return (
    <div className="flex gap-2 flex-wrap">
      <span
        className={`
          inline-flex items-center gap-1 rounded-full font-semibold
          ${statusInfo.color}
          ${sizeClasses[size]}
        `}
      >
        <span>{statusInfo.icon}</span>
        <span>{statusInfo.label}</span>
      </span>

      {paymentStatus && (
        <span
          className={`
            inline-flex items-center gap-1 rounded-full font-semibold
            ${BOOKING_PAYMENT_CONFIG[paymentStatus].color}
            ${sizeClasses[size]}
          `}
        >
          <span>{BOOKING_PAYMENT_CONFIG[paymentStatus].icon}</span>
          <span>{BOOKING_PAYMENT_CONFIG[paymentStatus].label}</span>
        </span>
      )}
    </div>
  );
}
