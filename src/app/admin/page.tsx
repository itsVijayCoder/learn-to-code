/**
 * Admin dashboard page
 */

import { Metadata } from "next";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Users,
   BookOpen,
   BarChart3,
   Settings,
   Activity,
   TrendingUp,
   AlertCircle,
   CheckCircle2,
   Palette,
} from "lucide-react";
import Link from "next/link";
import { IconButton } from "@/components/ui";

export const metadata: Metadata = {
   title: "Admin Dashboard - Learn To Code",
   description: "Admin panel for managing the learning platform",
};

export default function AdminDashboardPage() {
   return (
      <div className='space-y-8'>
         {/* Featured: Course Management System */}
         <Card className='border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'>
            <CardHeader>
               <CardTitle className='flex items-center gap-3 text-blue-800'>
                  <BookOpen className='h-6 w-6' />
                  Course Management System
                  <Badge variant='default' className='bg-blue-600'>
                     Ready
                  </Badge>
               </CardTitle>
               <CardDescription className='text-blue-700'>
                  Complete functional programming-based course management with
                  CRUD operations, analytics, and interactive demos.
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                  <div className='flex items-center gap-2 text-blue-700'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Zero Classes - Pure Functions
                  </div>
                  <div className='flex items-center gap-2 text-blue-700'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     SOLID & DRY Principles
                  </div>
                  <div className='flex items-center gap-2 text-blue-700'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Real-time Analytics
                  </div>
               </div>
               <div className='flex gap-3'>
                  <Link href='/admin/courses'>
                     <IconButton
                        leftIcon={<BookOpen />}
                        className='bg-blue-600 hover:bg-blue-700'
                     >
                        {/* <BookOpen className='h-4 w-4 mr-2' /> */}
                        Open Course Management
                     </IconButton>
                  </Link>
                  <Link href='/admin/courses' className='flex items-center'>
                     <IconButton
                        variant='outline'
                        leftIcon={<Activity />}
                        className='border-blue-300 text-blue-700 hover:bg-blue-100'
                     >
                        {/* <Activity className='h-4 w-4 mr-2' /> */}
                        View Functional Demo
                     </IconButton>
                  </Link>
               </div>
            </CardContent>
         </Card>

         {/* Quick Stats */}
         <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                     Total Users
                  </CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>1,234</div>
                  <p className='text-xs text-muted-foreground'>
                     +12% from last month
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                     Total Courses
                  </CardTitle>
                  <BookOpen className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>42</div>
                  <p className='text-xs text-muted-foreground'>
                     +3 new this month
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                     Enrollments
                  </CardTitle>
                  <TrendingUp className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>3,456</div>
                  <p className='text-xs text-muted-foreground'>
                     +25% from last month
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                     Completion Rate
                  </CardTitle>
                  <BarChart3 className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>73%</div>
                  <p className='text-xs text-muted-foreground'>
                     +5% from last month
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Development Notice */}
         <Card className='border-green-200 bg-green-50'>
            <CardHeader>
               <CardTitle className='flex items-center gap-2 text-green-800'>
                  <CheckCircle2 className='h-5 w-5' />
                  Course Management System Ready
               </CardTitle>
               <CardDescription className='text-green-700'>
                  Full functional programming-based course management system is
                  now available with CRUD operations, analytics, and more.
               </CardDescription>
            </CardHeader>
            <CardContent className='text-green-700'>
               <p className='mb-4'>✅ Now Available:</p>
               <ul className='space-y-2 mb-6'>
                  <li className='flex items-center gap-2'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Complete course CRUD operations
                  </li>
                  <li className='flex items-center gap-2'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Functional programming architecture (no classes)
                  </li>
                  <li className='flex items-center gap-2'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Course analytics and metrics
                  </li>
                  <li className='flex items-center gap-2'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Search and filtering capabilities
                  </li>
                  <li className='flex items-center gap-2'>
                     <CheckCircle2 className='h-4 w-4 text-green-600' />
                     Interactive functional programming demos
                  </li>
               </ul>
               <p className='mb-4'>🚧 Coming soon:</p>
               <ul className='space-y-2 mb-6'>
                  <li className='flex items-center gap-2'>
                     <AlertCircle className='h-4 w-4 text-orange-600' />
                     User management interface
                  </li>
                  <li className='flex items-center gap-2'>
                     <AlertCircle className='h-4 w-4 text-orange-600' />
                     Advanced analytics dashboard
                  </li>
                  <li className='flex items-center gap-2'>
                     <AlertCircle className='h-4 w-4 text-orange-600' />
                     Content management tools
                  </li>
               </ul>
               <div className='flex gap-3'>
                  <Button asChild>
                     <Link href='/dashboard'>View User Dashboard</Link>
                  </Button>
                  <Button variant='outline' asChild>
                     <Link href='/courses'>Browse Courses</Link>
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Quick Actions */}
         <div className='grid gap-6 md:grid-cols-2'>
            <Card>
               <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                     <Activity className='h-5 w-5' />
                     Recent Activity
                  </CardTitle>
                  <CardDescription>
                     Latest platform activities and user engagement
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className='space-y-4'>
                     <div className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                        <div className='flex-1'>
                           <p className='text-sm'>New user registration</p>
                           <p className='text-xs text-muted-foreground'>
                              2 minutes ago
                           </p>
                        </div>
                     </div>
                     <div className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                        <div className='flex-1'>
                           <p className='text-sm'>Course completed</p>
                           <p className='text-xs text-muted-foreground'>
                              15 minutes ago
                           </p>
                        </div>
                     </div>
                     <div className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                        <div className='flex-1'>
                           <p className='text-sm'>New course enrollment</p>
                           <p className='text-xs text-muted-foreground'>
                              1 hour ago
                           </p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                     <Settings className='h-5 w-5' />
                     Admin Actions
                  </CardTitle>
                  <CardDescription>
                     Quick access to admin functions
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className='space-y-3'>
                     <Button
                        variant='outline'
                        className='w-full justify-start'
                        asChild
                     >
                        <Link href='/admin/test'>
                           <Palette className='h-4 w-4 mr-2' />
                           UI Components Test
                           <Badge variant='success' className='ml-auto'>
                              Available
                           </Badge>
                        </Link>
                     </Button>
                     <Button
                        variant='outline'
                        className='w-full justify-start'
                        disabled
                     >
                        <Users className='h-4 w-4 mr-2' />
                        Manage Users
                        <Badge variant='secondary' className='ml-auto'>
                           Soon
                        </Badge>
                     </Button>
                     <Button
                        variant='outline'
                        className='w-full justify-start'
                        asChild
                     >
                        <Link href='/admin/courses'>
                           <BookOpen className='h-4 w-4 mr-2' />
                           Course Management
                           <Badge variant='success' className='ml-auto'>
                              Available
                           </Badge>
                        </Link>
                     </Button>
                     <Button
                        variant='outline'
                        className='w-full justify-start'
                        disabled
                     >
                        <BarChart3 className='h-4 w-4 mr-2' />
                        View Analytics
                        <Badge variant='secondary' className='ml-auto'>
                           Soon
                        </Badge>
                     </Button>
                     <Button
                        variant='outline'
                        className='w-full justify-start'
                        disabled
                     >
                        <Settings className='h-4 w-4 mr-2' />
                        Platform Settings
                        <Badge variant='secondary' className='ml-auto'>
                           Soon
                        </Badge>
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
