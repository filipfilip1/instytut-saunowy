import TrainingForm from '@/components/admin/TrainingForm';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTraining(id: string): Promise<ITraining | null> {
  await dbConnect();
  const training = await Training.findById(id).lean();
  return training ? JSON.parse(JSON.stringify(training)) : null;
}

export default async function EditTrainingPage({ params }: PageProps) {
  const { id } = await params;
  const training = await getTraining(id);

  if (!training) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-graphite-900">Edytuj szkolenie</h1>
        <p className="text-graphite-600 mt-1">{training.name}</p>
      </div>

      <TrainingForm training={training} isEdit />
    </div>
  );
}
