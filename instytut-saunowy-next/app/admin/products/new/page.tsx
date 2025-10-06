'use client';

import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dodaj nowy produkt</h1>
      <ProductForm />
    </div>
  );
}