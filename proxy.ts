// Run the dashboard auth check before protected pages are rendered.
export { auth as proxy } from '@/auth';

export const config = {
  matcher: ['/dashboard/:path*'],
};
