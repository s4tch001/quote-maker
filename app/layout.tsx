import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from '../lib/ReactQueryProvider';
import { Toaster } from '@/components/ui/toast';

export const metadata: Metadata = {
  title: 'Quote Maker | P-Devs',
  description:
    'Create professional quotes and manage your business efficiently.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full antialiased'
    >
      <body className='min-h-full flex flex-col'>
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
