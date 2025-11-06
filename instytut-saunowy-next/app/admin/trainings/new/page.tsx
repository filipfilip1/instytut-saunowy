import React from 'react';
import TrainingForm from '@/components/admin/TrainingForm';

export default function NewTrainingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dodaj nowe szkolenie</h1>
        <p className="text-gray-600 mt-1">Uzupełnij wszystkie informacje o szkoleniu</p>
      </div>

      <TrainingForm mode="create" />
    </div>
  );
}
