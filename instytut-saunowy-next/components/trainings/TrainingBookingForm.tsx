'use client';

import React, { useState } from 'react';
import { ITraining } from '@/types';

interface TrainingBookingFormProps {
  training: ITraining;
}

export default function TrainingBookingForm({ training }: TrainingBookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    specialRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/trainings/${training.slug}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantInfo: formData,
        }),
      });

      const data = await response.json();

      if (data.status === 'success' && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError(data.message || 'Wystąpił błąd podczas rezerwacji');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Wystąpił błąd podczas przetwarzania. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  const depositAmount = training.depositAmount || training.price;
  const isDeposit = training.depositPercentage < 100;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Zapisz się na szkolenie</h3>

      {/* Price Info */}
      <div className="bg-wood-50 border-2 border-wood-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">Koszt szkolenia:</span>
          <span className="text-2xl font-bold text-wood-600">{training.price.toLocaleString('pl-PL')} zł</span>
        </div>
        {isDeposit && (
          <div className="flex items-center justify-between pt-2 border-t border-wood-300">
            <span className="text-gray-700">Wymagana wpłata ({training.depositPercentage}%):</span>
            <span className="text-xl font-bold text-wood-700">{depositAmount.toLocaleString('pl-PL')} zł</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Imię i nazwisko *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-wood-500 focus:ring-2 focus:ring-wood-200 transition-colors"
            placeholder="Jan Kowalski"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-wood-500 focus:ring-2 focus:ring-wood-200 transition-colors"
            placeholder="jan@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-wood-500 focus:ring-2 focus:ring-wood-200 transition-colors"
            placeholder="+48 123 456 789"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
            Doświadczenie z sauną / Aufguss
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-wood-500 focus:ring-2 focus:ring-wood-200 transition-colors resize-none"
            placeholder="Opisz swoje doświadczenie (opcjonalnie)"
          />
        </div>

        <div>
          <label htmlFor="specialRequirements" className="block text-sm font-semibold text-gray-700 mb-2">
            Uwagi specjalne
          </label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-wood-500 focus:ring-2 focus:ring-wood-200 transition-colors resize-none"
            placeholder="Alergie, dieta, inne wymagania (opcjonalnie)"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || training.isFull}
          className="w-full bg-gradient-to-r from-wood-600 to-wood-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-wood-700 hover:to-wood-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Przetwarzanie...' : training.isFull ? 'Brak miejsc' : `Zapłać ${depositAmount.toLocaleString('pl-PL')} zł`}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Po kliknięciu zostaniesz przekierowany do bezpiecznej płatności Stripe
        </p>
      </form>
    </div>
  );
}
