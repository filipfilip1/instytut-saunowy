'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  darkMode?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false, darkMode = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b last:border-b-0 ${darkMode ? 'border-gray-700/50' : 'border-cream-200'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors group ${
          darkMode
            ? 'hover:bg-graphite-700/30'
            : 'hover:bg-cream-50'
        }`}
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-semibold transition-colors pr-4 ${
          darkMode
            ? 'text-cream-100 group-hover:text-gold-400'
            : 'text-graphite-900 group-hover:text-gold-700'
        }`}>
          {title}
        </span>
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 flex-shrink-0 ${
            darkMode ? 'text-gold-400' : 'text-gold-600'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-6 pb-5 pt-2 leading-relaxed ${
          darkMode ? 'text-cream-300' : 'text-graphite-700'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
}

export default function Accordion({ children, className = '', darkMode = false }: AccordionProps) {
  // Clone children and pass darkMode prop to each AccordionItem
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<AccordionItemProps>(child)) {
      return React.cloneElement(child, { darkMode });
    }
    return child;
  });

  return (
    <div className={`rounded-2xl overflow-hidden ${
      darkMode
        ? 'bg-graphite-800/50 border border-gray-700/50'
        : 'bg-white shadow-lg border-2 border-cream-200'
    } ${className}`}>
      {childrenWithProps}
    </div>
  );
}
