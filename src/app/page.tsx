/**
 * Modern Landing Page for Learn To Code Platform
 */

import Link from "next/link";
import {
   ArrowRight,
   CheckCircle,
   Star,
   Users,
   BookOpen,
   Award,
   PlayCircle,
   Code,
   Zap,
   Shield,
   Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/main-layout";

const features = [
   {
      icon: Code,
      title: "Interactive Coding",
      description:
         "Learn by doing with our interactive code editor and real-time feedback.",
   },
   {
      icon: Zap,
      title: "Fast Learning",
      description:
         "Accelerated learning paths designed to get you coding professionally faster.",
   },
   {
      icon: Shield,
      title: "Industry-Ready",
      description:
         "Learn the latest technologies and best practices used by top companies.",
   },
   {
      icon: Users,
      title: "Community Support",
      description:
         "Join thousands of developers learning together in our supportive community.",
   },
   {
      icon: Award,
      title: "Certificates",
      description:
         "Earn industry-recognized certificates to showcase your skills.",
   },
   {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description:
         "From basics to advanced topics, we cover everything you need to know.",
   },
];

const stats = [
   { label: "Students Enrolled", value: "50,000+" },
   { label: "Courses Available", value: "200+" },
   { label: "Success Rate", value: "94%" },
   { label: "Countries Reached", value: "150+" },
];

const testimonials = [
   {
      name: "Sarah Johnson",
      role: "Frontend Developer at Google",
      avatar: "SJ",
      content:
         "Learn To Code transformed my career. The hands-on projects and mentorship helped me land my dream job.",
      rating: 5,
   },
   {
      name: "Mike Chen",
      role: "Full Stack Engineer at Netflix",
      avatar: "MC",
      content:
         "The curriculum is top-notch and always up-to-date with industry standards. Highly recommend!",
      rating: 5,
   },
   {
      name: "Emily Rodriguez",
      role: "Software Engineer at Microsoft",
      avatar: "ER",
      content:
         "Started as a complete beginner and now I'm building scalable applications. Amazing journey!",
      rating: 5,
   },
];

export default function HomePage() {
   return (
      <MainLayout>
         {/* Hero Section */}
         <section className='relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
            <div className='container mx-auto px-4 py-20 lg:py-32'>
               <div className='grid lg:grid-cols-2 gap-12 items-center'>
                  <div className='space-y-8'>
                     <div className='space-y-4'>
                        <Badge variant='secondary' className='w-fit'>
                           🚀 Join 50,000+ developers worldwide
                        </Badge>
                        <h1 className='text-4xl lg:text-6xl font-bold tracking-tight'>
                           Master Coding
                           <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                              {" "}
                              Skills{" "}
                           </span>
                           That Matter
                        </h1>
                        <p className='text-xl text-muted-foreground leading-relaxed'>
                           Learn programming through hands-on projects,
                           real-world applications, and personalized mentorship.
                           Start your coding journey today and build the career
                           you&apos;ve always wanted.
                        </p>
                     </div>

                     <div className='flex flex-col sm:flex-row gap-4'>
                        <Link href='/auth/register'>
                           <Button
                              size='lg'
                              className='text-lg px-8'
                              // rightIcon={<ArrowRight />}
                              // asChild
                           >
                              <ArrowRight />
                              Start Learning Free
                           </Button>
                        </Link>
                        <Link href='/courses'>
                           <Button
                              size='lg'
                              variant='outline'
                              className='text-lg px-8'
                              // leftIcon={<PlayCircle />}
                              // asChild
                           >
                              <PlayCircle />
                              Explore Courses
                           </Button>
                        </Link>
                     </div>

                     <div className='flex items-center space-x-8 text-sm text-muted-foreground'>
                        <div className='flex items-center space-x-2'>
                           <CheckCircle className='h-4 w-4 text-green-500' />
                           <span>No credit card required</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                           <CheckCircle className='h-4 w-4 text-green-500' />
                           <span>Free trial available</span>
                        </div>
                     </div>
                  </div>

                  <div className='relative'>
                     <div className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border'>
                        <div className='flex items-center space-x-2 mb-4'>
                           <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                           <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                           <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                        </div>
                        <div className='bg-gray-900 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm'>
                           <div className='text-green-400'>
                              $ npm install success
                           </div>
                           <div className='text-blue-400'>
                              → Building amazing apps...
                           </div>
                           <div className='text-purple-400'>
                              ✓ Career launched!
                           </div>
                        </div>
                     </div>
                     {/* Floating elements */}
                     <div className='absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg'>
                        <Code className='h-6 w-6' />
                     </div>
                     <div className='absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-lg shadow-lg'>
                        <Zap className='h-6 w-6' />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className='py-16 bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-4'>
               <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                  {stats.map((stat, index) => (
                     <div key={index} className='text-center'>
                        <div className='text-3xl lg:text-4xl font-bold text-blue-600 mb-2'>
                           {stat.value}
                        </div>
                        <div className='text-muted-foreground'>
                           {stat.label}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Admin Demo Banner */}
         <section className='py-12 bg-gradient-to-r from-blue-600 to-indigo-700'>
            <div className='container mx-auto px-4'>
               <div className='text-center space-y-6'>
                  <div className='flex justify-center items-center gap-3'>
                     <Shield className='h-8 w-8 text-blue-200' />
                     <h2 className='text-2xl lg:text-3xl font-bold text-white'>
                        🎯 Live Demo: Functional Programming Admin System
                     </h2>
                  </div>
                  <p className='text-blue-100 text-lg max-w-3xl mx-auto'>
                     Experience our advanced course management system built with
                     pure functional programming principles. Zero classes, SOLID
                     architecture, and real-time analytics.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                     <Button
                        size='lg'
                        className='bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8'
                        asChild
                     >
                        <Link href='/admin/courses'>
                           <BookOpen className='h-5 w-5 mr-2' />
                           View Course Management Demo
                        </Link>
                     </Button>
                     <Button
                        size='lg'
                        variant='outline'
                        className='border-blue-200 text-white hover:bg-blue-600 px-8'
                        asChild
                     >
                        <Link href='/admin'>
                           <Settings className='h-5 w-5 mr-2' />
                           Admin Dashboard
                        </Link>
                     </Button>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-200 max-w-2xl mx-auto'>
                     <div className='flex items-center justify-center gap-2'>
                        <CheckCircle className='h-4 w-4 text-green-300' />
                        No Classes - Pure Functions
                     </div>
                     <div className='flex items-center justify-center gap-2'>
                        <CheckCircle className='h-4 w-4 text-green-300' />
                        SOLID & DRY Principles
                     </div>
                     <div className='flex items-center justify-center gap-2'>
                        <CheckCircle className='h-4 w-4 text-green-300' />
                        Interactive Demos
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className='py-20 bg-gray-50 dark:bg-gray-800'>
            <div className='container mx-auto px-4'>
               <div className='text-center mb-16'>
                  <Badge variant='secondary' className='mb-4'>
                     Why Choose Us
                  </Badge>
                  <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
                     Everything You Need to Succeed
                  </h2>
                  <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                     Our platform is designed to give you the best learning
                     experience with cutting-edge tools and methodologies.
                  </p>
               </div>

               <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {features.map((feature, index) => (
                     <Card
                        key={index}
                        className='border-0 shadow-md hover:shadow-lg transition-shadow'
                     >
                        <CardHeader>
                           <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4'>
                              <feature.icon className='h-6 w-6 text-blue-600' />
                           </div>
                           <CardTitle className='text-xl'>
                              {feature.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <CardDescription className='text-base'>
                              {feature.description}
                           </CardDescription>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className='py-20'>
            <div className='container mx-auto px-4'>
               <div className='text-center mb-16'>
                  <Badge variant='secondary' className='mb-4'>
                     Success Stories
                  </Badge>
                  <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
                     Loved by Developers Worldwide
                  </h2>
                  <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                     See how our students have transformed their careers and
                     achieved their goals.
                  </p>
               </div>

               <div className='grid md:grid-cols-3 gap-8'>
                  {testimonials.map((testimonial, index) => (
                     <Card key={index} className='border-0 shadow-md'>
                        <CardHeader>
                           <div className='flex items-center space-x-4'>
                              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold'>
                                 {testimonial.avatar}
                              </div>
                              <div>
                                 <div className='font-semibold'>
                                    {testimonial.name}
                                 </div>
                                 <div className='text-sm text-muted-foreground'>
                                    {testimonial.role}
                                 </div>
                              </div>
                           </div>
                           <div className='flex space-x-1'>
                              {Array.from({ length: testimonial.rating }).map(
                                 (_, i) => (
                                    <Star
                                       key={i}
                                       className='h-4 w-4 fill-yellow-400 text-yellow-400'
                                    />
                                 )
                              )}
                           </div>
                        </CardHeader>
                        <CardContent>
                           <p className='text-muted-foreground italic'>
                              &ldquo;{testimonial.content}&rdquo;
                           </p>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className='py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
            <div className='container mx-auto px-4 text-center'>
               <div className='max-w-3xl mx-auto space-y-8'>
                  <h2 className='text-3xl lg:text-4xl font-bold'>
                     Ready to Start Your Coding Journey?
                  </h2>
                  <p className='text-xl opacity-90'>
                     Join thousands of developers who have already transformed
                     their careers. Start learning today with our comprehensive
                     courses and expert guidance.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                     <Link href='/auth/register'>
                        <Button
                           size='lg'
                           variant='secondary'
                           className='text-lg px-8'
                           // rightIcon={<ArrowRight />}
                           // asChild
                        >
                           <ArrowRight />
                           Get Started Free
                        </Button>
                     </Link>
                     <Link href='/auth/login'>
                        <Button
                           size='lg'
                           // variant=''
                           className='text-lg px-8 '
                           // asChild
                        >
                           Sign In
                        </Button>
                     </Link>
                  </div>
                  <p className='text-sm opacity-75'>
                     Free 7-day trial • No credit card required • Cancel anytime
                  </p>
               </div>
            </div>
         </section>
      </MainLayout>
   );
}
