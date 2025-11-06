'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ITraining } from '@/types';

interface TrainingFormProps {
  training?: ITraining;
  mode: 'create' | 'edit';
}

export default function TrainingForm({ training, mode }: TrainingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: training?.name || '',
    slug: training?.slug || '',
    description: training?.description || '',
    shortDescription: training?.shortDescription || '',
    date: training?.date ? new Date(training.date).toISOString().split('T')[0] : '',
    duration: training?.duration || 8,
    locationVenue: training?.location?.venue || '',
    locationAddress: training?.location?.address || '',
    locationCity: training?.location?.city || '',
    locationMapUrl: training?.location?.mapUrl || '',
    price: training?.price || 0,
    depositPercentage: training?.depositPercentage || 100,
    maxParticipants: training?.maxParticipants || 10,
    category: training?.category || 'podstawowy',
    level: training?.level || 'beginner',
    requirements: training?.requirements?.join('\n') || '',
    whatYouLearn: training?.whatYouLearn?.join('\n') || '',
    instructorName: training?.instructor?.name || 'Mateusz',
    instructorBio: training?.instructor?.bio || '',
    instructorAvatar: training?.instructor?.avatar || '',
    featuredImageUrl: training?.featuredImage?.url || '',
    featuredImageAlt: training?.featuredImage?.alt || '',
    status: training?.status || 'draft',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        date: new Date(formData.date),
        duration: Number(formData.duration),
        location: {
          venue: formData.locationVenue,
          address: formData.locationAddress,
          city: formData.locationCity,
          mapUrl: formData.locationMapUrl || undefined,
        },
        price: Number(formData.price),
        depositPercentage: Number(formData.depositPercentage),
        maxParticipants: Number(formData.maxParticipants),
        category: formData.category,
        level: formData.level,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        whatYouLearn: formData.whatYouLearn.split('\n').filter(w => w.trim()),
        instructor: {
          name: formData.instructorName,
          bio: formData.instructorBio || undefined,
          avatar: formData.instructorAvatar || undefined,
        },
        featuredImage: formData.featuredImageUrl ? {
          url: formData.featuredImageUrl,
          alt: formData.featuredImageAlt || formData.name,
        } : undefined,
        status: formData.status,
      };

      const url = mode === 'create'
        ? '/api/admin/trainings'
        : `/api/admin/trainings/${training?._id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'success') {
        router.push('/admin/trainings');
        router.refresh();
      } else {
        setError(data.message || 'Wystąpił błąd');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Wystąpił błąd podczas zapisywania');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Podstawowe informacje</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nazwa szkolenia *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Kurs Aufguss Podstawowy"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="kurs-aufguss-podstawowy-2024"
            />
            <p className="text-sm text-gray-500 mt-1">Musi być unikalny. Używaj małych liter i myślników.</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Krótki opis
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              maxLength={300}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Krótki opis widoczny na liście szkoleń"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pełny opis *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Szczegółowy opis szkolenia (może zawierać HTML)"
            />
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Harmonogram</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Czas trwania (godziny) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lokalizacja</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Miejsce *
            </label>
            <input
              type="text"
              name="locationVenue"
              value={formData.locationVenue}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Hotel Wellness & SPA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Miasto *
            </label>
            <input
              type="text"
              name="locationCity"
              value={formData.locationCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Warszawa"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adres *
            </label>
            <input
              type="text"
              name="locationAddress"
              value={formData.locationAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ul. Parkowa 25"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link do mapy (opcjonalnie)
            </label>
            <input
              type="url"
              name="locationMapUrl"
              value={formData.locationMapUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      </div>

      {/* Pricing & Capacity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ceny i miejsca</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cena (zł) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Procent wpłaty (%) *
            </label>
            <input
              type="number"
              name="depositPercentage"
              value={formData.depositPercentage}
              onChange={handleChange}
              required
              min="1"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">100 = pełna płatność</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max uczestników *
            </label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Category & Level */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategoria i poziom</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoria *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="podstawowy">Podstawowy</option>
              <option value="zaawansowany">Zaawansowany</option>
              <option value="master">Master Class</option>
              <option value="indywidualny">Indywidualny</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poziom *
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requirements & What You Learn */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wymagania i program</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wymagania (jeden na linię)
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Brak wymagań&#10;Własny ręcznik&#10;Dobra kondycja"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Czego się nauczysz * (jeden na linię)
            </label>
            <textarea
              name="whatYouLearn"
              value={formData.whatYouLearn}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Podstawy techniki ręcznika&#10;Dobór aromatów&#10;Budowanie ceremonii"
            />
          </div>
        </div>
      </div>

      {/* Instructor */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Instruktor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imię *
            </label>
            <input
              type="text"
              name="instructorName"
              value={formData.instructorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <input
              type="text"
              name="instructorBio"
              value={formData.instructorBio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Master Aufguss, certyfikowany trener"
            />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Obrazek główny</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL obrazka
            </label>
            <input
              type="url"
              name="featuredImageUrl"
              value={formData.featuredImageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt text
            </label>
            <input
              type="text"
              name="featuredImageAlt"
              value={formData.featuredImageAlt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Opis obrazka"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status publikacji</h3>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Szkic</option>
          <option value="published">Opublikowane</option>
          <option value="cancelled">Anulowane</option>
          <option value="completed">Zakończone</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz szkolenie' : 'Zapisz zmiany'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
