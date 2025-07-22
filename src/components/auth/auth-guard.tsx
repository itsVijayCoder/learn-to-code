"use client";

import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingSpinner } from "@/components/shared";

interface AuthGuardProps {
   children: ReactNode;
   requireAuth?: boolean;
   requiredRole?: "student" | "instructor" | "admin";
   fallbackUrl?: string;
}

const AuthGuard = ({
   children,
   requireAuth = true,
   requiredRole,
   fallbackUrl = "/auth/login",
}: AuthGuardProps) => {
   const { data: session, status } = useSession();
   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      if (status === "loading") return; // Still loading

      // Check if authentication is required
      if (requireAuth && !session) {
         router.push(fallbackUrl);
         return;
      }

      // Check if user has required role
      if (requiredRole && session?.user?.role !== requiredRole) {
         // Prevent redirect loops by checking current path
         if (pathname === "/admin" && session?.user?.role !== "admin") {
            router.push("/dashboard");
            return;
         }

         if (pathname === "/dashboard" && session?.user?.role === "admin") {
            // Admin users can access dashboard, don't redirect
            return;
         }

         // Redirect based on current role
         if (session?.user?.role === "admin") {
            router.push("/admin");
         } else {
            router.push("/dashboard");
         }
         return;
      }

      // If not requiring auth and user is authenticated, redirect to appropriate dashboard
      if (!requireAuth && session) {
         // Only redirect if on login page or similar
         if (pathname === "/auth/login" || pathname === "/") {
            if (session?.user?.role === "admin") {
               router.push("/admin");
            } else {
               router.push("/dashboard");
            }
         }
         return;
      }
   }, [
      session,
      status,
      requireAuth,
      requiredRole,
      router,
      fallbackUrl,
      pathname,
   ]);

   // Show loading spinner while checking auth status
   if (status === "loading") {
      return (
         <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
               <LoadingSpinner size='lg' />
               <p className='mt-4 text-muted-foreground'>Loading...</p>
            </div>
         </div>
      );
   }

   // Don't render children if redirecting due to no auth
   if (requireAuth && !session) {
      return null;
   }

   // Don't render children if redirecting due to wrong role
   if (requiredRole && session?.user?.role !== requiredRole) {
      // But allow admin users to access dashboard even if it doesn't require admin role
      if (!(pathname === "/dashboard" && session?.user?.role === "admin")) {
         return null;
      }
   }

   // Don't render children if redirecting authenticated user from login page
   if (
      !requireAuth &&
      session &&
      (pathname === "/auth/login" || pathname === "/")
   ) {
      return null;
   }

   return <>{children}</>;
};

export { AuthGuard };
