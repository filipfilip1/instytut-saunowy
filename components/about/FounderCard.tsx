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
    <div className="flex flex-col items-center space-y-6">
      {/* Editorial Portrait Image - Rectangular, Tall, Framed */}
      <div className="relative aspect-[3/4] w-full max-w-[380px] mx-auto overflow-hidden rounded-sm">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>

      {/* Name & Role */}
      <div className="space-y-2 mt-4 text-center max-w-[380px]">
        <h3 className="text-3xl font-serif font-bold text-[#2C2622]">{name}</h3>
        <p className="text-[#C47F52] font-sans font-semibold text-sm uppercase tracking-[0.2em]">
          {role}
        </p>
      </div>

      {/* Philosophy Quote - Centered & Italicized */}
      <div className="text-center py-4 max-w-[380px]">
        <p className="italic text-lg font-serif text-stone-600 leading-relaxed">
          &ldquo;{philosophy}&rdquo;
        </p>
      </div>

      {/* Favorite Products - De-boxed */}
      {favoriteProducts.length > 0 && (
        <div className="space-y-2 text-center max-w-[380px]">
          <p className="text-sm font-bold text-[#2C2622]">Ulubione rytuały:</p>
          <p className="text-sm text-stone-500 leading-relaxed">
            {favoriteProducts.map((product, index) => (
              <Link
                key={index}
                href={product.url}
                className="hover:text-[#C47F52] transition-colors"
              >
                {product.name}
                {index < favoriteProducts.length - 1 ? ', ' : ''}
              </Link>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
