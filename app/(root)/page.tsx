'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4 text-center'>
        <Image
          src='/p-devs logo.png'
          alt='P-Devs logo'
          width={100}
          height={100}
          priority
        />

        <h1 className='text-3xl font-semibold'>Welcome to Quote Maker</h1>

        <p className='text-muted-foreground'>
          Create professional quotes and manage your business efficiently.
        </p>

        <div className='flex items-center justify-center gap-4'>
          <Button
            onClick={() => router.push('/signup')}
            className='bg-blue-500 hover:bg-blue-800 active:bg-black'
          >
            Sign Up
          </Button>

          <Button
            onClick={() => router.push('/login')}
            className='bg-indigo-600 hover:bg-indigo-800 active:bg-black'
          >
            Log In
          </Button>
        </div>
      </div>
    </main>
  );
}
