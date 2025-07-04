/**
 * Admin dashboard layout
 */

import { AuthGuard } from "@/components/auth";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <AuthGuard requireAuth requiredRole='admin'>
         <div className='min-h-screen bg-background'>
            <AdminHeader />
            <div className='container mx-auto py-8'>
               <div className='mb-8'>
                  <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                  <p className='text-muted-foreground'>
                     Manage courses, users, and platform settings
                  </p>
               </div>
               {children}
            </div>
         </div>
      </AuthGuard>
   );
}
