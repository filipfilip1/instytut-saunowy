'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-wood-800 via-wood-700 to-wood-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCA2MGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTYgMTRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wIDYwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <FadeIn direction="right" className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Odkryj Pasję<br />
                <span className="text-wood-200">Saunowania</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-wood-100 max-w-2xl mx-auto lg:mx-0">
                Kompleksowe doświadczenie saunowe - od profesjonalnych szkoleń,
                przez zawody Masters of Aufguss, po wysokiej jakości odzież.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/sklep"
                  className="group bg-white text-wood-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center gap-2">
                    Zobacz Sklep
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/akademia"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-wood-800 transition-all shadow-lg"
                >
                  Poznaj Akademię
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-wood-600">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-wood-200">500+</div>
                  <div className="text-sm md:text-base text-wood-300 mt-1">Zadowolonych klientów</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-wood-200">50+</div>
                  <div className="text-sm md:text-base text-wood-300 mt-1">Przeprowadzonych szkoleń</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-wood-200">10+</div>
                  <div className="text-sm md:text-base text-wood-300 mt-1">Lat doświadczenia</div>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Right: Image/Visual */}
          <FadeIn direction="left" delay={0.3} className="hidden lg:block">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-wood-600/30 backdrop-blur-sm border-4 border-white/20 overflow-hidden shadow-2xl">
                {/* Placeholder for hero image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-wood-600/40 to-wood-800/40">
                  <div className="text-center p-8">
                    <svg className="w-32 h-32 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white/60 text-sm">Hero Image Placeholder<br/>Lifestyle sauna photo</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-wood-400/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-wood-300/20 rounded-full blur-3xl"></div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
