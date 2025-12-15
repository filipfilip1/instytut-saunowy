'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b-2 border-cream-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cream-50 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-graphite-900 group-hover:text-gold-700 transition-colors pr-4">
          {title}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-gold-600 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-2 text-graphite-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({ children, className = '' }: AccordionProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 border-cream-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
