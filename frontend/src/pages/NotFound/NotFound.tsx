import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-4">
          Strona nie znaleziona
        </h2>
        <p className="text-gray-600 mb-8">
          Przepraszamy, ale strona której szukasz nie istnieje.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Strona główna
          </Link>
          <Link
            to="/sklep"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Przejdź do sklepu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;