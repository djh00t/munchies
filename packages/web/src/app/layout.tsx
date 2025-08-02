import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Munchies - Smart Meal Planning & Inventory Management',
  description: 'Take photos of your fridge and get personalized meal suggestions. Reduce food waste and eat better with AI-powered meal planning.',
  keywords: 'meal planning, inventory management, recipe suggestions, food waste reduction, AI cooking assistant',
  authors: [{ name: 'Munchies Team' }],
  openGraph: {
    title: 'Munchies - Smart Meal Planning',
    description: 'Take photos of your fridge and get personalized meal suggestions',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
