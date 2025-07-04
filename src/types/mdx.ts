/**
 * MDX frontmatter interface
 */
export interface MDXFrontMatter {
   readonly title: string;
   readonly description: string;
   readonly slug: string;
   readonly order: number;
   readonly duration?: number;
   readonly type?: string;
   readonly tags?: readonly string[];
   readonly author?: string;
   readonly lastModified?: string;
   readonly prerequisites?: readonly string[];
   readonly learningObjectives?: readonly string[];
}

/**
 * Processed MDX content interface
 */
export interface MDXContent {
   readonly frontmatter: MDXFrontMatter;
   readonly content: string;
   readonly compiledSource: string;
   readonly scope?: Record<string, unknown>;
}

/**
 * MDX component props interface
 */
export interface MDXComponents {
   readonly [key: string]: React.ComponentType<Record<string, unknown>>;
}

/**
 * Code block props for syntax highlighting
 */
export interface CodeBlockProps {
   readonly children: string;
   readonly className?: string;
   readonly language?: string;
   readonly filename?: string;
   readonly highlightLines?: readonly number[];
   readonly showLineNumbers?: boolean;
}

/**
 * Callout component props
 */
export interface CalloutProps {
   readonly type: "info" | "warning" | "error" | "success";
   readonly title?: string;
   readonly children: React.ReactNode;
}

/**
 * Video player props
 */
export interface VideoPlayerProps {
   readonly src: string;
   readonly title?: string;
   readonly poster?: string;
   readonly autoplay?: boolean;
   readonly controls?: boolean;
}
