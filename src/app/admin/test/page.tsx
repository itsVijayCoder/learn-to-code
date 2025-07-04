/**
 * Admin UI Testing Page
 * Comprehensive testing interface for all UI components
 * Only accessible to admin users
 */

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ArrowRight,
   ArrowLeft,
   Download,
   Upload,
   Plus,
   Minus,
   Search,
   User,
   Mail,
   Lock,
   Eye,
   Star,
   Heart,
   CheckCircle,
   AlertCircle,
   Info,
} from "lucide-react";

export default function AdminUITestPage() {
   return (
      <div className='container mx-auto p-8 space-y-12'>
         <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold mb-2'>UI Components Testing</h1>
            <p className='text-muted-foreground'>
               Comprehensive testing interface for all UI components (Admin
               Only)
            </p>
         </div>

         {/* Button Components */}
         <Card>
            <CardHeader>
               <CardTitle>Button Components</CardTitle>
               <CardDescription>
                  Testing Button and IconButton components with various props
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     Button Component with Icons
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                     <Button leftIcon={<Plus />}>Add Item</Button>
                     <Button rightIcon={<ArrowRight />} variant='outline'>
                        Continue
                     </Button>
                     <Button
                        leftIcon={<Download />}
                        rightIcon={<ArrowRight />}
                        variant='secondary'
                     >
                        Download & Continue
                     </Button>
                     <Button leftIcon={<Upload />} size='sm' iconSize='sm'>
                        Small Upload
                     </Button>
                     <Button
                        rightIcon={<Minus />}
                        size='lg'
                        iconSize='lg'
                        variant='destructive'
                     >
                        Large Remove
                     </Button>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     IconButton Component
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                     <IconButton leftIcon={<Plus />}>Add Item</IconButton>
                     <IconButton rightIcon={<ArrowRight />} variant='outline'>
                        Continue
                     </IconButton>
                     <IconButton
                        leftIcon={<Download />}
                        rightIcon={<ArrowRight />}
                        variant='secondary'
                     >
                        Download & Continue
                     </IconButton>
                     <IconButton leftIcon={<Upload />} size='sm' iconSize='sm'>
                        Small Upload
                     </IconButton>
                     <IconButton
                        rightIcon={<Minus />}
                        size='lg'
                        iconSize='lg'
                        variant='destructive'
                     >
                        Large Remove
                     </IconButton>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>Loading States</h3>
                  <div className='flex flex-wrap gap-3'>
                     <Button leftIcon={<Plus />} isLoading>
                        Loading...
                     </Button>
                     <IconButton
                        rightIcon={<ArrowRight />}
                        isLoading
                        variant='outline'
                     >
                        Loading...
                     </IconButton>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     Icon Size Variations
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                     <Button leftIcon={<ArrowLeft />} iconSize='sm'>
                        Small Icons
                     </Button>
                     <Button leftIcon={<ArrowLeft />} iconSize='md'>
                        Medium Icons
                     </Button>
                     <Button leftIcon={<ArrowLeft />} iconSize='lg'>
                        Large Icons
                     </Button>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     Button Variants
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                     <Button variant='default'>Default</Button>
                     <Button variant='secondary'>Secondary</Button>
                     <Button variant='outline'>Outline</Button>
                     <Button variant='ghost'>Ghost</Button>
                     <Button variant='link'>Link</Button>
                     <Button variant='destructive'>Destructive</Button>
                     <Button variant='gradient'>Gradient</Button>
                     <Button variant='glass'>Glass</Button>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>Button Sizes</h3>
                  <div className='flex flex-wrap items-center gap-3'>
                     <Button size='sm'>Small</Button>
                     <Button size='default'>Default</Button>
                     <Button size='lg'>Large</Button>
                     <Button size='xl'>Extra Large</Button>
                     <Button size='icon'>
                        <Plus />
                     </Button>
                     <Button size='icon-sm'>
                        <Plus />
                     </Button>
                     <Button size='icon-lg'>
                        <Plus />
                     </Button>
                  </div>
               </section>
            </CardContent>
         </Card>

         {/* Badge Components */}
         <Card>
            <CardHeader>
               <CardTitle>Badge Components</CardTitle>
               <CardDescription>
                  Testing Badge component variants and sizes
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
               <section>
                  <h3 className='text-lg font-semibold mb-3'>Badge Variants</h3>
                  <div className='flex flex-wrap gap-3'>
                     <Badge>Default</Badge>
                     <Badge variant='secondary'>Secondary</Badge>
                     <Badge variant='outline'>Outline</Badge>
                     <Badge variant='destructive'>Destructive</Badge>
                     <Badge variant='success'>Success</Badge>
                     <Badge variant='warning'>Warning</Badge>
                     <Badge variant='info'>Info</Badge>
                     <Badge variant='glass'>Glass</Badge>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     Badge with Icons
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                     <Badge leftIcon={<Star />}>Featured</Badge>
                     <Badge rightIcon={<Heart />} variant='destructive'>
                        Favorite
                     </Badge>
                     <Badge
                        leftIcon={<CheckCircle />}
                        rightIcon={<ArrowRight />}
                        variant='success'
                     >
                        Completed
                     </Badge>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>Badge Sizes</h3>
                  <div className='flex flex-wrap items-center gap-3'>
                     <Badge size='sm'>Small</Badge>
                     <Badge size='default'>Default</Badge>
                     <Badge size='lg'>Large</Badge>
                  </div>
               </section>
            </CardContent>
         </Card>

         {/* Input Components */}
         <Card>
            <CardHeader>
               <CardTitle>Input Components</CardTitle>
               <CardDescription>
                  Testing Input component with icons and variants
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     Input with Icons
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
                     <Input leftIcon={<Search />} placeholder='Search...' />
                     <Input rightIcon={<User />} placeholder='Username' />
                     <Input
                        leftIcon={<Mail />}
                        type='email'
                        placeholder='Email'
                     />
                     <Input
                        leftIcon={<Lock />}
                        rightIcon={<Eye />}
                        type='password'
                        placeholder='Password'
                     />
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>Input Variants</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
                     <Input variant='default' placeholder='Default variant' />
                     <Input variant='ghost' placeholder='Ghost variant' />
                     <Input variant='glass' placeholder='Glass variant' />
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>Input States</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
                     <Input placeholder='Normal input' />
                     <Input placeholder='Disabled input' disabled />
                     <Input
                        placeholder='Error state'
                        error='This field is required'
                     />
                  </div>
               </section>
            </CardContent>
         </Card>

         {/* Card Components */}
         <Card>
            <CardHeader>
               <CardTitle>Card Components</CardTitle>
               <CardDescription>
                  Testing Card component layouts and content
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <CheckCircle className='h-5 w-5 text-green-500' />
                           Success Card
                        </CardTitle>
                        <CardDescription>
                           This is a success state card
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <p className='text-sm'>
                           Content goes here with success styling.
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <AlertCircle className='h-5 w-5 text-red-500' />
                           Error Card
                        </CardTitle>
                        <CardDescription>
                           This is an error state card
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <p className='text-sm'>
                           Content goes here with error styling.
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <Info className='h-5 w-5 text-blue-500' />
                           Info Card
                        </CardTitle>
                        <CardDescription>
                           This is an info state card
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <p className='text-sm'>
                           Content goes here with info styling.
                        </p>
                     </CardContent>
                  </Card>
               </div>
            </CardContent>
         </Card>

         {/* Interactive Elements */}
         <Card>
            <CardHeader>
               <CardTitle>Interactive Elements</CardTitle>
               <CardDescription>
                  Testing interactive components and states
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
               <section>
                  <h3 className='text-lg font-semibold mb-3'>Hover States</h3>
                  <div className='flex flex-wrap gap-3'>
                     <Button className='hover:scale-105 transition-transform'>
                        Hover Scale
                     </Button>
                     <Button
                        variant='outline'
                        className='hover:bg-primary hover:text-primary-foreground'
                     >
                        Hover Color
                     </Button>
                     <Badge className='hover:shadow-lg transition-shadow cursor-pointer'>
                        Hover Shadow
                     </Badge>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>Focus States</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
                     <Input placeholder='Focus me to see ring' />
                     <Button>Focus with Tab</Button>
                  </div>
               </section>

               <section>
                  <h3 className='text-lg font-semibold mb-3'>
                     Disabled States
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                     <Button disabled>Disabled Button</Button>
                     <Button disabled leftIcon={<Plus />}>
                        Disabled with Icon
                     </Button>
                     <Badge className='opacity-50 cursor-not-allowed'>
                        Disabled Badge
                     </Badge>
                  </div>
               </section>
            </CardContent>
         </Card>

         {/* Responsive Design */}
         <Card>
            <CardHeader>
               <CardTitle>Responsive Design</CardTitle>
               <CardDescription>
                  Testing responsive behavior across different screen sizes
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                     <Button className='w-full'>Responsive 1</Button>
                     <Button className='w-full' variant='outline'>
                        Responsive 2
                     </Button>
                     <Button className='w-full' variant='secondary'>
                        Responsive 3
                     </Button>
                     <Button className='w-full' variant='ghost'>
                        Responsive 4
                     </Button>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3'>
                     <Input className='flex-1' placeholder='Flexible input' />
                     <Button>Submit</Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
