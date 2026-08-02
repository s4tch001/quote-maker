import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8'>
      <Card className='w-full max-w-sm shadow-lg'>
        <CardHeader className='space-y-2 text-center'>
          <CardTitle className='text-2xl font-semibold tracking-tight'>
            Welcome back
          </CardTitle>

          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email address</Label>

              <div className='relative'>
                <Mail
                  aria-hidden='true'
                  className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                />

                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  autoComplete='email'
                  className='pl-9'
                  required
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between gap-4'>
                <Label htmlFor='password'>Password</Label>

                <Link
                  href='/forgot-password'
                  className='text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <div className='relative'>
                <Lock
                  aria-hidden='true'
                  className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                />

                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  autoComplete='current-password'
                  className='pl-9'
                  required
                />
              </div>
            </div>

            <Button
              type='submit'
              className='w-full bg-indigo-600 hover:bg-indigo-800 mt-2'
            >
              Sign in
            </Button>
          </form>

          <p className='mt-6 text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='font-medium text-foreground underline-offset-4 hover:underline'
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
