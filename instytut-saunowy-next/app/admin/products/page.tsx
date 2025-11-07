import { formatPriceExact } from "@/lib/utils/currency";
import dbConnect from '@/lib/mongodb';
import { IProduct } from '@/types';
import Product from '@/lib/models/Product';
import Link from 'next/link';
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
        <h1 className="text-3xl font-bold text-gray-800">Produkty</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Dodaj produkt
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produkt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kategoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cena
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stan magazynowy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product: IProduct) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.images[0]?.url || '/placeholder.png'}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPriceExact(product.basePrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.totalStock || 0} szt.
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  `}>
                    {product.isActive ? 'Aktywny' : 'Nieaktywny'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="text-blue-600 hover:text-blue-900"
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