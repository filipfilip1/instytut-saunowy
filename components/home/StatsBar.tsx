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
    <section className="py-24 md:py-32 bg-gradient-to-br from-cream-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-cream-300 p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold-100 rounded-br-full opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-forest-100 rounded-tl-full opacity-30"></div>

            {/* Roman numeral watermark */}
            <FadeIn delay={0.1}>
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <span className="text-[20rem] font-serif font-bold text-graphite-900 select-none">
                  {EXPERIENCE_DATA.romanNumeral}
                </span>
              </div>
            </FadeIn>

            {/* Content */}
            <div className="relative z-10">
              {/* Large number with AnimatedNumber */}
              <FadeIn delay={0.2}>
                <div className="mb-6">
                  <div className="text-8xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold-600 via-warmwood-600 to-forest-600 tabular-nums inline-block">
                    <AnimatedNumber value={EXPERIENCE_DATA.years} />
                  </div>
                </div>
              </FadeIn>

              {/* Headline */}
              <FadeIn delay={0.3}>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-graphite-900 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Lat doświadczenia<br className="hidden md:block" />
                  w kształtowaniu kultury saunowej w Polsce.
                </h2>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.4}>
                <p className="text-lg md:text-xl text-graphite-600 leading-relaxed max-w-xl mx-auto italic">
                  {EXPERIENCE_DATA.description}
                </p>
              </FadeIn>

              {/* Decorative line */}
              <FadeIn delay={0.5}>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400"></div>
                  <div className="text-2xl text-gold-600">❋</div>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400"></div>
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
