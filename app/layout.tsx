import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const heading = Outfit({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: "Ola's Estate | Bold Living. Prime Locations.",
  description: "Leading the frontier of Nigerian real estate, Ola's Estate offers premium residential and commercial properties across Abuja and Lagos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}