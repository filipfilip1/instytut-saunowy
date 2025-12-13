import TrainingForm from '@/components/admin/TrainingForm';

export default function NewTrainingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-graphite-900">Nowe szkolenie</h1>
        <p className="text-graphite-600 mt-1">Dodaj nowe szkolenie Aufguss</p>
      </div>

      <TrainingForm />
    </div>
  );
}
