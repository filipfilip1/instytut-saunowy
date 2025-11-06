import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import TrainingForm from '@/components/admin/TrainingForm';

interface PageProps {
  params: {
    id: string;
  };
}

async function getTraining(id: string): Promise<ITraining | null> {
  try {
    await dbConnect();
    const training = await Training.findById(id).lean();
    if (!training) return null;
    return JSON.parse(JSON.stringify(training));
  } catch (error) {
    console.error('Error fetching training:', error);
    return null;
  }
}

export default async function EditTrainingPage({ params }: PageProps) {
  const training = await getTraining(params.id);

  if (!training) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edytuj szkolenie</h1>
        <p className="text-gray-600 mt-1">{training.name}</p>
      </div>

      <TrainingForm training={training} mode="edit" />
    </div>
  );
}
