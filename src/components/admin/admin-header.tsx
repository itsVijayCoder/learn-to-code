/**
 * Admin header component with navigation and logout
 */

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, BarChart3, BookOpen, Home, Shield } from "lucide-react";

export function AdminHeader() {
   const { data: session } = useSession();
   const user = session?.user;

   const handleLogout = () => {
      signOut({ callbackUrl: "/auth/login" });
   };

   return (
      <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
         <div className='container mx-auto flex h-16 items-center justify-between'>
            <div className='flex items-center space-x-4'>
               <Link href='/admin' className='flex items-center space-x-2'>
                  <Shield className='h-6 w-6' />
                  <span className='font-bold text-xl'>Admin Panel</span>
               </Link>

               <nav className='hidden md:flex items-center space-x-6 text-sm font-medium'>
                  <Link
                     href='/admin'
                     className='transition-colors hover:text-foreground/80 text-foreground/60'
                  >
                     Dashboard
                  </Link>
                  <Link
                     href='/dashboard'
                     className='transition-colors hover:text-foreground/80 text-foreground/60'
                  >
                     User Dashboard
                  </Link>
                  <Link
                     href='/courses'
                     className='transition-colors hover:text-foreground/80 text-foreground/60'
                  >
                     Courses
                  </Link>
               </nav>
            </div>

            <div className='flex items-center space-x-4'>
               {user && (
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant='ghost'
                           className='relative h-8 w-8 rounded-full'
                        >
                           <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center'>
                              <User className='h-4 w-4' />
                           </div>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        className='w-56'
                        align='end'
                        forceMount
                     >
                        <div className='flex items-center justify-start gap-2 p-2'>
                           <div className='flex flex-col space-y-1 leading-none'>
                              <p className='font-medium'>{user.name}</p>
                              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                 {user.email}
                              </p>
                              <p className='text-xs text-blue-600 font-medium'>
                                 Admin Access
                              </p>
                           </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                           <Link href='/admin'>
                              <Shield className='mr-2 h-4 w-4' />
                              Admin Dashboard
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href='/dashboard'>
                              <BarChart3 className='mr-2 h-4 w-4' />
                              User Dashboard
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href='/courses'>
                              <BookOpen className='mr-2 h-4 w-4' />
                              Browse Courses
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href='/'>
                              <Home className='mr-2 h-4 w-4' />
                              Home Page
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                           <LogOut className='mr-2 h-4 w-4' />
                           Log out
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               )}
            </div>
         </div>
      </header>
   );
}
