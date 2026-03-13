import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'],
  variable: '--font-body' 
});

export const metadata = {
  title: 'Adis Saloon | Bespoke Grooming & Artistry in Lagos',
  description: 'Premier destination for unisex grooming and avant-garde hair styling in Victoria Island, Lagos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}