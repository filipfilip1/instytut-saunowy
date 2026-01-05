'use client';

import React, { useState } from 'react';
import { ITraining } from '@/types';
import { Lock } from 'lucide-react';

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
    } catch {
      setError('Wystąpił błąd podczas przetwarzania. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  const depositAmount = training.depositAmount || training.price;
  const isDeposit = training.depositPercentage < 100;

  return (
    <div className="bg-white border border-[#2C2622]/20 rounded-lg shadow-lg shadow-[#2C2622]/5 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="p-8">
        <h3 className="font-fraunces text-2xl text-[#2C2622] mb-6">
          Zapisz się na szkolenie
        </h3>

      {/* Price Header */}
      <div className="mb-6 pb-6 border-b border-[#2C2622]/20">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-sm text-stone-500 uppercase tracking-wider">Koszt szkolenia</span>
          <span className="font-fraunces text-4xl text-[#C47F52]">
            {training.price.toLocaleString('pl-PL')} zł
          </span>
        </div>
        {isDeposit && (
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-stone-600">Wymagana wpłata ({training.depositPercentage}%)</span>
            <span className="font-semibold text-[#2C2622]">
              {depositAmount.toLocaleString('pl-PL')} zł
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
            Imię i nazwisko *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 py-3 text-base bg-white border border-[#2C2622]/20 rounded-md text-[#2C2622] placeholder:text-stone-500 focus:outline-none focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52] transition-all"
            placeholder="Jan Kowalski"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 py-3 text-base bg-white border border-[#2C2622]/20 rounded-md text-[#2C2622] placeholder:text-stone-500 focus:outline-none focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52] transition-all"
            placeholder="jan@przykład.pl"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 py-3 text-base bg-white border border-[#2C2622]/20 rounded-md text-[#2C2622] placeholder:text-stone-500 focus:outline-none focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52] transition-all"
            placeholder="+48 123 456 789"
          />
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
            Doświadczenie z sauną / Aufguss
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 text-base bg-white border border-[#2C2622]/20 rounded-md text-[#2C2622] placeholder:text-stone-500 focus:outline-none focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52] transition-all resize-none"
            placeholder="Opisz swoje doświadczenie (opcjonalnie)"
          />
        </div>

        {/* Special Requirements */}
        <div>
          <label htmlFor="specialRequirements" className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
            Uwagi specjalne
          </label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 text-base bg-white border border-[#2C2622]/20 rounded-md text-[#2C2622] placeholder:text-stone-500 focus:outline-none focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52] transition-all resize-none"
            placeholder="Alergie, dieta, inne wymagania (opcjonalnie)"
          />
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting || training.isFull}
          className="w-full bg-[#C47F52] text-white py-3.5 rounded-lg font-medium uppercase tracking-widest text-xs hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Przetwarzanie...
            </span>
          ) : training.isFull ? (
            'Brak miejsc'
          ) : (
            'Zapisz się i opłać'
          )}
        </button>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <Lock className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
          <p className="text-[10px] text-stone-500 text-center">
            Płatność przetwarzana bezpiecznie przez Stripe
          </p>
        </div>
      </form>
      </div>
    </div>
  );
}
