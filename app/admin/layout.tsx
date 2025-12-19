import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Server-side authentication check
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated or not admin
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  if (session.user.role !== 'admin') {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      <div className="flex w-full">
        {/* Client Component Sidebar - uses usePathname for active state */}
        <AdminSidebar userName={session.user.name || 'Admin'} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-cream-50">
          <div className="max-w-6xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}