import { Suspense } from "react";
import { AuthGuard, LoginForm } from "@/components/auth";
import { LoadingSpinner } from "@/components/shared";

export default function LoginPage() {
   return (
      <AuthGuard requireAuth={false}>
         <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4'>
            <Suspense fallback={<LoadingSpinner size='lg' />}>
               <LoginForm />
            </Suspense>
         </div>
      </AuthGuard>
   );
}
