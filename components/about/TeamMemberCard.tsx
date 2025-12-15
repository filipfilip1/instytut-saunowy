import Image from 'next/image';
import { Award } from 'lucide-react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  certifications?: string[];
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  imageUrl,
  certifications = [],
}: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-cream-200 hover:shadow-xl transition-shadow group">
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-forest-100 to-cream-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/60 via-graphite-900/20 to-transparent" />

        {/* Role Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-block px-4 py-2 bg-gold-500/90 backdrop-blur-sm rounded-xl">
            <span className="text-white font-semibold text-sm">{role}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-graphite-900 mb-3">{name}</h3>

        <p className="text-graphite-700 leading-relaxed mb-4">{bio}</p>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="border-t-2 border-cream-200 pt-4">
            <div className="flex items-start gap-2 mb-2">
              <Award className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm font-semibold text-graphite-700">
                Certyfikaty i uprawnienia
              </div>
            </div>
            <ul className="space-y-1.5 ml-7">
              {certifications.map((cert, index) => (
                <li key={index} className="text-sm text-graphite-600 flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
