'use client';

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-20 h-20 text-2xl',
};

/**
 * Get initials from a name (max 2 characters)
 */
function getInitials(name?: string | null): string {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Avatar component with image fallback to initials
 */
export default function Avatar({ src, name, size = 'sm', className = '' }: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`${sizeClass} rounded-full object-cover ${className}`}
      />
    );
  }

  // Fallback: show initials on warm background
  const initials = getInitials(name);

  return (
    <div
      className={`${sizeClass} rounded-full bg-warmwood-500 text-cream-100 flex items-center justify-center font-medium ${className}`}
      aria-label={name || 'Avatar'}
    >
      {initials}
    </div>
  );
}
