'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  message: string;
  rodoConsent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  rodoConsent?: string;
}

export default function ContactForm() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    rodoConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj poprawny adres email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Wiadomość powinna mieć minimum 10 znaków';
    }

    if (!formData.rodoConsent) {
      newErrors.rodoConsent = 'Musisz wyrazić zgodę na przetwarzanie danych';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Popraw błędy w formularzu');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Kontakt ze strony',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Wystąpił błąd');
      }

      toast.success('Wiadomość została wysłana! Odpowiemy w ciągu 24-48 godzin.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        rodoConsent: false,
      });
      setErrors({});
    } catch (error: unknown) {
      console.error('Contact form error:', error);
      const message = error instanceof Error ? error.message : 'Nie udało się wysłać wiadomości. Spróbuj ponownie.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name - Solid & Clear */}
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
          placeholder="Jan Kowalski"
          className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
            errors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
          } focus:outline-none`}
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1.5">{errors.name}</p>
        )}
      </div>

      {/* Email - Solid & Clear */}
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
          placeholder="jan@przykład.pl"
          className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
            errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
          } focus:outline-none`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1.5">{errors.email}</p>
        )}
      </div>

      {/* Message - Solid & Clear Textarea */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
          Wiadomość *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder="Opisz swoje pytanie lub projekt..."
          className={`w-full min-h-[120px] px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all resize-none ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
          } focus:outline-none`}
        />
        {errors.message && (
          <p className="text-red-600 text-xs mt-1.5">{errors.message}</p>
        )}
      </div>

      {/* RODO Consent - Custom Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="rodoConsent"
            checked={formData.rodoConsent}
            onChange={handleChange}
            className="mt-1 w-5 h-5 accent-[#C47F52] border-2 border-[#C47F52] rounded focus:ring-2 focus:ring-[#C47F52]/30"
          />
          <span className="text-xs text-stone-500 leading-relaxed">
            Wyrażam zgodę na przetwarzanie danych osobowych w celu odpowiedzi na zapytanie. Szczegóły w{' '}
            <Link
              href="/polityka-prywatnosci"
              className="text-[#C47F52] hover:text-[#2C2622] underline transition-colors"
            >
              Polityce Prywatności
            </Link>
            .
          </span>
        </label>
        {errors.rodoConsent && (
          <p className="mt-2 text-sm text-red-600">{errors.rodoConsent}</p>
        )}
      </div>

      {/* Submit Button - Copper */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C47F52] text-white py-3.5 rounded-lg font-medium uppercase tracking-widest text-xs hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            Wysyłanie...
          </span>
        ) : (
          'Wyślij wiadomość'
        )}
      </button>

      <p className="text-[10px] text-stone-500 text-center pt-2">
        Odpowiemy w ciągu 24-48 godzin roboczych
      </p>
    </form>
  );
}
