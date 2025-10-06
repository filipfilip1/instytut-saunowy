'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct, ProductCategory } from '@/types';

interface ProductFormProps {
  product?: IProduct;
  isEdit?: boolean;
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'kilty' as ProductCategory,
    description: product?.description || '',
    basePrice: product?.basePrice || 0,
    features: product?.features || [''],
    isActive: product?.isActive ?? true
  });

  // Images state
  const [images, setImages] = useState(product?.images || [
    { id: 'img-1', url: '', alt: '', isPrimary: true }
  ]);

  // Variants state
  const [variants, setVariants] = useState(product?.variants || []);

  // Handle basic field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'basePrice' ? parseFloat(value) || 0 : value
    }));
  };

  // Handle features
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // Handle images
  const handleImageChange = (index: number, field: string, value: string | boolean) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };

    if (field === 'isPrimary' && value === true) {
      newImages.forEach((img, i) => {
        if (i !== index) img.isPrimary = false;
      });
    }

    setImages(newImages);
  };

  const addImage = () => {
    setImages(prev => [...prev, {
      id: `img-${Date.now()}`,
      url: '',
      alt: '',
      isPrimary: prev.length === 0
    }]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // Jeśli usuwamy primary, ustaw pierwszy jako primary
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    setImages(newImages);
  };

  // Handle variants
  const addVariant = () => {
    setVariants(prev => [...prev, {
      id: `var-${Date.now()}`,
      name: '',
      options: [{
        id: `opt-${Date.now()}`,
        value: '',
        priceModifier: 0,
        stock: 0
      }]
    }]);
  };

  const removeVariant = (varIndex: number) => {
    setVariants(prev => prev.filter((_, i) => i !== varIndex));
  };

  const handleVariantChange = (varIndex: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[varIndex] = { ...newVariants[varIndex], [field]: value };
    setVariants(newVariants);
  };

  const addVariantOption = (varIndex: number) => {
    const newVariants = [...variants];
    newVariants[varIndex].options.push({
      id: `opt-${Date.now()}`,
      value: '',
      priceModifier: 0,
      stock: 0
    });
    setVariants(newVariants);
  };

  const removeVariantOption = (varIndex: number, optIndex: number) => {
    const newVariants = [...variants];
    newVariants[varIndex].options = newVariants[varIndex].options.filter((_, i) => i !== optIndex);
    setVariants(newVariants);
  };

  const handleOptionChange = (varIndex: number, optIndex: number, field: string, value: any) => {
    const newVariants = [...variants];
    newVariants[varIndex].options[optIndex] = {
      ...newVariants[varIndex].options[optIndex],
      [field]: field === 'stock' || field === 'priceModifier' ? Number(value) : value
    };
    setVariants(newVariants);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Nazwa jest wymagana'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nazwa nie może przekraczać 100 znaków';
    }
    if (!formData.description) {
      newErrors.description = 'Opis jest wymagany'
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Opis nie może przekraczać 2000 znaków';
    }
    if (formData.basePrice < 0) newErrors.basePrice = 'Cena musi być większa od 0';
    if (images.filter(img => img.url).length === 0) newErrors.images = 'Dodaj przynajmniej jedno zdjęcie';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        images: images.filter(img => img.url), // Only image from URL
        variants,
        features: formData.features.filter(f => f) // Only non-empty features
      };

      const url = isEdit
        ? `/api/admin/products/${product?._id}`
        : '/api/admin/products';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Błąd podczas zapisywania produktu');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Wystąpił błąd podczas zapisywania produktu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Podstawowe informacje</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nazwa produktu *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoria *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="kilty">Kilty</option>
              <option value="poncha">Poncha</option>
              <option value="spodnie">Spodnie</option>
              <option value="bluzy">Bluzy</option>
              <option value="akcesoria">Akcesoria</option>
              <option value="zestawy">Zestawy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cena podstawowa (PLN) *
            </label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.basePrice ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="isActive"
              value={formData.isActive.toString()}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Aktywny</option>
              <option value="false">Nieaktywny</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis produktu *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Zdjęcia produktu</h2>
        {errors.images && <p className="text-red-500 text-sm mb-4">{errors.images}</p>}

        {images.map((image, index) => (
          <div key={image.id} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="URL zdjęcia"
              value={image.url}
              onChange={(e) => handleImageChange(index, 'url', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Opis alternatywny"
              value={image.alt}
              onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={image.isPrimary}
                onChange={(e) => handleImageChange(index, 'isPrimary', e.target.checked)}
                className="mr-2"
              />
              Główne
            </label>
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-red-600 hover:text-red-800"
              >
                Usuń
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addImage}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          + Dodaj zdjęcie
        </button>
      </div>

      {/* Variants */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Warianty produktu</h2>

        {variants.map((variant, varIndex) => (
          <div key={variant.id} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Nazwa wariantu (np. Rozmiar, Kolor)"
                value={variant.name}
                onChange={(e) => handleVariantChange(varIndex, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg mr-4"
              />
              <button
                type="button"
                onClick={() => removeVariant(varIndex)}
                className="text-red-600 hover:text-red-800"
              >
                Usuń wariant
              </button>
            </div>

            {/* Variant options */}
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_140px_100px_40px] gap-2 px-2 mb-1">
                <div className="text-xs font-semibold text-gray-600 uppercase">Wartość</div>
                <div className="text-xs font-semibold text-gray-600 uppercase">Modyfikator ceny (PLN)</div>
                <div className="text-xs font-semibold text-gray-600 uppercase">Stan mag.</div>
                <div></div>
              </div>

              {variant.options.map((option, optIndex) => (
                <div key={option.id} className="grid grid-cols-[1fr_140px_100px_40px] gap-2">
                  <input
                    type="text"
                    placeholder="np. M, L, XL"
                    value={option.value}
                    onChange={(e) => handleOptionChange(varIndex, optIndex, 'value', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="0"
                    value={option.priceModifier}
                    onChange={(e) => handleOptionChange(varIndex, optIndex, 'priceModifier', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="0"
                    value={option.stock}
                    onChange={(e) => handleOptionChange(varIndex, optIndex, 'stock', e.target.value)}
                    min="0"
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  {variant.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariantOption(varIndex, optIndex)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center justify-center"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addVariantOption(varIndex)}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              + Dodaj opcję
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          + Dodaj wariant
        </button>
      </div>

      {/* Product features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Cechy produktu</h2>

        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="np. 100% bawełna"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            {formData.features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-600 hover:text-red-800"
              >
                Usuń
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addFeature}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          + Dodaj cechę
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Zapisywanie...' : (isEdit ? 'Aktualizuj' : 'Dodaj produkt')}
        </button>
      </div>
    </form>
  );
}