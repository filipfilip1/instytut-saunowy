import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import TrainingBooking from '@/lib/models/TrainingBooking';
import { IOrder, ITrainingBooking } from '@/types';
import { formatPriceExact } from '@/lib/utils/currency';
import { ArrowRight, Package, Calendar, User, TrendingUp } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import BookingStatusBadge from '@/components/admin/BookingStatusBadge';

async function getUserStats(userEmail: string, userId?: string) {
  await dbConnect();

  const query = {
    $or: [
      ...(userId ? [{ userId }] : []),
      { guestEmail: userEmail },
    ],
  };

  // Get order stats
  const [totalOrders, recentOrders] = await Promise.all([
    Order.countDocuments(query),
    Order.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  // Calculate total spent
  const paidOrders = await Order.find({
    ...query,
    paymentStatus: 'paid',
  }).lean();

  const totalSpent = paidOrders.reduce((sum, order) => sum + order.total, 0);

  // Get booking stats
  const [totalBookings, upcomingBookings] = await Promise.all([
    TrainingBooking.countDocuments(query),
    TrainingBooking.find({
      ...query,
      bookingStatus: 'confirmed',
    })
      .populate('trainingId')
      .sort({ createdAt: -1 })
      .limit(3)
      .lean(),
  ]);

  return {
    totalOrders,
    totalBookings,
    totalSpent,
    recentOrders: JSON.parse(JSON.stringify(recentOrders)),
    upcomingBookings: JSON.parse(JSON.stringify(upcomingBookings)),
  };
}

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null; // Layout handles redirect
  }

  const stats = await getUserStats(session.user.email, session.user.id);

  return (
    <div className="space-y-12">
      {/* Header - Premium Welcome */}
      <FadeIn>
        <div>
          <h1 className="text-5xl font-serif font-bold text-graphite-900 mb-3 tracking-tight">
            Dzień dobry, {session.user.name?.split(' ')[0] || 'Gościu'}.
          </h1>
          <p className="text-graphite-600 text-lg font-light">
            Miło Cię widzieć
          </p>
        </div>
      </FadeIn>

      {/* Stats Cards - Premium De-boxed Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Orders Card */}
        <Link
          href="/moje-konto/zamowienia"
          className="group relative bg-cream-100 border border-cream-300 hover:border-gold-400 transition-all duration-300 p-8"
        >
          {/* Watermark Icon */}
          <Package className="absolute top-4 right-4 w-24 h-24 text-cream-200/40 -rotate-12" strokeWidth={0.5} />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-gold-600" strokeWidth={1.5} />
              <p className="text-sm font-light tracking-widest uppercase text-graphite-600">Historia zakupów</p>
            </div>
            <h3 className="text-6xl font-serif font-bold text-graphite-900 mb-2">
              {stats.totalOrders}
            </h3>
            <p className="text-graphite-600 font-light mb-4">
              {stats.totalOrders === 0 ? 'Brak zamówień' : stats.totalOrders === 1 ? 'zamówienie' : 'zamówień'}
            </p>
            <div className="flex items-center gap-2 text-gold-600 font-light group-hover:gap-3 transition-all">
              <span>Zobacz szczegóły</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </div>
        </Link>

        {/* Bookings Card */}
        <Link
          href="/moje-konto/rezerwacje"
          className="group relative bg-cream-100 border border-cream-300 hover:border-gold-400 transition-all duration-300 p-8"
        >
          {/* Watermark Icon */}
          <Calendar className="absolute top-4 right-4 w-24 h-24 text-cream-200/40 -rotate-12" strokeWidth={0.5} />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-forest-600" strokeWidth={1.5} />
              <p className="text-sm font-light tracking-widest uppercase text-graphite-600">Moje szkolenia</p>
            </div>
            <h3 className="text-6xl font-serif font-bold text-graphite-900 mb-2">
              {stats.totalBookings}
            </h3>
            <p className="text-graphite-600 font-light mb-4">
              {stats.totalBookings === 0 ? 'Brak rezerwacji' : stats.totalBookings === 1 ? 'rezerwacja' : 'rezerwacji'}
            </p>
            <div className="flex items-center gap-2 text-gold-600 font-light group-hover:gap-3 transition-all">
              <span>Zobacz szczegóły</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      {stats.recentOrders.length > 0 && (
        <div className="bg-white border border-cream-300">
          <div className="px-8 py-6 border-b border-cream-200 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-graphite-900">
              Ostatnie zamówienia
            </h2>
            <Link
              href="/moje-konto/zamowienia"
              className="text-gold-600 hover:text-gold-700 font-light text-sm flex items-center gap-2 group"
            >
              Zobacz wszystkie
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-50/50 border-b border-cream-200">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-light tracking-widest uppercase text-graphite-600">
                    Zamówienie
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-light tracking-widest uppercase text-graphite-600">
                    Data
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-light tracking-widest uppercase text-graphite-600">
                    Status
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-light tracking-widest uppercase text-graphite-600">
                    Kwota
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-light tracking-widest uppercase text-graphite-600">

                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {stats.recentOrders.map((order: IOrder) => (
                  <tr key={order._id.toString()} className="hover:bg-cream-50/30 transition-colors">
                    <td className="px-8 py-4">
                      <span className="text-sm font-mono text-graphite-900">
                        #{order._id.toString().slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-sm font-light text-graphite-600">
                        {new Date(order.createdAt).toLocaleDateString('pl-PL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <OrderStatusBadge
                        status={order.status}
                        paymentStatus={order.paymentStatus}
                        size="sm"
                      />
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-sm font-light text-graphite-900">
                        {formatPriceExact(order.total)}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <Link
                        href={`/moje-konto/zamowienia/${order._id}`}
                        className="text-gold-600 hover:text-gold-700 font-light text-sm flex items-center gap-2 group"
                      >
                        Szczegóły
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upcoming Bookings */}
      {stats.upcomingBookings.length > 0 && (
        <FadeIn delay={0.5}>
          <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-cream-200 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-graphite-900">
                Nadchodzące szkolenia
              </h2>
              <Link
                href="/moje-konto/rezerwacje"
                className="text-forest-600 hover:text-forest-700 font-semibold text-sm flex items-center gap-2 group"
              >
                Zobacz wszystkie
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="p-6 space-y-4">
              {stats.upcomingBookings.map((booking: ITrainingBooking & { trainingId: any }) => (
                <div
                  key={booking._id.toString()}
                  className="flex items-center justify-between p-4 bg-cream-50 rounded-xl border border-cream-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-graphite-900">
                        {booking.trainingId?.name || 'Szkolenie'}
                      </h3>
                      <p className="text-sm text-graphite-600">
                        {booking.trainingId?.date
                          ? new Date(booking.trainingId.date).toLocaleDateString('pl-PL', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Data do ustalenia'}
                      </p>
                    </div>
                  </div>
                  <BookingStatusBadge
                    bookingStatus={booking.bookingStatus}
                    paymentStatus={booking.paymentStatus}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Contact Section */}
      <div className="bg-graphite-900 border border-cream-200/10 p-12">
        <h2 className="text-3xl font-serif font-bold mb-3 text-gold-400">Potrzebujesz pomocy?</h2>
        <p className="text-cream-200/70 font-light mb-8 text-lg">
          Skontaktuj się z nami w razie pytań dotyczących zamówień lub rezerwacji
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-graphite-950 transition-all font-light"
        >
          Skontaktuj się z nami
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
