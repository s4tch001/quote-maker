import { handlers } from '@/auth';

// Expose Auth.js handlers for sign-in, sessions, and CSRF protection.
export const { GET, POST } = handlers;
