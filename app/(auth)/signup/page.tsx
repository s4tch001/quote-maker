'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignupForm,
  signupFormSchema,
  SignupPayload,
  signupPayloadSchema,
} from '../../../lib/schema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from '@/components/ui/toast';

export default function Page() {
  /*
   * React Hook Form manages:
   * - Form state
   * - Input registration
   * - Validation
   *
   * The form uses signupFormSchema through zodResolver().
   */
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
  });

  /*
   * useMutation is used for operations that modify data,
   * such as creating, updating, or deleting records.
   *
   * Unlike useQuery, mutations do not run automatically.
   * They only execute when mutate() or mutateAsync() is called.
   */
  const FormDataMutation = useMutation({
    /*
     * mutationFn is the function that performs the API request.
     *
     * The `data` parameter contains the validated form values
     * received from React Hook Form.
     */
    mutationFn: async (data: SignupPayload) => {
      // FETCH METHOD
      // const res = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      // return res;

      // AXIOS METHOD
      // Sends the validated form data to the signup API.
      return await axios.post('/api/signup', data);
    },

    /*
     * Runs automatically after the mutation succeeds.
     *
     * `data` is the response returned by the API.
     */
    onSuccess: () => {
      // Clear all form fields after a successful signup.
      reset();
      toast.add({
        type: 'success',
        description: 'Successfully Registered',
        position: 'bottom-left',
      });
    },

    /*
     * Runs automatically if the mutation fails.
     *
     * `error` contains information about what went wrong,
     * such as a network error or a server response error.
     */
    onError: (error) => {
      toast.add({
        type: 'error',
        description: 'Registration Failed',
        position: 'bottom-left',
      });
      console.log('Error', error);
    },
  });

  /*
   * Called only after the form passes validation.
   */
  const FormSubmit = (data: SignupForm) => {
    /*
     * Parse the validated form data using the payload schema.
     *
     * This:
     * - Keeps only the fields defined in signupPayloadSchema
     * - Validates the payload again
     * - Returns a correctly typed SignupPayload
     */
    const payload: SignupPayload = signupPayloadSchema.parse(data);

    FormDataMutation.mutate(payload);

    /*
     * Payload sent to the server:
     * {
     *   name: "John Doe",
     *   email: "john@example.com",
     *   password: "password123"
     * }
     */
  };

  return (
    <main className='min-h-screen'>
      <div className='flex h-screen'>
        {/* Left Side */}
        <section className='flex flex-1 flex-col items-center justify-center gap-4 bg-slate-100 px-10'>
          <Image
            src='/p-devs logo.png'
            alt='P-Devs logo'
            width={100}
            height={100}
            priority
          />

          <h1 className='text-3xl font-semibold'>Welcome to Quote Maker</h1>

          <p className='max-w-sm text-center text-muted-foreground'>
            Create professional quotes and manage your business efficiently.
          </p>
        </section>

        {/* Right Side */}
        <section className='flex flex-1 items-center justify-center px-10'>
          <form
            className='w-full max-w-md space-y-5 text-mauve-800'
            onSubmit={handleSubmit(FormSubmit)}
          >
            <h2 className='text-2xl font-bold mb-6'>Sign Up</h2>

            {/* Name */}
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>

              <Input
                id='name'
                type='text'
                placeholder='Name'
                {...register('name')}
              />

              <p className='text-sm font-medium leading-none text-red-400'>
                {errors.name?.message}
              </p>
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>

              <Input
                id='email'
                type='email'
                placeholder='Email'
                {...register('email')}
              />

              <p className='text-sm font-medium leading-none text-red-400'>
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>

              <Input
                id='password'
                type='password'
                placeholder='Password'
                {...register('password')}
              />

              <p className='text-sm font-medium leading-none text-red-400'>
                {errors.password?.message}
              </p>
            </div>

            {/* Confirm Password */}
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>

              <Input
                id='confirmPassword'
                type='password'
                placeholder='Confirm password'
                {...register('confirmPassword')}
              />

              <p className='text-sm font-medium leading-none text-red-400'>
                {errors.confirmPassword?.message}
              </p>
            </div>

            <Button
              type='submit'
              className='w-full bg-indigo-600 hover:bg-indigo-800 mt-2'
            >
              Submit
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
