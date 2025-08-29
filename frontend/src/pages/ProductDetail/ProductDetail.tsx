import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useNavigation } from 'react-router-dom';
import { Product } from "../../types/Product";
import { productService } from '../../services/productService';
import { useCart } from '../../contexts/CartContext';
import VariantSelector from '../../components/VariantSelector';
import Toast from '../../components/Toast';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductBySlug(slug);

        if (!data) {
          setError('Produkt nie został odnaleziony');
          return;
        }

        setProduct(data);

        // Set default variants (first available options)
        const defaultVariants: Record<string, string> = {};
        data.variants.forEach(variant => {
          const firstAvailable = variant.options.find(opt => opt.stock > 0);
          if (firstAvailable) {
            defaultVariants[variant.id] = firstAvailable.id
          }
        });
        setSelectedVariants(defaultVariants);
      } catch (error) {
        setError('Nie udało się pobrać produktu');
        console.error('Error fetching product: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const calculatePrice = () => {
    if (!product) return 0;

    let totalPrice = product.basePrice;

    product.variants.forEach(variant => {
      const selectedOptionId = selectedVariants[variant.id];
      if (selectedOptionId) {
        const option = variant.options.find(opt => opt.id === selectedOptionId);
        if (option?.priceModifier) {
          totalPrice += option.priceModifier;
        }
      }
    });

    return totalPrice * quantity;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, selectedVariants, quantity);

    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };


  const isAddToCartDisabled = () => {
    if (!product) return true;

    // Check that all variants are selected
    const allVariantAreSelected = product.variants.every(variant =>
      selectedVariants[variant.id]
    );

    return !allVariantAreSelected || quantity < 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie produktu...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Produkt nie został znaleziony'}
          </h2>
          <Link
            to="/sklep"
            className="text-blue-600 hover:underline"
          >
            ← Wróć do sklepu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                Strona główna
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/sklep" className="text-gray-500 hover:text-gray-700">
                Sklep
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                to={`/sklep/${product.category}`}
                className="text-gray-500 hover:text-gray-700 capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Photo Gallery */}
            <div>
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <img
                  src={product.images[selectedImage]?.url || 'https://via.placeholder.com/600'}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`
                        relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden
                        ${selectedImage === index ? 'ring-2 ring-blue-600' : ''}
                      `}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-24 object-cover hover:opacity-80 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prodcut information */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(calculatePrice() / quantity)}
                </span>
                {product.priceRange && product.priceRange.min !== product.priceRange.max && (
                  <span className="text-sm text-gray-500">
                    (zakres: {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)})
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants.length > 0 && (
                <div className="mb-6">
                  <VariantSelector
                    variants={product.variants}
                    onChange={setSelectedVariants}
                    basePrice={product.basePrice}
                  />
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ilość
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total price */}
              {quantity > 1 && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cena całkowita:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(calculatePrice())}
                    </span>
                  </div>
                </div>
              )}

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled()}
                className={`
                  w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all
                  ${isAddToCartDisabled()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }
                `}
              >
                {isAddToCartDisabled() ? 'Wybierz warianty' : 'Dodaj do koszyka'}
              </button>

              {/* Addition notification */}
              {showAddedMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span>✓ Produkt został dodany do koszyka</span>
                    <Link
                      to="/koszyk"
                      className="text-green-800 underline font-medium hover:text-green-900"
                    >
                      Zobacz koszyk
                    </Link>
                  </div>
                </div>
              )}

              {/* Product features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-lg font-semibold mb-4">Cechy produktu:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional information */}
              <div className="mt-8 border-t pt-8 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Darmowa dostawa od 200 zł</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>30 dni na zwrot</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>2 lata gwarancji</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toast notification */}
      {showAddedMessage && (
        <Toast
          message="Produkt został dodany do koszyka"
          type="success"
          onClose={() => setShowAddedMessage(false)}
          action={{
            label: 'Zobacz koszyk',
            onClick: () => navigate('/koszyk')
          }}
        />
      )}
    </div>
  );
};

export default ProductDetail;
