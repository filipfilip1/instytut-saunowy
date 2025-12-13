/**
 * Training Status Constants
 * Single source of truth for all training-related enums and configurations
 */

// Training Status
export const TRAINING_STATUSES = [
  'draft',
  'published',
  'cancelled',
  'completed',
] as const;

export type TrainingStatus = (typeof TRAINING_STATUSES)[number];

/**
 * UI configuration for training status badges
 */
export const TRAINING_STATUS_CONFIG: Record<
  TrainingStatus,
  {
    label: string;
    color: string;
    icon: string;
    description?: string;
  }
> = {
  draft: {
    label: 'Szkic',
    color: 'bg-graphite-100 text-graphite-800 border border-graphite-200',
    icon: '📝',
    description: 'Szkolenie w trakcie tworzenia',
  },
  published: {
    label: 'Opublikowane',
    color: 'bg-forest-100 text-forest-800 border border-forest-200',
    icon: '✅',
    description: 'Szkolenie jest widoczne i dostępne do rezerwacji',
  },
  cancelled: {
    label: 'Anulowane',
    color: 'bg-warmwood-100 text-warmwood-800 border border-warmwood-200',
    icon: '❌',
    description: 'Szkolenie zostało anulowane',
  },
  completed: {
    label: 'Zakończone',
    color: 'bg-nordic-100 text-nordic-800 border border-nordic-200',
    icon: '🎓',
    description: 'Szkolenie się odbyło',
  },
};

// Training Categories
export const TRAINING_CATEGORIES = [
  'podstawowy',
  'zaawansowany',
  'master',
  'indywidualny',
] as const;

export type TrainingCategory = (typeof TRAINING_CATEGORIES)[number];

/**
 * UI configuration for training categories
 */
export const TRAINING_CATEGORY_CONFIG: Record<
  TrainingCategory,
  {
    label: string;
    color: string;
    description?: string;
  }
> = {
  podstawowy: {
    label: 'Podstawowy',
    color: 'bg-forest-100 text-forest-800',
    description: 'Kurs dla początkujących',
  },
  zaawansowany: {
    label: 'Zaawansowany',
    color: 'bg-nordic-100 text-nordic-800',
    description: 'Kurs dla doświadczonych',
  },
  master: {
    label: 'Master Class',
    color: 'bg-gold-100 text-gold-800',
    description: 'Ekskluzywny kurs dla mistrzów',
  },
  indywidualny: {
    label: 'Indywidualny',
    color: 'bg-warmwood-100 text-warmwood-800',
    description: 'Szkolenie 1-on-1',
  },
};

// Training Levels
export const TRAINING_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export type TrainingLevel = (typeof TRAINING_LEVELS)[number];

/**
 * UI configuration for training levels
 */
export const TRAINING_LEVEL_CONFIG: Record<
  TrainingLevel,
  {
    label: string;
    icon: string;
  }
> = {
  beginner: {
    label: 'Początkujący',
    icon: '🌱',
  },
  intermediate: {
    label: 'Średniozaawansowany',
    icon: '🌿',
  },
  advanced: {
    label: 'Zaawansowany',
    icon: '🌲',
  },
};

// Helper Functions
/**
 * Check if a string is a valid training status
 */
export function isValidTrainingStatus(
  status: string
): status is TrainingStatus {
  return TRAINING_STATUSES.includes(status as TrainingStatus);
}

/**
 * Check if a string is a valid training category
 */
export function isValidTrainingCategory(
  category: string
): category is TrainingCategory {
  return TRAINING_CATEGORIES.includes(category as TrainingCategory);
}

/**
 * Check if a string is a valid training level
 */
export function isValidTrainingLevel(level: string): level is TrainingLevel {
  return TRAINING_LEVELS.includes(level as TrainingLevel);
}

/**
 * Get training status configuration
 */
export function getTrainingStatusConfig(status: TrainingStatus) {
  return TRAINING_STATUS_CONFIG[status];
}

/**
 * Get training category configuration
 */
export function getTrainingCategoryConfig(category: TrainingCategory) {
  return TRAINING_CATEGORY_CONFIG[category];
}

/**
 * Get training level configuration
 */
export function getTrainingLevelConfig(level: TrainingLevel) {
  return TRAINING_LEVEL_CONFIG[level];
}
