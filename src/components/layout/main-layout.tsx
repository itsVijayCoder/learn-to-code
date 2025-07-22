/**
 * Main layout component with header and footer
 */

"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface MainLayoutProps {
   children: React.ReactNode;
   showHeader?: boolean;
   showFooter?: boolean;
}

export function MainLayout({
   children,
   showHeader = true,
   showFooter = true,
}: MainLayoutProps) {
   return (
      <div className='min-h-screen flex flex-col'>
         {showHeader && <Header />}
         <main className='flex-1'>{children}</main>
         {showFooter && <Footer />}
      </div>
   );
}
