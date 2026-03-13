import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}