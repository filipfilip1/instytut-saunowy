'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  rodoConsent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  rodoConsent?: string;
}

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'Ogólne pytanie' },
  { value: 'training', label: 'Pytanie o szkolenie' },
  { value: 'product', label: 'Pytanie o produkt' },
  { value: 'cooperation', label: 'Współpraca' },
];

export default function ContactForm() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    rodoConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko są wymagane';
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
          phone: formData.phone || undefined,
          subject: SUBJECT_OPTIONS.find((opt) => opt.value === formData.subject)?.label || formData.subject,
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
        phone: '',
        subject: 'general',
        message: '',
        rodoConsent: false,
      });
      setErrors({});
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast.error(error.message || 'Nie udało się wysłać wiadomości. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-graphite-700 mb-2">
          Imię i nazwisko <span className="text-warmwood-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? 'border-warmwood-400 focus:ring-warmwood-400'
              : 'border-cream-300 focus:ring-gold-400'
          }`}
          placeholder="Jan Kowalski"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-warmwood-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-graphite-700 mb-2">
          Email <span className="text-warmwood-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? 'border-warmwood-400 focus:ring-warmwood-400'
              : 'border-cream-300 focus:ring-gold-400'
          }`}
          placeholder="jan@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-warmwood-600">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-graphite-700 mb-2">
          Telefon <span className="text-graphite-400">(opcjonalnie)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all"
          placeholder="+48 123 456 789"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-graphite-700 mb-2">
          Temat <span className="text-warmwood-600">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all bg-white"
        >
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-graphite-700 mb-2">
          Wiadomość <span className="text-warmwood-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message
              ? 'border-warmwood-400 focus:ring-warmwood-400'
              : 'border-cream-300 focus:ring-gold-400'
          }`}
          placeholder="Opisz, w czym możemy Ci pomóc..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-warmwood-600">{errors.message}</p>
        )}
      </div>

      {/* RODO Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="rodoConsent"
            checked={formData.rodoConsent}
            onChange={handleChange}
            className="mt-1 w-5 h-5 text-gold-600 border-2 border-cream-300 rounded focus:ring-2 focus:ring-gold-400"
          />
          <span className="text-sm text-graphite-700 leading-relaxed">
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi
            na przesłane zapytanie zgodnie z{' '}
            <a href="/polityka-prywatnosci" className="text-nordic-600 hover:text-nordic-800 underline">
              polityką prywatności
            </a>
            . <span className="text-warmwood-600">*</span>
          </span>
        </label>
        {errors.rodoConsent && (
          <p className="mt-2 text-sm text-warmwood-600">{errors.rodoConsent}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Wysyłanie...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Wyślij wiadomość
          </>
        )}
      </button>

      <p className="text-xs text-graphite-500 text-center">
        Odpowiemy w ciągu 24-48 godzin roboczych
      </p>
    </form>
  );
}
