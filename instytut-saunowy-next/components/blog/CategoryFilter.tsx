'use client';

import { CATEGORY_LABELS } from '@/lib/models/BlogPost';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = Object.entries(CATEGORY_LABELS);

  const categoryIcons: Record<string, string> = {
    poradniki: '📚',
    trendy: '✨',
    diy: '🛠️',
    szkolenia: '🎓',
    zdrowie: '💚',
    przepisy: '🌿',
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* All button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2.5 rounded-full font-medium transition-all ${
          selectedCategory === null
            ? 'bg-wood-600 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-wood-400 hover:shadow-md'
        }`}
      >
        📖 Wszystkie
      </button>

      {/* Category buttons */}
      {categories.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            selectedCategory === key
              ? 'bg-wood-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-wood-400 hover:shadow-md'
          }`}
        >
          {categoryIcons[key]} {label}
        </button>
      ))}
    </div>
  );
}
