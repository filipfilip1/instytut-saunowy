'use client';

import React, { useState } from 'react';
import { IProductVariant } from '@/types';
import { formatPriceRounded, formatPriceModifier } from '@/lib/utils/currency';

interface VariantSelectorProps {
  variants: IProductVariant[];
  onChange: (selections: Record<string, string>) => void;
  basePrice: number;
}

const VariantSelector = ({
  variants,
  onChange,
  basePrice
}: VariantSelectorProps) => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleVariantChange = (variantId: string, optionId: string) => {
    const newSelections = {
      ...selections,
      [variantId]: optionId
    };
    setSelections(newSelections);
    onChange(newSelections);
  };

  const calculatePrice = () => {
    let totalPrice = basePrice;

    variants.forEach(variant => {
      const selectedOptionId = selections[variant.id];
      if (selectedOptionId) {
        const option = variant.options.find(opt => opt.id === selectedOptionId);
        if (option?.priceModifier) {
          totalPrice += option.priceModifier;
        }
      }
    });

    return totalPrice;
  };

  return (
    <div className="space-y-6">
      {variants.map(variant => (
        <div key={variant.id} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {variant.name}
          </label>

          {/* Variants as buttons (for sizes) */}
          {variant.name.toLowerCase().includes('rozmiar') ? (
            <div className="flex flex-wrap gap-2">
              {variant.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleVariantChange(variant.id, option.id)}
                  disabled={option.stock === 0}
                  className={`
                    px-4 py-2 border-2 rounded-lg font-medium transition-all
                    ${selections[variant.id] === option.id
                      ? 'border-warmwood-500 bg-warmwood-50 text-warmwood-600'
                      : 'border-gray-300 hover:border-warmwood-300 text-gray-700'
                    }
                    ${option.stock === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                    }
                  `}
                >
                  <span className="block">
                    {option.value}
                    {option.priceModifier && option.priceModifier > 0 && (
                      <span className="text-xs ml-1">
                        (+{formatPriceRounded(option.priceModifier)})
                      </span>
                    )}
                  </span>
                  {option.stock === 0 && (
                    <span className="block text-xs text-red-600 mt-1">
                      Niedostępny
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            /* Variants as picture cards (for colors/patterns) */
            <div className="grid grid-cols-3 gap-3">
              {variant.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleVariantChange(variant.id, option.id)}
                  disabled={option.stock === 0}
                  className={`
                    relative p-2 border-2 rounded-lg transition-all
                    ${selections[variant.id] === option.id
                      ? 'border-gold-400 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                    ${option.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.value}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                  )}
                  <span className="block text-sm font-medium">
                    {option.value}
                  </span>
                  {option.stock <= 5 && option.stock > 0 && (
                    <span className="text-xs text-orange-600">
                      Zostało tylko {option.stock} szt.
                    </span>
                  )}
                  {option.stock === 0 && (
                    <span className="text-xs text-red-600">
                      Niedostępny
                    </span>
                  )}
                  {selections[variant.id] === option.id && (
                    <div className="absolute top-1 right-1 bg-warmwood-500 text-white rounded-full p-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Price summary */}
      <div className="mt-6 p-4 bg-cream-100 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Cena:</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPriceRounded(calculatePrice())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;