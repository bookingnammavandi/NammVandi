'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  CalendarCheck,
  PlusCircle,
  Truck,
  Users,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  Bell,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('NammaVandi_admin_logged_in');
        localStorage.removeItem('NammaVandi_admin_email');
      }
      window.location.href = '/';
    }
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'All Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { label: 'Create Booking', href: '/admin/create-booking', icon: PlusCircle },
    { label: 'Vehicles & Drivers', href: '/admin/vehicles', icon: Truck },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Contact Enquiries', href: '/admin/contact-enquiries', icon: MessageSquare },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="p-6 space-y-8">
          
          {/* Admin Brand */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl brand-gradient-bg flex items-center justify-center text-white shadow-glow">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-white block">
                Namma<span className="text-orange-500">Vandi</span>
              </span>
              {/* <span className="text-[10px] uppercase font-extrabold text-blue-400 tracking-wider">
                Admin Control Center
              </span> */}
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'brand-gradient-bg text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Profile Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
              NV
            </div>
            <div className="flex-1 truncate">
              <span className="text-xs font-bold text-white block truncate">Namma Vandi</span>
              <span className="text-[10px] text-slate-500 block truncate">bookingnammavandi@gmail.com</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl glass-card text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" /> Logout & Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-slate-900/80 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-3 md:hidden">
            <Shield className="w-5 h-5 text-orange-400" />
            <span className="font-extrabold text-white text-base">NammaVandi Admin</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold capitalize">
              {(pathname || '').split('/')[2] || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ● Supabase Live RLS
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
              title="Logout & Return to Home Page"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Logout & Exit</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>

      </div>

    </div>
  );
}
