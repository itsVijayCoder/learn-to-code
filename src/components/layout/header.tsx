"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
   Menu,
   X,
   User,
   BookOpen,
   Settings,
   LogOut,
   BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Header = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const pathname = usePathname();
   const { data: session } = useSession();
   const user = session?.user;
   const isAuthenticated = !!user;

   const navigation = [
      { name: "Courses", href: "/courses" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Learning Path", href: "/learning-path" },
      { name: "Progress", href: "/progress" },
      { name: "Community", href: "/community" },
   ];

   // Add admin navigation for admin users
   const adminNavigation =
      user?.role === "admin"
         ? [
              {
                 name: "Course Management",
                 href: "/admin/courses",
                 isAdmin: true,
              },
           ]
         : [];

   const handleLogout = () => {
      signOut({ callbackUrl: "/auth/login" });
   };

   return (
      <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
         <div className='container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
            <div className='flex gap-6 md:gap-10'>
               <Link href='/' className='flex items-center space-x-2'>
                  <BookOpen className='h-6 w-6' />
                  <span className='font-bold text-xl'>Learn To Code</span>
               </Link>

               <nav className='hidden md:flex gap-6'>
                  {navigation.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                           "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                           pathname === item.href && "text-foreground"
                        )}
                     >
                        {item.name}
                     </Link>
                  ))}
                  {adminNavigation.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                           "flex items-center text-sm font-medium transition-colors hover:text-foreground",
                           "text-blue-600 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-md bg-blue-50",
                           pathname === item.href && "text-blue-700 bg-blue-100"
                        )}
                     >
                        <BookOpen className='h-3 w-3 mr-1' />
                        {item.name}
                     </Link>
                  ))}
               </nav>
            </div>

            <div className='flex flex-1 items-center justify-end space-x-4'>
               {isAuthenticated ? (
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant='ghost'
                           className='relative border-2 size-10 border-muted rounded-full'
                        >
                           {/* <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center'> */}
                           <User className=' size-4' />
                           {/* </div> */}
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        className='w-56'
                        align='end'
                        forceMount
                     >
                        <div className='flex items-center justify-start gap-2 p-2'>
                           <div className='flex flex-col space-y-1 leading-none'>
                              <p className='font-medium'>{user?.name}</p>
                              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                 {user?.email}
                              </p>
                              {user?.role === "admin" && (
                                 <p className='text-xs text-blue-600 font-medium'>
                                    Admin Access
                                 </p>
                              )}
                           </div>
                        </div>
                        <DropdownMenuSeparator />
                        {user?.role === "admin" && (
                           <>
                              <DropdownMenuItem asChild>
                                 <Link href='/admin'>
                                    <Settings className='mr-2 h-4 w-4' />
                                    Admin Panel
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                 <Link href='/admin/courses'>
                                    <BookOpen className='mr-2 h-4 w-4' />
                                    Course Management
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                           </>
                        )}
                        <DropdownMenuItem asChild>
                           <Link href='/dashboard'>
                              <BarChart3 className='mr-2 h-4 w-4' />
                              Dashboard
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href='/profile'>
                              <User className='mr-2 h-4 w-4' />
                              Profile
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href='/settings'>
                              <Settings className='mr-2 h-4 w-4' />
                              Settings
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                           <LogOut className='mr-2 h-4 w-4' />
                           Log out
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               ) : (
                  <div className='flex items-center space-x-4'>
                     <Button variant='ghost' asChild>
                        <Link href='/auth/login'>Sign In</Link>
                     </Button>
                     <Button asChild>
                        <Link href='/auth/register'>Get Started</Link>
                     </Button>
                  </div>
               )}

               <Button
                  variant='ghost'
                  className='md:hidden'
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               >
                  {isMobileMenuOpen ? (
                     <X className='h-5 w-5' />
                  ) : (
                     <Menu className='h-5 w-5' />
                  )}
               </Button>
            </div>
         </div>

         {/* Mobile menu */}
         {isMobileMenuOpen && (
            <div className='md:hidden'>
               <div className='space-y-1 px-2 pt-2 pb-3 shadow-lg bg-background border-t'>
                  {navigation.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                           "block px-3 py-2 text-base font-medium transition-colors hover:text-foreground",
                           pathname === item.href
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                     >
                        {item.name}
                     </Link>
                  ))}
                  {adminNavigation.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                           "flex items-center px-3 py-2 text-base font-medium transition-colors",
                           "text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md bg-blue-50 mx-2 mt-2",
                           pathname === item.href
                              ? "text-blue-700 bg-blue-100"
                              : ""
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                     >
                        <BookOpen className='h-4 w-4 mr-2' />
                        {item.name}
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </header>
   );
};

export { Header };
