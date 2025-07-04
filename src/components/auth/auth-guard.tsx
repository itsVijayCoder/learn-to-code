"use client";

import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

   useEffect(() => {
      if (status === "loading") return; // Still loading

      // Check if authentication is required
      if (requireAuth && !session) {
         router.push(fallbackUrl);
         return;
      }

      // Check if user has required role
      if (requiredRole && session?.user?.role !== requiredRole) {
         // Redirect based on current role or back to login
         if (session?.user?.role === "student") {
            router.push("/dashboard");
         } else if (session?.user?.role === "instructor") {
            router.push("/instructor");
         } else if (session?.user?.role === "admin") {
            router.push("/admin");
         } else {
            router.push(fallbackUrl);
         }
         return;
      }

      // If not requiring auth and user is authenticated, redirect to appropriate dashboard
      if (!requireAuth && session) {
         if (session.user.role === "admin") {
            router.push("/admin");
         } else if (session.user.role === "instructor") {
            router.push("/instructor");
         } else {
            router.push("/dashboard");
         }
         return;
      }
   }, [session, status, requireAuth, requiredRole, router, fallbackUrl]);

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

   // Don't render children if redirecting
   if (requireAuth && !session) {
      return null;
   }

   if (requiredRole && session?.user?.role !== requiredRole) {
      return null;
   }

   if (!requireAuth && session) {
      return null;
   }

   return <>{children}</>;
};

export { AuthGuard };
