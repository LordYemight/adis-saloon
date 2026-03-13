import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Adis Saloon | Experience the Art of Hair',
  description: 'Lagos\' premier unisex salon and styling boutique.',
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