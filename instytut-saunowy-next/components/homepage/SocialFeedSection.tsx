'use client';

import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function SocialFeedSection() {
  // Sample social media posts
  // In production, these would be fetched from Instagram/Facebook Graph API
  const socialPosts = [
    {
      id: 1,
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
      caption: 'Magiczna ceremonia Aufguss podczas naszego ostatniego szkolenia 🔥 #InstytutSaunowy #Aufguss',
      likes: 342,
      comments: 28,
      url: 'https://www.instagram.com/instytut_saunowy/',
    },
    {
      id: 2,
      platform: 'facebook',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
      caption: 'Wspaniała atmosfera podczas warsztatów wellness w Urle! Dziękujemy wszystkim uczestnikom 💚',
      likes: 215,
      comments: 19,
      url: 'https://www.facebook.com/instytut.saunowy',
    },
    {
      id: 3,
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
      caption: 'Nowe produkty już w sklepie! Sprawdźcie naszą kolekcję akcesoriów saunowych 🛍️',
      likes: 289,
      comments: 34,
      url: 'https://www.instagram.com/instytut_saunowy/',
    },
    {
      id: 4,
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
      caption: 'Relaks i regeneracja - to podstawy zdrowego saunowania 🌿 #Wellness #Sauna',
      likes: 198,
      comments: 15,
      url: 'https://www.instagram.com/instytut_saunowy/',
    },
    {
      id: 5,
      platform: 'facebook',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
      caption: 'Zawody Masters of Aufguss 2024 - Mateusz z pierwszym miejscem! 🏆',
      likes: 456,
      comments: 52,
      url: 'https://www.facebook.com/instytut.saunowy',
    },
    {
      id: 6,
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
      caption: 'Przygotowania do ceremonii - każdy detal ma znaczenie ✨ #AufgussMaster',
      likes: 312,
      comments: 21,
      url: 'https://www.instagram.com/instytut_saunowy/',
    },
  ];

  const platformIcons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  };

  const platformColors = {
    instagram: 'from-pink-500 via-purple-500 to-orange-500',
    facebook: 'from-blue-600 to-blue-700',
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Śledź nas w social mediach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Codziennie dzielimy się inspiracjami, poradami i relacjami z naszych wydarzeń
          </p>

          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/instytut_saunowy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              {platformIcons.instagram}
              <span>@instytut_saunowy</span>
            </a>
            <a
              href="https://www.facebook.com/instytut.saunowy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              {platformIcons.facebook}
              <span>Instytut Saunowy</span>
            </a>
          </div>
        </FadeIn>

        {/* Social Feed Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPosts.map((post, index) => (
            <StaggerItem key={post.id}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-200 hover:border-wood-400">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={post.image}
                      alt="Social media post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Platform Badge */}
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${platformColors[post.platform]} text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg`}>
                      {platformIcons[post.platform]}
                      <span className="text-xs font-semibold capitalize">{post.platform}</span>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="font-semibold">Zobacz post</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {post.caption}
                    </p>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn delay={0.6} className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            Dołącz do naszej społeczności i bądź na bieżąco z nowościami, szkoleniami i wydarzeniami!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/instytut_saunowy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-wood-500 hover:text-wood-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Obserwuj na Instagram
            </a>
            <a
              href="https://www.facebook.com/instytut.saunowy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-wood-500 hover:text-wood-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Polub na Facebook
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
