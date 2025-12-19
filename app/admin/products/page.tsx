import { formatPriceExact } from "@/lib/utils/currency";
import dbConnect from '@/lib/mongodb';
import { IProduct } from '@/types';
import Product from '@/lib/models/Product';
import Link from 'next/link';
import Image from 'next/image';
import DeleteProductButton from './DeleteProductButton';

async function getProducts() {
  await dbConnect();
  const products = await Product.find()
    .sort('-createdAt');

  return JSON.parse(JSON.stringify(products));
}

export default async function AdminProductsPage() {
  const products = await getProducts();


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-graphite-900">Produkty</h1>
          <p className="text-graphite-600 mt-1">Zarządzaj produktami w sklepie</p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-forest"
        >
          + Dodaj produkt
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-300">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-graphite-50 to-cream-100 border-b-2 border-cream-300">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Produkt
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Kategoria
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Cena
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Stan magazynowy
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cream-200">
            {products.map((product: IProduct) => (
              <tr key={product._id} className="hover:bg-cream-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <Image
                        className="rounded-xl object-cover border-2 border-cream-200"
                        src={product.images[0]?.url || '/placeholder.png'}
                        alt={product.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-graphite-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-graphite-500">
                        {product.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                  <span className="px-3 py-1.5 bg-cream-200 text-graphite-700 rounded-xl text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-graphite-900">
                  {formatPriceExact(product.basePrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                  <span className="font-medium">{product.totalStock || 0}</span> szt.
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-xl
                    ${product.isActive ? 'bg-forest-100 text-forest-800 border border-forest-200' : 'bg-warmwood-100 text-warmwood-800 border border-warmwood-200'}
                  `}>
                    {product.isActive ? 'Aktywny' : 'Nieaktywny'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="text-forest-600 hover:text-forest-800 font-semibold transition-colors"
                  >
                    Edytuj
                  </Link>
                  <DeleteProductButton productId={product._id} productName={product.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}