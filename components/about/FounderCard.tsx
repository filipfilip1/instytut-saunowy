import Image from 'next/image';
import Link from 'next/link';

interface FavoriteProduct {
  name: string;
  url: string;
}

interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  philosophy: string;
  imageUrl: string;
  favoriteProducts: FavoriteProduct[];
}

export default function FounderCard({
  name,
  role,
  bio,
  philosophy,
  imageUrl,
  favoriteProducts,
}: FounderCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Image - transparent background, no container */}
      <div className="relative w-64 h-64">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="256px"
          className="object-cover rounded-full drop-shadow-2xl"
        />
      </div>

      {/* Text Content */}
      <div className="space-y-3 max-w-md">
        <h3 className="text-3xl font-serif font-bold text-graphite-900">{name}</h3>
        <p className="text-gold-600 font-medium text-lg">{role}</p>
        <p className="text-graphite-700 leading-relaxed">{bio}</p>
      </div>

      {/* Philosophy Quote Box */}
      <div className="w-full max-w-md bg-cream-50 pl-4 py-3 border-l-4 border-gold-500 rounded-r-lg">
        <p className="italic text-graphite-600 text-sm">&ldquo;{philosophy}&rdquo;</p>
      </div>

      {/* Favorite Products Links */}
      {favoriteProducts.length > 0 && (
        <div className="w-full max-w-md text-left space-y-2">
          <p className="text-sm font-semibold text-graphite-700">Produkty, których używam:</p>
          <ul className="space-y-1.5">
            {favoriteProducts.map((product, index) => (
              <li key={index}>
                <Link
                  href={product.url}
                  className="text-nordic-600 hover:text-nordic-800 text-sm transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-nordic-600 group-hover:bg-nordic-800 transition-colors" />
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
