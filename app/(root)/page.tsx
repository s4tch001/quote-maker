'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <main className='paper-grid relative isolate min-h-[100svh] overflow-hidden text-foreground'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-48 -top-48 size-[34rem] rounded-full bg-secondary/75 blur-3xl'
      />

      <div className='relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-4 sm:px-8 lg:px-12'>
        <header className='flex min-h-20 items-center border-b border-border/75 sm:min-h-24'>
          <div className='flex min-h-12 items-center gap-3'>
            <Image
              src='/quotemaker-logo.webp'
              alt='Quote Maker logo'
              width={44}
              height={44}
              priority
              sizes='44px'
              className='size-11 object-contain drop-shadow-[0_7px_13px_oklch(0.249_0.052_260.11_/_0.15)]'
            />
            <span className='font-heading text-lg font-bold tracking-[-0.015em]'>
              Quote Maker
            </span>
          </div>
        </header>

        <div className='grid flex-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(390px,0.82fr)] lg:gap-20 lg:py-20'>
          <section className='max-w-2xl'>
            <p className='mb-4 font-mono text-[11px] font-bold tracking-[0.13em] text-muted-foreground uppercase'>
              Business quotations, made clear
            </p>

            <h1 className='max-w-[12ch] font-heading text-[clamp(3rem,7.2vw,5.5rem)] leading-[0.96] font-bold tracking-[-0.055em] text-balance'>
              Make every quotation ready to send.
            </h1>

            <p className='mt-6 max-w-[55ch] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-8 text-pretty text-muted-foreground'>
              Prepare client-ready business quotations with clear line items,
              accurate totals, and a polished presentation.
            </p>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <Button
                onClick={() => router.push('/signup')}
                size='lg'
                className='h-12 rounded-xl border border-[#d59a2c] bg-accent px-6 font-bold text-accent-foreground shadow-[0_10px_22px_oklch(0.62_0.10_78.91_/_0.16)] hover:bg-[#e7a934] hover:text-accent-foreground active:bg-[#d99a27]'
              >
                Sign Up
                <ArrowUpRight aria-hidden='true' className='size-4' />
              </Button>

              <Button
                onClick={() => router.push('/login')}
                variant='outline'
                size='lg'
                className='h-12 rounded-xl border-border bg-card px-6 font-bold text-foreground shadow-[0_7px_18px_oklch(0.249_0.052_260.11_/_0.05)] hover:border-[#aeb8c7] hover:bg-secondary'
              >
                Log In
              </Button>
            </div>

            <p className='mt-6 max-w-[53ch] text-sm leading-6 text-pretty text-muted-foreground'>
              Faster estimates, clearer decisions, and less time spent fixing
              spreadsheet formatting.
            </p>
          </section>

          <article
            aria-label='Sample business quotation preview'
            className='paper-card-grid relative mx-auto min-h-[390px] w-full max-w-[520px] overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_22px_60px_oklch(0.249_0.052_260.11_/_0.09),0_2px_6px_oklch(0.249_0.052_260.11_/_0.05)] sm:min-h-[474px] sm:p-9 lg:mx-0 lg:justify-self-end'
          >
            <div className='relative z-10 flex items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase'>
              <span>Quotation preview</span>
              <span className='text-foreground'>Client-ready</span>
            </div>

            <figure className='relative z-10 flex min-h-[285px] flex-col justify-center px-1 py-10 sm:min-h-[342px] sm:px-7'>
              <div
                aria-hidden='true'
                className='mb-2 font-heading text-7xl leading-[0.6] text-[#53637a]'
              >
                ₱
              </div>
              <blockquote className='max-w-[17ch] font-heading text-[clamp(1.8rem,3.5vw,2.625rem)] leading-[1.14] font-semibold tracking-[-0.035em] text-balance'>
                Brand identity system for Acme Studio.
              </blockquote>
              <figcaption className='mt-6 text-sm font-bold text-muted-foreground'>
                Total quotation: ₱248,000.00
              </figcaption>
            </figure>

            <div className='relative z-10 flex items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase'>
              <span>Quotation #0042</span>
              <span>Ready to share</span>
            </div>
          </article>
        </div>

        <footer className='flex min-h-16 items-center justify-between gap-4 border-t border-border/75 font-mono text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase'>
          <span>Professional quotations, made simple.</span>
          <span className='hidden sm:inline'>Built for better business</span>
        </footer>
      </div>
    </main>
  );
}
