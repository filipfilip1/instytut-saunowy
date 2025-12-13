'use client';

import {
  TrainingStatus,
  TRAINING_STATUS_CONFIG,
} from '@/lib/constants/trainingStatuses';

interface TrainingStatusBadgeProps {
  status: TrainingStatus;
  size?: 'sm' | 'md' | 'lg';
}

export default function TrainingStatusBadge({
  status,
  size = 'md',
}: TrainingStatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const statusInfo = TRAINING_STATUS_CONFIG[status];

  return (
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
  );
}
