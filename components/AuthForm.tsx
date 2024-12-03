'use client'
import { AuthFormSchema } from '@/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { z } from 'zod'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/app/(auth)/actions'
import { useFormState, useFormStatus } from 'react-dom';

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const formSchema = AuthFormSchema(type);
  const [signInState, signInAction] = useActionState(signIn, undefined)
  const [signUpState, signUpAction] = useActionState(signUp, undefined)
  const state = type === 'sign-in' ? signInState : signUpState

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })


  // 2. Watch for errors in the action state and set them in the form
  useEffect(() => {
    // Clear previous errors if any
    form.clearErrors();

    if (state?.errors?.email) {
      form.control.setError('email', {
        type: 'manual',
        message: state.errors.email.join(", "),
      });
    }

    if (state?.errors?.password) {
      form.control.setError('password', {
        type: 'manual',
        message: state.errors.password.join(", "),
      });
    }

    if (state?.errors?.firstName && type === 'sign-up') {
      form.control.setError('firstName', {
        type: 'manual',
        message: state.errors.firstName.join(", "),
      });
    }
    console.log('Error: ', state?.errors)
  }, [state, form.control, type]);

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="cursor-pointer flex
          items-center gap-1">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={34}
            height={34}
          />
          <h1 className="text-heading3-bold text-light-1 max-xs:hidden">
            Trackfolio
          </h1>
        </Link>

        <div className="flex-col items-center gap-1 md:gap-3">
          <h1 className='text-24 lg:text-36 font-semibold text-gray-500'>
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }
          </h1>
          <p className='text-16 font-normal text-gray-600'>
            {user
              ? 'Link your account'
              : 'Enter your details'
            }
          </p>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'></div>
      ) : (
        <>
          <Form {...form}>
            <form action={ type === 'sign-in' ? signInAction : signUpAction} className="space-y-8">
              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />
              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="Name" placeholder='Enter your name' />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-4">
                <SubmitButton type={type} />
                {state?.errors?.general && (
                  <p className="text-red-500">{state.errors.general}</p>
                )}
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

function SubmitButton({ type }: { type: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="form-btn">
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" /> &nbsp;
          Loading...
        </>
      ) : type === 'sign-in'
        ? 'Sign In' : 'Sign Up'}
    </Button>
  );
}

export default AuthForm
