/**
 * Custom MDX components for course content
 * Provides enhanced rendering for code blocks, callouts, and interactive elements
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   AlertTriangle,
   Info,
   CheckCircle,
   XCircle,
   Copy,
   Play,
   Pause,
   Volume2,
   VolumeX,
} from "lucide-react";
import type {
   CodeBlockProps,
   CalloutProps,
   VideoPlayerProps,
} from "@/types/mdx";

/**
 * Enhanced code block component with syntax highlighting
 */
export function CodeBlock({
   children,
   className = "",
   language = "",
   filename,
}: CodeBlockProps) {
   const [copied, setCopied] = React.useState(false);

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(children);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (error) {
         console.error("Failed to copy code:", error);
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className='relative group my-6'
      >
         {filename && (
            <div className='flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg'>
               <span className='text-sm text-gray-300 font-mono'>
                  {filename}
               </span>
               <Badge variant='secondary' className='text-xs'>
                  {language || "text"}
               </Badge>
            </div>
         )}

         <div className='relative'>
            <pre
               className={`p-4 overflow-x-auto bg-gray-900 ${filename ? "rounded-b-lg" : "rounded-lg"} ${className}`}
            >
               <code
                  className={`text-sm ${language ? `language-${language}` : ""}`}
               >
                  {children}
               </code>
            </pre>

            <button
               onClick={copyToClipboard}
               className='absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 text-gray-300 
                     hover:bg-gray-700 hover:text-white transition-colors opacity-0 
                     group-hover:opacity-100 focus:opacity-100'
               aria-label='Copy code'
            >
               <Copy size={16} />
            </button>

            {copied && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className='absolute top-2 right-12 px-2 py-1 bg-green-600 text-white text-xs rounded'
               >
                  Copied!
               </motion.div>
            )}
         </div>
      </motion.div>
   );
}

/**
 * Callout component for important information
 */
export function Callout({ type, title, children }: CalloutProps) {
   const icons = {
      info: Info,
      warning: AlertTriangle,
      error: XCircle,
      success: CheckCircle,
   };

   const variants = {
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
      warning:
         "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
      error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
      success:
         "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
   };

   const Icon = icons[type];

   return (
      <motion.div
         initial={{ opacity: 0, x: -10 }}
         animate={{ opacity: 1, x: 0 }}
         className={`my-6 rounded-lg border p-4 ${variants[type]}`}
      >
         <div className='flex items-start gap-3'>
            <Icon size={20} className='mt-0.5 flex-shrink-0' />
            <div className='flex-1'>
               {title && <h4 className='mb-2 font-semibold'>{title}</h4>}
               <div className='prose prose-sm max-w-none [&>*:last-child]:mb-0'>
                  {children}
               </div>
            </div>
         </div>
      </motion.div>
   );
}

/**
 * Interactive video player component
 */
export function VideoPlayer({
   src,
   title,
   poster,
   autoplay = false,
   controls = true,
}: VideoPlayerProps) {
   const [isPlaying, setIsPlaying] = React.useState(false);
   const [isMuted, setIsMuted] = React.useState(false);
   const videoRef = React.useRef<HTMLVideoElement>(null);

   const togglePlay = () => {
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.pause();
         } else {
            videoRef.current.play();
         }
         setIsPlaying(!isPlaying);
      }
   };

   const toggleMute = () => {
      if (videoRef.current) {
         videoRef.current.muted = !isMuted;
         setIsMuted(!isMuted);
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className='relative my-6 rounded-lg overflow-hidden bg-black'
      >
         {title && (
            <div className='absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4'>
               <h4 className='text-white font-medium'>{title}</h4>
            </div>
         )}

         <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoplay}
            controls={controls}
            className='w-full aspect-video'
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
         />

         {!controls && (
            <div className='absolute bottom-4 left-4 flex gap-2'>
               <button
                  onClick={togglePlay}
                  className='p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors'
                  aria-label={isPlaying ? "Pause" : "Play"}
               >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
               </button>

               <button
                  onClick={toggleMute}
                  className='p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors'
                  aria-label={isMuted ? "Unmute" : "Mute"}
               >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
               </button>
            </div>
         )}
      </motion.div>
   );
}

/**
 * Interactive tabs component for code examples
 */
export function CodeTabs({
   children,
   ...props
}: React.ComponentProps<typeof Tabs>) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className='my-6'
      >
         <Tabs {...props} className='w-full'>
            {children}
         </Tabs>
      </motion.div>
   );
}

/**
 * Custom heading components with anchor links
 */
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
   const Component = ({
      children,
      id,
      ...props
   }: React.ComponentProps<`h${typeof level}`>) => {
      const HeadingTag = `h${level}` as const;

      return (
         <HeadingTag
            id={id}
            className={`
          scroll-mt-20 group relative
          ${level === 1 ? "text-3xl font-bold mt-8 mb-4" : ""}
          ${level === 2 ? "text-2xl font-semibold mt-6 mb-3" : ""}
          ${level === 3 ? "text-xl font-medium mt-4 mb-2" : ""}
          ${level === 4 ? "text-lg font-medium mt-3 mb-2" : ""}
          ${level <= 2 ? "border-b border-gray-200 dark:border-gray-700 pb-2" : ""}
        `}
            {...props}
         >
            {children}
            {id && (
               <a
                  href={`#${id}`}
                  className='absolute -left-6 top-0 opacity-0 group-hover:opacity-100 
                       text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                       transition-opacity no-underline'
                  aria-label={`Link to ${children}`}
               >
                  #
               </a>
            )}
         </HeadingTag>
      );
   };

   Component.displayName = `Heading${level}`;
   return Component;
}

/**
 * Default MDX components mapping
 */
export const mdxComponents = {
   // Headings with anchor links
   h1: createHeading(1),
   h2: createHeading(2),
   h3: createHeading(3),
   h4: createHeading(4),
   h5: createHeading(5),
   h6: createHeading(6),

   // Enhanced code blocks
   pre: ({ children, ...props }: { children: React.ReactNode }) => {
      const codeElement = React.Children.only(children) as React.ReactElement<{
         className?: string;
         children: string;
      }>;

      return (
         <CodeBlock
            className={codeElement.props.className || ""}
            language={
               codeElement.props.className?.replace("language-", "") || ""
            }
            {...props}
         >
            {codeElement.props.children}
         </CodeBlock>
      );
   },

   // Inline code
   code: ({ children, className, ...props }: React.ComponentProps<"code">) => (
      <code
         className={`px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-sm font-mono ${className || ""}`}
         {...props}
      >
         {children}
      </code>
   ),

   // Custom components
   Callout: (props: CalloutProps) => <Callout {...props} />,
   VideoPlayer: (props: VideoPlayerProps) => <VideoPlayer {...props} />,
   CodeTabs,
   TabsContent: (props: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent {...props} />
   ),
   TabsList: (props: React.ComponentProps<typeof TabsList>) => (
      <TabsList {...props} />
   ),
   TabsTrigger: (props: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger {...props} />
   ),

   // Enhanced blockquote
   blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
      <blockquote
         className='border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300'
         {...props}
      >
         {children}
      </blockquote>
   ),

   // Enhanced table
   table: ({ children, ...props }: React.ComponentProps<"table">) => (
      <div className='my-6 overflow-x-auto'>
         <table
            className='w-full border-collapse border border-gray-300 dark:border-gray-700'
            {...props}
         >
            {children}
         </table>
      </div>
   ),

   th: ({ children, ...props }: React.ComponentProps<"th">) => (
      <th
         className='border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold'
         {...props}
      >
         {children}
      </th>
   ),

   td: ({ children, ...props }: React.ComponentProps<"td">) => (
      <td
         className='border border-gray-300 dark:border-gray-700 px-4 py-2'
         {...props}
      >
         {children}
      </td>
   ),
};
