'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ITraining } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/useToast';
import {
  TRAINING_CATEGORIES,
  TRAINING_LEVELS,
} from '@/lib/constants/trainingStatuses';
import type {
  TrainingCategory,
  TrainingLevel,
  TrainingStatus,
} from '@/lib/constants/trainingStatuses';

interface TrainingFormProps {
  training?: ITraining;
  isEdit?: boolean;
}

export default function TrainingForm({ training, isEdit = false }: TrainingFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Form state - Basic Information
  const [formData, setFormData] = useState({
    name: training?.name || '',
    slug: training?.slug || '',
    category: training?.category || ('podstawowy' as TrainingCategory),
    level: training?.level || ('beginner' as TrainingLevel),
    description: training?.description || '',
    shortDescription: training?.shortDescription || '',
    status: training?.status || ('draft' as TrainingStatus),
  });

  // Schedule & Pricing state
  const [scheduleData, setScheduleData] = useState({
    date: training?.date ? new Date(training.date).toISOString().slice(0, 16) : '',
    duration: training?.duration || 8,
    price: training?.price || 0,
    depositPercentage: training?.depositPercentage || 100,
    maxParticipants: training?.maxParticipants || 10,
  });

  // Location state
  const [location, setLocation] = useState({
    venue: training?.location?.venue || '',
    address: training?.location?.address || '',
    city: training?.location?.city || '',
    mapUrl: training?.location?.mapUrl || '',
  });

  // Instructor state
  const [instructor, setInstructor] = useState({
    name: training?.instructor?.name || '',
    bio: training?.instructor?.bio || '',
    avatar: training?.instructor?.avatar || '',
  });

  // Images state
  const [featuredImage, setFeaturedImage] = useState({
    url: training?.featuredImage?.url || '',
    alt: training?.featuredImage?.alt || '',
  });

  const [images, setImages] = useState<Array<{ url: string; alt: string }>>(
    training?.images?.map(img => ({ url: img.url, alt: img.alt || '' })) || []
  );

  // Dynamic arrays state
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>(
    training?.whatYouLearn || ['']
  );

  const [requirements, setRequirements] = useState<string[]>(
    training?.requirements || []
  );

  const [agenda, setAgenda] = useState<Array<{ time: string; title: string; description: string }>>(
    training?.agenda || []
  );

  // SEO state
  const [seo, setSeo] = useState({
    metaTitle: training?.seo?.metaTitle || '',
    metaDescription: training?.seo?.metaDescription || '',
    keywords: training?.seo?.keywords?.join(', ') || '',
  });

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ł/g, 'l')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź|ż/g, 'z')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Handle basic field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({
      ...prev,
      [name]: ['duration', 'price', 'depositPercentage', 'maxParticipants'].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeo((prev) => ({ ...prev, [name]: value }));
  };

  // whatYouLearn handlers
  const handleWhatYouLearnChange = (index: number, value: string) => {
    const newItems = [...whatYouLearn];
    newItems[index] = value;
    setWhatYouLearn(newItems);
  };

  const addWhatYouLearnItem = () => {
    setWhatYouLearn((prev) => [...prev, '']);
  };

  const removeWhatYouLearnItem = (index: number) => {
    setWhatYouLearn((prev) => prev.filter((_, i) => i !== index));
  };

  // Requirements handlers
  const handleRequirementChange = (index: number, value: string) => {
    const newItems = [...requirements];
    newItems[index] = value;
    setRequirements(newItems);
  };

  const addRequirement = () => {
    setRequirements((prev) => [...prev, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  // Agenda handlers
  const handleAgendaChange = (
    index: number,
    field: 'time' | 'title' | 'description',
    value: string
  ) => {
    const newAgenda = [...agenda];
    newAgenda[index] = { ...newAgenda[index], [field]: value };
    setAgenda(newAgenda);
  };

  const addAgendaItem = () => {
    setAgenda((prev) => [...prev, { time: '', title: '', description: '' }]);
  };

  const removeAgendaItem = (index: number) => {
    setAgenda((prev) => prev.filter((_, i) => i !== index));
  };

  // Gallery images handlers
  const addGalleryImage = () => {
    setImages((prev) => [...prev, { url: '', alt: '' }]);
  };

  const removeGalleryImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGalleryImageChange = (index: number, field: 'url' | 'alt', value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    setImages(newImages);
  };

  // Validation
  const validateForm = (status: TrainingStatus) => {
    const newErrors: Record<string, string> = {};

    // Always validate basic fields
    if (!formData.name) {
      newErrors.name = 'Nazwa szkolenia jest wymagana';
    } else if (formData.name.length > 200) {
      newErrors.name = 'Nazwa nie może przekraczać 200 znaków';
    }

    if (!formData.slug) {
      newErrors.slug = 'Slug jest wymagany';
    }

    // Additional validation for published trainings
    if (status === 'published') {
      if (!formData.description || formData.description.length < 10) {
        newErrors.description = 'Opis musi mieć przynajmniej 10 znaków';
      }

      if (!scheduleData.date) {
        newErrors.date = 'Data szkolenia jest wymagana';
      }

      if (!scheduleData.duration || scheduleData.duration < 1) {
        newErrors.duration = 'Czas trwania musi wynosić przynajmniej 1 godzinę';
      }

      if (scheduleData.price < 0) {
        newErrors.price = 'Cena nie może być ujemna';
      }

      if (!scheduleData.maxParticipants || scheduleData.maxParticipants < 1) {
        newErrors.maxParticipants = 'Maksymalna liczba uczestników musi być większa od 0';
      }

      if (!location.venue) {
        newErrors.venue = 'Miejsce szkolenia jest wymagane';
      }

      if (!location.address) {
        newErrors.address = 'Adres jest wymagany';
      }

      if (!location.city) {
        newErrors.city = 'Miasto jest wymagane';
      }

      if (!instructor.name) {
        newErrors.instructorName = 'Nazwa instruktora jest wymagana';
      }

      const validWhatYouLearn = whatYouLearn.filter((item) => item.trim());
      if (validWhatYouLearn.length === 0) {
        newErrors.whatYouLearn = 'Dodaj przynajmniej jedną rzecz do "Czego się nauczysz"';
      }

      if (!featuredImage.url) {
        newErrors.featuredImage = 'Zdjęcie główne jest wymagane';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, submitStatus?: TrainingStatus) => {
    e.preventDefault();

    const statusToSubmit = submitStatus || formData.status;

    if (!validateForm(statusToSubmit)) {
      toast.error('Uzupełnij wszystkie wymagane pola');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        status: statusToSubmit,
        ...scheduleData,
        date: scheduleData.date ? new Date(scheduleData.date) : null,
        location,
        instructor,
        featuredImage,
        images: images.filter((img) => img.url),
        whatYouLearn: whatYouLearn.filter((item) => item.trim()),
        requirements: requirements.filter((item) => item.trim()),
        agenda: agenda.filter((item) => item.time && item.title),
        seo: {
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          keywords: seo.keywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
        },
      } as const;

      const url = isEdit ? `/api/admin/trainings/${training?._id}` : '/api/admin/trainings';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Błąd podczas zapisywania szkolenia');
      }

      setSuccess(true);
      toast.success(
        statusToSubmit === 'published'
          ? 'Szkolenie zostało opublikowane'
          : 'Szkolenie zostało zapisane'
      );

      setTimeout(() => {
        router.push('/admin/trainings');
        router.refresh();
      }, 1500);
    } catch (error: unknown) {
      console.error('Error saving training:', error);
      const message = error instanceof Error ? error.message : 'Wystąpił błąd podczas zapisywania szkolenia';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success message */}
      {success && (
        <div className="bg-forest-100 border-2 border-forest-300 text-forest-800 px-4 py-3 rounded-2xl">
          ✅ Szkolenie zostało {isEdit ? 'zaktualizowane' : 'utworzone'} pomyślnie!
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
          Podstawowe informacje
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Nazwa szkolenia *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.name ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="np. Kurs Aufguss Podstawowy"
            />
            {errors.name && <p className="text-warmwood-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.slug ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="kurs-aufguss-podstawowy"
            />
            {errors.slug && <p className="text-warmwood-600 text-sm mt-1">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-graphite-700 mb-2">
                Kategoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                {TRAINING_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-graphite-700 mb-2">
                Poziom *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                {TRAINING_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level === 'beginner'
                      ? 'Początkujący'
                      : level === 'intermediate'
                      ? 'Średniozaawansowany'
                      : 'Zaawansowany'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Krótki opis
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Krótkie podsumowanie szkolenia (max 300 znaków)"
              maxLength={300}
            />
            <p className="text-xs text-graphite-500 mt-1">
              {formData.shortDescription.length}/300 znaków
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Opis *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.description ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="Szczegółowy opis szkolenia..."
            />
            {errors.description && (
              <p className="text-warmwood-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <option value="draft">Szkic</option>
              <option value="published">Opublikowane</option>
              <option value="cancelled">Anulowane</option>
              <option value="completed">Zakończone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule & Pricing */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
          Termin i ceny
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Data *</label>
            <input
              type="datetime-local"
              name="date"
              value={scheduleData.date}
              onChange={handleScheduleChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.date ? 'border-warmwood-500' : 'border-cream-300'
              }`}
            />
            {errors.date && <p className="text-warmwood-600 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Czas trwania (godziny) *
            </label>
            <input
              type="number"
              name="duration"
              value={scheduleData.duration}
              onChange={handleScheduleChange}
              min="1"
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.duration ? 'border-warmwood-500' : 'border-cream-300'
              }`}
            />
            {errors.duration && <p className="text-warmwood-600 text-sm mt-1">{errors.duration}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Cena (PLN) *
            </label>
            <input
              type="number"
              name="price"
              value={scheduleData.price}
              onChange={handleScheduleChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.price ? 'border-warmwood-500' : 'border-cream-300'
              }`}
            />
            {errors.price && <p className="text-warmwood-600 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Zaliczka (%) *
            </label>
            <input
              type="number"
              name="depositPercentage"
              value={scheduleData.depositPercentage}
              onChange={handleScheduleChange}
              min="1"
              max="100"
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <p className="text-xs text-graphite-500 mt-1">100% = pełna płatność z góry</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Maksymalna liczba uczestników *
            </label>
            <input
              type="number"
              name="maxParticipants"
              value={scheduleData.maxParticipants}
              onChange={handleScheduleChange}
              min="1"
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.maxParticipants ? 'border-warmwood-500' : 'border-cream-300'
              }`}
            />
            {errors.maxParticipants && (
              <p className="text-warmwood-600 text-sm mt-1">{errors.maxParticipants}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">Lokalizacja</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Miejsce *</label>
            <input
              type="text"
              name="venue"
              value={location.venue}
              onChange={handleLocationChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.venue ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="np. Hotel Wellness & SPA"
            />
            {errors.venue && <p className="text-warmwood-600 text-sm mt-1">{errors.venue}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Adres *</label>
            <input
              type="text"
              name="address"
              value={location.address}
              onChange={handleLocationChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.address ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="np. ul. Parkowa 25"
            />
            {errors.address && <p className="text-warmwood-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">Miasto *</label>
            <input
              type="text"
              name="city"
              value={location.city}
              onChange={handleLocationChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.city ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="np. Warszawa"
            />
            {errors.city && <p className="text-warmwood-600 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Link do mapy (opcjonalnie)
            </label>
            <input
              type="url"
              name="mapUrl"
              value={location.mapUrl}
              onChange={handleLocationChange}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      </div>

      {/* What You Learn */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
          Czego się nauczysz *
        </h2>

        <div className="space-y-3">
          {whatYouLearn.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleWhatYouLearnChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="np. Podstawy techniki machania ręcznikiem"
              />
              {whatYouLearn.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWhatYouLearnItem(index)}
                  className="px-3 py-2 bg-warmwood-100 text-warmwood-700 rounded-xl hover:bg-warmwood-200 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {errors.whatYouLearn && (
          <p className="text-warmwood-600 text-sm mt-2">{errors.whatYouLearn}</p>
        )}

        <button
          type="button"
          onClick={addWhatYouLearnItem}
          className="mt-4 px-4 py-2 bg-gold-100 text-gold-800 rounded-xl hover:bg-gold-200 transition-colors font-semibold"
        >
          + Dodaj pozycję
        </button>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
          Wymagania (opcjonalnie)
        </h2>

        <div className="space-y-3">
          {requirements.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="np. Brak wymagań - kurs dla początkujących"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="px-3 py-2 bg-warmwood-100 text-warmwood-700 rounded-xl hover:bg-warmwood-200 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRequirement}
          className="mt-4 px-4 py-2 bg-gold-100 text-gold-800 rounded-xl hover:bg-gold-200 transition-colors font-semibold"
        >
          + Dodaj wymaganie
        </button>
      </div>

      {/* Agenda */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
          Plan zajęć (opcjonalnie)
        </h2>

        <div className="space-y-4">
          {agenda.map((item, index) => (
            <div key={index} className="p-4 bg-cream-100 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => handleAgendaChange(index, 'time', e.target.value)}
                  className="px-3 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                  placeholder="Czas (np. 09:00-10:30)"
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleAgendaChange(index, 'title', e.target.value)}
                  className="md:col-span-2 px-3 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                  placeholder="Tytuł aktywności"
                />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => handleAgendaChange(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="Opis aktywności"
              />
              <button
                type="button"
                onClick={() => removeAgendaItem(index)}
                className="mt-2 px-3 py-1 text-sm bg-warmwood-100 text-warmwood-700 rounded-lg hover:bg-warmwood-200 transition-colors"
              >
                ✕ Usuń
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addAgendaItem}
          className="mt-4 px-4 py-2 bg-gold-100 text-gold-800 rounded-xl hover:bg-gold-200 transition-colors font-semibold"
        >
          + Dodaj pozycję programu
        </button>
      </div>

      {/* Instructor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">Instruktor</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Imię i nazwisko *
            </label>
            <input
              type="text"
              name="name"
              value={instructor.name}
              onChange={handleInstructorChange}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                errors.instructorName ? 'border-warmwood-500' : 'border-cream-300'
              }`}
              placeholder="np. Mateusz Kowalski"
            />
            {errors.instructorName && (
              <p className="text-warmwood-600 text-sm mt-1">{errors.instructorName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Bio (opcjonalnie)
            </label>
            <textarea
              name="bio"
              value={instructor.bio}
              onChange={handleInstructorChange}
              rows={4}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Krótki opis instruktora..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Zdjęcie instruktora (opcjonalnie)
            </label>
            <ImageUpload
              value={instructor.avatar}
              onChange={(url) => setInstructor((prev) => ({ ...prev, avatar: url }))}
              label="Wybierz zdjęcie"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">Zdjęcia</h2>

        <div className="space-y-6">
          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Zdjęcie główne *
            </label>
            <ImageUpload
              value={featuredImage.url}
              onChange={(url) => setFeaturedImage((prev) => ({ ...prev, url }))}
              label="Wybierz zdjęcie główne"
            />
            <input
              type="text"
              value={featuredImage.alt}
              onChange={(e) => setFeaturedImage((prev) => ({ ...prev, alt: e.target.value }))}
              className="mt-2 w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Tekst alternatywny (ALT)"
            />
            {errors.featuredImage && (
              <p className="text-warmwood-600 text-sm mt-1">{errors.featuredImage}</p>
            )}
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Galeria (maksymalnie 6 zdjęć)
            </label>
            <div className="space-y-3">
              {images.map((img, index) => (
                <div key={index} className="p-4 bg-cream-100 rounded-xl">
                  <ImageUpload
                    value={img.url}
                    onChange={(url) => handleGalleryImageChange(index, 'url', url)}
                    label={`Zdjęcie ${index + 1}`}
                  />
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => handleGalleryImageChange(index, 'alt', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                    placeholder="Tekst alternatywny"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="mt-2 px-3 py-1 text-sm bg-warmwood-100 text-warmwood-700 rounded-lg hover:bg-warmwood-200 transition-colors"
                  >
                    ✕ Usuń
                  </button>
                </div>
              ))}
            </div>

            {images.length < 6 && (
              <button
                type="button"
                onClick={addGalleryImage}
                className="mt-4 px-4 py-2 bg-gold-100 text-gold-800 rounded-xl hover:bg-gold-200 transition-colors font-semibold"
              >
                + Dodaj zdjęcie do galerii
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
          SEO (opcjonalnie)
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={seo.metaTitle}
              onChange={handleSeoChange}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Tytuł dla wyszukiwarek (max 60 znaków)"
              maxLength={60}
            />
            <p className="text-xs text-graphite-500 mt-1">{seo.metaTitle.length}/60 znaków</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={seo.metaDescription}
              onChange={handleSeoChange}
              rows={3}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Opis dla wyszukiwarek (max 160 znaków)"
              maxLength={160}
            />
            <p className="text-xs text-graphite-500 mt-1">
              {seo.metaDescription.length}/160 znaków
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Keywords (oddzielone przecinkami)
            </label>
            <input
              type="text"
              name="keywords"
              value={seo.keywords}
              onChange={handleSeoChange}
              className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="aufguss, szkolenie, sauna, ceremonia"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/trainings')}
          className="px-6 py-3 bg-graphite-200 text-graphite-800 rounded-xl hover:bg-graphite-300 transition-colors font-semibold"
          disabled={loading}
        >
          Anuluj
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'draft')}
          className="px-6 py-3 bg-cream-200 text-graphite-800 rounded-xl hover:bg-cream-300 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? 'Zapisywanie...' : 'Zapisz jako szkic'}
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'published')}
          className="px-6 py-3 bg-gradient-to-r from-forest-500 to-forest-600 text-white rounded-xl hover:from-forest-600 hover:to-forest-700 transition-all shadow-lg font-semibold"
          disabled={loading}
        >
          {loading ? 'Publikowanie...' : isEdit ? 'Zaktualizuj i opublikuj' : 'Opublikuj'}
        </button>
      </div>
    </form>
  );
}
