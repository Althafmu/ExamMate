'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';
import { NextRouter } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormFields = z.infer<typeof schema>;

type Props = {
  router: AppRouterInstance;
};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await signUpUser(data).then(() => {
        toast.success('Login successfull');
      });
    } catch (error) {
      setError('root', {
        message: String(error),
      });
    }
  };

  const signUpUser = async (formData: FormFields) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast('Error', {
        description: error.message,
        action: {
          label: 'Ok',
          onClick: () => console.log('Undo'),
        },
      });
      throw error;
    } else if (data) {
      let { data: users, error } = await supabase
        .from('users')
        .select('*')

        // Filters
        .eq('id', data?.user?.id)
        .single();
      if (error) {
        console.log(error);
      } else if (users) {
        if (users.role === 'student') {
          props.router.push('/studentPage');
        } else {
          props.router.push('/teacherPage');
        }
      }
      return data;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              {...register('email')}
              placeholder="john@doe.com"
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register('password')}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div className="pt-4 w-full">
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
