'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IProductVariant } from '@/types';
import { formatPriceExact } from '@/lib/utils/currency';

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

  return (
    <div className="space-y-6">
      {variants.map(variant => (
        <div key={variant.id} className="space-y-3">
          <label className="block text-xs font-bold text-[#2C2622] uppercase tracking-widest">
            {variant.name}
          </label>

          {/* Variants as buttons (for sizes) */}
          {variant.name.toLowerCase().includes('rozmiar') ? (
            <div className="flex flex-wrap gap-3">
              {variant.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleVariantChange(variant.id, option.id)}
                  disabled={option.stock === 0}
                  className={`
                    px-4 py-2 border rounded-sm font-medium transition-all uppercase tracking-wider text-sm
                    ${selections[variant.id] === option.id
                      ? 'bg-[#2C2622] text-[#F0ECE2] border-[#2C2622]'
                      : 'border-stone-300 text-[#2C2622] hover:bg-[#2C2622]/10'
                    }
                    ${option.stock === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                    }
                  `}
                >
                  <span className="block">
                    {option.value}
                    {(option.priceModifier ?? 0) > 0 && (
                      <span className="text-xs ml-1">
                        (+{formatPriceExact(option.priceModifier ?? 0)})
                      </span>
                    )}
                  </span>
                  {option.stock === 0 && (
                    <span className="block text-xs text-[#C47F52]/60 mt-1 normal-case tracking-normal">
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
                    relative p-2 border rounded-sm transition-all
                    ${selections[variant.id] === option.id
                      ? 'border-[#2C2622] ring-2 ring-[#2C2622]/30'
                      : 'border-stone-300 hover:border-[#C47F52]/50'
                    }
                    ${option.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {option.image && (
                    <div className="relative w-full h-20 mb-2">
                      <Image
                        src={option.image}
                        alt={option.value}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                  )}
                  <span className="block text-sm font-medium text-[#2C2622]">
                    {option.value}
                  </span>
                  {option.stock <= 5 && option.stock > 0 && (
                    <span className="text-xs text-[#C47F52]/70">
                      Zostało tylko {option.stock} szt.
                    </span>
                  )}
                  {option.stock === 0 && (
                    <span className="text-xs text-stone-400">
                      Niedostępny
                    </span>
                  )}
                  {selections[variant.id] === option.id && (
                    <div className="absolute top-1 right-1 bg-[#C47F52] text-white rounded-full p-1">
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
    </div>
  );
};

export default VariantSelector;
