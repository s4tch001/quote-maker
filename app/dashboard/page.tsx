import { redirect } from 'next/navigation';

import { auth } from '@/auth';

export default async function DashboardPage() {
  // Keep this server-side check even though proxy.ts also protects the route.
  const session = await auth();

  if (!session?.user) {
    // Send unauthenticated visitors to the custom login page.
    redirect('/login');
  }

  return (
    <main className='min-h-svh p-8'>
      <h1 className='font-heading text-4xl font-bold'>Dashboard</h1>
    </main>
  );
}
