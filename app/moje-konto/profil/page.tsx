'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User as UserIcon, Mail, MapPin, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface UserProfile {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  role: string;
  addresses?: Address[];
}

export default function UserProfilePage() {
  const { status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/profile');
      const data = await response.json();

      if (data.status === 'success') {
        setProfile(data.data);
        setName(data.data.name || '');
        setAddresses(data.data.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Nie udało się pobrać profilu');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          addresses,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setProfile(data.data);
        toast.success('Profil został zaktualizowany');
      } else {
        toast.error(data.message || 'Nie udało się zaktualizować profilu');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Wystąpił błąd podczas zapisywania');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        street: '',
        city: '',
        zipCode: '',
        country: 'Polska',
        isDefault: addresses.length === 0,
      },
    ]);
  };

  const handleRemoveAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    // If removed address was default and there are other addresses, make first one default
    if (addresses[index].isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }
    setAddresses(newAddresses);
  };

  const handleUpdateAddress = (index: number, field: keyof Address, value: string | boolean) => {
    const newAddresses = [...addresses];
    if (field === 'isDefault' && value === true) {
      // Unset all other defaults
      newAddresses.forEach((addr, i) => {
        addr.isDefault = i === index;
      });
    } else if (field === 'isDefault') {
      newAddresses[index][field] = value as boolean;
    } else {
      newAddresses[index][field as 'street' | 'city' | 'zipCode' | 'country'] = value as string;
    }
    setAddresses(newAddresses);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl shadow-md border-2 border-warmwood-200 p-12 text-center">
        <UserIcon className="w-20 h-20 text-graphite-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-graphite-900 mb-2">
          Nie znaleziono profilu
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-graphite-900 mb-2">
          Mój Profil
        </h1>
        <p className="text-graphite-600">
          Zarządzaj swoimi danymi i zapisanymi adresami
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-6">
        <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-6 flex items-center gap-2">
          <UserIcon className="w-6 h-6" />
          Informacje o koncie
        </h2>

        <div className="space-y-6">
          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border-2 border-cream-200 bg-cream-50 text-graphite-600 cursor-not-allowed"
            />
            <p className="text-sm text-graphite-500 mt-1">
              Adres email nie może być zmieniony
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Imię i nazwisko
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Wprowadź swoje imię i nazwisko"
              className="w-full px-4 py-3 rounded-xl border-2 border-cream-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all"
            />
          </div>

          {/* Account Type Badge */}
          <div>
            <label className="block text-sm font-semibold text-graphite-700 mb-2">
              Typ konta
            </label>
            <span
              className={`inline-block px-4 py-2 rounded-xl font-semibold ${
                profile.role === 'admin'
                  ? 'bg-gold-100 text-gold-800'
                  : 'bg-forest-100 text-forest-800'
              }`}
            >
              {profile.role === 'admin' ? '👑 Administrator' : '👤 Klient'}
            </span>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-graphite-900 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Zapisane adresy
          </h2>
          <button
            onClick={handleAddAddress}
            className="btn-gold flex items-center gap-2 px-4 py-2"
          >
            <Plus className="w-4 h-4" />
            Dodaj adres
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-8 bg-cream-50 rounded-xl border-2 border-dashed border-cream-300">
            <MapPin className="w-12 h-12 text-graphite-300 mx-auto mb-3" />
            <p className="text-graphite-500 mb-4">Nie masz zapisanych adresów</p>
            <button
              onClick={handleAddAddress}
              className="text-gold-600 hover:text-gold-700 font-semibold"
            >
              Dodaj pierwszy adres
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  address.isDefault
                    ? 'border-gold-400 bg-gold-50'
                    : 'border-cream-200 bg-cream-50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {address.isDefault && (
                      <span className="px-3 py-1 bg-gold-400 text-graphite-900 text-xs font-bold rounded-full">
                        DOMYŚLNY
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveAddress(index)}
                    className="text-warmwood-600 hover:text-warmwood-700 p-2 hover:bg-warmwood-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-graphite-700 mb-2">
                      Ulica i numer
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => handleUpdateAddress(index, 'street', e.target.value)}
                      placeholder="np. ul. Przykładowa 123"
                      className="w-full px-4 py-2 rounded-lg border border-cream-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-graphite-700 mb-2">
                      Kod pocztowy
                    </label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => handleUpdateAddress(index, 'zipCode', e.target.value)}
                      placeholder="00-000"
                      className="w-full px-4 py-2 rounded-lg border border-cream-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-graphite-700 mb-2">
                      Miasto
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => handleUpdateAddress(index, 'city', e.target.value)}
                      placeholder="np. Warszawa"
                      className="w-full px-4 py-2 rounded-lg border border-cream-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-graphite-700 mb-2">
                      Kraj
                    </label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => handleUpdateAddress(index, 'country', e.target.value)}
                      placeholder="Polska"
                      className="w-full px-4 py-2 rounded-lg border border-cream-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={address.isDefault}
                        onChange={(e) =>
                          handleUpdateAddress(index, 'isDefault', e.target.checked)
                        }
                        className="w-5 h-5 rounded border-cream-300 text-gold-600 focus:ring-gold-400"
                      />
                      <span className="text-sm font-semibold text-graphite-700">
                        Ustaw jako domyślny
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="btn-gold px-8 py-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
      </div>

      {/* Account Security Info */}
      <div className="bg-gradient-to-br from-nordic-700 to-nordic-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-serif font-bold mb-4">Bezpieczeństwo konta</h2>
        <p className="text-cream-200 mb-4">
          Twoje konto jest zabezpieczone przez Google OAuth. Aby zmienić hasło lub inne ustawienia
          bezpieczeństwa, przejdź do ustawień swojego konta Google.
        </p>
        <a
          href="https://myaccount.google.com/security"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-white text-nordic-700 font-semibold rounded-xl hover:bg-cream-100 transition-colors"
        >
          Zarządzaj kontem Google
        </a>
      </div>
    </div>
  );
}
