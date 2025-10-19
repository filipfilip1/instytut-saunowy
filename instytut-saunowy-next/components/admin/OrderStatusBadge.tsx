'use client';

import {
  OrderStatus,
  PaymentStatus,
  ORDER_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
} from '@/lib/constants/orderStatuses';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  size?: 'sm' | 'md' | 'lg';
}

export default function OrderStatusBadge({
  status,
  paymentStatus,
  size = 'md',
}: OrderStatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const statusInfo = ORDER_STATUS_CONFIG[status];

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
          ${PAYMENT_STATUS_CONFIG[paymentStatus].color}
          ${sizeClasses[size]}
        `}
        >
          <span>{PAYMENT_STATUS_CONFIG[paymentStatus].icon}</span>
          <span>{PAYMENT_STATUS_CONFIG[paymentStatus].label}</span>
        </span>
      )}
    </div>
  );
}
