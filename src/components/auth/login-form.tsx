"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Github, Chrome } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/shared";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
   email: z.string().email("Please enter a valid email address"),
   password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
   callbackUrl?: string;
   className?: string;
}

const LoginForm = ({
   callbackUrl = "/dashboard",
   className,
}: LoginFormProps) => {
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
   });

   const onSubmit = async (data: LoginFormData) => {
      setIsLoading(true);
      setError(null);

      try {
         const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
         });

         if (result?.error) {
            setError("Invalid email or password. Please try again.");
         } else {
            // Refresh the session and redirect
            await getSession();
            router.push(callbackUrl);
            router.refresh();
         }
      } catch {
         setError("An unexpected error occurred. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleOAuthSignIn = async (provider: "github" | "google") => {
      setIsLoading(true);
      setError(null);

      try {
         await signIn(provider, { callbackUrl });
      } catch {
         setError("An error occurred during sign in. Please try again.");
         setIsLoading(false);
      }
   };

   return (
      <Card className={cn("w-full max-w-md", className)}>
         <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>
               Sign In
            </CardTitle>
            <CardDescription className='text-center'>
               Enter your credentials to access your account
            </CardDescription>
         </CardHeader>

         <CardContent className='space-y-6'>
            {error && (
               <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
               </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
               <div className='space-y-2'>
                  <label htmlFor='email' className='text-sm font-medium'>
                     Email
                  </label>
                  <Input
                     id='email'
                     type='email'
                     placeholder='john@example.com'
                     {...register("email")}
                     className={cn(errors.email && "border-destructive")}
                     disabled={isLoading}
                  />
                  {errors.email && (
                     <p className='text-sm text-destructive'>
                        {errors.email.message}
                     </p>
                  )}
               </div>

               <div className='space-y-2'>
                  <label htmlFor='password' className='text-sm font-medium'>
                     Password
                  </label>
                  <div className='relative'>
                     <Input
                        id='password'
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        {...register("password")}
                        className={cn(
                           errors.password && "border-destructive",
                           "pr-10"
                        )}
                        disabled={isLoading}
                     />
                     <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                        disabled={isLoading}
                     >
                        {showPassword ? (
                           <EyeOff className='h-4 w-4' />
                        ) : (
                           <Eye className='h-4 w-4' />
                        )}
                     </button>
                  </div>
                  {errors.password && (
                     <p className='text-sm text-destructive'>
                        {errors.password.message}
                     </p>
                  )}
               </div>

               <div className='flex items-center justify-between'>
                  <Link
                     href='/auth/forgot-password'
                     className='text-sm text-primary hover:underline'
                  >
                     Forgot password?
                  </Link>
               </div>

               <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? (
                     <>
                        <LoadingSpinner size='sm' className='mr-2' />
                        Signing in...
                     </>
                  ) : (
                     "Sign In"
                  )}
               </Button>
            </form>

            <div className='relative'>
               <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
               </div>
               <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                     Or continue with
                  </span>
               </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
               <Button
                  variant='outline'
                  onClick={() => handleOAuthSignIn("github")}
                  disabled={isLoading}
                  className='w-full'
               >
                  <Github className='h-4 w-4 mr-2' />
                  GitHub
               </Button>
               <Button
                  variant='outline'
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={isLoading}
                  className='w-full'
               >
                  <Chrome className='h-4 w-4 mr-2' />
                  Google
               </Button>
            </div>

            <p className='text-center text-sm text-muted-foreground'>
               Don&apos;t have an account?{" "}
               <Link
                  href='/auth/register'
                  className='text-primary hover:underline'
               >
                  Create one here
               </Link>
            </p>
         </CardContent>
      </Card>
   );
};

export { LoginForm };
