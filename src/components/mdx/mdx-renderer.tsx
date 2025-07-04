/**
 * MDX content renderer component
 * Handles rendering of processed MDX content with custom components
 */

"use client";

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { motion } from "framer-motion";
import { mdxComponents } from "./mdx-components";
import type { MDXContent } from "@/types/mdx";

/**
 * Props for the MDX renderer component
 */
interface MDXRendererProps {
   readonly content: MDXContent;
   readonly className?: string;
   readonly components?: Record<
      string,
      React.ComponentType<Record<string, unknown>>
   >;
}

/**
 * Animation variants for MDX content
 */
const contentVariants = {
   hidden: {
      opacity: 0,
      y: 20,
   },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.6,
      },
   },
};

/**
 * MDX content renderer with custom components and animations
 */
export function MDXRenderer({
   content,
   className = "",
   components = {},
}: MDXRendererProps) {
   // Prepare the MDX source for rendering
   const mdxSource: MDXRemoteSerializeResult = {
      compiledSource: content.compiledSource,
      scope: content.scope || {},
      frontmatter: content.frontmatter as unknown as Record<string, unknown>,
   };

   // Merge custom components with default MDX components
   const allComponents = {
      ...mdxComponents,
      ...components,
   };

   return (
      <motion.article
         variants={contentVariants}
         initial='hidden'
         animate='visible'
         className={`
        prose prose-lg dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-pre:p-0
        prose-code:before:content-none
        prose-code:after:content-none
        ${className}
      `}
      >
         <MDXRemote {...mdxSource} components={allComponents} />
      </motion.article>
   );
}

/**
 * Lightweight MDX renderer without animations (for performance)
 */
export function MDXRendererStatic({
   content,
   className = "",
   components = {},
}: MDXRendererProps) {
   // Prepare the MDX source for rendering
   const mdxSource: MDXRemoteSerializeResult = {
      compiledSource: content.compiledSource,
      scope: content.scope || {},
      frontmatter: content.frontmatter as unknown as Record<string, unknown>,
   };

   // Merge custom components with default MDX components
   const allComponents = {
      ...mdxComponents,
      ...components,
   };

   return (
      <article
         className={`
        prose prose-lg dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-pre:p-0
        prose-code:before:content-none
        prose-code:after:content-none
        ${className}
      `}
      >
         <MDXRemote {...mdxSource} components={allComponents} />
      </article>
   );
}
