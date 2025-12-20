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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name - Ghost Style */}
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Twoje imię"
          className={`w-full bg-transparent border-0 border-b-2 pb-3 text-lg focus:outline-none transition-colors ${
            errors.name
              ? 'border-warmwood-400 focus:border-warmwood-500'
              : 'border-gray-500 text-cream-100 placeholder-gray-400 focus:border-gold-400'
          }`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-warmwood-400">{errors.name}</p>
        )}
      </div>

      {/* Email - Ghost Style */}
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Twój adres e-mail"
          className={`w-full bg-transparent border-0 border-b-2 pb-3 text-lg focus:outline-none transition-colors ${
            errors.email
              ? 'border-warmwood-400 focus:border-warmwood-500'
              : 'border-gray-500 text-cream-100 placeholder-gray-400 focus:border-gold-400'
          }`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-warmwood-400">{errors.email}</p>
        )}
      </div>

      {/* Message - Ghost Style Textarea with Auto-resize */}
      <div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder="Twoja wiadomość"
          className={`w-full bg-transparent border-0 border-b-2 pb-3 text-lg focus:outline-none transition-colors resize-none ${
            errors.message
              ? 'border-warmwood-400 focus:border-warmwood-500'
              : 'border-gray-500 text-cream-100 placeholder-gray-400 focus:border-gold-400'
          }`}
          style={{
            minHeight: '150px',
          }}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-warmwood-400">{errors.message}</p>
        )}
      </div>

      {/* RODO Consent - Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="rodoConsent"
            checked={formData.rodoConsent}
            onChange={handleChange}
            className="mt-1 w-5 h-5 accent-gold-400 border-2 border-gray-500 rounded focus:ring-2 focus:ring-gold-400/50"
          />
          <span className="text-sm text-cream-300 leading-relaxed">
            Wyrażam zgodę na przetwarzanie danych osobowych w celu odpowiedzi na zapytanie. Szczegóły w{' '}
            <Link
              href="/polityka-prywatnosci"
              className="text-gold-400 hover:text-gold-300 underline transition-colors"
            >
              Polityce Prywatności
            </Link>
            .
          </span>
        </label>
        {errors.rodoConsent && (
          <p className="mt-2 text-sm text-warmwood-400">{errors.rodoConsent}</p>
        )}
      </div>

      {/* Submit Button - Solid Gold */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-warmwood-600 text-white font-semibold text-lg rounded-lg hover:from-gold-600 hover:to-warmwood-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Wysyłanie...
          </span>
        ) : (
          'Wyślij wiadomość'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Odpowiemy w ciągu 24-48 godzin roboczych
      </p>
    </form>
  );
}
