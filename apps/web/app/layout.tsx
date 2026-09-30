import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NammaVandi — Premium Relocation, Packers & Movers in South India',
  description:
    'Reliable packers and movers, house relocation, office shifting, bike and car transport across Chennai, Bengaluru, Coimbatore, Madurai, Trichy and all South India. Book online with instant estimate.',
  keywords: [
    'packers and movers chennai',
    'house shifting bangalore',
    'logistics coimbatore',
    'bike transport tamil nadu',
    'office relocation',
    'NammaVandi',
  ],
  openGraph: {
    title: 'NammaVandi - End-to-End Logistics & Movers Platform',
    description: 'Move Anything. Move Anywhere. Move with NammaVandi.',
    url: 'https://NammaVandi.in',
    siteName: 'NammaVandi',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={dmSans.variable}>
      <body className={`${dmSans.className} bg-slate-950 text-slate-100 flex flex-col min-h-screen font-sans`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
