"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
import { PageTransition } from "@/components/animation";
import { useUIStore } from "@/stores/useUIStore";
import { cn } from "@/lib/utils";

interface LayoutProps {
   children: React.ReactNode;
   showSidebar?: boolean;
   showFooter?: boolean;
}

const Layout = ({
   children,
   showSidebar = true,
   showFooter = true,
}: LayoutProps) => {
   const { sidebarCollapsed } = useUIStore();

   return (
      <div className='min-h-screen bg-background'>
         <Header />

         <div className='flex'>
            {showSidebar && <Sidebar />}

            <main
               className={cn(
                  "flex-1 transition-all duration-300",
                  showSidebar && (sidebarCollapsed ? "ml-16" : "ml-64")
               )}
            >
               <PageTransition>
                  <div className='container mx-auto px-4 py-8'>{children}</div>
               </PageTransition>
            </main>
         </div>

         {showFooter && <Footer />}
      </div>
   );
};

// Specialized layout components
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
   <Layout showSidebar={true} showFooter={false}>
      {children}
   </Layout>
);

const CourseLayout = ({ children }: { children: React.ReactNode }) => (
   <Layout showSidebar={false} showFooter={false}>
      {children}
   </Layout>
);

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
   <Layout showSidebar={false} showFooter={true}>
      {children}
   </Layout>
);

export { Layout, DashboardLayout, CourseLayout, PublicLayout };
