'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type LoginForm, loginSchema } from '@/lib/schema';

export default function LoginPage() {
  const router = useRouter();
  // Keep authentication errors inside the form so they are easy to notice.
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    // Clear the previous message before starting a new attempt.
    setSubmitError(null);

    try {
      // Auth.js may return HTTP 200 with an error field for invalid credentials.
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
        redirectTo: '/dashboard',
      });

      if (!result.ok || result.error) {
        setSubmitError('Invalid email or password.');
        return;
      }

      router.push(result.url ?? '/dashboard');
      router.refresh();
    } catch {
      setSubmitError('Unable to sign in right now. Please try again.');
    }
  };

  return (
    <main className='paper-grid relative min-h-svh overflow-hidden px-4 py-5 text-foreground sm:px-8 sm:py-8 lg:px-12 lg:py-10'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-48 -top-48 size-136 rounded-full bg-secondary/75 blur-3xl'
      />

      <div className='relative mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-6xl flex-col lg:min-h-[calc(100svh-5rem)]'>
        <header className='mb-5 flex min-h-14 items-center gap-3 lg:mb-7'>
          <Image
            src='/quotemaker-logo.webp'
            alt='Quote Maker logo'
            width={44}
            height={44}
            priority
            sizes='44px'
            className='size-11 object-contain drop-shadow-[0_7px_13px_oklch(0.249_0.052_260.11/0.15)]'
          />
          <span className='font-heading text-lg font-bold tracking-[-0.015em]'>
            Quote Maker
          </span>
        </header>

        {/* Keep the desktop login layout evenly split between the aside and form. */}
        <div className='grid flex-1 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_22px_60px_oklch(0.249_0.052_260.11/0.09),0_2px_6px_oklch(0.249_0.052_260.11/0.05)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
          <aside className='relative hidden overflow-hidden bg-foreground p-12 text-card lg:flex lg:min-h-152.5 lg:flex-col xl:p-16'>
            <div
              aria-hidden='true'
              className='absolute -bottom-24 -right-24 size-72 rounded-full border border-white/15 shadow-[0_0_0_34px_oklch(1_0_0/0.06),0_0_0_72px_oklch(1_0_0/0.03)]'
            />
            <div className='relative z-10 my-auto'>
              <p className='mb-4 font-mono text-[11px] font-bold tracking-[0.13em] text-white/60 uppercase'>
                Welcome back
              </p>
              <h1 className='max-w-[10ch] font-heading text-[clamp(2.7rem,4.7vw,3.875rem)] leading-[0.99] font-bold tracking-[-0.046em] text-balance'>
                Return to your quotation workspace.
              </h1>
              <p className='mt-6 max-w-[41ch] leading-7 text-pretty text-white/65'>
                Review client quotations, update line items, and keep every
                estimate moving.
              </p>
            </div>
            <p className='relative z-10 border-t border-white/20 pt-6 font-mono text-[11px] leading-5 tracking-[0.04em] text-white/65'>
              A focused sign-in space for faster quoting and better business
              decisions.
            </p>
          </aside>

          <section className='flex items-center bg-card px-5 py-10 sm:px-10 sm:py-14 lg:min-h-152.5 lg:px-14'>
            <div className='mx-auto w-full max-w-107.5'>
              <p className='mb-4 font-mono text-[11px] font-bold tracking-[0.13em] text-muted-foreground uppercase lg:hidden'>
                Welcome back
              </p>
              <h2 className='font-heading text-[clamp(2.5rem,5.8vw,3.375rem)] leading-none font-bold tracking-[-0.046em] text-balance'>
                Log in
              </h2>
              <p className='mt-3 max-w-[42ch] leading-7 text-pretty text-muted-foreground'>
                Enter your email and password to access your quotation
                workspace.
              </p>

              <form
                className='mt-8 grid gap-5'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className='grid gap-2'>
                  <Label htmlFor='email' className='text-sm font-bold'>
                    Email address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    autoComplete='email'
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className='h-12 rounded-xl border-border bg-card px-3.5 shadow-none placeholder:text-[#87909d] hover:border-[#aeb8c7] focus-visible:border-[#53637a] focus-visible:ring-[#53637a]/20'
                    {...register('email')}
                  />
                  {errors.email && (
                    <p
                      id='email-error'
                      role='alert'
                      className='text-xs font-bold text-destructive'
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-2'>
                  <div className='flex items-center justify-between gap-4'>
                    <Label htmlFor='password' className='text-sm font-bold'>
                      Password
                    </Label>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    className='h-12 rounded-xl border-border bg-card px-3.5 shadow-none placeholder:text-[#87909d] hover:border-[#aeb8c7] focus-visible:border-[#53637a] focus-visible:ring-[#53637a]/20'
                    {...register('password')}
                  />
                  {errors.password && (
                    <p
                      id='password-error'
                      role='alert'
                      className='text-xs font-bold text-destructive'
                    >
                      {errors.password.message}
                    </p>
                  )}
                  <div className='flex justify-end'>
                    <Link
                      href='/forgot-password'
                      prefetch={false}
                      className='inline-flex min-h-12 items-center rounded-lg text-xs font-bold text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground'
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Keep authentication failures visible inside the form. */}
                {submitError && (
                  <p
                    role='alert'
                    aria-live='polite'
                    className='rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm font-bold text-destructive'
                  >
                    {submitError}
                  </p>
                )}

                <Button
                  type='submit'
                  size='lg'
                  disabled={isSubmitting}
                  className='mt-1 h-12 w-full rounded-xl border border-[#d59a2c] bg-accent font-bold text-accent-foreground shadow-[0_10px_22px_oklch(0.62_0.10_78.91/0.16)] hover:bg-[#e7a934] hover:text-accent-foreground active:bg-[#d99a27]'
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              <p className='mt-6 text-center text-sm leading-6 text-muted-foreground'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/signup'
                  className='inline-flex min-h-12 items-center rounded-lg font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground'
                >
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
