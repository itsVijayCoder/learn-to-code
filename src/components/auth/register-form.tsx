"use client";

import { useState } from "react";
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

const registerSchema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
   className?: string;
}

const RegisterForm = ({ className }: RegisterFormProps) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
   });

   const onSubmit = async (data: RegisterFormData) => {
      setIsLoading(true);
      setError(null);

      try {
         // TODO: Replace with actual API call
         const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: data.name,
               email: data.email,
               password: data.password,
            }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
         }

         setSuccess(true);
         setTimeout(() => {
            router.push("/auth/login?message=Registration successful");
         }, 2000);
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "An unexpected error occurred"
         );
      } finally {
         setIsLoading(false);
      }
   };

   const handleOAuthSignIn = async (provider: "github" | "google") => {
      setIsLoading(true);
      setError(null);

      try {
         // For OAuth registration, we'll use the same signIn function
         // The user will be created automatically on first OAuth sign in
         const { signIn } = await import("next-auth/react");
         await signIn(provider, { callbackUrl: "/dashboard" });
      } catch {
         setError("An error occurred during sign in. Please try again.");
         setIsLoading(false);
      }
   };

   if (success) {
      return (
         <Card className={cn("w-full max-w-md", className)}>
            <CardContent className='pt-6'>
               <div className='text-center space-y-4'>
                  <div className='text-green-600 text-5xl'>✓</div>
                  <h2 className='text-xl font-semibold'>Account Created!</h2>
                  <p className='text-muted-foreground'>
                     Your account has been created successfully. Redirecting to
                     login...
                  </p>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card className={cn("w-full max-w-md", className)}>
         <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>
               Create Account
            </CardTitle>
            <CardDescription className='text-center'>
               Sign up to start your coding journey
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
                  <label htmlFor='name' className='text-sm font-medium'>
                     Full Name
                  </label>
                  <Input
                     id='name'
                     type='text'
                     placeholder='John Doe'
                     {...register("name")}
                     className={cn(errors.name && "border-destructive")}
                     disabled={isLoading}
                  />
                  {errors.name && (
                     <p className='text-sm text-destructive'>
                        {errors.name.message}
                     </p>
                  )}
               </div>

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
                        placeholder='Create a strong password'
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

               <div className='space-y-2'>
                  <label
                     htmlFor='confirmPassword'
                     className='text-sm font-medium'
                  >
                     Confirm Password
                  </label>
                  <div className='relative'>
                     <Input
                        id='confirmPassword'
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirm your password'
                        {...register("confirmPassword")}
                        className={cn(
                           errors.confirmPassword && "border-destructive",
                           "pr-10"
                        )}
                        disabled={isLoading}
                     />
                     <button
                        type='button'
                        onClick={() =>
                           setShowConfirmPassword(!showConfirmPassword)
                        }
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                        disabled={isLoading}
                     >
                        {showConfirmPassword ? (
                           <EyeOff className='h-4 w-4' />
                        ) : (
                           <Eye className='h-4 w-4' />
                        )}
                     </button>
                  </div>
                  {errors.confirmPassword && (
                     <p className='text-sm text-destructive'>
                        {errors.confirmPassword.message}
                     </p>
                  )}
               </div>

               <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? (
                     <>
                        <LoadingSpinner size='sm' className='mr-2' />
                        Creating account...
                     </>
                  ) : (
                     "Create Account"
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
               Already have an account?{" "}
               <Link
                  href='/auth/login'
                  className='text-primary hover:underline'
               >
                  Sign in here
               </Link>
            </p>
         </CardContent>
      </Card>
   );
};

export { RegisterForm };
