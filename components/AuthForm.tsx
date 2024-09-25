'use client'
import { authFormSchema } from '@/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { z } from 'zod'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'

const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => { }

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="Name" placeholder='Enter your name' />
                  </div>
                  <CustomInput control={form.control} name='token' label="Token" placeholder='Enter your invest token' />
                </>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in'
                    ? 'Sign In' : 'Sign Up'}
                </Button>
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

export default AuthForm
