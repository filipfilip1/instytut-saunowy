import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, ProductCategory } from '../types/Product';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';

const categoryIcons: Record<ProductCategory, string> = {
  'kilty': '🏴',
  'poncha': '🧥',
  'spodnie': '👖',
  'bluzy': '👕',
  'akcesoria': '🎁',
  'zestawy': '📦'
};

const categoryDescriptions: Record<ProductCategory, string> = {
  'kilty': 'Tradycyjne kilty do sauny w różnych wzorach i kolorach',
  'poncha': 'Wygodne poncha idealne po wyjściu z sauny',
  'spodnie': 'Przewiewne spodnie do relaksu w saunie',
  'bluzy': 'Komfortowe bluzy na chłodniejsze dni',
  'akcesoria': 'Niezbędne dodatki do saunowania',
  'zestawy': 'Kompletne zestawy dla prawdziwych miłośników sauny'
};

const ProductList: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');


  useEffect(() => {

    if (urlCategory && ['kilty', 'poncha', 'spodnie', 'bluzy', 'akcesoria', 'zestawy'].includes(urlCategory)) {
      setSelectedCategory(urlCategory as ProductCategory);
    } else if (!urlCategory) {
      setSelectedCategory('all');
    }
  }, [urlCategory]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts({ page: 1 });
      setProducts(data);
    } catch (err) {
      setError('Nie udało się pobrać produktów. Spróbuj ponownie później.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie produktów...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ups! Coś poszło nie tak</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-wood-600 to-wood-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Odzież do Saunowania
          </h1>
          <p className="text-xl text-center text-wood-100 max-w-2xl mx-auto">
            Odkryj naszą kolekcję wysokiej jakości odzieży zaprojektowanej specjalnie
            z myślą o komforcie podczas saunowania
          </p>
        </div>
      </div>

      {/* Category filters*/}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">

            <Link
              to="/sklep"
              className={`
                px-4 py-2 rounded-full font-medium transition-all
                ${selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
           `}
            >
              Wszystkie ({products.length})
            </Link>



            {(Object.keys(categoryIcons) as ProductCategory[]).map(category => (

              <Link
                key={category}
                to={`/sklep/${category}`}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                <span>{categoryIcons[category]}</span>
                <span className="capitalize">{category}</span>
                {categoryCounts[category] > 0 && (
                  <span className="text-sm">({categoryCounts[category] || 0})</span>
                )}
              </Link>
            ))}
          </div>

          {/* Category description */}
          {selectedCategory !== 'all' && (
            <p className="text-center text-gray-600 mt-4 text-sm">
              {categoryDescriptions[selectedCategory]}
            </p>
          )}
        </div>
      </div>

      {/* Product list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Brak produktów w tej kategorii.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;