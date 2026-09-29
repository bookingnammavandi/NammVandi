import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'NammaMove — Premium Relocation, Packers & Movers in South India',
  description:
    'Reliable packers and movers, house relocation, office shifting, bike and car transport across Chennai, Bengaluru, Coimbatore, Madurai, Trichy and all South India. Book online with instant estimate.',
  keywords: [
    'packers and movers chennai',
    'house shifting bangalore',
    'logistics coimbatore',
    'bike transport tamil nadu',
    'office relocation',
    'nammamove',
  ],
  openGraph: {
    title: 'NammaMove — End-to-End Logistics & Movers Platform',
    description: 'Move Anything. Move Anywhere. Move with NammaMove.',
    url: 'https://nammamove.in',
    siteName: 'NammaMove',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltl">
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
