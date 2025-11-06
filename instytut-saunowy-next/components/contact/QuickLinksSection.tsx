'use client';

import React from 'react';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import FadeIn from '@/components/animations/FadeIn';

export default function QuickLinksSection() {
  const quickLinks = [
    {
      icon: '🎓',
      title: 'Szkolenia',
      description: 'Zapytaj o nasze kursy Aufguss',
      href: '/kontakt?subject=training',
    },
    {
      icon: '🛍️',
      title: 'Sklep',
      description: 'Pytania o produkty i zamówienia',
      href: '/kontakt?subject=shop',
    },
    {
      icon: '🏆',
      title: 'Zawody MoA',
      description: 'Informacje o udziale w zawodach',
      href: '/kontakt?subject=moa',
    },
    {
      icon: '🤝',
      title: 'Współpraca',
      description: 'Projekty dla SPA i wellness',
      href: '/kontakt?subject=partnership',
    },
  ];

  const handleClick = (href: string) => {
    // Scroll to form section
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Czym możemy Ci pomóc?
          </h2>
          <p className="text-lg text-gray-600">
            Wybierz temat kontaktu
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <StaggerItem key={index}>
              <button
                onClick={() => handleClick(link.href)}
                className="w-full text-left bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-wood-400 transition-all group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-wood-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {link.description}
                </p>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
