import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Brak dostępu
        </h1>
        <p className="text-gray-600 mb-6">
          Nie masz uprawnień do przeglądania tej strony.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
