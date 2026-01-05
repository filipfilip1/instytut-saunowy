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
    <div className={`border-b ${darkMode ? 'border-[#F0ECE2]/10' : 'border-cream-200'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-4 md:py-6 flex items-center justify-between text-left transition-colors group min-h-[56px] ${
          darkMode
            ? 'hover:opacity-80'
            : 'hover:opacity-80'
        }`}
        aria-expanded={isOpen}
      >
        <span className={`text-base md:text-lg font-serif transition-colors pr-4 ${
          darkMode
            ? 'text-[#F0ECE2] group-hover:text-[#C47F52]'
            : 'text-graphite-900 group-hover:text-[#C47F52]'
        }`}>
          {title}
        </span>
        <ChevronDown
          className={`w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 flex-shrink-0 ${
            darkMode ? 'text-[#C47F52]' : 'text-[#C47F52]'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`pb-4 md:pb-6 pt-2 leading-relaxed font-sans ${
          darkMode ? 'text-stone-400' : 'text-graphite-700'
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
    <div className={`${className}`}>
      {childrenWithProps}
    </div>
  );
}
