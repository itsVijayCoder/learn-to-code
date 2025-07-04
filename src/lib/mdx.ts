/**
 * MDX processing utilities
 * Handles parsing, processing, and rendering of MDX content
 */

import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import path from "path";
import fs from "fs/promises";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXContent, MDXFrontMatter } from "@/types/mdx";

/**
 * Content directory path
 */
export const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Check if a file path exists
 */
async function fileExists(filepath: string): Promise<boolean> {
   try {
      await fs.access(filepath);
      return true;
   } catch {
      return false;
   }
}

/**
 * Get all MDX files from a directory recursively
 */
export async function getMDXFiles(dir: string): Promise<string[]> {
   const files: string[] = [];

   try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
         const fullPath = path.join(dir, entry.name);

         if (entry.isDirectory()) {
            const subFiles = await getMDXFiles(fullPath);
            files.push(...subFiles);
         } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
            files.push(fullPath);
         }
      }
   } catch (error) {
      console.warn(`Could not read directory ${dir}:`, error);
   }

   return files;
}

/**
 * Parse MDX file content
 */
export async function parseMDXFile(
   filepath: string
): Promise<MDXContent | null> {
   try {
      if (!(await fileExists(filepath))) {
         console.warn(`MDX file not found: ${filepath}`);
         return null;
      }

      const source = await fs.readFile(filepath, "utf8");
      const { data: frontmatter, content } = matter(source);

      // Validate frontmatter
      if (!frontmatter.title || !frontmatter.description || !frontmatter.slug) {
         console.warn(`Invalid frontmatter in ${filepath}:`, frontmatter);
         return null;
      }

      const mdxSource = await serialize(content, {
         parseFrontmatter: true,
         scope: frontmatter,
         mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
               rehypeSlug,
               [rehypeAutolinkHeadings, { behavior: "wrap" }],
               [
                  rehypePrettyCode,
                  {
                     theme: { dark: "github-dark", light: "github-light" },
                     keepBackground: false,
                  },
               ],
            ],
            format: "mdx",
         },
      });

      return {
         frontmatter: frontmatter as MDXFrontMatter,
         content,
         compiledSource: mdxSource.compiledSource,
         scope: mdxSource.scope,
      };
   } catch (error) {
      console.error(`Error parsing MDX file ${filepath}:`, error);
      return null;
   }
}

/**
 * Get MDX content by slug
 */
export async function getMDXBySlug(slug: string): Promise<MDXContent | null> {
   const files = await getMDXFiles(CONTENT_DIR);

   for (const filepath of files) {
      const content = await parseMDXFile(filepath);
      if (content?.frontmatter.slug === slug) {
         return content;
      }
   }

   return null;
}

/**
 * Get all MDX content with optional filtering
 */
export async function getAllMDXContent(
   filter?: (frontmatter: MDXFrontMatter) => boolean
): Promise<MDXContent[]> {
   const files = await getMDXFiles(CONTENT_DIR);
   const contents: MDXContent[] = [];

   for (const filepath of files) {
      const content = await parseMDXFile(filepath);
      if (content && (!filter || filter(content.frontmatter))) {
         contents.push(content);
      }
   }

   // Sort by order, then by title
   return contents.sort((a, b) => {
      if (a.frontmatter.order !== b.frontmatter.order) {
         return a.frontmatter.order - b.frontmatter.order;
      }
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
   });
}

/**
 * Get course structure with lessons grouped by course
 */
export async function getCourseStructure(): Promise<
   Record<string, MDXContent[]>
> {
   const allContent = await getAllMDXContent();
   const structure: Record<string, MDXContent[]> = {};

   for (const content of allContent) {
      const courseId = content.frontmatter.type || "default";
      if (!structure[courseId]) {
         structure[courseId] = [];
      }
      structure[courseId].push(content);
   }

   return structure;
}

/**
 * Get navigation data for a specific course
 */
export async function getCourseNavigation(courseId: string): Promise<{
   previous: MDXContent | null;
   current: MDXContent | null;
   next: MDXContent | null;
   lessons: MDXContent[];
}> {
   const structure = await getCourseStructure();
   const lessons = structure[courseId] || [];

   return {
      previous: null,
      current: null,
      next: null,
      lessons,
   };
}

/**
 * Search MDX content by query
 */
export async function searchMDXContent(query: string): Promise<MDXContent[]> {
   const allContent = await getAllMDXContent();
   const lowercaseQuery = query.toLowerCase();

   return allContent.filter((content) => {
      const { title, description, tags } = content.frontmatter;
      const searchText =
         `${title} ${description} ${tags?.join(" ") || ""}`.toLowerCase();
      return (
         searchText.includes(lowercaseQuery) ||
         content.content.toLowerCase().includes(lowercaseQuery)
      );
   });
}

/**
 * Generate static paths for MDX content
 */
export async function generateMDXStaticPaths(): Promise<
   { params: { slug: string } }[]
> {
   const allContent = await getAllMDXContent();

   return allContent.map((content) => ({
      params: { slug: content.frontmatter.slug },
   }));
}
