'use client';

import React from 'react';
import { EXPERIENCE_DATA } from '@/lib/constants/homeStats';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';

/**
 * ExperienceBlock Component
 * Section 4 of homepage: Experience Statement
 * Displays years of experience as elegant, centered block
 */
const ExperienceBlock: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <div className="p-12 md:p-16 text-center relative">
            {/* Roman numeral watermark - directly on background */}
            <FadeIn delay={0.1}>
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <span className="text-[20rem] font-serif font-bold text-copper select-none">
                  {EXPERIENCE_DATA.romanNumeral}
                </span>
              </div>
            </FadeIn>

            {/* Content */}
            <div className="relative z-10">
              {/* Large number with AnimatedNumber */}
              <FadeIn delay={0.2}>
                <div className="mb-6">
                  <div className="text-8xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-copper via-copper-800 to-wood tabular-nums inline-block">
                    <AnimatedNumber value={EXPERIENCE_DATA.years} />
                  </div>
                </div>
              </FadeIn>

              {/* Headline */}
              <FadeIn delay={0.3}>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-wood mb-6 max-w-2xl mx-auto leading-relaxed">
                  Lat doświadczenia<br className="hidden md:block" />
                  w kształtowaniu kultury saunowej w Polsce.
                </h2>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.4}>
                <p className="text-lg md:text-xl text-wood/70 leading-relaxed max-w-xl mx-auto italic font-light">
                  {EXPERIENCE_DATA.description}
                </p>
              </FadeIn>

              {/* Decorative line */}
              <FadeIn delay={0.5}>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-copper"></div>
                  <div className="text-2xl text-copper">❋</div>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-copper"></div>
                </div>
              </FadeIn>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
};

export default ExperienceBlock;
