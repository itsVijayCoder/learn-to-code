# Copilot Implementation Guide: Detailed Sub-Tasks

## 📋 Phase 1: Project Setup & Foundation

### Task 1.1: Initialize Next.js Project

#### Sub-task 1.1.1: Create Next.js App

```markdown
Run command: pnpm create next-app@latest course-platform

Select options:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: @/\*

Rules:

- Use pnpm as package manager
- Don't use experimental features
- Keep default folder structure initially
```

#### Sub-task 1.1.2: Configure next.config.js

```markdown
Create next.config.js with:

const nextConfig = { reactStrictMode: true, poweredByHeader: false, compress:
true, images: { domains: ['localhost'], formats: ['image/avif', 'image/webp'],
}, experimental: { optimizeCss: true, } }

Rules:

- Enable all production optimizations
- Configure allowed image domains
- Set up proper security headers
```

#### Sub-task 1.1.3: Setup Environment Files

```markdown
Create these files:

1. .env.local (git-ignored)
2. .env.example (committed)
3. .env.production (git-ignored)

Add variables: NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000 NEXTAUTH_SECRET= DATABASE_URL= SUPABASE_URL=
SUPABASE_ANON_KEY=

Rules:

- Use NEXT*PUBLIC* prefix for client variables
- Add comments explaining each variable
- Never commit actual secrets
```

#### Sub-task 1.1.4: Configure ESLint

```markdown
Update .eslintrc.json:

{ "extends": [ "next/core-web-vitals", "plugin:@typescript-eslint/recommended"
], "rules": { "@typescript-eslint/no-explicit-any": "error",
"@typescript-eslint/no-unused-vars": "error", "react-hooks/exhaustive-deps":
"error" } }

Rules:

- Enforce TypeScript best practices
- No any types allowed
- Strict React hooks rules
```

#### Sub-task 1.1.5: Setup Prettier

```markdown
Create .prettierrc:

{ "semi": false, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5",
"printWidth": 80, "arrowParens": "always" }

Create .prettierignore: node_modules .next out public

Rules:

- Consistent code formatting
- Integrate with ESLint
- Format on save in VS Code
```

### Task 1.2: Setup Project Structure

#### Sub-task 1.2.1: Create Core Directories

```markdown
Create this exact structure in src/:

mkdir -p
src/{app,components/{ui,animation,layout,shared,course,auth,mdx,theme},lib/{mdx,auth,content,animations,api,utils,cache},hooks,stores,types,styles,providers,config,features/{progress,admin},data}

Rules:

- Use mkdir -p for nested creation
- Follow exact naming convention
- Don't create unnecessary folders yet
```

#### Sub-task 1.2.2: Create Barrel Exports

```markdown
In each folder, create index.ts:

// Example: src/components/ui/index.ts export _ from './button' export _ from
'./card' export \* from './input'

Rules:

- Every folder needs index.ts
- Use named exports only
- Keep alphabetical order
- Update as you add components
```

#### Sub-task 1.2.3: Setup Path Aliases

```markdown
Update tsconfig.json paths:

"paths": { "@/_": ["./src/_"], "@/components/_": ["./src/components/_"],
"@/lib/_": ["./src/lib/_"], "@/hooks/_": ["./src/hooks/_"], "@/stores/_":
["./src/stores/_"], "@/types/_": ["./src/types/_"], "@/config/_":
["./src/config/_"], "@/styles/_": ["./src/styles/_"] }

Rules:

- Add all major directories
- Keep consistent naming
- Test imports work correctly
```

#### Sub-task 1.2.4: Create README Files

```markdown
Add README.md to each major directory:

# src/components/README.md

## Components Directory

### Structure:

- `/ui` - Base UI components (buttons, cards, etc.)
- `/animation` - Framer Motion wrappers
- `/layout` - Layout components
- `/shared` - Shared/common components

### Rules:

- One component per file
- Include .test.tsx for each
- Export from index.ts

Rules:

- Document folder purpose
- Add usage examples
- Keep updated
```

#### Sub-task 1.2.5: Setup Git Configuration

```markdown
Create .gitignore additions:

# Environment

.env.local .env.production

# IDE

.vscode/\* !.vscode/extensions.json !.vscode/settings.json

# Testing

coverage .nyc_output

# Misc

.DS_Store \*.log

Rules:

- Never commit env files
- Keep IDE settings minimal
- Ignore OS-specific files
```

### Task 1.3: Install Dependencies

#### Sub-task 1.3.1: Install Core Dependencies

```markdown
Run: pnpm add [packages]

next@^15.0.0 react@^18.3.0 react-dom@^18.3.0 typescript@^5.4.0

Rules:

- Pin major versions
- Check peer dependencies
- Run pnpm install after each group
```

#### Sub-task 1.3.2: Install UI/Styling Dependencies

```markdown
Run: pnpm add [packages]

tailwindcss@^3.4.0 @tailwindcss/typography@^0.5.0 @tailwindcss/forms@^0.5.0
tailwind-merge@^2.2.0 clsx@^2.1.0 class-variance-authority@^0.7.0

@radix-ui/react-dialog@^1.0.5 @radix-ui/react-dropdown-menu@^2.0.6
@radix-ui/react-slot@^1.0.2 @radix-ui/react-tabs@^1.0.4
@radix-ui/react-toast@^1.1.5

framer-motion@^11.0.0 lucide-react@^0.400.0

Rules:

- Install all Radix components needed
- Use latest stable versions
- Group related packages
```

#### Sub-task 1.3.3: Install State/Data Dependencies

```markdown
Run: pnpm add [packages]

zustand@^4.5.0 immer@^10.0.0 @tanstack/react-query@^5.45.0
@tanstack/react-query-devtools@^5.45.0

Rules:

- Match tanstack versions
- Include dev tools
- Add middleware support
```

#### Sub-task 1.3.4: Install MDX Dependencies

```markdown
Run: pnpm add [packages]

next-mdx-remote@^5.0.0 gray-matter@^4.0.3 rehype-pretty-code@^0.13.0
rehype-slug@^6.0.0 rehype-autolink-headings@^7.1.0 remark-gfm@^4.0.0
shiki@^1.6.0

Rules:

- Use compatible plugin versions
- Include syntax highlighting
- Add all remark/rehype plugins
```

#### Sub-task 1.3.5: Install Auth/Validation Dependencies

```markdown
Run: pnpm add [packages]

next-auth@beta @auth/supabase-adapter@^1.0.0 zod@^3.23.0 react-hook-form@^7.52.0
@hookform/resolvers@^3.6.0

Rules:

- Use next-auth beta for app router
- Include form validation
- Add adapter for Supabase
```

#### Sub-task 1.3.6: Install Dev Dependencies

```markdown
Run: pnpm add -D [packages]

@types/node@^20.14.0 @types/react@^18.3.0 @types/react-dom@^18.3.0
@typescript-eslint/eslint-plugin@^7.13.0 @typescript-eslint/parser@^7.13.0
prettier@^3.3.0 eslint-config-prettier@^9.1.0 jest@^29.7.0
@testing-library/react@^15.0.0 @testing-library/jest-dom@^6.4.0 cypress@^13.12.0

Rules:

- Install all type definitions
- Setup testing framework
- Configure linting tools
```

### Task 1.4: Configure Tailwind & Design System

#### Sub-task 1.4.1: Create Tailwind Config

```markdown
Update tailwind.config.ts:

import type { Config } from 'tailwindcss'

const config: Config = { darkMode: 'class', content: [
'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
'./src/app/**/*.{js,ts,jsx,tsx,mdx}', ], theme: { extend: { colors: {
background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
primary: { DEFAULT: 'hsl(var(--primary))', foreground:
'hsl(var(--primary-foreground))', }, }, animation: { 'fade-in': 'fadeIn 0.5s
ease-out', 'slide-up': 'slideUp 0.3s ease-out', }, }, }, plugins: [
require('@tailwindcss/typography'), require('@tailwindcss/forms'), ], }

Rules:

- Use CSS variables for theming
- Define all animations
- Include typography plugin
```

#### Sub-task 1.4.2: Create CSS Variables

```markdown
Create src/styles/globals.css:

@tailwind base; @tailwind components; @tailwind utilities;

@layer base { :root { --background: 0 0% 100%; --foreground: 222.2 84% 4.9%;
--primary: 262.1 83.3% 57.8%; --primary-foreground: 210 40% 98%; --radius:
0.5rem; }

.dark { --background: 222.2 84% 4.9%; --foreground: 210 40% 98%; } }

@layer utilities { .glass { @apply backdrop-blur-md bg-white/30
dark:bg-gray-800/30 border border-white/20; } }

Rules:

- Define light/dark themes
- Create utility classes
- Use HSL for colors
```

#### Sub-task 1.4.3: Create Typography Scale

```markdown
Add to tailwind.config.ts:

fontSize: { xs: ['0.75rem', { lineHeight: '1rem' }], sm: ['0.875rem', {
lineHeight: '1.25rem' }], base: ['1rem', { lineHeight: '1.5rem' }], lg:
['1.125rem', { lineHeight: '1.75rem' }], xl: ['1.25rem', { lineHeight: '1.75rem'
}], '2xl': ['1.5rem', { lineHeight: '2rem' }], '3xl': ['1.875rem', { lineHeight:
'2.25rem' }], '4xl': ['2.25rem', { lineHeight: '2.5rem' }], }

Rules:

- Use rem units
- Define line heights
- Keep consistent scale
```

#### Sub-task 1.4.4: Setup Animation Utilities

```markdown
Create src/styles/animations.css:

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to {
opacity: 1; transform: translateY(0); } }

@keyframes shimmer { 0% { background-position: -200% 0; } 100% {
background-position: 200% 0; } }

Rules:

- Keep animations smooth
- Use transform for performance
- Add will-change when needed
```

#### Sub-task 1.4.5: Create Theme Configuration

```markdown
Create src/config/theme.ts:

export const theme = { colors: { primary: { 50: '#faf5ff', 500: '#8b5cf6', 900:
'#4c1d95', }, }, spacing: { xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem',
xl: '3rem', }, animation: { duration: { fast: '150ms', normal: '300ms', slow:
'500ms', }, }, } as const

Rules:

- Export as const for TypeScript
- Use consistent naming
- Define all design tokens
```

### Task 1.5: Setup TypeScript Configuration

#### Sub-task 1.5.1: Configure tsconfig.json

```markdown
Update tsconfig.json:

{ "compilerOptions": { "target": "ES2022", "lib": ["dom", "dom.iterable",
"esnext"], "allowJs": false, "skipLibCheck": true, "strict": true,
"forceConsistentCasingInFileNames": true, "noEmit": true, "esModuleInterop":
true, "module": "esnext", "moduleResolution": "bundler", "resolveJsonModule":
true, "isolatedModules": true, "jsx": "preserve", "incremental": true,
"noUnusedLocals": true, "noUnusedParameters": true, "noImplicitReturns": true,
"noFallthroughCasesInSwitch": true, "noUncheckedIndexedAccess": true, "plugins":
[ { "name": "next" } ], "paths": { "@/_": ["./src/_"] } }, "include":
["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"], "exclude":
["node_modules"] }

Rules:

- Enable all strict checks
- No implicit any
- No unused variables
- Force consistent casing
```

#### Sub-task 1.5.2: Create Type Declaration Files

```markdown
Create src/types/global.d.ts:

declare global { namespace NodeJS { interface ProcessEnv { NEXT_PUBLIC_APP_URL:
string NEXTAUTH_URL: string NEXTAUTH_SECRET: string DATABASE_URL: string
SUPABASE_URL: string SUPABASE_ANON_KEY: string } } }

export {}

Rules:

- Type all env variables
- Add custom global types
- Export empty object
```

#### Sub-task 1.5.3: Setup Type Utilities

```markdown
Create src/types/utils.ts:

export type Prettify<T> = { [K in keyof T]: T[K] } & {}

export type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ?
DeepPartial<T[P]> : T[P] }

export type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ?
DeepReadonly<T[P]> : T[P] }

Rules:

- Create reusable type utilities
- Export all from index
- Add JSDoc comments
```

#### Sub-task 1.5.4: Configure TypeScript for Testing

```markdown
Create tsconfig.test.json:

{ "extends": "./tsconfig.json", "compilerOptions": { "jsx": "react" },
"include": [ "**/*.test.ts", "**/*.test.tsx", "jest.setup.ts" ] }

Rules:

- Extend base config
- Include test files only
- Set JSX for React Testing Library
```

#### Sub-task 1.5.5: Create Type Guards

```markdown
Create src/lib/utils/type-guards.ts:

export function isString(value: unknown): value is string { return typeof value
=== 'string' }

export function isNumber(value: unknown): value is number { return typeof value
=== 'number' && !isNaN(value) }

export function isDefined<T>(value: T | undefined | null): value is T { return
value !== undefined && value !== null }

export function hasProperty<T extends object, K extends PropertyKey>( obj: T,
key: K ): obj is T & Record<K, unknown> { return key in obj }

Rules:

- Create type predicates
- Use unknown instead of any
- Export guard functions
```

---

## 📋 Phase 2: Core Infrastructure

### Task 2.1: Create Type Definitions

#### Sub-task 2.1.1: Define User Types

```markdown
Create src/types/user.ts:

export type UserId = string & { \_\_brand: 'UserId' } export type Role = 'admin'
| 'user' | 'guest'

export interface User { readonly id: UserId readonly email: string readonly
name: string | null readonly role: Role readonly createdAt: Date readonly
updatedAt: Date }

export interface Session { readonly user: User readonly expires: Date }

export interface AuthState { readonly user: User | null readonly isLoading:
boolean readonly error: Error | null }

Rules:

- Use branded types for IDs
- Make properties readonly
- Define all auth types
```

#### Sub-task 2.1.2: Define Course Types

```markdown
Create src/types/course.ts:

export type CourseId = string & { **brand: 'CourseId' } export type ModuleId =
string & { **brand: 'ModuleId' } export type LessonId = string & { \_\_brand:
'LessonId' }

export interface Course { readonly id: CourseId readonly slug: string readonly
title: string readonly description: string readonly thumbnail: string | null
readonly author: string readonly duration: number // in minutes readonly
difficulty: 'beginner' | 'intermediate' | 'advanced' readonly tags: readonly
string[] readonly modules: readonly Module[] readonly createdAt: Date readonly
updatedAt: Date }

export interface Module { readonly id: ModuleId readonly slug: string readonly
title: string readonly description: string readonly order: number readonly
lessons: readonly Lesson[] }

export interface Lesson { readonly id: LessonId readonly slug: string readonly
title: string readonly description: string readonly type: 'video' | 'text' |
'quiz' readonly duration: number readonly order: number readonly content?:
string }

Rules:

- Use discriminated unions
- Define relationships
- Keep immutable with readonly
```

#### Sub-task 2.1.3: Define Progress Types

```markdown
Create src/types/progress.ts:

export type ProgressId = `${CourseId}/${ModuleId}/${LessonId}`

export interface Progress { readonly userId: UserId readonly lessonId:
ProgressId readonly completed: boolean readonly completedAt: Date | null
readonly timeSpent: number // in seconds readonly lastAccessedAt: Date }

export interface CourseProgress { readonly courseId: CourseId readonly
totalLessons: number readonly completedLessons: number readonly percentComplete:
number readonly estimatedTimeRemaining: number readonly certificate: Certificate
| null }

export interface Certificate { readonly id: string readonly courseId: CourseId
readonly userId: UserId readonly issuedAt: Date readonly certificateUrl: string
}

Rules:

- Use composite IDs
- Track time metrics
- Include certificate type
```

#### Sub-task 2.1.4: Define MDX Types

```markdown
Create src/types/mdx.ts:

export interface MDXFrontmatter { readonly title: string readonly description:
string readonly duration: number readonly order: number readonly tags?: readonly
string[] readonly prerequisites?: readonly string[] readonly objectives?:
readonly string[] }

export interface MDXContent { readonly frontmatter: MDXFrontmatter readonly
content: string readonly compiledSource: string }

export interface MDXComponent { readonly name: string readonly props:
Record<string, unknown> }

Rules:

- Type frontmatter strictly
- Include compiled output
- Support custom components
```

#### Sub-task 2.1.5: Create Barrel Export

```markdown
Update src/types/index.ts:

// User types export type { UserId, Role, User, Session, AuthState } from
'./user'

// Course types export type { CourseId, ModuleId, LessonId, Course, Module,
Lesson, } from './course'

// Progress types export type { ProgressId, Progress, CourseProgress,
Certificate, } from './progress'

// MDX types export type { MDXFrontmatter, MDXContent, MDXComponent, } from
'./mdx'

// Utility types export type { Prettify, DeepPartial, DeepReadonly, } from
'./utils'

Rules:

- Export types only (not interfaces)
- Group by domain
- Keep alphabetical order
```

### Task 2.2: Setup Environment Configuration

#### Sub-task 2.2.1: Create Environment Schema

```markdown
Create src/config/env.schema.ts:

import { z } from 'zod'

export const envSchema = z.object({ // App NEXT_PUBLIC_APP_URL:
z.string().url(), NODE_ENV: z.enum(['development', 'production', 'test']),

// Auth NEXTAUTH_URL: z.string().url(), NEXTAUTH_SECRET: z.string().min(32),

// Database DATABASE_URL: z.string(),

// Supabase SUPABASE_URL: z.string().url(), SUPABASE_ANON_KEY: z.string(),
SUPABASE_SERVICE_KEY: z.string().optional(),

// Optional SENTRY_DSN: z.string().url().optional(), ANALYTICS_ID:
z.string().optional(), })

export type Env = z.infer<typeof envSchema>

Rules:

- Validate all env vars
- Use proper types
- Make optional vars explicit
```

#### Sub-task 2.2.2: Create Environment Parser

```markdown
Create src/config/env.ts:

import { envSchema } from './env.schema'

function parseEnv() { const parsed = envSchema.safeParse(process.env)

if (!parsed.success) { console.error('❌ Invalid environment variables:')
console.error(parsed.error.flatten().fieldErrors) throw new Error('Invalid
environment variables') }

return parsed.data }

export const env = parseEnv()

// Type-safe env export export const clientEnv = { NEXT_PUBLIC_APP_URL:
env.NEXT_PUBLIC_APP_URL, } as const

Rules:

- Parse on startup
- Throw on invalid config
- Export client-safe vars
```

#### Sub-task 2.2.3: Create Config Constants

```markdown
Create src/config/constants.ts:

export const APP_NAME = 'Course Platform' as const export const APP_DESCRIPTION
= 'Learn with static MDX courses' as const

export const ROUTES = { home: '/', courses: '/courses', course: (slug: string)
=> `/courses/${slug}`, lesson: (course: string, module: string, lesson: string)
=> `/courses/${course}/${module}/${lesson}`, admin: '/admin', auth: { login:
'/auth/login', register: '/auth/register', forgotPassword:
'/auth/forgot-password', }, } as const

export const CACHE_KEYS = { courses: 'courses', course: (id: string) =>
`course-${id}`, progress: (userId: string) => `progress-${userId}`, } as const

Rules:

- Use as const for literals
- Define all routes
- Include cache keys
```

#### Sub-task 2.2.4: Create Feature Flags

```markdown
Create src/config/features.ts:

export const features = { enableOAuth: env.NODE_ENV === 'production',
enableAnalytics: Boolean(env.ANALYTICS_ID), enableOfflineMode: true,
enableCertificates: true, enableComments: false, maintenanceMode: false, } as
const

export function isFeatureEnabled(feature: keyof typeof features): boolean {
return features[feature] }

Rules:

- Define all feature flags
- Use environment for some flags
- Export helper function
```

#### Sub-task 2.2.5: Create App Configuration

```markdown
Create src/config/app.ts:

export const appConfig = { name: APP_NAME, description: APP_DESCRIPTION, url:
env.NEXT_PUBLIC_APP_URL,

// Content settings content: { coursesPerPage: 12, searchMinLength: 3,
maxUploadSize: 10 _ 1024 _ 1024, // 10MB },

// Auth settings auth: { sessionMaxAge: 30 _ 24 _ 60 \* 60, // 30 days
passwordMinLength: 8, maxLoginAttempts: 5, },

// UI settings ui: { theme: 'light' as 'light' | 'dark', animationDuration: 300,
toastDuration: 5000, }, } as const

Rules:

- Group related settings
- Use descriptive names
- Include units in comments
```

### Task 2.3: Implement MDX Processing Pipeline

#### Sub-task 2.3.1: Create MDX Processor

```markdown
Create src/lib/mdx/processor.ts:

import { serialize } from 'next-mdx-remote/serialize' import matter from
'gray-matter' import { mdxOptions } from './plugins' import {
validateFrontmatter } from './validate'

export async function processMDX(source: string) { // Parse frontmatter const {
data, content } = matter(source)

// Validate frontmatter const frontmatter = validateFrontmatter(data)

// Serialize MDX const mdxSource = await serialize(content, { mdxOptions,
parseFrontmatter: false, })

return { frontmatter, mdxSource, } }

export async function processMDXFile(filePath: string) { const source = await
fs.readFile(filePath, 'utf-8') return processMDX(source) }

Rules:

- Separate parsing and serialization
- Validate all frontmatter
- Handle errors gracefully
```

#### Sub-task 2.3.2: Configure MDX Plugins

```markdown
Create src/lib/mdx/plugins.ts:

import rehypeSlug from 'rehype-slug' import rehypeAutolinkHeadings from
'rehype-autolink-headings' import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm' import { bundledLanguages } from
'shiki/bundle/web'

export const mdxOptions = { development: process.env.NODE_ENV === 'development',
remarkPlugins: [ remarkGfm, ], rehypePlugins: [ rehypeSlug, [
rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['anchor'],
}, }, ], [ rehypePrettyCode, { theme: 'github-dark-dimmed', languages:
bundledLanguages, onVisitLine(node: any) { if (node.children.length === 0) {
node.children = [{ type: 'text', value: ' ' }] } }, }, ], ], }

Rules:

- Configure all plugins
- Use TypeScript where possible
- Optimize for performance
```

#### Sub-task 2.3.3: Create Frontmatter Validation

```markdown
Create src/lib/mdx/validate.ts:

import { z } from 'zod' import type { MDXFrontmatter } from '@/types'

const frontmatterSchema = z.object({ title: z.string(), description: z.string(),
duration: z.number().positive(), order: z.number().int().positive(), tags:
z.array(z.string()).optional(), prerequisites: z.array(z.string()).optional(),
objectives: z.array(z.string()).optional(), })

export function validateFrontmatter(data: unknown): MDXFrontmatter { const
result = frontmatterSchema.safeParse(data)

if (!result.success) { throw new Error(
`Invalid frontmatter: ${result.error.errors.map(e => e.message).join(', ')}` ) }

return result.data }

Rules:

- Validate all required fields
- Provide helpful error messages
- Return typed data
```

#### Sub-task 2.3.4: Create MDX Cache

```markdown
Create src/lib/mdx/cache.ts:

import { LRUCache } from 'lru-cache' import type { MDXContent } from '@/types'

const cache = new LRUCache<string, MDXContent>({ max: 100, ttl: 1000 _ 60 _ 60,
// 1 hour })

export async function getCachedMDX( key: string, processor: () =>
Promise<MDXContent> ): Promise<MDXContent> { const cached = cache.get(key) if
(cached) return cached

const processed = await processor() cache.set(key, processed)

return processed }

export function clearMDXCache() { cache.clear() }

Rules:

- Implement LRU caching
- Set reasonable TTL
- Provide cache clearing
```

#### Sub-task 2.3.5: Create Custom MDX Components

```markdown
Create src/lib/mdx/components.tsx:

import { Code } from '@/components/mdx/code' import { Callout } from
'@/components/mdx/callout' import { Video } from '@/components/mdx/video' import
{ Quiz } from '@/components/mdx/quiz'

export const mdxComponents = { // Override default elements code: Code, pre: ({
children, ...props }: any) => ( <pre className="overflow-x-auto" {...props}>
{children} </pre> ),

// Custom components Callout, Video, Quiz,

// Add more as needed } as const

export type MDXComponents = typeof mdxComponents

Rules:

- Override defaults carefully
- Type all components
- Export type for reuse
```

### Task 2.4: Create Animation System

#### Sub-task 2.4.1: Define Animation Variants

```markdown
Create src/lib/animations/variants.ts:

import { Variants } from 'framer-motion'

export const fadeIn: Variants = { hidden: { opacity: 0, }, visible: { opacity:
1, transition: { duration: 0.5, ease: 'easeOut', }, }, }

export const slideUp: Variants = { hidden: { opacity: 0, y: 20, }, visible: {
opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300, },
}, }

export const slideIn: Variants = { hidden: { opacity: 0, x: -20, }, visible: {
opacity: 1, x: 0, transition: { type: 'spring', damping: 20, }, }, }

export const staggerContainer: Variants = { hidden: {}, visible: { transition: {
staggerChildren: 0.1, delayChildren: 0.3, }, }, }

Rules:

- Use spring physics
- Keep durations < 500ms
- Export typed variants
```

#### Sub-task 2.4.2: Create Transition Presets

```markdown
Create src/lib/animations/transitions.ts:

export const transitions = { spring: { type: 'spring', damping: 25, stiffness:
300, },

smooth: { type: 'tween', duration: 0.3, ease: 'easeInOut', },

bounce: { type: 'spring', damping: 15, stiffness: 400, },

fast: { type: 'tween', duration: 0.15, ease: 'easeOut', }, } as const

export const pageTransition = { initial: { opacity: 0, y: 20 }, animate: {
opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition:
transitions.smooth, }

Rules:

- Define reusable transitions
- Use appropriate physics
- Export for consistency
```

#### Sub-task 2.4.3: Create Animation Hooks

```markdown
Create src/lib/animations/hooks.ts:

import { useInView } from 'framer-motion' import { useRef } from 'react'

export function useScrollAnimation(threshold = 0.1) { const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-100px', })

return { ref, isInView } }

export function useReducedMotion() { const [reducedMotion, setReducedMotion] =
useState(false)

useEffect(() => { const mediaQuery = window.matchMedia('(prefers-reduced-motion:
reduce)') setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)

}, [])

return reducedMotion }

Rules:

- Respect accessibility preferences
- Use intersection observer
- Return typed values
```

#### Sub-task 2.4.4: Create Animated Components

```markdown
Create src/lib/animations/components.tsx:

'use client'

import { motion, HTMLMotionProps } from 'framer-motion' import { fadeIn, slideUp
} from './variants' import { forwardRef } from 'react'

type AnimatedDivProps = HTMLMotionProps<'div'> & { variant?: 'fadeIn' |
'slideUp' delay?: number }

export const AnimatedDiv = forwardRef<HTMLDivElement, AnimatedDivProps>( ({
variant = 'fadeIn', delay = 0, ...props }, ref) => { const variants = { fadeIn,
slideUp, }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={variants[variant]}
        custom={delay}
        {...props}
      />
    )

} )

AnimatedDiv.displayName = 'AnimatedDiv'

export const AnimatedList = ({ children, ...props }: HTMLMotionProps<'ul'>) => (
<motion.ul initial="hidden" animate="visible" variants={staggerContainer}
{...props}

>

    {children}

</motion.ul> )

Rules:

- Use forwardRef for refs
- Allow variant selection
- Keep components flexible
```

#### Sub-task 2.4.5: Create Page Transitions

```markdown
Create src/lib/animations/page-transition.tsx:

'use client'

import { motion, AnimatePresence } from 'framer-motion' import { usePathname }
from 'next/navigation' import { pageTransition } from './transitions'

export function PageTransition({ children }: { children: React.ReactNode }) {
const pathname = usePathname()

return ( <AnimatePresence mode="wait"> <motion.div key={pathname}
{...pageTransition} > {children} </motion.div> </AnimatePresence> ) }

export function SectionTransition({ children, className, }: { children:
React.ReactNode className?: string }) { const { ref, isInView } =
useScrollAnimation()

return ( <motion.section ref={ref} className={className}
initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.5 }} > {children} </motion.section> ) }

Rules:

- Use route changes for transitions
- Implement scroll animations
- Keep performance in mind
```

### Task 2.5: Setup Zustand Stores

#### Sub-task 2.5.1: Create Auth Store

```markdown
Create src/stores/auth-store.ts:

import { create } from 'zustand' import { devtools, persist } from
'zustand/middleware' import { immer } from 'zustand/middleware/immer' import
type { User, AuthState } from '@/types'

interface AuthStore extends AuthState { // Actions setUser: (user: User | null)
=> void setLoading: (loading: boolean) => void setError: (error: Error | null)
=> void logout: () => void }

export const useAuthStore = create<AuthStore>()( devtools( persist( immer((set)
=> ({ // State user: null, isLoading: false, error: null,

        // Actions
        setUser: (user) =>
          set((state) => {
            state.user = user
            state.error = null
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),

        setError: (error) =>
          set((state) => {
            state.error = error
            state.isLoading = false
          }),

        logout: () =>
          set((state) => {
            state.user = null
            state.error = null
            state.isLoading = false
          }),
      })),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user }),
      }
    )

) )

// Selectors export const selectUser = (state: AuthStore) => state.user export
const selectIsAuthenticated = (state: AuthStore) => Boolean(state.user)

Rules:

- Use immer for mutations
- Add devtools in dev
- Persist user only
- Export selectors
```

#### Sub-task 2.5.2: Create Progress Store

```markdown
Create src/stores/progress-store.ts:

import { create } from 'zustand' import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer' import type { ProgressId } from
'@/types'

interface ProgressStore { // State completed: Record<ProgressId, boolean>
timeSpent: Record<ProgressId, number> lastAccessed: Record<ProgressId, Date>

// Actions markComplete: (lessonId: ProgressId) => void markIncomplete:
(lessonId: ProgressId) => void updateTimeSpent: (lessonId: ProgressId, seconds:
number) => void updateLastAccessed: (lessonId: ProgressId) => void

// Computed getProgress: (courseId: string) => { total: number completed: number
percentage: number } }

export const useProgressStore = create<ProgressStore>()( persist( immer((set,
get) => ({ // State completed: {}, timeSpent: {}, lastAccessed: {},

      // Actions
      markComplete: (lessonId) =>
        set((state) => {
          state.completed[lessonId] = true
          state.lastAccessed[lessonId] = new Date()
        }),

      markIncomplete: (lessonId) =>
        set((state) => {
          state.completed[lessonId] = false
        }),

      updateTimeSpent: (lessonId, seconds) =>
        set((state) => {
          state.timeSpent[lessonId] = (state.timeSpent[lessonId] || 0) + seconds
        }),

      updateLastAccessed: (lessonId) =>
        set((state) => {
          state.lastAccessed[lessonId] = new Date()
        }),

      // Computed
      getProgress: (courseId) => {
        const state = get()
        const lessons = Object.keys(state.completed).filter((id) =>
          id.startsWith(courseId)
        )
        const completed = lessons.filter((id) => state.completed[id])

        return {
          total: lessons.length,
          completed: completed.length,
          percentage: lessons.length > 0
            ? Math.round((completed.length / lessons.length) * 100)
            : 0,
        }
      },
    })),
    {
      name: 'progress-storage',
      version: 1,
    }

) )

Rules:

- Track multiple metrics
- Compute progress dynamically
- Version the storage
- Use immer for updates
```

#### Sub-task 2.5.3: Create UI Store

```markdown
Create src/stores/ui-store.ts:

import { create } from 'zustand' import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type Theme = 'light' | 'dark' | 'system' type SidebarState = 'open' | 'closed' |
'collapsed'

interface UIStore { // Theme theme: Theme setTheme: (theme: Theme) => void

// Sidebar sidebarState: SidebarState setSidebarState: (state: SidebarState) =>
void toggleSidebar: () => void

// Modals modals: Record<string, boolean> openModal: (id: string) => void
closeModal: (id: string) => void

// Toast toasts: Array<{ id: string message: string type: 'success' | 'error' |
'info' }> addToast: (toast: Omit<UIStore['toasts'][0], 'id'>) => void
removeToast: (id: string) => void }

export const useUIStore = create<UIStore>()( devtools( immer((set) => ({ //
Theme theme: 'system', setTheme: (theme) => set((state) => { state.theme = theme
}),

      // Sidebar
      sidebarState: 'open',
      setSidebarState: (sidebarState) =>
        set((state) => {
          state.sidebarState = sidebarState
        }),
      toggleSidebar: () =>
        set((state) => {
          state.sidebarState = state.sidebarState === 'open' ? 'closed' : 'open'
        }),

      // Modals
      modals: {},
      openModal: (id) =>
        set((state) => {
          state.modals[id] = true
        }),
      closeModal: (id) =>
        set((state) => {
          state.modals[id] = false
        }),

      // Toast
      toasts: [],
      addToast: (toast) =>
        set((state) => {
          state.toasts.push({
            ...toast,
            id: Math.random().toString(36),
          })
        }),
      removeToast: (id) =>
        set((state) => {
          state.toasts = state.toasts.filter((t) => t.id !== id)
        }),
    }))

) )

Rules:

- Don't persist UI state
- Use devtools only
- Handle multiple UI states
- Generate IDs for toasts
```

#### Sub-task 2.5.4: Create Content Store

```markdown
Create src/stores/content-store.ts:

import { create } from 'zustand' import { devtools } from 'zustand/middleware'
import type { Course, Module, Lesson } from '@/types'

interface ContentStore { // Cache courses: Course[] courseMap: Record<string,
Course>

// Actions setCourses: (courses: Course[]) => void setCourse: (course: Course)
=> void getCourse: (id: string) => Course | undefined getLesson: (courseId:
string, moduleId: string, lessonId: string) => Lesson | undefined

// Search searchCourses: (query: string) => Course[] }

export const useContentStore = create<ContentStore>()( devtools((set, get) => ({
// Cache courses: [], courseMap: {},

    // Actions
    setCourses: (courses) =>
      set({
        courses,
        courseMap: courses.reduce(
          (acc, course) => ({ ...acc, [course.id]: course }),
          {}
        ),
      }),

    setCourse: (course) =>
      set((state) => ({
        courseMap: { ...state.courseMap, [course.id]: course },
        courses: state.courses.some((c) => c.id === course.id)
          ? state.courses.map((c) => (c.id === course.id ? course : c))
          : [...state.courses, course],
      })),

    getCourse: (id) => get().courseMap[id],

    getLesson: (courseId, moduleId, lessonId) => {
      const course = get().courseMap[courseId]
      if (!course) return undefined

      const module = course.modules.find((m) => m.id === moduleId)
      if (!module) return undefined

      return module.lessons.find((l) => l.id === lessonId)
    },

    // Search
    searchCourses: (query) => {
      const normalizedQuery = query.toLowerCase()
      return get().courses.filter(
        (course) =>
          course.title.toLowerCase().includes(normalizedQuery) ||
          course.description.toLowerCase().includes(normalizedQuery) ||
          course.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      )
    },

})) )

Rules:

- Cache courses in memory
- Provide search functionality
- Create lookup maps
- Don't persist content
```

#### Sub-task 2.5.5: Create Store Hooks

```markdown
Create src/stores/hooks.ts:

import { useAuthStore } from './auth-store' import { useProgressStore } from
'./progress-store' import { useUIStore } from './ui-store' import {
useContentStore } from './content-store' import { useShallow } from
'zustand/react/shallow'

// Auth hooks export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) =>
Boolean(state.user))

// Progress hooks export const useProgress = (courseId: string) => { return
useProgressStore( useShallow((state) => ({ progress:
state.getProgress(courseId), markComplete: state.markComplete, markIncomplete:
state.markIncomplete, })) ) }

// UI hooks export const useTheme = () => useUIStore((state) => state.theme)
export const useSidebar = () => { return useUIStore( useShallow((state) => ({
state: state.sidebarState, toggle: state.toggleSidebar, set:
state.setSidebarState, })) ) }

// Content hooks export const useCourse = (id: string) => { return
useContentStore((state) => state.getCourse(id)) }

export const useSearchCourses = (query: string) => { return
useContentStore((state) => state.searchCourses(query)) }

Rules:

- Create specific hooks
- Use shallow comparison
- Export typed hooks
- Avoid over-fetching
```

---

## 📋 Phase 3: Authentication System

### Task 3.1: Configure NextAuth

#### Sub-task 3.1.1: Create Auth Configuration

```markdown
Create src/lib/auth/config.ts:

import type { NextAuthConfig } from 'next-auth' import Credentials from
'next-auth/providers/credentials' import Google from
'next-auth/providers/google' import GitHub from 'next-auth/providers/github'
import { env } from '@/config/env'

export const authConfig: NextAuthConfig = { providers: [ Credentials({ name:
'credentials', credentials: { email: { label: 'Email', type: 'email' },
password: { label: 'Password', type: 'password' }, }, async
authorize(credentials) { // Implement credential validation // This will be
implemented in sub-task 3.1.3 return null }, }), Google({ clientId:
env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, }), GitHub({
clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET, }), ],
pages: { signIn: '/auth/login', signOut: '/auth/logout', error: '/auth/error',
verifyRequest: '/auth/verify', }, session: { strategy: 'jwt', maxAge: 30 _ 24 _
60 \* 60, // 30 days }, }

Rules:

- Configure all providers
- Set custom pages
- Use JWT strategy
- Set session duration
```

#### Sub-task 3.1.2: Setup Auth Callbacks

```markdown
Create src/lib/auth/callbacks.ts:

import type { NextAuthConfig } from 'next-auth' import type { JWT } from
'next-auth/jwt' import type { User, Role } from '@/types'

export const callbacks: NextAuthConfig['callbacks'] = { async jwt({ token, user,
account }) { if (user) { token.id = user.id token.role = user.role as Role }

    if (account) {
      token.accessToken = account.access_token
      token.refreshToken = account.refresh_token
    }

    return token

},

async session({ session, token }) { if (session.user) { session.user.id =
token.id as string session.user.role = token.role as Role }

    return session

},

async signIn({ user, account, profile }) { // Allow OAuth without email
verification if (account?.provider !== 'credentials') { return true }

    // Check if email is verified for credentials
    const dbUser = await getUserByEmail(user.email!)
    return dbUser?.emailVerified ?? false

},

async redirect({ url, baseUrl }) { // Redirect to dashboard after sign in if
(url.startsWith(baseUrl)) { return url }

    return baseUrl + '/dashboard'

}, }

Rules:

- Add user ID to session
- Include role in JWT
- Verify email for credentials
- Handle redirects properly
```

#### Sub-task 3.1.3: Implement Credential Provider

```markdown
Create src/lib/auth/providers/credentials.ts:

import { z } from 'zod' import bcrypt from 'bcryptjs' import { getUserByEmail }
from '@/lib/db/users'

const credentialsSchema = z.object({ email: z.string().email(), password:
z.string().min(8), })

export async function authorizeCredentials( credentials: Record<string, unknown>
) { const parsed = credentialsSchema.safeParse(credentials)

if (!parsed.success) { throw new Error('Invalid credentials') }

const { email, password } = parsed.data

const user = await getUserByEmail(email) if (!user || !user.password) { throw
new Error('User not found') }

const isValid = await bcrypt.compare(password, user.password) if (!isValid) {
throw new Error('Invalid password') }

return { id: user.id, email: user.email, name: user.name, role: user.role, } }

Rules:

- Validate with Zod
- Use bcrypt for passwords
- Return user object
- Throw descriptive errors
```

#### Sub-task 3.1.4: Create Auth Middleware

```markdown
Create src/lib/auth/middleware.ts:

import { NextResponse } from 'next/server' import type { NextRequest } from
'next/server' import { auth } from './auth'

export async function authMiddleware(request: NextRequest) { const session =
await auth() const pathname = request.nextUrl.pathname

// Public routes const publicRoutes = ['/auth/login', '/auth/register', '/',
'/courses'] if (publicRoutes.includes(pathname)) { return NextResponse.next() }

// Protected routes if (!session) { const url = new URL('/auth/login',
request.url) url.searchParams.set('callbackUrl', pathname) return
NextResponse.redirect(url) }

// Admin routes if (pathname.startsWith('/admin')) { if (session.user.role !==
'admin') { return NextResponse.redirect(new URL('/unauthorized', request.url)) }
}

return NextResponse.next() }

export const config = { matcher:
['/((?!api|_next/static|_next/image|favicon.ico).*)'], }

Rules:

- Check session on protected routes
- Redirect to login if needed
- Verify admin role
- Skip static files
```

#### Sub-task 3.1.5: Create Auth Utilities

```markdown
Create src/lib/auth/utils.ts:

import { auth } from './auth' import { redirect } from 'next/navigation' import
type { Role } from '@/types'

export async function getSession() { const session = await auth() return session
}

export async function requireAuth() { const session = await getSession()

if (!session) { redirect('/auth/login') }

return session }

export async function requireRole(role: Role) { const session = await
requireAuth()

if (session.user.role !== role) { redirect('/unauthorized') }

return session }

export function generateVerificationToken() { return crypto.randomUUID() }

export function generatePasswordResetToken() { return crypto.randomUUID() }

Rules:

- Create helper functions
- Use server-side redirects
- Generate secure tokens
- Export typed functions
```

### Task 3.2: Create Auth Components

#### Sub-task 3.2.1: Build Login Form

```markdown
Create src/components/auth/login-form.tsx:

'use client'

import { useForm } from 'react-hook-form' import { zodResolver } from
'@hookform/resolvers/zod' import { z } from 'zod' import { signIn } from
'next-auth/react' import { useState } from 'react' import { useRouter,
useSearchParams } from 'next/navigation' import { Button } from
'@/components/ui/button' import { Input } from '@/components/ui/input' import {
Label } from '@/components/ui/label' import { Alert } from
'@/components/ui/alert'

const loginSchema = z.object({ email: z.string().email('Invalid email address'),
password: z.string().min(8, 'Password must be at least 8 characters'), })

type LoginData = z.infer<typeof loginSchema>

export function LoginForm() { const router = useRouter() const searchParams =
useSearchParams() const callbackUrl = searchParams.get('callbackUrl') ||
'/dashboard'

const [error, setError] = useState<string | null>(null) const [isLoading,
setIsLoading] = useState(false)

const { register, handleSubmit, formState: { errors }, } = useForm<LoginData>({
resolver: zodResolver(loginSchema), })

const onSubmit = async (data: LoginData) => { setIsLoading(true) setError(null)

    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }

}

return ( <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> {error
&& ( <Alert variant="destructive"> {error} </Alert> )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>

) }

Rules:

- Use React Hook Form
- Validate with Zod
- Handle loading states
- Show error messages
```

#### Sub-task 3.2.2: Build Register Form

```markdown
Create src/components/auth/register-form.tsx:

'use client'

import { useForm } from 'react-hook-form' import { zodResolver } from
'@hookform/resolvers/zod' import { z } from 'zod' import { useState } from
'react' import { useRouter } from 'next/navigation' import { Button } from
'@/components/ui/button' import { Input } from '@/components/ui/input' import {
Label } from '@/components/ui/label' import { Alert } from
'@/components/ui/alert'

const registerSchema = z.object({ name: z.string().min(2, 'Name must be at least
2 characters'), email: z.string().email('Invalid email address'), password: z
.string() .min(8, 'Password must be at least 8 characters') .regex(
/^(?=._[a-z])(?=._[A-Z])(?=.\*\d)/, 'Password must contain uppercase, lowercase,
and number' ), confirmPassword: z.string(), }).refine((data) => data.password
=== data.confirmPassword, { message: "Passwords don't match", path:
['confirmPassword'], })

type RegisterData = z.infer<typeof registerSchema>

export function RegisterForm() { const router = useRouter() const [error,
setError] = useState<string | null>(null) const [isLoading, setIsLoading] =
useState(false)

const { register, handleSubmit, formState: { errors }, } =
useForm<RegisterData>({ resolver: zodResolver(registerSchema), })

const onSubmit = async (data: RegisterData) => { setIsLoading(true)
setError(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Registration failed')
      }

      router.push('/auth/login?registered=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }

}

return ( <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> {error
&& ( <Alert variant="destructive"> {error} </Alert> )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          {...register('name')}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>

) }

Rules:

- Validate password strength
- Match password confirmation
- Call registration API
- Redirect on success
```

#### Sub-task 3.2.3: Build OAuth Buttons

```markdown
Create src/components/auth/oauth-buttons.tsx:

'use client'

import { signIn } from 'next-auth/react' import { useState } from 'react' import
{ Button } from '@/components/ui/button' import { Icons } from
'@/components/ui/icons'

interface OAuthButtonsProps { callbackUrl?: string }

export function OAuthButtons({ callbackUrl = '/dashboard' }: OAuthButtonsProps)
{ const [isLoading, setIsLoading] = useState<{ google: boolean github: boolean
}>({ google: false, github: false, })

const handleOAuth = async (provider: 'google' | 'github') => {
setIsLoading((prev) => ({ ...prev, [provider]: true }))

    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      console.error(`${provider} sign in error:`, error)
      setIsLoading((prev) => ({ ...prev, [provider]: false }))
    }

}

return ( <div className="space-y-2"> <Button variant="outline"
className="w-full" onClick={() => handleOAuth('google')}
disabled={isLoading.google || isLoading.github} > {isLoading.google ? (
<Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> ) : ( <Icons.google
className="mr-2 h-4 w-4" /> )} Continue with Google </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuth('github')}
        disabled={isLoading.google || isLoading.github}
      >
        {isLoading.github ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-4 w-4" />
        )}
        Continue with GitHub
      </Button>
    </div>

) }

Rules:

- Handle multiple providers
- Show loading states
- Disable during loading
- Use consistent styling
```

#### Sub-task 3.2.4: Build Password Reset Form

```markdown
Create src/components/auth/forgot-password-form.tsx:

'use client'

import { useForm } from 'react-hook-form' import { zodResolver } from
'@hookform/resolvers/zod' import { z } from 'zod' import { useState } from
'react' import { Button } from '@/components/ui/button' import { Input } from
'@/components/ui/input' import { Label } from '@/components/ui/label' import {
Alert } from '@/components/ui/alert'

const resetSchema = z.object({ email: z.string().email('Invalid email address'),
})

type ResetData = z.infer<typeof resetSchema>

export function ForgotPasswordForm() { const [status, setStatus] = useState<{
type: 'success' | 'error' | null message: string | null }>({ type: null,
message: null }) const [isLoading, setIsLoading] = useState(false)

const { register, handleSubmit, formState: { errors }, } = useForm<ResetData>({
resolver: zodResolver(resetSchema), })

const onSubmit = async (data: ResetData) => { setIsLoading(true) setStatus({
type: null, message: null })

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send reset email')
      }

      setStatus({
        type: 'success',
        message: 'Check your email for reset instructions',
      })
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }

}

return ( <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
{status.type && ( <Alert variant={status.type === 'error' ? 'destructive' :
'default'}> {status.message} </Alert> )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Reset Email'}
      </Button>
    </form>

) }

Rules:

- Simple email input
- Show success message
- Handle API errors
- Disable during send
```

#### Sub-task 3.2.5: Build Auth Guard Component

```markdown
Create src/components/auth/auth-guard.tsx:

'use client'

import { useSession } from 'next-auth/react' import { useRouter, usePathname }
from 'next/navigation' import { useEffect } from 'react' import { Loader } from
'@/components/ui/loader' import type { Role } from '@/types'

interface AuthGuardProps { children: React.ReactNode requireAuth?: boolean
requireRole?: Role fallback?: React.ReactNode redirectTo?: string }

export function AuthGuard({ children, requireAuth = true, requireRole, fallback
= <AuthLoading />, redirectTo = '/auth/login', }: AuthGuardProps) { const {
data: session, status } = useSession() const router = useRouter() const pathname
= usePathname()

useEffect(() => { if (status === 'loading') return

    if (requireAuth && !session) {
      const url = new URL(redirectTo, window.location.origin)
      url.searchParams.set('callbackUrl', pathname)
      router.push(url.toString())
      return
    }

    if (requireRole && session?.user.role !== requireRole) {
      router.push('/unauthorized')
      return
    }

}, [session, status, requireAuth, requireRole, router, pathname, redirectTo])

if (status === 'loading') { return <>{fallback}</> }

if (requireAuth && !session) { return <>{fallback}</> }

if (requireRole && session?.user.role !== requireRole) { return <>{fallback}</>
}

return <>{children}</> }

function AuthLoading() { return (

<div className="flex h-screen items-center justify-center">
<Loader className="h-8 w-8" /> </div> ) }

Rules:

- Check auth client-side
- Support role checking
- Show loading state
- Handle redirects
```

### Task 3.3: Implement Role-Based Access

#### Sub-task 3.3.1: Define Permissions

```markdown
Create src/lib/auth/permissions.ts:

export const PERMISSIONS = { // Course permissions 'course:view': ['guest',
'user', 'admin'], 'course:create': ['admin'], 'course:edit': ['admin'],
'course:delete': ['admin'],

// User permissions 'user:view': ['user', 'admin'], 'user:edit:own': ['user',
'admin'], 'user:edit:all': ['admin'], 'user:delete': ['admin'],

// Progress permissions 'progress:view:own': ['user', 'admin'],
'progress:view:all': ['admin'], 'progress:edit:own': ['user', 'admin'],

// Admin permissions 'admin:access': ['admin'], 'admin:analytics': ['admin'],
'admin:settings': ['admin'], } as const

export type Permission = keyof typeof PERMISSIONS export type Role = 'guest' |
'user' | 'admin'

export function hasPermission(role: Role, permission: Permission): boolean {
return PERMISSIONS[permission].includes(role) }

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean
{ return permissions.some((permission) => hasPermission(role, permission)) }

export function hasAllPermissions(role: Role, permissions: Permission[]):
boolean { return permissions.every((permission) => hasPermission(role,
permission)) }

Rules:

- Define all permissions
- Map to roles
- Export helper functions
- Use const assertions
```

#### Sub-task 3.3.2: Create Permission Hook

```markdown
Create src/hooks/use-permission.ts:

import { useSession } from 'next-auth/react' import { hasPermission,
hasAnyPermission, hasAllPermissions } from '@/lib/auth/permissions' import type
{ Permission } from '@/lib/auth/permissions'

export function usePermission() { const { data: session } = useSession() const
role = session?.user.role || 'guest'

return { can: (permission: Permission) => hasPermission(role, permission),
canAny: (permissions: Permission[]) => hasAnyPermission(role, permissions),
canAll: (permissions: Permission[]) => hasAllPermissions(role, permissions),
role, } }

export function useRole() { const { data: session } = useSession() return
session?.user.role || 'guest' }

export function useIsAdmin() { const role = useRole() return role === 'admin' }

Rules:

- Create convenience hooks
- Default to guest role
- Export specific checks
- Use session data
```

#### Sub-task 3.3.3: Create Permission Guard

```markdown
Create src/components/auth/permission-guard.tsx:

'use client'

import { usePermission } from '@/hooks/use-permission' import type { Permission
} from '@/lib/auth/permissions'

interface PermissionGuardProps { children: React.ReactNode permission?:
Permission permissions?: Permission[] requireAll?: boolean fallback?:
React.ReactNode }

export function PermissionGuard({ children, permission, permissions, requireAll
= false, fallback = null, }: PermissionGuardProps) { const { can, canAny, canAll
} = usePermission()

let hasAccess = false

if (permission) { hasAccess = can(permission) } else if (permissions) {
hasAccess = requireAll ? canAll(permissions) : canAny(permissions) } else {
hasAccess = true }

if (!hasAccess) { return <>{fallback}</> }

return <>{children}</> }

// Usage example: // <PermissionGuard permission="course:create"> //
<CreateCourseButton /> // </PermissionGuard>

Rules:

- Check permissions client-side
- Support multiple permissions
- Allow fallback content
- Export for reuse
```

#### Sub-task 3.3.4: Create Server Permission Check

```markdown
Create src/lib/auth/check-permission.ts:

import { auth } from './auth' import { hasPermission } from './permissions'
import type { Permission } from './permissions'

export async function checkPermission(permission: Permission): Promise<boolean>
{ const session = await auth() const role = session?.user.role || 'guest' return
hasPermission(role, permission) }

export async function requirePermission(permission: Permission): Promise<void> {
const allowed = await checkPermission(permission) if (!allowed) { throw new
Error('Unauthorized: Insufficient permissions') } }

export async function checkRole(requiredRole: 'user' | 'admin'):
Promise<boolean> { const session = await auth() const role = session?.user.role
|| 'guest'

if (requiredRole === 'user') { return role === 'user' || role === 'admin' }

return role === requiredRole }

Rules:

- Server-side checks
- Throw on unauthorized
- Support role hierarchy
- Use in API routes
```

#### Sub-task 3.3.5: Create Protected API Route Helper

```markdown
Create src/lib/auth/protected-route.ts:

import { NextRequest, NextResponse } from 'next/server' import { auth } from
'./auth' import { checkPermission } from './check-permission' import type {
Permission } from './permissions'

type RouteHandler = ( req: NextRequest, context: { params: any; session: any } )
=> Promise<NextResponse>

export function protectedRoute( handler: RouteHandler, permission?: Permission )
{ return async (req: NextRequest, context: { params: any }) => { try { const
session = await auth()

      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      if (permission) {
        const allowed = await checkPermission(permission)
        if (!allowed) {
          return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
          )
        }
      }

      return handler(req, { ...context, session })
    } catch (error) {
      console.error('Protected route error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

} }

// Usage: // export const GET = protectedRoute( // async (req, { session }) => {
// // Handler code // }, // 'course:view' // )

Rules:

- Wrap API handlers
- Check auth first
- Then check permissions
- Pass session to handler
```

---

## 📋 Phase 4: Content Management System

### Task 4.1: Build Course File Scanner

#### Sub-task 4.1.1: Create File System Scanner

```markdown
Create src/lib/content/scanner.ts:

import fs from 'fs/promises' import path from 'path' import { z } from 'zod'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'courses')

export interface ScanResult { courses: CourseFile[] errors: ScanError[] }

export interface CourseFile { slug: string path: string metadata: CourseMetadata
modules: ModuleFile[] }

export interface ModuleFile { slug: string path: string metadata: ModuleMetadata
lessons: LessonFile[] }

export interface LessonFile { slug: string path: string metadata: LessonMetadata
}

export async function scanCourses(): Promise<ScanResult> { const courses:
CourseFile[] = [] const errors: ScanError[] = []

try { const coursesDirs = await fs.readdir(CONTENT_DIR)

    for (const courseSlug of coursesDirs) {
      const coursePath = path.join(CONTENT_DIR, courseSlug)
      const stat = await fs.stat(coursePath)

      if (!stat.isDirectory()) continue

      try {
        const course = await scanCourse(coursePath, courseSlug)
        courses.push(course)
      } catch (error) {
        errors.push({
          path: coursePath,
          message: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

} catch (error) { errors.push({ path: CONTENT_DIR, message: 'Failed to read
courses directory', }) }

return { courses, errors } }

async function scanCourse(coursePath: string, slug: string): Promise<CourseFile>
{ const metadataPath = path.join(coursePath, 'course.json') const metadata =
await readJsonFile<CourseMetadata>(metadataPath)

const modulesDir = path.join(coursePath, 'modules') const modules = await
scanModules(modulesDir)

return { slug, path: coursePath, metadata, modules, } }

Rules:

- Scan recursively
- Handle errors gracefully
- Return structured data
- Validate metadata
```

#### Sub-task 4.1.2: Create Metadata Parsers

```markdown
Create src/lib/content/metadata.ts:

import { z } from 'zod' import fs from 'fs/promises'

export const courseMetadataSchema = z.object({ title: z.string(), description:
z.string(), author: z.string(), thumbnail: z.string().optional(), duration:
z.number().positive(), difficulty: z.enum(['beginner', 'intermediate',
'advanced']), tags: z.array(z.string()), prerequisites:
z.array(z.string()).optional(), createdAt: z.string().datetime(), updatedAt:
z.string().datetime(), })

export const moduleMetadataSchema = z.object({ title: z.string(), description:
z.string(), order: z.number().int().positive(), duration: z.number().positive(),
})

export const lessonMetadataSchema = z.object({ title: z.string(), description:
z.string(), type: z.enum(['video', 'text', 'quiz']), duration:
z.number().positive(), order: z.number().int().positive(), })

export type CourseMetadata = z.infer<typeof courseMetadataSchema> export type
ModuleMetadata = z.infer<typeof moduleMetadataSchema> export type LessonMetadata
= z.infer<typeof lessonMetadataSchema>

export async function readJsonFile<T>(filePath: string): Promise<T> { try {
const content = await fs.readFile(filePath, 'utf-8') return JSON.parse(content)
} catch (error) { throw new Error(`Failed to read JSON file: ${filePath}`) } }

export function validateMetadata<T>( data: unknown, schema: z.ZodSchema<T>,
filePath: string ): T { const result = schema.safeParse(data)

if (!result.success) { const errors = result.error.errors.map((e) =>
`${e.path}: ${e.message}`) throw new
Error(`Invalid metadata in ${filePath}: ${errors.join(', ')}`) }

return result.data }

Rules:

- Define strict schemas
- Validate all metadata
- Provide clear errors
- Export types
```

#### Sub-task 4.1.3: Create Module Scanner

```markdown
Create src/lib/content/scan-modules.ts:

import fs from 'fs/promises' import path from 'path' import { readJsonFile,
validateMetadata, moduleMetadataSchema } from './metadata' import type {
ModuleFile, LessonFile } from './scanner'

export async function scanModules(modulesDir: string): Promise<ModuleFile[]> {
const modules: ModuleFile[] = []

try { const moduleDirs = await fs.readdir(modulesDir)

    for (const moduleSlug of moduleDirs) {
      const modulePath = path.join(modulesDir, moduleSlug)
      const stat = await fs.stat(modulePath)

      if (!stat.isDirectory()) continue

      const module = await scanModule(modulePath, moduleSlug)
      modules.push(module)
    }

} catch (error) { throw new Error(`Failed to scan modules: ${error}`) }

// Sort by order return modules.sort((a, b) => a.metadata.order -
b.metadata.order) }

async function scanModule(modulePath: string, slug: string): Promise<ModuleFile>
{ const metadataPath = path.join(modulePath, 'module.json') const rawMetadata =
await readJsonFile(metadataPath) const metadata = validateMetadata(rawMetadata,
moduleMetadataSchema, metadataPath)

const lessonsDir = path.join(modulePath, 'lessons') const lessons = await
scanLessons(lessonsDir)

return { slug, path: modulePath, metadata, lessons, } }

async function scanLessons(lessonsDir: string): Promise<LessonFile[]> { const
lessons: LessonFile[] = []

try { const files = await fs.readdir(lessonsDir) const mdxFiles =
files.filter((f) => f.endsWith('.mdx'))

    for (const file of mdxFiles) {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(lessonsDir, file)
      const lesson = await scanLesson(filePath, slug)
      lessons.push(lesson)
    }

} catch (error) { throw new Error(`Failed to scan lessons: ${error}`) }

return lessons.sort((a, b) => a.metadata.order - b.metadata.order) }

Rules:

- Scan directories recursively
- Sort by order field
- Validate all metadata
- Handle missing files
```

#### Sub-task 4.1.4: Create Lesson Scanner

```markdown
Create src/lib/content/scan-lessons.ts:

import fs from 'fs/promises' import matter from 'gray-matter' import {
validateMetadata, lessonMetadataSchema } from './metadata' import type {
LessonFile } from './scanner'

export async function scanLesson( filePath: string, slug: string ):
Promise<LessonFile> { try { const content = await fs.readFile(filePath, 'utf-8')
const { data } = matter(content)

    const metadata = validateMetadata(data, lessonMetadataSchema, filePath)

    return {
      slug,
      path: filePath,
      metadata,
    }

} catch (error) { throw new Error(`Failed to scan lesson ${filePath}: ${error}`)
} }

export async function getLessonContent(filePath: string): Promise<string> { try
{ const content = await fs.readFile(filePath, 'utf-8') const { content:
mdxContent } = matter(content) return mdxContent } catch (error) { throw new
Error(`Failed to read lesson content: ${error}`) } }

export async function getLessonMetadata(filePath: string):
Promise<LessonMetadata> { try { const content = await fs.readFile(filePath,
'utf-8') const { data } = matter(content) return validateMetadata(data,
lessonMetadataSchema, filePath) } catch (error) { throw new
Error(`Failed to read lesson metadata: ${error}`) } }

Rules:

- Parse frontmatter
- Validate metadata
- Separate content/metadata
- Handle file errors
```

#### Sub-task 4.1.5: Create Course Manifest Generator

```markdown
Create src/lib/content/manifest.ts:

import { scanCourses } from './scanner' import type { Course } from '@/types'
import fs from 'fs/promises' import path from 'path'

export interface CourseManifest { courses: Course[] generatedAt: string version:
string }

export async function generateCourseManifest(): Promise<CourseManifest> { const
{ courses: courseFiles, errors } = await scanCourses()

if (errors.length > 0) { console.error('Scan errors:', errors) }

const courses: Course[] = courseFiles.map((courseFile) => ({ id: courseFile.slug
as CourseId, slug: courseFile.slug, title: courseFile.metadata.title,
description: courseFile.metadata.description, thumbnail:
courseFile.metadata.thumbnail || null, author: courseFile.metadata.author,
duration: courseFile.metadata.duration, difficulty:
courseFile.metadata.difficulty, tags: courseFile.metadata.tags, modules:
courseFile.modules.map((moduleFile) => ({ id:
`${courseFile.slug}/${moduleFile.slug}` as ModuleId, slug: moduleFile.slug,
title: moduleFile.metadata.title, description: moduleFile.metadata.description,
order: moduleFile.metadata.order, lessons: moduleFile.lessons.map((lessonFile)
=> ({ id: `${courseFile.slug}/${moduleFile.slug}/${lessonFile.slug}` as
LessonId, slug: lessonFile.slug, title: lessonFile.metadata.title, description:
lessonFile.metadata.description, type: lessonFile.metadata.type, duration:
lessonFile.metadata.duration, order: lessonFile.metadata.order, })), })),
createdAt: new Date(courseFile.metadata.createdAt), updatedAt: new
Date(courseFile.metadata.updatedAt), }))

return { courses, generatedAt: new Date().toISOString(), version: '1.0.0', } }

export async function saveCourseManifest(manifest: CourseManifest):
Promise<void> { const manifestPath = path.join(process.cwd(), '.next', 'cache',
'courses.json') await fs.mkdir(path.dirname(manifestPath), { recursive: true })
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2)) }

export async function loadCourseManifest(): Promise<CourseManifest | null> { try
{ const manifestPath = path.join(process.cwd(), '.next', 'cache',
'courses.json') const content = await fs.readFile(manifestPath, 'utf-8') return
JSON.parse(content) } catch { return null } }

Rules:

- Generate full manifest
- Map to domain types
- Cache manifest file
- Handle errors gracefully
```

### Task 4.2: Create Content API Layer

#### Sub-task 4.2.1: Create Course API

```markdown
Create src/lib/content/api/courses.ts:

import { loadCourseManifest, generateCourseManifest } from '../manifest' import
type { Course } from '@/types' import { cache } from 'react'

export const getCourses = cache(async (): Promise<Course[]> => { let manifest =
await loadCourseManifest()

if (!manifest || process.env.NODE_ENV === 'development') { manifest = await
generateCourseManifest() await saveCourseManifest(manifest) }

return manifest.courses })

export const getCourse = cache(async (slug: string): Promise<Course | null> => {
const courses = await getCourses() return courses.find((course) => course.slug
=== slug) || null })

export const getCourseById = cache(async (id: CourseId): Promise<Course | null>
=> { const courses = await getCourses() return courses.find((course) =>
course.id === id) || null })

export const searchCourses = cache(async (query: string): Promise<Course[]> => {
const courses = await getCourses() const normalizedQuery = query.toLowerCase()

return courses.filter((course) => { const searchableText = [ course.title,
course.description, course.author, ...course.tags, ].join(' ').toLowerCase()

    return searchableText.includes(normalizedQuery)

}) })

export const getCoursesByTag = cache(async (tag: string): Promise<Course[]> => {
const courses = await getCourses() return courses.filter((course) =>
course.tags.some((t) => t.toLowerCase() === tag.toLowerCase()) ) })

export const getCoursesByDifficulty = cache( async (difficulty:
Course['difficulty']): Promise<Course[]> => { const courses = await getCourses()
return courses.filter((course) => course.difficulty === difficulty) } )

Rules:

- Use React cache
- Generate manifest if needed
- Provide multiple access methods
- Cache in production
```

#### Sub-task 4.2.2: Create Lesson API

```markdown
Create src/lib/content/api/lessons.ts:

import { getCourse } from './courses' import { processMDX } from
'@/lib/mdx/processor' import { getLessonContent } from '../scan-lessons' import
path from 'path' import { cache } from 'react' import type { Lesson, MDXContent
} from '@/types'

export const getLesson = cache( async ( courseSlug: string, moduleSlug: string,
lessonSlug: string ): Promise<Lesson | null> => { const course = await
getCourse(courseSlug) if (!course) return null

    const module = course.modules.find((m) => m.slug === moduleSlug)
    if (!module) return null

    return module.lessons.find((l) => l.slug === lessonSlug) || null

} )

export const getLessonContent = cache( async ( courseSlug: string, moduleSlug:
string, lessonSlug: string ): Promise<MDXContent | null> => { const lesson =
await getLesson(courseSlug, moduleSlug, lessonSlug) if (!lesson) return null

    const lessonPath = path.join(
      process.cwd(),
      'content',
      'courses',
      courseSlug,
      'modules',
      moduleSlug,
      'lessons',
      `${lessonSlug}.mdx`
    )

    try {
      const content = await getLessonContent(lessonPath)
      const processed = await processMDX(content)

      return {
        frontmatter: lesson,
        content,
        compiledSource: processed.mdxSource.compiledSource,
      }
    } catch (error) {
      console.error('Failed to get lesson content:', error)
      return null
    }

} )

export const getAdjacentLessons = cache( async ( courseSlug: string, moduleSlug:
string, lessonSlug: string ): Promise<{ previous: Lesson | null; next: Lesson |
null }> => { const course = await getCourse(courseSlug) if (!course) return {
previous: null, next: null }

    // Flatten all lessons
    const allLessons: Array<{ lesson: Lesson; moduleSlug: string }> = []
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        allLessons.push({ lesson, moduleSlug: module.slug })
      }
    }

    // Find current lesson index
    const currentIndex = allLessons.findIndex(
      (item) => item.moduleSlug === moduleSlug && item.lesson.slug === lessonSlug
    )

    if (currentIndex === -1) return { previous: null, next: null }

    return {
      previous: currentIndex > 0 ? allLessons[currentIndex - 1].lesson : null,
      next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].lesson : null,
    }

} )

Rules:

- Cache MDX processing
- Handle adjacent lessons
- Return null for missing
- Process MDX on demand
```

#### Sub-task 4.2.3: Create Navigation API

```markdown
Create src/lib/content/api/navigation.ts:

import { getCourse } from './courses' import { cache } from 'react'

export interface NavigationItem { id: string title: string slug: string type:
'course' | 'module' | 'lesson' children?: NavigationItem[] metadata?: {
duration?: number completed?: boolean locked?: boolean } }

export const getCourseNavigation = cache( async (courseSlug: string):
Promise<NavigationItem | null> => { const course = await getCourse(courseSlug)
if (!course) return null

    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      type: 'course',
      metadata: {
        duration: course.duration,
      },
      children: course.modules.map((module) => ({
        id: module.id,
        title: module.title,
        slug: module.slug,
        type: 'module',
        children: module.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          type: 'lesson',
          metadata: {
            duration: lesson.duration,
          },
        })),
      })),
    }

} )

export const getBreadcrumbs = cache( async ( courseSlug: string, moduleSlug?:
string, lessonSlug?: string ): Promise<NavigationItem[]> => { const breadcrumbs:
NavigationItem[] = []

    const course = await getCourse(courseSlug)
    if (!course) return breadcrumbs

    breadcrumbs.push({
      id: course.id,
      title: course.title,
      slug: course.slug,
      type: 'course',
    })

    if (moduleSlug) {
      const module = course.modules.find((m) => m.slug === moduleSlug)
      if (module) {
        breadcrumbs.push({
          id: module.id,
          title: module.title,
          slug: module.slug,
          type: 'module',
        })

        if (lessonSlug) {
          const lesson = module.lessons.find((l) => l.slug === lessonSlug)
          if (lesson) {
            breadcrumbs.push({
              id: lesson.id,
              title: lesson.title,
              slug: lesson.slug,
              type: 'lesson',
            })
          }
        }
      }
    }

    return breadcrumbs

} )

export const getFlattenedLessons = cache( async (courseSlug: string):
Promise<Array<{ lesson: Lesson module: Module index: number total: number }>> =>
{ const course = await getCourse(courseSlug) if (!course) return []

    const lessons = []
    let index = 0

    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        lessons.push({
          lesson,
          module,
          index,
          total: 0, // Will be set after loop
        })
        index++
      }
    }

    // Set total for all items
    return lessons.map((item) => ({ ...item, total: lessons.length }))

} )

Rules:

- Build navigation tree
- Support breadcrumbs
- Flatten lessons for progress
- Include metadata
```

#### Sub-task 4.2.4: Create Content Search

```markdown
Create src/lib/content/api/search.ts:

import { getCourses } from './courses' import { cache } from 'react' import type
{ Course, Module, Lesson } from '@/types'

export interface SearchResult { type: 'course' | 'module' | 'lesson' item:
Course | Module | Lesson parent?: Course | Module matches: SearchMatch[] score:
number }

export interface SearchMatch { field: string excerpt: string position: number }

export const searchContent = cache( async (query: string, options?: { types?:
Array<'course' | 'module' | 'lesson'> limit?: number minScore?: number }):
Promise<SearchResult[]> => { const { types = ['course', 'module', 'lesson'],
limit = 20, minScore = 0.1 } = options || {}

    const courses = await getCourses()
    const results: SearchResult[] = []
    const normalizedQuery = query.toLowerCase().trim()

    if (!normalizedQuery) return []

    // Search courses
    if (types.includes('course')) {
      for (const course of courses) {
        const matches = searchInObject(course, normalizedQuery, [
          'title',
          'description',
          'tags',
          'author'
        ])

        if (matches.length > 0) {
          const score = calculateScore(matches, normalizedQuery)
          results.push({
            type: 'course',
            item: course,
            matches,
            score,
          })
        }
      }
    }

    // Search modules and lessons
    for (const course of courses) {
      if (types.includes('module')) {
        for (const module of course.modules) {
          const matches = searchInObject(module, normalizedQuery, [
            'title',
            'description'
          ])

          if (matches.length > 0) {
            const score = calculateScore(matches, normalizedQuery)
            results.push({
              type: 'module',
              item: module,
              parent: course,
              matches,
              score,
            })
          }
        }
      }

      if (types.includes('lesson')) {
        for (const module of course.modules) {
          for (const lesson of module.lessons) {
            const matches = searchInObject(lesson, normalizedQuery, [
              'title',
              'description'
            ])

            if (matches.length > 0) {
              const score = calculateScore(matches, normalizedQuery)
              results.push({
                type: 'lesson',
                item: lesson,
                parent: module,
                matches,
                score,
              })
            }
          }
        }
      }
    }

    // Sort by score and limit
    return results
      .filter((r) => r.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

} )

function searchInObject( obj: any, query: string, fields: string[] ):
SearchMatch[] { const matches: SearchMatch[] = []

for (const field of fields) { const value = obj[field] if (!value) continue

    const text = Array.isArray(value) ? value.join(' ') : String(value)
    const position = text.toLowerCase().indexOf(query)

    if (position !== -1) {
      matches.push({
        field,
        excerpt: getExcerpt(text, position, query.length),
        position,
      })
    }

}

return matches }

function calculateScore(matches: SearchMatch[], query: string): number { let
score = 0

for (const match of matches) { // Title matches score higher if (match.field ===
'title') score += 2 else score += 1

    // Exact matches score higher
    if (match.position === 0) score += 0.5

}

return score / (matches.length + 1) }

function getExcerpt(text: string, position: number, queryLength: number): string
{ const excerptLength = 100 const start = Math.max(0, position - 20) const end =
Math.min(text.length, position + queryLength + 80)

let excerpt = text.slice(start, end) if (start > 0) excerpt = '...' + excerpt if
(end < text.length) excerpt = excerpt + '...'

return excerpt }

Rules:

- Search multiple fields
- Score relevance
- Return excerpts
- Support filtering
```

#### Sub-task 4.2.5: Create Content Statistics

```markdown
Create src/lib/content/api/stats.ts:

import { getCourses } from './courses' import { cache } from 'react'

export interface ContentStats { totalCourses: number totalModules: number
totalLessons: number totalDuration: number byDifficulty: Record<string, number>
byType: Record<string, number> popularTags: Array<{ tag: string; count: number
}> }

export const getContentStats = cache(async (): Promise<ContentStats> => { const
courses = await getCourses()

const stats: ContentStats = { totalCourses: courses.length, totalModules: 0,
totalLessons: 0, totalDuration: 0, byDifficulty: { beginner: 0, intermediate: 0,
advanced: 0, }, byType: { video: 0, text: 0, quiz: 0, }, popularTags: [], }

const tagCounts: Record<string, number> = {}

for (const course of courses) { stats.totalDuration += course.duration
stats.byDifficulty[course.difficulty]++

    for (const tag of course.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }

    for (const module of course.modules) {
      stats.totalModules++

      for (const lesson of module.lessons) {
        stats.totalLessons++
        stats.byType[lesson.type]++
      }
    }

}

// Sort tags by count stats.popularTags = Object.entries(tagCounts) .map(([tag,
count]) => ({ tag, count })) .sort((a, b) => b.count - a.count) .slice(0, 10)

return stats })

export const getCourseStats = cache( async (courseSlug: string): Promise<{
modules: number lessons: number duration: number completionRate?: number } |
null> => { const courses = await getCourses() const course = courses.find((c) =>
c.slug === courseSlug)

    if (!course) return null

    let totalLessons = 0

    for (const module of course.modules) {
      totalLessons += module.lessons.length
    }

    return {
      modules: course.modules.length,
      lessons: totalLessons,
      duration: course.duration,
    }

} )

Rules:

- Calculate statistics
- Cache results
- Include tag analysis
- Support course-specific stats
```

### Task 4.3: Build MDX Components

#### Sub-task 4.3.1: Create Code Block Component

```markdown
Create src/components/mdx/code-block.tsx:

'use client'

import { useState } from 'react' import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react' import { cn } from '@/lib/utils'

interface CodeBlockProps { children: React.ReactNode className?: string
'data-language'?: string 'data-theme'?: string }

export function CodeBlock({ children, className, 'data-language': language,
...props }: CodeBlockProps) { const [copied, setCopied] = useState(false)

const handleCopy = async () => { const code = extractTextFromChildren(children)
await navigator.clipboard.writeText(code) setCopied(true) setTimeout(() =>
setCopied(false), 2000) }

return ( <div className="relative group"> {language && (

<div className="absolute top-0 left-4 -translate-y-1/2">
<span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full">
{language} </span> </div> )}

      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>

      <pre
        className={cn(
          'overflow-x-auto rounded-lg p-4 mt-6',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>

) }

function extractTextFromChildren(children: React.ReactNode): string { if (typeof
children === 'string') return children

if (Array.isArray(children)) { return
children.map(extractTextFromChildren).join('') }

if (React.isValidElement(children) && children.props.children) { return
extractTextFromChildren(children.props.children) }

return '' }

export function InlineCode({ children }: { children: React.ReactNode }) { return
(
<code className="px-1.5 py-0.5 text-sm font-mono bg-gray-100 dark:bg-gray-800 rounded">
{children} </code> ) }

Rules:

- Add copy functionality
- Show language badge
- Handle dark mode
- Extract text properly
```

#### Sub-task 4.3.2: Create Video Player Component

```markdown
Create src/components/mdx/video-player.tsx:

'use client'

import { useRef, useState, useEffect } from 'react' import { Play, Pause,
Volume2, VolumeX, Maximize } from 'lucide-react' import { Button } from
'@/components/ui/button' import { Slider } from '@/components/ui/slider' import
{ cn } from '@/lib/utils' import { useProgressStore } from
'@/stores/progress-store'

interface VideoPlayerProps { src: string poster?: string title?: string
lessonId?: string onComplete?: () => void }

export function VideoPlayer({ src, poster, title, lessonId, onComplete }:
VideoPlayerProps) { const videoRef = useRef<HTMLVideoElement>(null) const
[isPlaying, setIsPlaying] = useState(false) const [currentTime, setCurrentTime]
= useState(0) const [duration, setDuration] = useState(0) const [volume,
setVolume] = useState(1) const [isMuted, setIsMuted] = useState(false) const
[progress, setProgress] = useState(0)

const updateTimeSpent = useProgressStore((state) => state.updateTimeSpent) const
markComplete = useProgressStore((state) => state.markComplete)

useEffect(() => { const video = videoRef.current if (!video) return

    const updateProgress = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)

      // Update time spent every 10 seconds
      if (lessonId && Math.floor(video.currentTime) % 10 === 0) {
        updateTimeSpent(lessonId as ProgressId, 10)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (lessonId && progress > 90) {
        markComplete(lessonId as ProgressId)
        onComplete?.()
      }
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }

}, [lessonId, progress, updateTimeSpent, markComplete, onComplete])

const togglePlay = () => { if (videoRef.current) { if (isPlaying) {
videoRef.current.pause() } else { videoRef.current.play() }
setIsPlaying(!isPlaying) } }

const handleSeek = (value: number[]) => { if (videoRef.current) { const time =
(value[0] / 100) \* duration videoRef.current.currentTime = time
setCurrentTime(time) } }

const toggleMute = () => { if (videoRef.current) { videoRef.current.muted =
!isMuted setIsMuted(!isMuted) } }

const handleVolumeChange = (value: number[]) => { if (videoRef.current) {
videoRef.current.volume = value[0] setVolume(value[0]) setIsMuted(value[0]
=== 0) } }

const toggleFullscreen = () => { if (videoRef.current) { if
(document.fullscreenElement) { document.exitFullscreen() } else {
videoRef.current.requestFullscreen() } } }

const formatTime = (seconds: number) => { const mins = Math.floor(seconds / 60)
const secs = Math.floor(seconds % 60) return
`${mins}:${secs.toString().padStart(2, '0')}` }

return ( <div className="relative bg-black rounded-lg overflow-hidden group">
<video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full aspect-video"
        onClick={togglePlay}
      />

      <div className={cn(
        'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4',
        'opacity-0 group-hover:opacity-100 transition-opacity'
      )}>
        {title && (
          <h3 className="text-white text-sm mb-2">{title}</h3>
        )}

        <div className="space-y-2">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlay}
                className="text-white hover:text-white"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <span className="text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleMute}
                className="text-white hover:text-white"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.1}
                className="w-20"
              />

              <Button
                size="sm"
                variant="ghost"
                onClick={toggleFullscreen}
                className="text-white hover:text-white"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

) }

Rules:

- Track watch progress
- Update time spent
- Mark complete at 90%
- Support fullscreen
```

#### Sub-task 4.3.3: Create Quiz Component

```markdown
Create src/components/mdx/quiz.tsx:

'use client'

import { useState } from 'react' import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group' import
{ Label } from '@/components/ui/label' import { Alert } from
'@/components/ui/alert' import { Check, X } from 'lucide-react' import { cn }
from '@/lib/utils'

interface QuizQuestion { id: string question: string options: string[]
correctAnswer: number explanation?: string }

interface QuizProps { questions: QuizQuestion[] title?: string passingScore?:
number onComplete?: (score: number) => void }

export function Quiz({ questions, title = 'Quick Quiz', passingScore = 70,
onComplete }: QuizProps) { const [currentQuestion, setCurrentQuestion] =
useState(0) const [selectedAnswers, setSelectedAnswers] =
useState<Record<string, number>>({}) const [showResults, setShowResults] =
useState(false) const [showExplanation, setShowExplanation] = useState(false)

const question = questions[currentQuestion] const isLastQuestion =
currentQuestion === questions.length - 1

const handleAnswer = (value: string) => { setSelectedAnswers({
...selectedAnswers, [question.id]: parseInt(value), }) setShowExplanation(false)
}

const handleNext = () => { if (isLastQuestion) { setShowResults(true) const
score = calculateScore() onComplete?.(score) } else {
setCurrentQuestion(currentQuestion + 1) setShowExplanation(false) } }

const handlePrevious = () => { setCurrentQuestion(currentQuestion - 1)
setShowExplanation(false) }

const handleCheckAnswer = () => { setShowExplanation(true) }

const calculateScore = () => { let correct = 0 questions.forEach((q) => { if
(selectedAnswers[q.id] === q.correctAnswer) { correct++ } }) return
Math.round((correct / questions.length) \* 100) }

const resetQuiz = () => { setCurrentQuestion(0) setSelectedAnswers({})
setShowResults(false) setShowExplanation(false) }

if (showResults) { const score = calculateScore() const passed = score >=
passingScore

    return (
      <div className="space-y-4 p-6 border rounded-lg">
        <h3 className="text-xl font-semibold">{title} - Results</h3>

        <div className={cn(
          'p-4 rounded-lg text-center',
          passed ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'
        )}>
          <div className="text-3xl font-bold mb-2">{score}%</div>
          <p className="text-sm">
            {passed ? 'Congratulations! You passed!' : 'Keep practicing!'}
          </p>
        </div>

        <div className="space-y-2">
          {questions.map((q, index) => {
            const userAnswer = selectedAnswers[q.id]
            const isCorrect = userAnswer === q.correctAnswer

            return (
              <div key={q.id} className="flex items-center gap-2">
                {isCorrect ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">Question {index + 1}</span>
              </div>
            )
          })}
        </div>

        <Button onClick={resetQuiz} className="w-full">
          Try Again
        </Button>
      </div>
    )

}

return ( <div className="space-y-4 p-6 border rounded-lg">

<div className="flex justify-between items-center">
<h3 className="text-xl font-semibold">{title}</h3>
<span className="text-sm text-gray-500"> Question {currentQuestion + 1} of
{questions.length} </span> </div>

      <div className="space-y-4">
        <p className="font-medium">{question
```

```markdown
.question}</p>

        <RadioGroup
          value={selectedAnswers[question.id]?.toString()}
          onValueChange={handleAnswer}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && selectedAnswers[question.id] !== undefined && (
          <Alert
            variant={
              selectedAnswers[question.id] === question.correctAnswer
                ? 'default'
                : 'destructive'
            }
          >
            <div className="space-y-2">
              <p className="font-medium">
                {selectedAnswers[question.id] === question.correctAnswer
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </p>
              {question.explanation && (
                <p className="text-sm">{question.explanation}</p>
              )}
            </div>
          </Alert>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        {!showExplanation && selectedAnswers[question.id] !== undefined && (
          <Button
            variant="outline"
            onClick={handleCheckAnswer}
          >
            Check Answer
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={selectedAnswers[question.id] === undefined}
          className="ml-auto"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>

) }

Rules:

- Track selected answers
- Show explanations
- Calculate score
- Support retry
```

#### Sub-task 4.3.4: Create Callout Component

```markdown
Create src/components/mdx/callout.tsx:

'use client'

import { Info, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'warning' | 'error' | 'success'

interface CalloutProps { type?: CalloutType title?: string children:
React.ReactNode }

const calloutConfig = { info: { icon: Info, className: 'bg-blue-50
border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800
dark:text-blue-100', iconClassName: 'text-blue-500', }, warning: { icon:
AlertTriangle, className: 'bg-yellow-50 border-yellow-200 text-yellow-900
dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100', iconClassName:
'text-yellow-500', }, error: { icon: AlertCircle, className: 'bg-red-50
border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800
dark:text-red-100', iconClassName: 'text-red-500', }, success: { icon:
CheckCircle, className: 'bg-green-50 border-green-200 text-green-900
dark:bg-green-950 dark:border-green-800 dark:text-green-100', iconClassName:
'text-green-500', }, }

export function Callout({ type = 'info', title, children }: CalloutProps) {
const config = calloutConfig[type] const Icon = config.icon

return ( <div className={cn( 'my-6 flex rounded-lg border p-4', config.className
)}> <Icon className={cn('h-5 w-5 flex-shrink-0', config.iconClassName)} />

<div className="ml-3 flex-1"> {title && (
<h5 className="mb-1 font-medium leading-tight"> {title} </h5> )}
<div className="text-sm [&>p]:leading-relaxed"> {children} </div> </div> </div>
) }

// Additional variants for specific use cases export function Note({ children }:
{ children: React.ReactNode }) { return ( <Callout type="info" title="Note">
{children} </Callout> ) }

export function Warning({ children }: { children: React.ReactNode }) { return (
<Callout type="warning" title="Warning"> {children} </Callout> ) }

export function Tip({ children }: { children: React.ReactNode }) { return (
<Callout type="success" title="Tip"> {children} </Callout> ) }

export function Important({ children }: { children: React.ReactNode }) { return
( <Callout type="error" title="Important"> {children} </Callout> ) }

Rules:

- Support multiple types
- Include icons
- Dark mode support
- Export convenience components
```

#### Sub-task 4.3.5: Create Navigation Components

```markdown
Create src/components/mdx/navigation.tsx:

'use client'

import Link from 'next/link' import { ChevronLeft, ChevronRight } from
'lucide-react' import { Button } from '@/components/ui/button' import { cn }
from '@/lib/utils'

interface NavigationLink { title: string href: string }

interface LessonNavigationProps { previous?: NavigationLink next?:
NavigationLink className?: string }

export function LessonNavigation({ previous, next, className }:
LessonNavigationProps) { return ( <nav className={cn( 'flex items-center
justify-between py-8 border-t', className )}> {previous ? (

<Link href={previous.href} className="group">
<Button variant="ghost" className="pl-2">
<ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
<div className="text-left">
<div className="text-xs text-muted-foreground">Previous</div>
<div className="text-sm font-medium">{previous.title}</div> </div> </Button>
</Link> ) : ( <div /> )}

      {next && (
        <Link href={next.href} className="group">
          <Button variant="ghost" className="pr-2">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="text-sm font-medium">{next.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </nav>

) }

interface TableOfContentsProps { headings: Array<{ id: string text: string
level: number }> className?: string }

export function TableOfContents({ headings, className }: TableOfContentsProps) {
return ( <nav className={cn('space-y-1', className)}>

<h4 className="font-medium mb-2">On this page</h4>
<ul className="space-y-1 text-sm"> {headings.map((heading) => ( <li
key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }} > <a
href={`#${heading.id}`} className="text-muted-foreground hover:text-foreground
transition-colors" > {heading.text} </a> </li> ))} </ul> </nav> ) }

interface BreadcrumbItem { title: string href?: string }

interface BreadcrumbsProps { items: BreadcrumbItem[] className?: string }

export function Breadcrumbs({ items, className }: BreadcrumbsProps) { return (

<nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1
text-sm', className)} > {items.map((item, index) => (
<div key={index} className="flex items-center"> {index > 0 && (
<ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" /> )} {item.href ?
( <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            > {item.title} </Link> ) : (
<span className="text-foreground font-medium">{item.title}</span> )} </div> ))}
</nav> ) }

Rules:

- Create reusable navigation
- Support breadcrumbs
- Include TOC component
- Add hover effects
```

---

## 📋 Phase 5: User Interface Implementation

### Task 5.1: Create Layout Components

#### Sub-task 5.1.1: Create Root Layout

```markdown
Create src/components/layout/root-layout.tsx:

'use client'

import { useTheme } from '@/hooks/use-theme' import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster' import { AnimatePresence }
from 'framer-motion'

interface RootLayoutProps { children: React.ReactNode }

export function RootLayout({ children }: RootLayoutProps) { const { theme } =
useTheme()

return ( <div className={cn( 'min-h-screen bg-background font-sans antialiased',
theme === 'dark' && 'dark' )} > <AnimatePresence mode="wait"> {children}
</AnimatePresence> <Toaster /> </div> ) }

// Skip link for accessibility export function SkipLink() { return ( <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground p-2 rounded-md"
    > Skip to main content </a> ) }

// Main content wrapper export function MainContent({ children, className }: {
children: React.ReactNode className?: string }) { return ( <main
id="main-content" className={cn('flex-1', className)} > {children} </main> ) }

Rules:

- Include skip links
- Support dark mode
- Add toast container
- Wrap with animations
```

#### Sub-task 5.1.2: Create Navigation Component

```markdown
Create src/components/layout/navigation.tsx:

'use client'

import Link from 'next/link' import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button' import { ThemeToggle } from
'@/components/theme/theme-toggle' import { UserMenu } from './user-menu' import
{ MobileMenu } from './mobile-menu' import { cn } from '@/lib/utils' import {
useScrollPosition } from '@/hooks/use-scroll-position' import { APP_NAME } from
'@/config/constants'

const navItems = [ { href: '/', label: 'Home' }, { href: '/courses', label:
'Courses' }, { href: '/about', label: 'About' }, ]

export function Navigation() { const pathname = usePathname() const
scrollPosition = useScrollPosition() const isScrolled = scrollPosition > 0

return ( <header className={cn( 'sticky top-0 z-50 w-full transition-all
duration-300', isScrolled ? 'bg-background/80 backdrop-blur-md border-b
shadow-sm' : 'bg-transparent' )} >

<nav className="container flex h-16 items-center justify-between"> {/_ Logo _/}
<Link href="/" className="flex items-center space-x-2">
<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
{APP_NAME} </span> </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserMenu />
          <MobileMenu items={navItems} />
        </div>
      </nav>
    </header>

) }

// Sticky navigation for course pages export function CourseNavigation({
courseName, children }: { courseName: string children?: React.ReactNode }) {
const isScrolled = useScrollPosition() > 100

return ( <div className={cn( 'sticky top-16 z-40 w-full bg-background/95
backdrop-blur border-b transition-all', isScrolled ? 'py-2' : 'py-4' )} >

<div className="container flex items-center justify-between"> <h1 className={cn(
'font-semibold transition-all', isScrolled ? 'text-lg' : 'text-2xl' )}>
{courseName} </h1> {children} </div> </div> ) }

Rules:

- Sticky navigation
- Active state indicators
- Mobile responsive
- Scroll-based styling
```

#### Sub-task 5.1.3: Create Sidebar Component

```markdown
Create src/components/layout/sidebar.tsx:

'use client'

import { useState, useEffect } from 'react' import { ChevronLeft, Menu } from
'lucide-react' import { Button } from '@/components/ui/button' import {
ScrollArea } from '@/components/ui/scroll-area' import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar' import { motion,
AnimatePresence } from 'framer-motion'

interface SidebarProps { children: React.ReactNode className?: string }

export function Sidebar({ children, className }: SidebarProps) { const { state,
toggle, set } = useSidebar() const [mounted, setMounted] = useState(false)

useEffect(() => { setMounted(true) }, [])

if (!mounted) return null

return ( <> {/_ Mobile overlay _/} <AnimatePresence> {state === 'open' && (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
exit={{ opacity: 0 }} className="fixed inset-0 z-30 bg-black/50 lg:hidden"
onClick={() => set('closed')} /> )} </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-background transition-transform duration-300',
          'lg:sticky lg:translate-x-0',
          state === 'open' ? 'translate-x-0' : '-translate-x-full',
          state === 'collapsed' && 'lg:w-16',
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className={cn(
            'font-semibold',
            state === 'collapsed' && 'lg:hidden'
          )}>
            Navigation
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="hidden lg:flex"
          >
            <ChevronLeft className={cn(
              'h-4 w-4 transition-transform',
              state === 'collapsed' && 'rotate-180'
            )} />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-4">
            {children}
          </div>
        </ScrollArea>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggle}
        className="fixed bottom-4 right-4 z-30 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>

) }

interface SidebarItemProps { href?: string icon?: React.ReactNode title: string
active?: boolean onClick?: () => void children?: React.ReactNode }

export function SidebarItem({ href, icon, title, active, onClick, children, }:
SidebarItemProps) { const { state } = useSidebar() const isCollapsed = state ===
'collapsed'

const content = ( <> {icon && (
<span className="flex h-5 w-5 items-center justify-center"> {icon} </span> )}
<span className={cn( 'flex-1 truncate', isCollapsed && 'lg:hidden' )}> {title}
</span> </> )

const className = cn( 'flex w-full items-center gap-3 rounded-md px-3 py-2
text-sm transition-colors', active ? 'bg-primary/10 text-primary font-medium' :
'hover:bg-muted text-muted-foreground hover:text-foreground' )

if (href) { return ( <Link href={href} className={className}> {content} </Link>
) }

return ( <button onClick={onClick} className={className}> {content} </button> )
}

export function SidebarSection({ title, children }: { title: string children:
React.ReactNode }) { const { state } = useSidebar() const isCollapsed = state
=== 'collapsed'

return ( <div className="space-y-1"> <h4 className={cn( 'px-3 py-2 text-xs
font-semibold text-muted-foreground uppercase tracking-wider', isCollapsed &&
'lg:hidden' )}> {title} </h4> {children} </div> ) }

Rules:

- Support collapse state
- Mobile overlay
- Smooth animations
- Accessible navigation
```

#### Sub-task 5.1.4: Create Footer Component

```markdown
Create src/components/layout/footer.tsx:

import Link from 'next/link' import { APP_NAME } from '@/config/constants'
import { Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = { product: [ { label: 'Features', href: '/features' }, {
label: 'Pricing', href: '/pricing' }, { label: 'Testimonials', href:
'/testimonials' }, ], resources: [ { label: 'Documentation', href: '/docs' }, {
label: 'Blog', href: '/blog' }, { label: 'Support', href: '/support' }, ],
company: [ { label: 'About', href: '/about' }, { label: 'Privacy', href:
'/privacy' }, { label: 'Terms', href: '/terms' }, ], }

const socialLinks = [ { icon: Github, href: 'https://github.com', label:
'GitHub' }, { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }, {
icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }, ]

export function Footer() { return ( <footer className="border-t bg-muted/30">

<div className="container py-12">
<div className="grid grid-cols-1 gap-8 md:grid-cols-4"> {/_ Brand _/}
<div className="space-y-4">
<h3 className="text-lg font-semibold">{APP_NAME}</h3>
<p className="text-sm text-muted-foreground"> Learn with our comprehensive
MDX-based courses. </p> <div className="flex space-x-4">
{socialLinks.map((social) => { const Icon = social.icon return ( <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  > <Icon className="h-5 w-5" /> </Link> ) })} </div> </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-sm font-semibold capitalize">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>

) }

export function SimpleFooter() { return ( <footer className="border-t">

<div className="container flex h-16 items-center justify-between">
<p className="text-sm text-muted-foreground"> © {new Date().getFullYear()}
{APP_NAME} </p> <div className="flex items-center space-x-4"> <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          > Privacy </Link> <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground"
          > Terms </Link> </div> </div> </footer> ) }

Rules:

- Include social links
- Multiple footer variants
- Responsive grid layout
- Semantic HTML
```

#### Sub-task 5.1.5: Create Mobile Menu

```markdown
Create src/components/layout/mobile-menu.tsx:

'use client'

import { useState } from 'react' import { usePathname } from 'next/navigation'
import Link from 'next/link' import { Menu, X } from 'lucide-react' import {
Button } from '@/components/ui/button' import { Sheet, SheetContent,
SheetTrigger } from '@/components/ui/sheet' import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface MobileMenuItem { href: string label: string icon?: React.ReactNode }

interface MobileMenuProps { items: MobileMenuItem[] }

export function MobileMenu({ items }: MobileMenuProps) { const [open, setOpen] =
useState(false) const pathname = usePathname()

return ( <Sheet open={open} onOpenChange={setOpen}> <SheetTrigger asChild>
<Button variant="ghost" size="sm" className="md:hidden">

<Menu className="h-5 w-5" /> <span className="sr-only">Toggle menu</span>
</Button> </SheetTrigger>
<SheetContent side="right" className="w-[300px] sm:w-[400px]">
<nav className="flex flex-col space-y-4">
<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold">Menu</h2> <Button variant="ghost"
size="sm" onClick={() => setOpen(false)} > <X className="h-5 w-5" /> </Button>
</div>

          {items.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted'
                )}
              >
                {item.icon && (
                  <span className="h-5 w-5">{item.icon}</span>
                )}
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>

) }

// Hamburger menu with animation export function HamburgerMenu({ open, onToggle
}: { open: boolean onToggle: () => void }) { return ( <button
      onClick={onToggle}
      className="relative h-8 w-8 md:hidden"
      aria-label="Toggle menu"
    > <span className="sr-only">Menu</span>

<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
<span className={cn( 'absolute block h-0.5 w-5 bg-current transition-all
duration-300', open ? 'rotate-45' : '-translate-y-1.5' )} /> <span
className={cn( 'absolute block h-0.5 w-5 bg-current transition-all
duration-300', open && 'opacity-0' )} /> <span className={cn( 'absolute block
h-0.5 w-5 bg-current transition-all duration-300', open ? '-rotate-45' :
'translate-y-1.5' )} /> </div> </button> ) }

Rules:

- Use Sheet component
- Animate menu items
- Close on navigation
- Include hamburger animation
```

### Task 5.2: Build Course Components

#### Sub-task 5.2.1: Create Course Card

```markdown
Create src/components/course/course-card.tsx:

'use client'

import Link from 'next/link' import Image from 'next/image' import { Clock,
BookOpen, Award } from 'lucide-react' import { Card, CardContent, CardFooter,
CardHeader } from '@/components/ui/card' import { Badge } from
'@/components/ui/badge' import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils' import { motion } from 'framer-motion' import
type { Course, CourseProgress } from '@/types'

interface CourseCardProps { course: Course progress?: CourseProgress index?:
number }

export function CourseCard({ course, progress, index = 0 }: CourseCardProps) {
const href = `/courses/${course.slug}`

return ( <motion.div initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
whileHover={{ y: -4 }} className="h-full" >

<Link href={href} className="block h-full">
<Card className="h-full overflow-hidden hover:shadow-lg transition-shadow"> {/_
Thumbnail _/} <div className="relative aspect-video overflow-hidden bg-muted">
{course.thumbnail ? ( <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              /> ) : (
<div className="absolute inset-0 flex items-center justify-center">
<BookOpen className="h-12 w-12 text-muted-foreground" /> </div> )}

            {/* Difficulty badge */}
            <Badge
              variant="secondary"
              className="absolute top-2 right-2"
            >
              {course.difficulty}
            </Badge>
          </div>

          <CardHeader>
            <h3 className="font-semibold line-clamp-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{Math.round(course.duration / 60)}h</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.modules.length} modules</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          {/* Progress footer */}
          {progress && (
            <CardFooter className="border-t pt-4">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{progress.percentComplete}%</span>
                </div>
                <Progress value={progress.percentComplete} />
                {progress.percentComplete === 100 && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Award className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      </Link>
    </motion.div>

) }

// Skeleton loader export function CourseCardSkeleton() { return (
<Card className="h-full overflow-hidden">

<div className="aspect-video bg-muted animate-pulse" />
<CardHeader className="space-y-2">
<div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
<div className="h-4 w-full bg-muted animate-pulse rounded" /> </CardHeader>
<CardContent className="space-y-3"> <div className="flex gap-4">
<div className="h-4 w-16 bg-muted animate-pulse rounded" />
<div className="h-4 w-20 bg-muted animate-pulse rounded" /> </div>
<div className="flex gap-1">
<div className="h-5 w-12 bg-muted animate-pulse rounded" />
<div className="h-5 w-16 bg-muted animate-pulse rounded" /> </div>
</CardContent> </Card> ) }

Rules:

- Show progress if available
- Hover animations
- Skeleton loader
- Responsive images
```

#### Sub-task 5.2.2: Create Course Grid

```markdown
Create src/components/course/course-grid.tsx:

'use client'

import { useState, useMemo } from 'react' import { CourseCard,
CourseCardSkeleton } from './course-card' import { Input } from
'@/components/ui/input' import { Button } from '@/components/ui/button' import {
Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from
'@/components/ui/select' import { Grid, List, Search, SlidersHorizontal } from
'lucide-react' import { cn } from '@/lib/utils' import type { Course,
CourseProgress } from '@/types'

interface CourseGridProps { courses: Course[] progress?: Record<string,
CourseProgress> loading?: boolean }

type SortOption = 'title' | 'duration' | 'difficulty' | 'recent' type ViewMode =
'grid' | 'list'

export function CourseGrid({ courses, progress, loading }: CourseGridProps) {
const [search, setSearch] = useState('') const [sortBy, setSortBy] =
useState<SortOption>('title') const [difficulty, setDifficulty] =
useState<string>('all') const [viewMode, setViewMode] =
useState<ViewMode>('grid') const [showFilters, setShowFilters] = useState(false)

const filteredAndSorted = useMemo(() => { let filtered = courses

    // Search filter
    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Difficulty filter
    if (difficulty !== 'all') {
      filtered = filtered.filter((course) => course.difficulty === difficulty)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'duration':
          return a.duration - b.duration
        case 'difficulty':
          const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'recent':
          return b.updatedAt.getTime() - a.updatedAt.getTime()
        default:
          return 0
      }
    })

    return sorted

}, [courses, search, sortBy, difficulty])

if (loading) { return (

<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> {Array.from({ length:
6 }).map((\_, i) => ( <CourseCardSkeleton key={i} /> ))} </div> ) }

return ( <div className="space-y-6"> {/_ Search and filters _/}

<div className="space-y-4"> <div className="flex flex-col sm:flex-row gap-4">
<div className="relative flex-1">
<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
<Input placeholder="Search courses..." value={search} onChange={(e) =>
setSearch(e.target.value)} className="pl-10" /> </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            <div className="flex rounded-md border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSorted.length} of {courses.length} courses
      </p>

      {/* Course grid/list */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found</p>
        </div>
      ) : (
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
          )}
        >
          {filteredAndSorted.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={progress?.[course.id]}
              index={index}
            />
          ))}
        </div>
      )}
    </div>

) }

Rules:

- Search functionality
- Multiple sort options
- Filter by difficulty
- Grid/list view toggle
```

#### Sub-task 5.2.3: Create Lesson View

```markdown
Create src/components/course/lesson-view.tsx:

'use client'

import { useState, useEffect } from 'react' import { MDXRemote } from
'next-mdx-remote' import { Button } from '@/components/ui/button' import {
Checkbox } from '@/components/ui/checkbox' import { Progress } from
'@/components/ui/progress' import { LessonNavigation } from
'@/components/mdx/navigation' import { TableOfContents } from
'@/components/mdx/navigation' import { Clock, CheckCircle } from 'lucide-react'
import { useProgressStore } from '@/stores/progress-store' import {
mdxComponents } from '@/lib/mdx/components' import { cn } from '@/lib/utils'
import type { Lesson, MDXContent } from '@/types'

interface LessonViewProps { lesson: Lesson content: MDXContent navigation: {
previous?: { title: string; href: string } next?: { title: string; href: string
} } courseId: string moduleId: string }

export function LessonView({ lesson, content, navigation, courseId, moduleId, }:
LessonViewProps) { const lessonId = `${courseId}/${moduleId}/${lesson.slug}` as
ProgressId const { completed, markComplete, markIncomplete, updateLastAccessed }
= useProgressStore() const isCompleted = completed[lessonId] || false

const [readingProgress, setReadingProgress] = useState(0) const [headings,
setHeadings] = useState<Array<{ id: string text: string level: number }>>([])

// Track reading progress useEffect(() => { const handleScroll = () => { const
windowHeight = window.innerHeight const documentHeight =
document.documentElement.scrollHeight const scrollTop = window.scrollY const
progress = (scrollTop / (documentHeight - windowHeight)) \* 100
setReadingProgress(Math.min(100, Math.max(0, progress))) }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

}, [])

// Extract headings for TOC useEffect(() => { const elements =
document.querySelectorAll('h2, h3') const extractedHeadings =
Array.from(elements).map((el) => ({ id: el.id, text: el.textContent || '',
level: parseInt(el.tagName[1]), })) setHeadings(extractedHeadings) }, [content])

// Update last accessed useEffect(() => { updateLastAccessed(lessonId) },
[lessonId, updateLastAccessed])

const handleComplete = () => { if (isCompleted) { markIncomplete(lessonId) }
else { markComplete(lessonId) } }

return ( <div className="relative"> {/_ Reading progress bar _/}

<div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted"> <div
className="h-full bg-primary transition-all duration-300"
style={{ width: `${readingProgress}%` }} /> </div>

      <div className="container max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <article className="lg:col-span-8">
            {/* Header */}
            <header className="mb-8 space-y-4">
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <p className="text-lg text-muted-foreground">{lesson.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration} min read</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </header>

            {/* MDX Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <MDXRemote {...content} components={mdxComponents} />
            </div>

            {/* Completion */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={handleComplete}
                />
                <span className="text-sm font-medium">
                  Mark as complete
                </span>
              </label>
            </div>

            {/* Navigation */}
            <LessonNavigation {...navigation} className="mt-8" />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20 space-y-6">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Download PDF
                </Button>
                <Button className="w-full" variant="outline">
                  Take Notes
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

) }

Rules:

- Reading progress indicator
- Table of contents
- Completion tracking
- Sticky sidebar
```

#### Sub-task 5.2.4: Create Progress Bar

```markdown
Create src/components/course/progress-bar.tsx:

'use client'

import { Progress } from '@/components/ui/progress' import { cn } from
'@/lib/utils' import { motion } from 'framer-motion' import { CheckCircle } from
'lucide-react'

interface ProgressBarProps { value: number label?: string showPercentage?:
boolean size?: 'sm' | 'md' | 'lg' variant?: 'default' | 'success' | 'warning'
className?: string }

export function ProgressBar({ value, label, showPercentage = true, size = 'md',
variant = 'default', className, }: ProgressBarProps) { const isComplete = value
=== 100

const sizeClasses = { sm: 'h-2', md: 'h-3', lg: 'h-4', }

const variantClasses = { default: 'bg-primary', success: 'bg-green-500',
warning: 'bg-yellow-500', }

return ( <div className={cn('space-y-2', className)}> {(label || showPercentage)
&& ( <div className="flex items-center justify-between text-sm"> {label &&
<span className="text-muted-foreground">{label}</span>}

<div className="flex items-center gap-1"> {showPercentage && (
<span className="font-medium">{Math.round(value)}%</span> )} {isComplete && (
<CheckCircle className="h-4 w-4 text-green-500" /> )} </div> </div> )}

      <div className="relative">
        <Progress
          value={value}
          className={cn(sizeClasses[size], 'bg-muted')}
        />
        <motion.div
          className={cn(
            'absolute top-0 left-0 h-full rounded-full',
            sizeClasses[size],
            variantClasses[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>

) }

interface CircularProgressProps { value: number size?: number strokeWidth?:
number showValue?: boolean className?: string }

export function CircularProgress({ value, size = 120, strokeWidth = 8, showValue
= true, className, }: CircularProgressProps) { const radius = (size -
strokeWidth) / 2 const circumference = radius _ 2 _ Math.PI const
strokeDashoffset = circumference - (value / 100) \* circumference

return ( <div className={cn('relative inline-flex', className)}>
<svg width={size} height={size} className="transform -rotate-90"> {/_ Background
circle _/} <circle cx={size / 2} cy={size / 2} r={radius}
strokeWidth={strokeWidth} className="fill-none stroke-muted" />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fill-none stroke-primary"
          strokeLinecap="round"
        />
      </svg>

      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(value)}%</span>
        </div>
      )}
    </div>

) }

interface StepProgressProps { currentStep: number totalSteps: number labels?:
string[] className?: string }

export function StepProgress({ currentStep, totalSteps, labels, className, }:
StepProgressProps) { return ( <div className={cn('space-y-2', className)}>

<div className="flex justify-between"> {Array.from({ length: totalSteps }, (\_,
i) => { const isActive = i < currentStep const isCurrent = i === currentStep - 1

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="relative">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                    isCurrent && 'ring-2 ring-primary ring-offset-2'
                  )}
                >
                  {isActive ? '✓' : i + 1}
                </div>

                {i < totalSteps - 1 && (
                  <div
                    className={cn(
                      'absolute top-4 left-8 w-full h-0.5 -translate-x-4',
                      isActive ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>

              {labels && labels[i] && (
                <span className="mt-2 text-xs text-muted-foreground text-center">
                  {labels[i]}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>

) }

Rules:

- Multiple progress variants
- Animated progress fill
- Circular progress option
- Step progress indicator
```

#### Sub-task 5.2.5: Create Completion Badge

```markdown
Create src/components/course/completion-badge.tsx:

'use client'

import { Award, Trophy, Star, Medal } from 'lucide-react' import { Badge } from
'@/components/ui/badge' import { cn } from '@/lib/utils' import { motion } from
'framer-motion' import confetti from 'canvas-confetti' import { useEffect } from
'react'

interface CompletionBadgeProps { type?: 'lesson' | 'module' | 'course'
animated?: boolean size?: 'sm' | 'md' | 'lg' showConfetti?: boolean className?:
string }

export function CompletionBadge({ type = 'lesson', animated = true, size = 'md',
showConfetti = false, className, }: CompletionBadgeProps) { const config = {
lesson: { icon: Star, label: 'Lesson Complete', color: 'bg-blue-500', }, module:
{ icon: Medal, label: 'Module Complete', color: 'bg-purple-500', }, course: {
icon: Trophy, label: 'Course Complete', color: 'bg-yellow-500', }, }

const sizeConfig = { sm: { badge: 'h-12 w-12', icon: 'h-6 w-6', text: 'text-xs',
}, md: { badge: 'h-16 w-16', icon: 'h-8 w-8', text: 'text-sm', }, lg: { badge:
'h-20 w-20', icon: 'h-10 w-10', text: 'text-base', }, }

const { icon: Icon, label, color } = config[type] const { badge, icon, text } =
sizeConfig[size]

useEffect(() => { if (showConfetti && animated) { confetti({ particleCount: 100,
spread: 70, origin: { y: 0.6 }, }) } }, [showConfetti, animated])

const content = ( <div className={cn('text-center space-y-2', className)}> <div
className={cn( 'relative inline-flex items-center justify-center rounded-full
text-white', badge, color )} > <Icon className={icon} /> {animated && (
<motion.div className="absolute inset-0 rounded-full"
initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }}
transition={{ duration: 1, repeat: Infinity }}
style={{ backgroundColor: 'currentColor' }} /> )} </div> <p
className={cn('font-medium', text)}>{label}</p> </div> )

if (animated) { return ( <motion.div initial={{ scale: 0, rotate: -180 }}
animate={{ scale: 1, rotate: 0 }}
transition={{ type: 'spring', duration: 0.6 }} > {content} </motion.div> ) }

return content }

interface AchievementBadgeProps { title: string description: string icon?:
React.ReactNode unlocked?: boolean unlockedAt?: Date rarity?: 'common' | 'rare'
| 'epic' | 'legendary' className?: string }

export function AchievementBadge({ title, description, icon = <Award />,
unlocked = false, unlockedAt, rarity = 'common', className, }:
AchievementBadgeProps) { const rarityConfig = { common: 'border-gray-400', rare:
'border-blue-400', epic: 'border-purple-400', legendary: 'border-yellow-400', }

return ( <motion.div whileHover={unlocked ? { scale: 1.05 } : {}} className={cn(
'relative p-4 border-2 rounded-lg transition-all', unlocked ?
rarityConfig[rarity] : 'border-muted opacity-50', className )} >

<div className="flex items-start gap-3"> <div className={cn( 'flex-shrink-0 w-12
h-12 rounded-full flex items-center justify-center', unlocked ? 'bg-primary
text-primary-foreground' : 'bg-muted' )} > {icon} </div>

        <div className="flex-1 space-y-1">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          {unlocked && unlockedAt && (
            <p className="text-xs text-muted-foreground">
              Unlocked {unlockedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl opacity-20">🔒</div>
        </div>
      )}
    </motion.div>

) }

interface CertificateBadgeProps { courseName: string completedAt: Date
studentName: string certificateId: string onDownload?: () => void }

export function CertificateBadge({ courseName, completedAt, studentName,
certificateId, onDownload, }: CertificateBadgeProps) { return ( <motion.div
initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
className="relative p-8 bg-gradient-to-br from-yellow-50 to-yellow-100
dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border-2
border-yellow-400" > <div className="text-center space-y-4">
<Trophy className="h-16 w-16 mx-auto text-yellow-500" />

        <div>
          <h3 className="text-2xl font-bold">Certificate of Completion</h3>
          <p className="text-muted-foreground">This certifies that</p>
        </div>

        <p className="text-xl font-semibold">{studentName}</p>

        <div>
          <p className="text-muted-foreground">has successfully completed</p>
          <p className="text-lg font-semibold mt-1">{courseName}</p>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Completed on {completedAt.toLocaleDateString()}</p>
          <p>Certificate ID: {certificateId}</p>
        </div>

        {onDownload && (
          <Button onClick={onDownload} className="mt-4">
            Download Certificate
          </Button>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4">
        <Star className="h-6 w-6 text-yellow-400" />
      </div>
      <div className="absolute top-4 right-4">
        <Star className="h-6 w-6 text-yellow-400" />
      </div>
      <div className="absolute bottom-4 left-4">
        <Star className="h-6 w-6 text-yellow-400" />
      </div>
      <div className="absolute bottom-4 right-4">
        <Star className="h-6 w-6 text-yellow-400" />
      </div>
    </motion.div>

) }

Rules:

- Multiple badge types
- Confetti animation
- Achievement system
- Certificate display
```

### Task 5.3: Implement Theme System

#### Sub-task 5.3.1: Create Theme Provider

```markdown
Create src/components/theme/theme-provider.tsx:

'use client'

import { createContext, useContext, useEffect, useState } from 'react' import {
useUIStore } from '@/stores/ui-store'

type Theme = 'light' | 'dark' | 'system'

interface ThemeProviderProps { children: React.ReactNode defaultTheme?: Theme
storageKey?: string }

const ThemeProviderContext = createContext<{ theme: Theme setTheme: (theme:
Theme) => void }>({ theme: 'system', setTheme: () => null, })

export function ThemeProvider({ children, defaultTheme = 'system', storageKey =
'theme', ...props }: ThemeProviderProps) { const [mounted, setMounted] =
useState(false) const { theme: storeTheme, setTheme: setStoreTheme } =
useUIStore()

// Initialize theme from localStorage or store const [theme, setTheme] =
useState<Theme>(() => { if (typeof window !== 'undefined') { return
(localStorage.getItem(storageKey) as Theme) || storeTheme || defaultTheme }
return defaultTheme })

useEffect(() => { setMounted(true) }, [])

useEffect(() => { const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Save to localStorage and store
    localStorage.setItem(storageKey, theme)
    setStoreTheme(theme)

}, [theme, storageKey, setStoreTheme])

// Listen for system theme changes useEffect(() => { if (theme !== 'system')
return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(mediaQuery.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)

}, [theme])

const value = { theme, setTheme, }

// Prevent flash of incorrect theme if (!mounted) { return null }

return ( <ThemeProviderContext.Provider {...props} value={value}> {children}
</ThemeProviderContext.Provider> ) }

export const useTheme = () => { const context = useContext(ThemeProviderContext)

if (context === undefined) { throw new Error('useTheme must be used within a
ThemeProvider') }

return context }

// Get resolved theme (light or dark, not system) export function
useResolvedTheme() { const { theme } = useTheme() const [resolvedTheme,
setResolvedTheme] = useState<'light' | 'dark'>('light')

useEffect(() => { if (theme === 'system') { const mediaQuery =
window.matchMedia('(prefers-color-scheme: dark)')
setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')

      const handleChange = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      setResolvedTheme(theme)
    }

}, [theme])

return resolvedTheme }

Rules:

- Prevent theme flash
- Support system preference
- Sync with localStorage
- Listen for changes
```

#### Sub-task 5.3.2: Create Theme Toggle

```markdown
Create src/components/theme/theme-toggle.tsx:

'use client'

import { Moon, Sun, Monitor } from 'lucide-react' import { Button } from
'@/components/ui/button' import { DropdownMenu, DropdownMenuContent,
DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { useTheme, useResolvedTheme } from './theme-provider' import { cn } from
'@/lib/utils'

export function ThemeToggle() { const { theme, setTheme } = useTheme() const
resolvedTheme = useResolvedTheme()

return ( <DropdownMenu> <DropdownMenuTrigger asChild>
<Button variant="ghost" size="icon" className="relative"> <Sun className={cn(
'h-5 w-5 transition-all', resolvedTheme === 'dark' ? 'rotate-90 scale-0' :
'rotate-0 scale-100' )} /> <Moon className={cn( 'absolute h-5 w-5
transition-all', resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90
scale-0' )} /> <span className="sr-only">Toggle theme</span> </Button>
</DropdownMenuTrigger> <DropdownMenuContent align="end"> <DropdownMenuItem
onClick={() => setTheme('light')}> <Sun className="mr-2 h-4 w-4" />
<span>Light</span> {theme === 'light' && <span className="ml-auto">✓</span>}
</DropdownMenuItem> <DropdownMenuItem onClick={() => setTheme('dark')}>
<Moon className="mr-2 h-4 w-4" /> <span>Dark</span> {theme === 'dark' &&
<span className="ml-auto">✓</span>} </DropdownMenuItem> <DropdownMenuItem
onClick={() => setTheme('system')}> <Monitor className="mr-2 h-4 w-4" />
<span>System</span> {theme === 'system' && <span className="ml-auto">✓</span>}
</DropdownMenuItem> </DropdownMenuContent> </DropdownMenu> ) }

// Simple toggle button export function ThemeToggleSimple() { const { theme,
setTheme } = useTheme() const resolvedTheme = useResolvedTheme()

const toggleTheme = () => { setTheme(resolvedTheme === 'dark' ? 'light' :
'dark') }

return ( <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    > <Sun className={cn( 'h-5 w-5 transition-all', resolvedTheme === 'dark' ?
'rotate-90 scale-0' : 'rotate-0 scale-100' )} /> <Moon className={cn( 'absolute
h-5 w-5 transition-all', resolvedTheme === 'dark' ? 'rotate-0 scale-100' :
'-rotate-90 scale-0' )} /> <span className="sr-only">Toggle theme</span>
</Button> ) }

// Theme toggle with custom styling export function ThemeToggleCustom({
className }: { className?: string }) { const { theme, setTheme } = useTheme()
const resolvedTheme = useResolvedTheme()

return ( <div className={cn('flex items-center gap-2 p-1 bg-muted rounded-full',
className)}> <button onClick={() => setTheme('light')} className={cn( 'p-2
rounded-full transition-colors', theme === 'light' ? 'bg-background shadow-sm' :
'hover:bg-background/50' )} aria-label="Light theme" >
<Sun className="h-4 w-4" /> </button> <button onClick={() => setTheme('system')}
className={cn( 'p-2 rounded-full transition-colors', theme === 'system' ?
'bg-background shadow-sm' : 'hover:bg-background/50' )} aria-label="System
theme" > <Monitor className="h-4 w-4" /> </button> <button onClick={() =>
setTheme('dark')} className={cn( 'p-2 rounded-full transition-colors', theme ===
'dark' ? 'bg-background shadow-sm' : 'hover:bg-background/50' )}
aria-label="Dark theme" > <Moon className="h-4 w-4" /> </button> </div> ) }

Rules:

- Multiple toggle variants
- Smooth icon transitions
- Show active state
- Accessible labels
```

#### Sub-task 5.3.3: Create Theme Hook

```markdown
Create src/hooks/use-theme.ts:

import { useTheme as useThemeContext, useResolvedTheme } from
'@/components/theme/theme-provider' import { useEffect, useState } from 'react'

export { useTheme } from '@/components/theme/theme-provider'

// Extended theme hook with utilities export function useThemeUtils() { const {
theme, setTheme } = useThemeContext() const resolvedTheme = useResolvedTheme()
const [mounted, setMounted] = useState(false)

useEffect(() => { setMounted(true) }, [])

const isDark = resolvedTheme === 'dark' const isLight = resolvedTheme ===
'light' const isSystem = theme === 'system'

const toggleTheme = () => { setTheme(isDark ? 'light' : 'dark') }

const cycleTheme = () => { const themes: Theme[] = ['light', 'dark', 'system']
const currentIndex = themes.indexOf(theme) const nextIndex = (currentIndex + 1)
% themes.length setTheme(themes[nextIndex]) }

return { theme, setTheme, resolvedTheme, isDark, isLight, isSystem, toggleTheme,
cycleTheme, mounted, } }

// Hook for theme-aware colors export function useThemeColors() { const { isDark
} = useThemeUtils()

return { primary: isDark ? '#8b5cf6' : '#6366f1', background: isDark ? '#0a0a0a'
: '#ffffff', foreground: isDark ? '#fafafa' : '#0a0a0a', muted: isDark ?
'#262626' : '#f5f5f5', border: isDark ? '#404040' : '#e5e5e5', success:
'#10b981', warning: '#f59e0b', error: '#ef4444', } }

// Hook for theme-aware images export function useThemeImage(lightSrc: string,
darkSrc: string) { const { resolvedTheme, mounted } = useThemeUtils()

if (!mounted) { return lightSrc // Default to light theme image }

return resolvedTheme === 'dark' ? darkSrc : lightSrc }

// Hook for theme transition export function useThemeTransition() { const
[isTransitioning, setIsTransitioning] = useState(false) const { theme } =
useThemeContext()

useEffect(() => { setIsTransitioning(true) const timer = setTimeout(() =>
setIsTransitioning(false), 300) return () => clearTimeout(timer) }, [theme])

return isTransitioning }

Rules:

- Export utility functions
- Provide convenience methods
- Handle mounting state
- Support theme-aware assets
```

#### Sub-task 5.3.4: Create Theme Definitions

```markdown
Create src/styles/themes.ts:

export const themes = { light: { colors: { background: 'hsl(0 0% 100%)',
foreground: 'hsl(222.2 84% 4.9%)', card: 'hsl(0 0% 100%)', cardForeground:
'hsl(222.2 84% 4.9%)', popover: 'hsl(0 0% 100%)', popoverForeground: 'hsl(222.2
84% 4.9%)', primary: 'hsl(262.1 83.3% 57.8%)', primaryForeground: 'hsl(210 40%
98%)', secondary: 'hsl(210 40% 96.1%)', secondaryForeground: 'hsl(222.2 47.4%
11.2%)', muted: 'hsl(210 40% 96.1%)', mutedForeground: 'hsl(215.4 16.3% 46.9%)',
accent: 'hsl(210 40% 96.1%)', accentForeground: 'hsl(222.2 47.4% 11.2%)',
destructive: 'hsl(0 84.2% 60.2%)', destructiveForeground: 'hsl(210 40% 98%)',
border: 'hsl(214.3 31.8% 91.4%)', input: 'hsl(214.3 31.8% 91.4%)', ring:
'hsl(262.1 83.3% 57.8%)', }, radius: { sm: '0.25rem', md: '0.5rem', lg:
'0.75rem', xl: '1rem', }, }, dark: { colors: { background: 'hsl(222.2 84%
4.9%)', foreground: 'hsl(210 40% 98%)', card: 'hsl(222.2 84% 4.9%)',
cardForeground: 'hsl(210 40% 98%)', popover: 'hsl(222.2 84% 4.9%)',
popoverForeground: 'hsl(210 40% 98%)', primary: 'hsl(263.4 70% 50.4%)',
primaryForeground: 'hsl(210 40% 98%)', secondary: 'hsl(217.2 32.6% 17.5%)',
secondaryForeground: 'hsl(210 40% 98%)', muted: 'hsl(217.2 32.6% 17.5%)',
mutedForeground: 'hsl(215 20.2% 65.1%)', accent: 'hsl(217.2 32.6% 17.5%)',
accentForeground: 'hsl(210 40% 98%)', destructive: 'hsl(0 62.8% 30.6%)',
destructiveForeground: 'hsl(210 40% 98%)', border: 'hsl(217.2 32.6% 17.5%)',
input: 'hsl(217.2 32.6% 17.5%)', ring: 'hsl(263.4 70% 50.4%)', }, radius: { sm:
'0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', }, }, } as const

// CSS variable generator export function generateCSSVariables(theme: keyof
typeof themes) { const selectedTheme = themes[theme] const cssVars:
Record<string, string> = {}

// Convert HSL values to CSS variables
Object.entries(selectedTheme.colors).forEach(([key, value]) => { const varName =
`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}` cssVars[varName] =
value.match(/\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d\*%/)?.[0] || value })

// Add radius variables Object.entries(selectedTheme.radius).forEach(([key,
value]) => { cssVars[`--radius-${key}`] = value })

return cssVars }

// Theme class generator for Tailwind export function getThemeClasses(theme:
keyof typeof themes) { const classes = []

if (theme === 'dark') { classes.push('dark') }

return classes.join(' ') }

// Export individual theme configs export const lightTheme = themes.light export
const darkTheme = themes.dark

// Theme utilities export const themeUtils = { isLight: (theme: string) => theme
=== 'light', isDark: (theme: string) => theme === 'dark', isSystem: (theme:
string) => theme === 'system', }

Rules:

- Define all theme variables
- Support CSS variable generation
- Export utility functions
- Keep themes consistent
```

#### Sub-task 5.3.5: Create Theme Components

```markdown
Create src/components/theme/themed-components.tsx:

'use client'

import { useThemeUtils } from '@/hooks/use-theme' import { cn } from
'@/lib/utils' import Image from 'next/image'

// Themed image that switches based on theme interface ThemedImageProps {
lightSrc: string darkSrc: string alt: string width: number height: number
className?: string priority?: boolean }

export function ThemedImage({ lightSrc, darkSrc, alt, width, height, className,
priority, }: ThemedImageProps) { const { resolvedTheme, mounted } =
useThemeUtils()

if (!mounted) { return ( <div className={cn('bg-muted animate-pulse',
className)} style={{ width, height }} /> ) }

return ( <Image src={resolvedTheme === 'dark' ? darkSrc : lightSrc} alt={alt}
width={width} height={height} className={className} priority={priority} /> ) }

// Background with theme-aware gradient interface ThemedBackgroundProps {
children: React.ReactNode className?: string variant?: 'gradient' | 'dots' |
'grid' }

export function ThemedBackground({ children, className, variant = 'gradient', }:
ThemedBackgroundProps) { const { isDark } = useThemeUtils()

const backgrounds = { gradient: isDark ? 'bg-gradient-to-br from-gray-900
via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-white via-purple-50
to-white', dots: isDark ? 'bg-dot-pattern-dark' : 'bg-dot-pattern-light', grid:
isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light', }

return ( <div className={cn(backgrounds[variant], className)}> {children} </div>
) }

// Glassmorphism card with theme support interface GlassCardProps { children:
React.ReactNode className?: string blur?: 'sm' | 'md' | 'lg' }

export function GlassCard({ children, className, blur = 'md', }: GlassCardProps)
{ const { isDark } = useThemeUtils()

const blurClasses = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg:
'backdrop-blur-lg', }

return ( <div className={cn( 'relative overflow-hidden rounded-lg border',
blurClasses[blur], isDark ? 'bg-white/5 border-white/10' : 'bg-black/5
border-black/10', className )} > {children} </div> ) }

// Theme-aware syntax highlighting interface CodeThemeProps { children:
React.ReactNode language: string }

export function CodeTheme({ children, language }: CodeThemeProps) { const {
isDark } = useThemeUtils()

return ( <div data-theme={isDark ? 'dark' : 'light'} data-language={language}
className="relative" > {children} </div> ) }

// Loading skeleton with theme interface ThemedSkeletonProps { className?:
string variant?: 'text' | 'circular' | 'rectangular' }

export function ThemedSkeleton({ className, variant = 'text', }:
ThemedSkeletonProps) { const { isDark } = useThemeUtils()

const baseClasses = cn( 'animate-pulse', isDark ? 'bg-gray-800' : 'bg-gray-200'
)

const variantClasses = { text: 'h-4 rounded', circular: 'rounded-full',
rectangular: 'rounded-md', }

return ( <div className={cn(baseClasses, variantClasses[variant], className)} />
) }

Rules:

- Handle mounting state
- Provide loading states
- Support theme variants
- Create reusable patterns
```

---

## 📋 Phase 6: Progress Tracking System

### Task 6.1: Build Progress Tracking

#### Sub-task 6.1.1: Create Progress Tracker Component

```markdown
Create src/features/progress/progress-tracker.tsx:

'use client'

import { useEffect, useRef } from 'react' import { useProgressStore } from
'@/stores/progress-store' import { usePathname } from 'next/navigation' import {
debounce } from '@/lib/utils' import type { ProgressId } from '@/types'

interface ProgressTrackerProps { lessonId: ProgressId onComplete?: () => void
onProgress?: (seconds: number) => void }

export function ProgressTracker({ lessonId, onComplete, onProgress, }:
ProgressTrackerProps) { const startTimeRef = useRef<number>(Date.now()) const
timeSpentRef = useRef<number>(0) const pathname = usePathname()

const { updateTimeSpent, updateLastAccessed, markComplete, } =
useProgressStore()

// Track time spent useEffect(() => { startTimeRef.current = Date.now()
updateLastAccessed(lessonId)

    // Update time spent every 30 seconds
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      timeSpentRef.current = elapsed

      // Only update if user has spent at least 10 seconds
      if (elapsed >= 10) {
        updateTimeSpent(lessonId, elapsed)
        onProgress?.(elapsed)
      }
    }, 30000) // 30 seconds

    // Save on unmount
    return () => {
      clearInterval(interval)
      const finalElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      if (finalElapsed >= 10) {
        updateTimeSpent(lessonId, finalElapsed)
      }
    }

}, [lessonId, updateTimeSpent, updateLastAccessed, onProgress])

// Track scroll progress for auto-completion useEffect(() => { const
checkScrollProgress = debounce(() => { const scrollHeight =
document.documentElement.scrollHeight const scrollTop =
document.documentElement.scrollTop const clientHeight =
document.documentElement.clientHeight

      const scrollProgress = (scrollTop + clientHeight) / scrollHeight

      // Auto-complete if user has scrolled 90% and spent 30+ seconds
      if (scrollProgress >= 0.9 && timeSpentRef.current >= 30) {
        markComplete(lessonId)
        onComplete?.()
      }
    }, 500)

    window.addEventListener('scroll', checkScrollProgress)
    return () => window.removeEventListener('scroll', checkScrollProgress)

}, [lessonId, markComplete, onComplete])

// Track visibility useEffect(() => { const handleVisibilityChange = () => { if
(document.hidden) { // Pause tracking when tab is hidden const elapsed =
Math.floor((Date.now() - startTimeRef.current) / 1000) timeSpentRef.current +=
elapsed } else { // Resume tracking startTimeRef.current = Date.now() } }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)

}, [])

return null // This is a tracking component, no UI }

// Hook for manual progress tracking export function
useProgressTracking(lessonId: ProgressId) { const { completed, timeSpent,
markComplete, markIncomplete, updateTimeSpent, } = useProgressStore()

const isCompleted = completed[lessonId] || false const totalTimeSpent =
timeSpent[lessonId] || 0

const toggleComplete = () => { if (isCompleted) { markIncomplete(lessonId) }
else { markComplete(lessonId) } }

const addTimeSpent = (seconds: number) => { updateTimeSpent(lessonId, seconds) }

return { isCompleted, totalTimeSpent, toggleComplete, addTimeSpent, } }

Rules:

- Track time automatically
- Handle tab visibility
- Auto-complete on scroll
- Debounce updates
```

#### Sub-task 6.1.2: Create Progress Hook

```markdown
Create src/hooks/use-progress.ts:

import { useProgressStore } from '@/stores/progress-store' import { useMemo }
from 'react' import type { Course, Module, Lesson, ProgressId } from '@/types'

export function useCourseProgress(course: Course) { const { completed, timeSpent
} = useProgressStore()

const progress = useMemo(() => { let totalLessons = 0 let completedLessons = 0
let totalTimeSpent = 0

    // Calculate progress for each module
    const moduleProgress = course.modules.map((module) => {
      const lessonProgress = module.lessons.map((lesson) => {
        const lessonId = `${course.slug}/${module.slug}/${lesson.slug}` as ProgressId
        const isCompleted = completed[lessonId] || false
        const lessonTime = timeSpent[lessonId] || 0

        totalLessons++
        if (isCompleted) completedLessons++
        totalTimeSpent += lessonTime

        return {
          lesson,
          isCompleted,
          timeSpent: lessonTime,
        }
      })

      const moduleCompleted = lessonProgress.filter((l) => l.isCompleted).length
      const moduleTotal = lessonProgress.length
      const modulePercentage = moduleTotal > 0 ? (moduleCompleted / moduleTotal) * 100 : 0

      return {
        module,
        lessons: lessonProgress,
        completed: moduleCompleted,
        total: moduleTotal,
        percentage: Math.round(modulePercentage),
        isCompleted: moduleCompleted === moduleTotal,
      }
    })

    const coursePercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    const estimatedTimeRemaining = Math.max(0, course.duration * 60 - totalTimeSpent)

    return {
      modules: moduleProgress,
      totalLessons,
      completedLessons,
      percentage: Math.round(coursePercentage),
      timeSpent: totalTimeSpent,
      estimatedTimeRemaining,
      isCompleted: completedLessons === totalLessons,
      nextLesson: findNextLesson(moduleProgress),
    }

}, [course, completed, timeSpent])

return progress }

function findNextLesson( moduleProgress: Array<{ module: Module lessons: Array<{
lesson: Lesson isCompleted: boolean }> }> ) { for (const { module, lessons } of
moduleProgress) { for (const { lesson, isCompleted } of lessons) { if
(!isCompleted) { return { module, lesson, } } } } return null }

export function useModuleProgress(courseSlug: string, module: Module) { const {
completed, timeSpent } = useProgressStore()

return useMemo(() => { const lessonProgress = module.lessons.map((lesson) => {
const lessonId = `${courseSlug}/${module.slug}/${lesson.slug}` as ProgressId
const isCompleted = completed[lessonId] || false const lessonTime =
timeSpent[lessonId] || 0

      return {
        lesson,
        isCompleted,
        timeSpent: lessonTime,
      }
    })

    const completedCount = lessonProgress.filter((l) => l.isCompleted).length
    const percentage = module.lessons.length > 0
      ? (completedCount / module.lessons.length) * 100
      : 0

    return {
      lessons: lessonProgress,
      completed: completedCount,
      total: module.lessons.length,
      percentage: Math.round(percentage),
      isCompleted: completedCount === module.lessons.length,
    }

}, [courseSlug, module, completed, timeSpent]) }

export function useLessonProgress(lessonId: ProgressId) { const { completed,
timeSpent, lastAccessed } = useProgressStore()

return { isCompleted: completed[lessonId] || false, timeSpent:
timeSpent[lessonId] || 0, lastAccessed: lastAccessed[lessonId] || null, } }

// Get overall platform progress export function useOverallProgress() { const {
completed, timeSpent } = useProgressStore()

return useMemo(() => { const completedLessons =
Object.values(completed).filter(Boolean).length const totalTimeSpent =
Object.values(timeSpent).reduce((sum, time) => sum + time, 0)

    return {
      completedLessons,
      totalTimeSpent,
      formattedTime: formatTime(totalTimeSpent),
      streakDays: calculateStreak(completed),
    }

}, [completed, timeSpent]) }

function formatTime(seconds: number): string { const hours = Math.floor(seconds
/ 3600) const minutes = Math.floor((seconds % 3600) / 60)

if (hours > 0) { return `${hours}h ${minutes}m` } return `${minutes}m` }

function calculateStreak(completed: Record<ProgressId, boolean>): number { //
Simple streak calculation - would need lastAccessed dates for real
implementation return Object.values(completed).filter(Boolean).length > 0 ? 1 :
0 }

Rules:

- Calculate nested progress
- Find next lesson
- Format time displays
- Memoize calculations
```

#### Sub-task 6.1.3: Create Progress Sync

```markdown
Create src/features/progress/progress-sync.ts:

import { useEffect, useRef } from 'react' import { useProgressStore } from
'@/stores/progress-store' import { useSession } from 'next-auth/react' import {
useMutation } from '@tanstack/react-query' import { debounce } from
'@/lib/utils' import type { Progress } from '@/types'

// API client for progress sync async function syncProgress(progress:
Partial<Progress>[]): Promise<void> { const response = await
fetch('/api/progress/sync', { method: 'POST', headers: { 'Content-Type':
'application/json' }, body: JSON.stringify({ progress }), })

if (!response.ok) { throw new Error('Failed to sync progress') } }

export function useProgressSync() { const { data: session } = useSession() const
lastSyncRef = useRef<Date>(new Date()) const pendingChangesRef =
useRef<Set<string>>(new Set())

const { completed, timeSpent, lastAccessed, } = useProgressStore()

const syncMutation = useMutation({ mutationFn: syncProgress, onSuccess: () => {
lastSyncRef.current = new Date() pendingChangesRef.current.clear() }, })

// Debounced sync function const debouncedSync = useRef( debounce(async () => {
if (!session?.user || pendingChangesRef.current.size === 0) return

      const changes: Partial<Progress>[] = Array.from(pendingChangesRef.current).map((lessonId) => ({
        userId: session.user.id,
        lessonId: lessonId as ProgressId,
        completed: completed[lessonId] || false,
        completedAt: completed[lessonId] ? new Date() : null,
        timeSpent: timeSpent[lessonId] || 0,
        lastAccessedAt: lastAccessed[lessonId] || new Date(),
      }))

      await syncMutation.mutateAsync(changes)
    }, 5000) // 5 second debounce

).current

// Track changes useEffect(() => { const handleStorageChange = (e: StorageEvent)
=> { if (e.key === 'progress-storage') { // Extract changed lesson IDs and add
to pending // This is simplified - real implementation would diff the changes
Object.keys(completed).forEach((id) => pendingChangesRef.current.add(id))
debouncedSync() } }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)

}, [completed, debouncedSync])

// Sync on window close useEffect(() => { const handleBeforeUnload = () => { if
(pendingChangesRef.current.size > 0) { // Use sendBeacon for reliable sync on
page close const changes = Array.from(pendingChangesRef.current).map((lessonId)
=> ({ lessonId, completed: completed[lessonId] || false, timeSpent:
timeSpent[lessonId] || 0, }))

        navigator.sendBeacon('/api/progress/sync', JSON.stringify({ changes }))
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)

}, [completed, timeSpent])

return { isSyncing: syncMutation.isPending, lastSync: lastSyncRef.current,
syncError: syncMutation.error, syncNow: () => debouncedSync(), } }

// Load progress from server on mount export function useLoadProgress() { const
{ data: session } = useSession() const { setProgress } = useProgressStore()

useEffect(() => { if (!session?.user) return

    async function loadProgress() {
      try {
        const response = await fetch('/api/progress')
        if (!response.ok) return

        const data = await response.json()

        // Merge server progress with local
        const completed: Record<string, boolean> = {}
        const timeSpent: Record<string, number> = {}
        const lastAccessed: Record<string, Date> = {}

        data.progress.forEach((p: Progress) => {
          completed[p.lessonId] = p.completed
          timeSpent[p.lessonId] = p.timeSpent
          lastAccessed[p.lessonId] = new Date(p.lastAccessedAt)
        })

        setProgress({ completed, timeSpent, lastAccessed })
      } catch (error) {
        console.error('Failed to load progress:', error)
      }
    }

    loadProgress()

}, [session, setProgress]) }

Rules:

- Debounce sync calls
- Handle offline state
- Sync on page close
- Merge server/local data
```

#### Sub-task 6.1.4: Create Progress Analytics

```markdown
Create src/features/progress/progress-analytics.tsx:

'use client'

import { useMemo } from 'react' import { useProgressStore } from
'@/stores/progress-store' import { Card, CardContent, CardHeader, CardTitle }
from '@/components/ui/card' import { CircularProgress, StepProgress } from
'@/components/course/progress-bar' import { BarChart, LineChart, Activity,
Clock, Trophy, Target } from 'lucide-react' import { cn } from '@/lib/utils'
import type { Course } from '@/types'

interface ProgressAnalyticsProps { courses: Course[] className?: string }

export function ProgressAnalytics({ courses, className }:
ProgressAnalyticsProps) { const { completed, timeSpent } = useProgressStore()

const analytics = useMemo(() => { // Overall stats const totalLessons =
courses.reduce((sum, course) => sum + course.modules.reduce((moduleSum, module)
=> moduleSum + module.lessons.length, 0 ), 0 )

    const completedLessons = Object.values(completed).filter(Boolean).length
    const totalTimeSpent = Object.values(timeSpent).reduce((sum, time) => sum + time, 0)
    const completionRate = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    // Daily activity (mock data - would need timestamps)
    const dailyActivity = generateDailyActivity(timeSpent)

    // Course breakdown
    const courseBreakdown = courses.map((course) => {
      let courseCompleted = 0
      let courseTotal = 0
      let courseTime = 0

      course.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          const lessonId = `${course.slug}/${module.slug}/${lesson.slug}`
          courseTotal++
          if (completed[lessonId]) courseCompleted++
          courseTime += timeSpent[lessonId] || 0
        })
      })

      return {
        course,
        completed: courseCompleted,
        total: courseTotal,
        percentage: courseTotal > 0 ? (courseCompleted / courseTotal) * 100 : 0,
        timeSpent: courseTime,
      }
    }).sort((a, b) => b.percentage - a.percentage)

    return {
      totalLessons,
      completedLessons,
      totalTimeSpent,
      completionRate,
      dailyActivity,
      courseBreakdown,
      averageTimePerLesson: completedLessons > 0 ? totalTimeSpent / completedLessons : 0,
    }

}, [courses, completed, timeSpent])

return ( <div className={cn('space-y-6', className)}> {/_ Summary Cards _/}

<div className="grid gap-4 md:grid-cols-4"> <Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium">Total Progress</CardTitle>
<Target className="h-4 w-4 text-muted-foreground" /> </CardHeader> <CardContent>
<div className="text-2xl font-bold">{Math.round(analytics.completionRate)}%</div>
<p className="text-xs text-muted-foreground"> {analytics.completedLessons} of
{analytics.totalLessons} lessons </p> </CardContent> </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(analytics.totalTimeSpent)}
            </div>
            <p className="text-xs text-muted-foreground">
              ~{Math.round(analytics.averageTimePerLesson / 60)}m per lesson
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Started</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.courseBreakdown.filter(c => c.completed > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {courses.length} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.courseBreakdown.filter(c => c.percentage === 100).length}
            </div>
            <p className="text-xs text-muted-foreground">
              courses finished
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.courseBreakdown.map(({ course, completed, total, percentage }) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {completed} of {total} lessons completed
                    </p>
                  </div>
                  <span className="text-sm font-medium">{Math.round(percentage)}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end gap-1">
            {analytics.dailyActivity.map((minutes, index) => (
              <div
                key={index}
                className="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors rounded-t"
                style={{ height: `${(minutes / Math.max(...analytics.dailyActivity)) * 100}%` }}
                title={`${minutes} minutes`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>

) }

function formatTime(seconds: number): string { const hours = Math.floor(seconds
/ 3600) const minutes = Math.floor((seconds % 3600) / 60)

if (hours > 0) { return `${hours}h ${minutes}m` } return `${minutes} min` }

function generateDailyActivity(timeSpent: Record<string, number>): number[] { //
Mock daily activity - in real app would calculate from timestamps return [30,
45, 60, 20, 90, 120, 75] }

Rules:

- Show comprehensive stats
- Visualize progress
- Calculate averages
- Sort by completion
```

#### Sub-task 6.1.5: Create Certificate Component

```markdown
Create src/features/progress/certificate.tsx:

'use client'

import { useRef } from 'react' import { Button } from '@/components/ui/button'
import { Download, Share2, Trophy } from 'lucide-react' import { toPng } from
'html-to-image' import { cn } from '@/lib/utils' import type { Course, User }
from '@/types'

interface CertificateProps { course: Course user: User completedAt: Date
certificateId: string className?: string }

export function Certificate({ course, user, completedAt, certificateId,
className, }: CertificateProps) { const certificateRef =
useRef<HTMLDivElement>(null)

const handleDownload = async () => { if (!certificateRef.current) return

    try {
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      })

      const link = document.createElement('a')
      link.download = `certificate-${course.slug}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to generate certificate:', error)
    }

}

const handleShare = async () => { try { await navigator.share({ title:
`Certificate of Completion - ${course.title}`, text:
`I just completed "${course.title}"! 🎉`, url: window.location.href, }) } catch
(error) { // Fallback to copy link await
navigator.clipboard.writeText(window.location.href) // Show toast notification }
}

return ( <div className={cn('space-y-4', className)}> {/_ Certificate _/} <div
ref={certificateRef} className="relative aspect-[1.414/1] max-w-2xl mx-auto
bg-white p-12 shadow-lg" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `,
        }} > {/_ Border decoration _/}

<div className="absolute inset-4 border-4 border-gray-300" />
<div className="absolute inset-6 border-2 border-gray-200" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center space-y-6">
          {/* Logo/Icon */}
          <Trophy className="h-16 w-16 text-yellow-500" />

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-serif text-gray-800">
              Certificate of Completion
            </h1>
            <p className="text-lg text-gray-600">This is to certify that</p>
          </div>

          {/* Student name */}
          <div className="py-4">
            <p className="text-3xl font-bold text-gray-900">{user.name}</p>
            <div className="w-64 h-0.5 bg-gray-300 mx-auto mt-2" />
          </div>

          {/* Course info */}
          <div className="space-y-2">
            <p className="text-lg text-gray-600">has successfully completed the course</p>
            <p className="text-2xl font-semibold text-gray-800">{course.title}</p>
          </div>

          {/* Date and signature */}
          <div className="mt-auto pt-8 w-full">
            <div className="flex justify-between items-end">
              <div className="text-left">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{completedAt.toLocaleDateString()}</p>
                <div className="w-32 h-0.5 bg-gray-300 mt-1" />
              </div>

              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-300 mb-1" />
                <p className="text-sm text-gray-600">Instructor Signature</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Certificate ID</p>
                <p className="font-mono text-xs">{certificateId}</p>
                <div className="w-32 h-0.5 bg-gray-300 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>

) }

// Certificate preview card export function CertificateCard({ course,
completedAt, onClick, }: { course: Course completedAt: Date onClick: () => void
}) { return ( <button
      onClick={onClick}
      className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-yellow-50 to-orange-50 p-6 text-left transition-all hover:shadow-lg"
    > <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8">

<div className="absolute inset-0 rounded-full bg-yellow-400/20" />
<Trophy className="absolute inset-4 h-16 w-16 text-yellow-600" /> </div>

      <div className="relative space-y-2">
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-muted-foreground">
          Completed on {completedAt.toLocaleDateString()}
        </p>
        <p className="text-sm font-medium text-primary">View Certificate →</p>
      </div>
    </button>

) }

Rules:

- Generate downloadable image
- Support sharing
- Beautiful design
- Include verification ID
```

### Task 6.2: Create Admin Dashboard

#### Sub-task 6.2.1: Create Dashboard Overview

```markdown
Create src/app/(admin)/admin/dashboard/page.tsx:

import { Suspense } from 'react' import { requireRole } from '@/lib/auth/utils'
import { getContentStats } from '@/lib/content/api/stats' import { getUserStats,
getRecentActivity } from '@/lib/api/admin' import { StatsCards, ActivityFeed,
CourseChart, UserGrowthChart } from '@/features/admin/components' import {
Skeleton } from '@/components/ui/skeleton'

export default async function AdminDashboard() { await requireRole('admin')

return ( <div className="space-y-6"> <div>

<h1 className="text-3xl font-bold">Dashboard</h1>
<p className="text-muted-foreground"> Welcome back! Here's what's happening on
your platform. </p> </div>

      {/* Stats Overview */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsOverview />
      </Suspense>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[300px]" />}>
          <UserGrowthChartWrapper />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px]" />}>
          <CourseCompletionChartWrapper />
        </Suspense>
      </div>

      {/* Recent Activity */}
      <Suspense fallback={<ActivityFeedSkeleton />}>
        <RecentActivityWrapper />
      </Suspense>
    </div>

) }

async function StatsOverview() { const [contentStats, userStats] = await
Promise.all([ getContentStats(), getUserStats(), ])

const stats = [ { title: 'Total Users', value:
userStats.totalUsers.toLocaleString(), change:
`+${userStats.newUsersThisMonth}`, trend: 'up' as const, }, { title: 'Active
Courses', value: contentStats.totalCourses.toString(), description:
`${contentStats.totalLessons} total lessons`, }, { title: 'Completion Rate',
value: `${userStats.averageCompletionRate}%`, change: '+2.5%', trend: 'up' as
const, }, { title: 'Total Time Spent', value:
formatHours(userStats.totalTimeSpent), description: 'This month', }, ]

return <StatsCards stats={stats} /> }

async function UserGrowthChartWrapper() { const data = await getUserGrowthData()
return <UserGrowthChart data={data} /> }

async function CourseCompletionChartWrapper() { const data = await
getCourseCompletionData() return <CourseChart data={data} /> }

async function RecentActivityWrapper() { const activities = await
getRecentActivity() return <ActivityFeed activities={activities} /> }

function StatsCardsSkeleton() { return (

<div className="grid gap-4 md:grid-cols-4"> {Array.from({ length: 4 }).map((\_,
i) => ( <Skeleton key={i} className="h-32" /> ))} </div> ) }

function ActivityFeedSkeleton() { return ( <div className="space-y-4">
{Array.from({ length: 5 }).map((\_, i) => (
<Skeleton key={i} className="h-16" /> ))} </div> ) }

function formatHours(minutes: number): string { const hours = Math.floor(minutes
/ 60) return `${hours.toLocaleString()}h` }

Rules:

- Use Suspense for loading
- Fetch data in parallel
- Show key metrics
- Include charts
```

#### Sub-task 6.2.2: Create Course Management

```markdown
Create src/app/(admin)/admin/courses/page.tsx:

'use client'

import { useState } from 'react' import { useQuery, useMutation, useQueryClient
} from '@tanstack/react-query' import { DataTable } from
'@/components/ui/data-table' import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' import { DropdownMenu,
DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from
'@/components/ui/dropdown-menu' import { Plus, Search, MoreHorizontal, Edit,
Trash, Eye } from 'lucide-react' import { useToast } from '@/hooks/use-toast'
import { CourseFormDialog } from '@/features/admin/course-form' import {
ColumnDef } from '@tanstack/react-table' import type { Course } from '@/types'

export default function CoursesManagement() { const [search, setSearch] =
useState('') const [selectedCourse, setSelectedCourse] = useState<Course |
null>(null) const [showForm, setShowForm] = useState(false)

const queryClient = useQueryClient() const { toast } = useToast()

const { data: courses, isLoading } = useQuery({ queryKey: ['admin', 'courses'],
queryFn: async () => { const response = await fetch('/api/admin/courses') if
(!response.ok) throw new Error('Failed to fetch courses') return response.json()
}, })

const deleteMutation = useMutation({ mutationFn: async (courseId: string) => {
const response = await fetch(`/api/admin/courses/${courseId}`, { method:
'DELETE', }) if (!response.ok) throw new Error('Failed to delete course') },
onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin',
'courses'] }) toast({ title: 'Course deleted', description: 'The course has been
successfully deleted.', }) }, })

const columns: ColumnDef<Course>[] = [ { accessorKey: 'title', header: 'Title',
cell: ({ row }) => ( <div> <p className="font-medium">{row.original.title}</p>

<p className="text-sm text-muted-foreground">{row.original.slug}</p> </div> ),
}, { accessorKey: 'author', header: 'Author', }, { accessorKey: 'difficulty',
header: 'Difficulty', cell: ({ row }) => (
<Badge variant="outline">{row.original.difficulty}</Badge> ), }, { accessorKey:
'modules', header: 'Modules', cell: ({ row }) => row.original.modules.length, },
{ id: 'lessons', header: 'Lessons', cell: ({ row }) =>
row.original.modules.reduce((sum, m) => sum + m.lessons.length, 0), }, {
accessorKey: 'duration', header: 'Duration', cell: ({ row }) =>
`${Math.round(row.original.duration / 60)}h`, }, { accessorKey: 'updatedAt',
header: 'Last Updated', cell: ({ row }) => new
Date(row.original.updatedAt).toLocaleDateString(), }, { id: 'actions', cell: ({
row }) => { const course = row.original
```

```markdown
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => window.open(`/courses/${course.slug}`, '_blank')}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCourse(course)
                  setShowForm(true)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteMutation.mutate(course.id)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

]

const filteredCourses = courses?.filter((course: Course) =>
course.title.toLowerCase().includes(search.toLowerCase()) ||
course.author.toLowerCase().includes(search.toLowerCase()) )

return ( <div className="space-y-6">

<div className="flex items-center justify-between"> <div>
<h1 className="text-3xl font-bold">Courses</h1>
<p className="text-muted-foreground"> Manage your course content and settings
</p> </div> <Button onClick={() => { setSelectedCourse(null) setShowForm(true)
}} > <Plus className="mr-2 h-4 w-4" /> Add Course </Button> </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredCourses || []}
        loading={isLoading}
      />

      <CourseFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        course={selectedCourse}
        onSuccess={() => {
          setShowForm(false)
          queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] })
        }}
      />
    </div>

) }

Rules:

- Data table for courses
- CRUD operations
- Search functionality
- Modal forms
```

#### Sub-task 6.2.3: Create User Management

```markdown
Create src/app/(admin)/admin/users/page.tsx:

'use client'

import { useState } from 'react' import { useQuery, useMutation, useQueryClient
} from '@tanstack/react-query' import { DataTable } from
'@/components/ui/data-table' import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' import { Badge } from
'@/components/ui/badge' import { Avatar, AvatarFallback, AvatarImage } from
'@/components/ui/avatar' import { Select, SelectContent, SelectItem,
SelectTrigger, SelectValue, } from '@/components/ui/select' import { Search,
Filter, Download, UserCheck, UserX } from 'lucide-react' import { ColumnDef }
from '@tanstack/react-table' import { useToast } from '@/hooks/use-toast' import
{ UserDetailsDialog } from '@/features/admin/user-details' import type { User }
from '@/types'

interface UserWithStats extends User { stats: { coursesEnrolled: number
coursesCompleted: number totalTimeSpent: number lastActive: Date } }

export default function UsersManagement() { const [search, setSearch] =
useState('') const [roleFilter, setRoleFilter] = useState<string>('all') const
[selectedUser, setSelectedUser] = useState<UserWithStats | null>(null) const
[showDetails, setShowDetails] = useState(false)

const queryClient = useQueryClient() const { toast } = useToast()

const { data, isLoading } = useQuery({ queryKey: ['admin', 'users', { search,
role: roleFilter }], queryFn: async () => { const params = new URLSearchParams()
if (search) params.append('search', search) if (roleFilter !== 'all')
params.append('role', roleFilter)

      const response = await fetch(`/api/admin/users?${params}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      return response.json()
    },

})

const updateRoleMutation = useMutation({ mutationFn: async ({ userId, role }: {
userId: string; role: Role }) => { const response = await
fetch(`/api/admin/users/${userId}/role`, { method: 'PATCH', headers: {
'Content-Type': 'application/json' }, body: JSON.stringify({ role }), }) if
(!response.ok) throw new Error('Failed to update role') }, onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }) toast({ title:
'Role updated', description: 'User role has been successfully updated.', }) },
})

const toggleStatusMutation = useMutation({ mutationFn: async ({ userId, active
}: { userId: string; active: boolean }) => { const response = await
fetch(`/api/admin/users/${userId}/status`, { method: 'PATCH', headers: {
'Content-Type': 'application/json' }, body: JSON.stringify({ active }), }) if
(!response.ok) throw new Error('Failed to update status') }, onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }) toast({ title:
'Status updated', description: 'User status has been successfully updated.', })
}, })

const columns: ColumnDef<UserWithStats>[] = [ { id: 'user', header: 'User',
cell: ({ row }) => { const user = row.original return (

<div className="flex items-center gap-3"> <Avatar className="h-8 w-8">
<AvatarImage src={user.image} /> <AvatarFallback>{user.name?.[0] ||
user.email[0]}</AvatarFallback> </Avatar> <div>
<p className="font-medium">{user.name || 'Unnamed'}</p>
<p className="text-sm text-muted-foreground">{user.email}</p> </div> </div> ) },
}, { accessorKey: 'role', header: 'Role', cell: ({ row }) => { const user =
row.original return ( <Select value={user.role} onValueChange={(value) =>
updateRoleMutation.mutate({ userId: user.id, role: value as Role }) } >
<SelectTrigger className="w-32"> <SelectValue /> </SelectTrigger>
<SelectContent> <SelectItem value="user">User</SelectItem>
<SelectItem value="admin">Admin</SelectItem> </SelectContent> </Select> ) }, },
{ id: 'progress', header: 'Progress', cell: ({ row }) => { const { stats } =
row.original return ( <div className="space-y-1"> <p className="text-sm">
{stats.coursesCompleted} / {stats.coursesEnrolled} courses </p> <Progress 
              value={
                stats.coursesEnrolled > 0 ? (stats.coursesCompleted /
stats.coursesEnrolled) _ 100 : 0 } className="h-2" /> </div> ) }, }, { id:
'timeSpent', header: 'Time Spent', cell: ({ row }) => { const hours =
Math.floor(row.original.stats.totalTimeSpent / 3600) return `${hours}h` }, }, {
id: 'lastActive', header: 'Last Active', cell: ({ row }) => { const date = new
Date(row.original.stats.lastActive) const days = Math.floor((Date.now() -
date.getTime()) / (1000 _ 60 _ 60 _ 24))

        if (days === 0) return 'Today'
        if (days === 1) return 'Yesterday'
        if (days < 7) return `${days} days ago`
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`
        return date.toLocaleDateString()
      },
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const user = row.original
        const isActive = user.emailVerified !== null

        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              toggleStatusMutation.mutate({ userId: user.id, active: !isActive })
            }
          >
            {isActive ? (
              <>
                <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                Active
              </>
            ) : (
              <>
                <UserX className="mr-2 h-4 w-4 text-red-500" />
                Inactive
              </>
            )}
          </Button>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedUser(row.original)
            setShowDetails(true)
          }}
        >
          View Details
        </Button>
      ),
    },

]

const exportUsers = async () => { const response = await
fetch('/api/admin/users/export') const blob = await response.blob() const url =
window.URL.createObjectURL(blob) const a = document.createElement('a') a.href =
url a.download = `users-${new Date().toISOString().split('T')[0]}.csv` a.click()
}

return ( <div className="space-y-6">

<div className="flex items-center justify-between"> <div>
<h1 className="text-3xl font-bold">Users</h1>
<p className="text-muted-foreground"> Manage user accounts and permissions </p>
</div> <Button onClick={exportUsers} variant="outline">
<Download className="mr-2 h-4 w-4" /> Export </Button> </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.users || []}
        loading={isLoading}
      />

      {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      )}
    </div>

) }

Rules:

- User data table
- Role management
- Status toggling
- Export functionality
```

#### Sub-task 6.2.4: Create Analytics Dashboard

```markdown
Create src/app/(admin)/admin/analytics/page.tsx:

'use client'

import { useState } from 'react' import { useQuery } from
'@tanstack/react-query' import { Card, CardContent, CardDescription, CardHeader,
CardTitle } from '@/components/ui/card' import { Tabs, TabsContent, TabsList,
TabsTrigger } from '@/components/ui/tabs' import { Select, SelectContent,
SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select' import {
DateRangePicker } from '@/components/ui/date-range-picker' import { LineChart,
BarChart, PieChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
Legend, ResponsiveContainer, } from 'recharts' import { TrendingUp, Users,
BookOpen, Clock } from 'lucide-react' import { startOfMonth, endOfMonth,
subMonths } from 'date-fns'

type DateRange = { from: Date to: Date }

export default function AnalyticsDashboard() { const [dateRange, setDateRange] =
useState<DateRange>({ from: startOfMonth(subMonths(new Date(), 2)), to:
endOfMonth(new Date()), })

const { data: analytics, isLoading } = useQuery({ queryKey: ['admin',
'analytics', dateRange], queryFn: async () => { const params = new
URLSearchParams({ from: dateRange.from.toISOString(), to:
dateRange.to.toISOString(), })

      const response = await fetch(`/api/admin/analytics?${params}`)
      if (!response.ok) throw new Error('Failed to fetch analytics')
      return response.json()
    },

})

if (isLoading) { return <div>Loading analytics...</div> }

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

return ( <div className="space-y-6">

<div className="flex items-center justify-between"> <div>
<h1 className="text-3xl font-bold">Analytics</h1>
<p className="text-muted-foreground"> Track platform performance and user
engagement </p> </div> <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
        /> </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.summary.newUsers} this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.activeLearners}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.summary.engagementRate}% engagement rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.summary.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              {analytics.summary.avgHoursPerUser}h per user
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          {/* Daily Active Users */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Active Users</CardTitle>
              <CardDescription>
                Number of users active each day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={analytics.engagement.dailyActiveUsers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Active Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Time Distribution</CardTitle>
              <CardDescription>
                When users are most active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analytics.engagement.timeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          {/* Course Popularity */}
          <Card>
            <CardHeader>
              <CardTitle>Course Popularity</CardTitle>
              <CardDescription>
                Most enrolled courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={analytics.courses.popularity}
                  layout="horizontal"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="title" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="enrollments" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Completion by Difficulty */}
          <Card>
            <CardHeader>
              <CardTitle>Completion Rate by Difficulty</CardTitle>
              <CardDescription>
                How difficulty affects completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={analytics.courses.completionByDifficulty}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.courses.completionByDifficulty.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                New user registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={analytics.users.growth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="New Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="totalUsers"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Total Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Retention */}
          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
              <CardDescription>
                Percentage of users returning each week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={analytics.users.retention}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {/* Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>
                Engagement metrics by content type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.content.performance.map((item: any) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.views} views • {item.avgTime}m avg
                      </span>
                    </div>
                    <Progress value={item.engagementScore} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

) }

Rules:

- Multiple chart types
- Date range filtering
- Tab organization
- Real-time data
```

#### Sub-task 6.2.5: Create Settings Page

```markdown
Create src/app/(admin)/admin/settings/page.tsx:

'use client'

import { useState } from 'react' import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' import { z } from 'zod'
import { useMutation } from '@tanstack/react-query' import { Card, CardContent,
CardDescription, CardHeader, CardTitle } from '@/components/ui/card' import {
Button } from '@/components/ui/button' import { Input } from
'@/components/ui/input' import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch' import { Label } from
'@/components/ui/label' import { Tabs, TabsContent, TabsList, TabsTrigger } from
'@/components/ui/tabs' import { Alert, AlertDescription } from
'@/components/ui/alert' import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast' import { Save, AlertCircle, Shield,
Bell, Palette, Database } from 'lucide-react'

const generalSettingsSchema = z.object({ siteName: z.string().min(1, 'Site name
is required'), siteDescription: z.string().min(1, 'Site description is
required'), supportEmail: z.string().email('Invalid email'), maintenanceMode:
z.boolean(), registrationEnabled: z.boolean(), })

const securitySettingsSchema = z.object({ requireEmailVerification: z.boolean(),
passwordMinLength: z.number().min(6).max(32), sessionTimeout:
z.number().min(1).max(10080), // minutes maxLoginAttempts:
z.number().min(1).max(10), enableTwoFactor: z.boolean(), })

const notificationSettingsSchema = z.object({ emailNotifications: z.boolean(),
welcomeEmail: z.boolean(), courseCompletionEmail: z.boolean(),
weeklyProgressEmail: z.boolean(), adminAlerts: z.boolean(), })

type GeneralSettings = z.infer<typeof generalSettingsSchema> type
SecuritySettings = z.infer<typeof securitySettingsSchema> type
NotificationSettings = z.infer<typeof notificationSettingsSchema>

export default function SettingsPage() { const [activeTab, setActiveTab] =
useState('general') const { toast } = useToast()

// General Settings Form const generalForm = useForm<GeneralSettings>({
resolver: zodResolver(generalSettingsSchema), defaultValues: { siteName: 'Course
Platform', siteDescription: 'Learn with our MDX-based courses', supportEmail:
'support@example.com', maintenanceMode: false, registrationEnabled: true, }, })

// Security Settings Form const securityForm = useForm<SecuritySettings>({
resolver: zodResolver(securitySettingsSchema), defaultValues: {
requireEmailVerification: true, passwordMinLength: 8, sessionTimeout: 1440, //
24 hours maxLoginAttempts: 5, enableTwoFactor: false, }, })

// Notification Settings Form const notificationForm =
useForm<NotificationSettings>({ resolver:
zodResolver(notificationSettingsSchema), defaultValues: { emailNotifications:
true, welcomeEmail: true, courseCompletionEmail: true, weeklyProgressEmail:
false, adminAlerts: true, }, })

const saveSettingsMutation = useMutation({ mutationFn: async (data: { type:
string; settings: any }) => { const response = await
fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type':
'application/json' }, body: JSON.stringify(data), }) if (!response.ok) throw new
Error('Failed to save settings') }, onSuccess: () => { toast({ title: 'Settings
saved', description: 'Your changes have been saved successfully.', }) }, })

const handleGeneralSubmit = (data: GeneralSettings) => {
saveSettingsMutation.mutate({ type: 'general', settings: data }) }

const handleSecuritySubmit = (data: SecuritySettings) => {
saveSettingsMutation.mutate({ type: 'security', settings: data }) }

const handleNotificationSubmit = (data: NotificationSettings) => {
saveSettingsMutation.mutate({ type: 'notifications', settings: data }) }

return ( <div className="space-y-6"> <div>

<h1 className="text-3xl font-bold">Settings</h1>
<p className="text-muted-foreground"> Configure platform settings and
preferences </p> </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic platform configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={generalForm.handleSubmit(handleGeneralSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    {...generalForm.register('siteName')}
                  />
                  {generalForm.formState.errors.siteName && (
                    <p className="text-sm text-destructive">
                      {generalForm.formState.errors.siteName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    {...generalForm.register('siteDescription')}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    {...generalForm.register('supportEmail')}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Temporarily disable access to the platform
                      </p>
                    </div>
                    <Switch
                      {...generalForm.register('maintenanceMode')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to create accounts
                      </p>
                    </div>
                    <Switch
                      {...generalForm.register('registrationEnabled')}
                    />
                  </div>
                </div>

                {generalForm.watch('maintenanceMode') && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Maintenance mode is enabled. Only admins can access the platform.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={saveSettingsMutation.isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure authentication and security options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email before accessing content
                    </p>
                  </div>
                  <Switch
                    {...securityForm.register('requireEmailVerification')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    {...securityForm.register('passwordMinLength', {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    {...securityForm.register('sessionTimeout', {
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Users will be logged out after this period of inactivity
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    {...securityForm.register('maxLoginAttempts', {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch
                    {...securityForm.register('enableTwoFactor')}
                  />
                </div>

                <Button type="submit" disabled={saveSettingsMutation.isPending}>
                  <Shield className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Master switch for all email notifications
                    </p>
                  </div>
                  <Switch
                    {...notificationForm.register('emailNotifications')}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">User Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Welcome Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Send welcome email to new users
                      </p>
                    </div>
                    <Switch
                      {...notificationForm.register('welcomeEmail')}
                      disabled={!notificationForm.watch('emailNotifications')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Course Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users when they complete a course
                      </p>
                    </div>
                    <Switch
                      {...notificationForm.register('courseCompletionEmail')}
                      disabled={!notificationForm.watch('emailNotifications')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Send weekly progress summary to active users
                      </p>
                    </div>
                    <Switch
                      {...notificationForm.register('weeklyProgressEmail')}
                      disabled={!notificationForm.watch('emailNotifications')}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Admin Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for important system events
                    </p>
                  </div>
                  <Switch
                    {...notificationForm.register('adminAlerts')}
                  />
                </div>

                <Button type="submit" disabled={saveSettingsMutation.isPending}>
                  <Bell className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Palette className="h-4 w-4" />
                  <AlertDescription>
                    Appearance customization coming soon. Theme settings are currently managed through the theme toggle.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Database maintenance and system configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Database Maintenance</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Database className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="w-full">
                      Optimize Database
                    </Button>
                    <Button variant="outline" className="w-full" className="text-destructive">
                      Reset Demo Data
                    </Button>
                  </div>
                </div>

                <Separator />

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Advanced settings can affect system performance. Proceed with caution.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

) }

Rules:

- Multiple settings tabs
- Form validation
- Switch components
- Save functionality
```

---

## 📋 Phase 7: Performance Optimization

### Task 7.1: Implement Code Splitting

#### Sub-task 7.1.1: Setup Dynamic Imports

```markdown
Create src/lib/dynamic-imports.ts:

import dynamic from 'next/dynamic' import { Loader } from
'@/components/ui/loader'

// Create a loading component const LoadingComponent = () => (

  <div className="flex items-center justify-center p-8">
    <Loader className="h-8 w-8" />
  </div>
)

// MDX Components - Heavy components loaded on demand export const
DynamicVideoPlayer = dynamic( () =>
import('@/components/mdx/video-player').then(mod => mod.VideoPlayer), { loading:
LoadingComponent, ssr: true, } )

export const DynamicQuiz = dynamic( () =>
import('@/components/mdx/quiz').then(mod => mod.Quiz), { loading:
LoadingComponent, ssr: false, // Quiz needs client-side state } )

export const DynamicCodeBlock = dynamic( () =>
import('@/components/mdx/code-block').then(mod => mod.CodeBlock), { loading: ()
=> <div className="h-24 bg-muted animate-pulse rounded" />, ssr: true, } )

// Admin Components - Only loaded for admin users export const DynamicCourseForm
= dynamic( () => import('@/features/admin/course-form'), { loading:
LoadingComponent, ssr: false, } )

export const DynamicAnalyticsCharts = dynamic( () =>
import('@/features/admin/analytics-charts'), { loading: LoadingComponent, ssr:
false, } )

export const DynamicUserManagement = dynamic( () =>
import('@/features/admin/user-management'), { loading: LoadingComponent, ssr:
false, } )

// Heavy UI Components export const DynamicConfetti = dynamic( () =>
import('canvas-confetti'), { ssr: false, } )

export const DynamicPdfViewer = dynamic( () =>
import('@/components/pdf-viewer'), { loading: LoadingComponent, ssr: false, } )

// Route-based code splitting export const DynamicCoursePlayer = dynamic( () =>
import('@/features/course/course-player'), { loading: LoadingComponent, } )

export const DynamicProgressDashboard = dynamic( () =>
import('@/features/progress/dashboard'), { loading: LoadingComponent, } )

// Utility function for conditional dynamic imports export function
dynamicImport<T = any>( importFn: () => Promise<{ default: T } | T>, options?:
Parameters<typeof dynamic>[1] ) { return dynamic( async () => { const module =
await importFn() return 'default' in module ? module : { default: module as any
} }, options ) }

// Preload critical components export function preloadComponents() { // Preload
components that are likely to be used if (typeof window !== 'undefined') {
import('@/components/mdx/video-player')
import('@/components/course/lesson-view') } }

Rules:

- Use dynamic imports for heavy components
- Provide loading states
- Disable SSR where needed
- Preload critical components
```

#### Sub-task 7.1.2: Create Route-Based Splitting

```markdown
Create src/app/courses/[slug]/layout.tsx:

import { Suspense } from 'react' import { notFound } from 'next/navigation'
import { getCourse } from '@/lib/content/api/courses' import { CourseNavigation
} from '@/components/layout/navigation' import { Sidebar } from
'@/components/layout/sidebar' import { CourseSidebarContent } from
'@/components/course/sidebar-content' import { Skeleton } from
'@/components/ui/skeleton'

export default async function CourseLayout({ children, params, }: { children:
React.ReactNode params: { slug: string } }) { const course = await
getCourse(params.slug)

if (!course) { notFound() }

return ( <div className="flex min-h-screen"> <Suspense
fallback={<SidebarSkeleton />}> <Sidebar>
<CourseSidebarContent course={course} /> </Sidebar> </Suspense>

      <div className="flex-1">
        <CourseNavigation courseName={course.title}>
          <Suspense fallback={<Skeleton className="h-8 w-32" />}>
            <CourseActions courseId={course.id} />
          </Suspense>
        </CourseNavigation>

        <main className="container py-6">
          <Suspense fallback={<ContentSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>

) }

// Lazy load course actions const CourseActions = dynamic( () =>
import('@/components/course/course-actions'), { loading: () =>
<Skeleton className="h-8 w-32" />, } )

function SidebarSkeleton() { return (

<div className="w-64 border-r p-4 space-y-4"> {Array.from({ length: 5
}).map((\_, i) => ( <div key={i} className="space-y-2">
<Skeleton className="h-6 w-3/4" /> <Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-full" /> </div> ))} </div> ) }

function ContentSkeleton() { return ( <div className="space-y-4">
<Skeleton className="h-10 w-3/4" /> <Skeleton className="h-6 w-full" />
<Skeleton className="h-6 w-full" /> <Skeleton className="h-6 w-2/3" /> </div> )
}

// Prefetch lesson data on hover export function generateStaticParams() { //
This would be populated at build time return [] }

Rules:

- Split routes into separate bundles
- Use Suspense boundaries
- Provide loading skeletons
- Prefetch on interaction
```

#### Sub-task 7.1.3: Optimize Bundle Size

```markdown
Create next.config.js optimization:

const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled:
process.env.ANALYZE === 'true', })

/\*_ @type {import('next').NextConfig} _/ const nextConfig = { reactStrictMode:
true, swcMinify: true,

// Optimize images images: { domains: ['localhost', 'your-domain.com'], formats:
['image/avif', 'image/webp'], deviceSizes: [640, 750, 828, 1080, 1200, 1920],
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], },

// Webpack optimizations webpack: (config, { isServer }) => { // Tree shake
lodash config.resolve.alias = { ...config.resolve.alias, 'lodash': 'lodash-es',
}

    // Optimize moment.js
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    )

    // Split chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common components
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // UI library
          ui: {
            name: 'ui',
            test: /[\\/]components[\\/]ui[\\/]/,
            chunks: 'all',
            priority: 30,
          },
          // MDX components
          mdx: {
            name: 'mdx',
            test: /[\\/]components[\\/]mdx[\\/]/,
            chunks: 'all',
            priority: 25,
          },
        },
      }
    }

    return config

},

// Experimental features experimental: { optimizeCss: true,
optimizePackageImports: ['@radix-ui/*', 'lucide-react'], },

// Headers for caching async headers() { return [ { source:
'/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)', headers: [ { key: 'Cache-Control',
value: 'public, max-age=31536000, immutable', }, ], }, { source:
'/\_next/static/:path*', headers: [ { key: 'Cache-Control', value: 'public,
max-age=31536000, immutable', }, ], }, ] }, }

module.exports = withBundleAnalyzer(nextConfig)

// Create src/lib/optimize-imports.ts for component imports export _ from
'@radix-ui/react-dialog' export _ from '@radix-ui/react-dropdown-menu' export \*
from '@radix-ui/react-tabs' // ... other frequently used imports

// This allows tree-shaking of unused components

Rules:

- Configure webpack splitting
- Optimize vendor bundles
- Set cache headers
- Enable bundle analysis
```

#### Sub-task 7.1.4: Implement Lazy Loading

```markdown
Create src/hooks/use-lazy-load.ts:

import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadOptions { threshold?: number rootMargin?: string
triggerOnce?: boolean }

export function useLazyLoad<T extends HTMLElement = HTMLDivElement>( options:
UseLazyLoadOptions = {} ) { const { threshold = 0.1, rootMargin = '50px',
triggerOnce = true, } = options

const ref = useRef<T>(null) const [isIntersecting, setIsIntersecting] =
useState(false) const [hasIntersected, setHasIntersected] = useState(false)

useEffect(() => { const element = ref.current if (!element || (triggerOnce &&
hasIntersected)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting) {
          setHasIntersected(true)

          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }

}, [threshold, rootMargin, triggerOnce, hasIntersected])

return { ref, isIntersecting, hasIntersected, } }

// Lazy load images export function LazyImage({ src, alt, className, ...props }:
React.ImgHTMLAttributes<HTMLImageElement>) { const { ref, hasIntersected } =
useLazyLoad<HTMLDivElement>() const [isLoaded, setIsLoaded] = useState(false)

return ( <div ref={ref} className={className}> {hasIntersected && ( <>
{!isLoaded && ( <div className="absolute inset-0 bg-muted animate-pulse" /> )}
<img src={src} alt={alt} onLoad={() => setIsLoaded(true)} className={cn(
'transition-opacity duration-300', isLoaded ? 'opacity-100' : 'opacity-0',
className )} {...props} /> </> )} </div> ) }

// Lazy load heavy components export function LazyComponent<P extends object>({
component: Component, fallback =

<div className="h-32 bg-muted animate-pulse rounded" />, ...props }: {
component: React.ComponentType<P> fallback?: React.ReactNode } & P) { const {
ref, hasIntersected } = useLazyLoad<HTMLDivElement>()

return ( <div ref={ref}> {hasIntersected ? <Component {...(props as P)} /> :
fallback} </div> ) }

// Lazy load with suspense export function LazyBoundary({ children, fallback, }:
{ children: React.ReactNode fallback?: React.ReactNode }) { const { ref,
hasIntersected } = useLazyLoad<HTMLDivElement>()

return ( <div ref={ref}> {hasIntersected ? ( <Suspense fallback={fallback}>
{children} </Suspense> ) : ( fallback )} </div> ) }

Rules:

- Use Intersection Observer
- Provide loading states
- Support trigger once
- Optimize for performance
```

#### Sub-task 7.1.5: Create Prefetch Strategy

```markdown
Create src/lib/prefetch.ts:

import { useRouter } from 'next/navigation' import { useEffect, useRef } from
'react'

// Prefetch on hover export function usePrefetchOnHover(href: string) { const
router = useRouter() const prefetchedRef = useRef(false)

const handleMouseEnter = () => { if (!prefetchedRef.current) {
router.prefetch(href) prefetchedRef.current = true } }

return { onMouseEnter: handleMouseEnter } }

// Prefetch visible links export function usePrefetchVisible() { const router =
useRouter() const prefetchedUrls = useRef(new Set<string>())

useEffect(() => { const links = document.querySelectorAll('a[href^="/"]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = (entry.target as HTMLAnchorElement).href
            const url = new URL(href)
            const pathname = url.pathname

            if (!prefetchedUrls.current.has(pathname)) {
              router.prefetch(pathname)
              prefetchedUrls.current.add(pathname)
            }
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    links.forEach((link) => observer.observe(link))

    return () => {
      observer.disconnect()
    }

}, [router]) }

// Prefetch based on user behavior export function useSmartPrefetch() { const
router = useRouter()

useEffect(() => { // Prefetch next lesson based on progress const progressData =
localStorage.getItem('progress-storage') if (progressData) { const progress =
JSON.parse(progressData) // Logic to determine next likely page //
router.prefetch(nextLikelyPage) }

    // Prefetch based on time of day
    const hour = new Date().getHours()
    if (hour >= 18 && hour <= 22) {
      // Evening - prefetch popular courses
      router.prefetch('/courses')
    }

}, [router]) }

// Resource hints export function ResourceHints() { return ( <> {/_ Preconnect
to external domains _/}

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch for analytics */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="/_next/static/css/app.css"
        as="style"
      />
    </>

) }

// Prefetch component export function PrefetchLink({ href, children, className,
prefetchOn = 'hover', }: { href: string children: React.ReactNode className?:
string prefetchOn?: 'hover' | 'visible' | 'mount' }) { const router =
useRouter() const prefetchedRef = useRef(false) const linkRef =
useRef<HTMLAnchorElement>(null)

useEffect(() => { if (prefetchOn === 'mount' && !prefetchedRef.current) {
router.prefetch(href) prefetchedRef.current = true } else if (prefetchOn ===
'visible' && linkRef.current) { const observer = new IntersectionObserver(
([entry]) => { if (entry.isIntersecting && !prefetchedRef.current) {
router.prefetch(href) prefetchedRef.current = true observer.disconnect() } }, {
rootMargin: '50px' } )

      observer.observe(linkRef.current)

      return () => observer.disconnect()
    }

}, [href, prefetchOn, router])

const handleMouseEnter = () => { if (prefetchOn === 'hover' &&
!prefetchedRef.current) { router.prefetch(href) prefetchedRef.current = true } }

return ( <Link ref={linkRef} href={href} className={className}
onMouseEnter={prefetchOn === 'hover' ? handleMouseEnter : undefined} >
{children} </Link> ) }

Rules:

- Prefetch on interaction
- Use intersection observer
- Smart prefetching logic
- Add resource hints
```

### Task 7.2: Add Caching Strategies

#### Sub-task 7.2.1: Implement Static Content Caching

```markdown
Create src/lib/cache/static-cache.ts:

import { unstable_cache } from 'next/cache' import { cache } from 'react'

// Course content cache export const getCachedCourse = unstable_cache( async
(slug: string) => { const course = await getCourse(slug) return course },
['course'], { revalidate: 3600, // 1 hour tags: ['courses'], } )

// Lesson content cache with longer TTL export const getCachedLesson =
unstable_cache( async (courseSlug: string, moduleSlug: string, lessonSlug:
string) => { const lesson = await getLesson(courseSlug, moduleSlug, lessonSlug)
const content = await getLessonContent(courseSlug, moduleSlug, lessonSlug)

    return { lesson, content }

}, ['lesson'], { revalidate: 86400, // 24 hours tags: ['lessons'], } )

// In-memory cache for frequently accessed data const memoryCache = new
Map<string, { data: any; timestamp: number }>() const MEMORY*CACHE_TTL = 5 * 60
\_ 1000 // 5 minutes

export function memoizedFetch<T>( key: string, fetcher: () => Promise<T>, ttl =
MEMORY_CACHE_TTL ): Promise<T> { const cached = memoryCache.get(key) const now =
Date.now()

if (cached && now - cached.timestamp < ttl) { return
Promise.resolve(cached.data) }

return fetcher().then((data) => { memoryCache.set(key, { data, timestamp: now })
return data }) }

// React cache for request deduplication export const getCourseList =
cache(async () => { return memoizedFetch('course-list', async () => { const
courses = await getCourses() return courses }) })

// Cache invalidation export async function invalidateCache(tags: string[]) { //
Next.js revalidation for (const tag of tags) { await
fetch(`/api/revalidate?tag=${tag}`, { method: 'POST', }) }

// Clear memory cache memoryCache.clear() }

// Service Worker for offline caching export const swCache = ` // Cache static
assets self.addEventListener('install', (event) => { event.waitUntil(
caches.open('static-v1').then((cache) => { return cache.addAll([ '/',
'/offline', '/manifest.json', '/_next/static/css/app.css',
'/fonts/inter-var.woff2', ]) }) ) })

// Network first, fallback to cache self.addEventListener('fetch', (event) => {
if (event.request.url.includes('/api/')) { return // Don't cache API requests }

event.respondWith( fetch(event.request) .then((response) => { const
responseClone = response.clone() caches.open('dynamic-v1').then((cache) => {
cache.put(event.request, responseClone) }) return response }) .catch(() => {
return caches.match(event.request).then((response) => { return response ||
caches.match('/offline') }) }) ) }) `

// Build-time cache generation export async function generateStaticCache() {
const courses = await getCourses()

// Pre-render course pages for (const course of courses) { await
getCachedCourse(course.slug)

    // Pre-render first lesson of each module
    for (const module of course.modules) {
      if (module.lessons.length > 0) {
        await getCachedLesson(
          course.slug,
          module.slug,
          module.lessons[0].slug
        )
      }
    }

} }

Rules:

- Use Next.js caching
- Implement memory cache
- Add service worker
- Pre-generate cache
```

#### Sub-task 7.2.2: Create API Response Caching

```markdown
Create src/lib/cache/api-cache.ts:

import { Redis } from '@upstash/redis' import { z } from 'zod'

// Initialize Redis client const redis = new Redis({ url:
process.env.UPSTASH_REDIS_URL!, token: process.env.UPSTASH_REDIS_TOKEN!, })

// Cache configuration const CACHE_CONFIG = { courses: { ttl: 3600, // 1 hour
key: (id?: string) => id ? `course:${id}` : 'courses:all', }, progress: { ttl:
300, // 5 minutes key: (userId: string) => `progress:${userId}`, }, analytics: {
ttl: 600, // 10 minutes key: (type: string) => `analytics:${type}`, }, user: {
ttl: 1800, // 30 minutes key: (id: string) => `user:${id}`, }, } as const

// Generic cache wrapper export async function withCache<T>( key: string,
fetcher: () => Promise<T>, options?: { ttl?: number parse?: z.ZodSchema<T>
skipCache?: boolean } ): Promise<T> { const { ttl = 300, parse, skipCache =
false } = options || {}

if (skipCache) { return fetcher() }

try { // Try to get from cache const cached = await redis.get(key)

    if (cached) {
      const data = parse ? parse.parse(cached) : cached as T
      return data
    }

} catch (error) { console.error('Cache read error:', error) // Continue to
fetcher if cache fails }

// Fetch fresh data const fresh = await fetcher()

// Store in cache (fire and forget) redis.setex(key, ttl,
JSON.stringify(fresh)).catch((error) => { console.error('Cache write error:',
error) })

return fresh }

// Batch cache operations export class CacheBatch { private operations: Array<()
=> Promise<void>> = []

set(key: string, value: any, ttl: number) { this.operations.push(async () => {
await redis.setex(key, ttl, JSON.stringify(value)) }) return this }

del(key: string) { this.operations.push(async () => { await redis.del(key) })
return this }

async execute() { await Promise.all(this.operations.map(op => op()))
this.operations = [] } }

// Cache invalidation patterns export async function invalidatePattern(pattern:
string) { const keys = await redis.keys(pattern)

if (keys.length > 0) { await redis.del(...keys) } }

// Stale-while-revalidate implementation export async function swr<T>( key:
string, fetcher: () => Promise<T>, options?: { ttl?: number staleTtl?: number }
): Promise<T> { const { ttl = 300, staleTtl = 3600 } = options || {}

try { const cached = await redis.get(`${key}:data`) const timestamp = await
redis.get(`${key}:timestamp`)

    if (cached) {
      const age = Date.now() - Number(timestamp || 0)

      // Return stale data immediately
      if (age < staleTtl * 1000) {
        // Revalidate in background if expired
        if (age > ttl * 1000) {
          fetcher().then(async (fresh) => {
            const batch = new CacheBatch()
            batch.set(`${key}:data`, fresh, staleTtl)
            batch.set(`${key}:timestamp`, Date.now(), staleTtl)
            await batch.execute()
          }).catch(console.error)
        }

        return cached as T
      }
    }

} catch (error) { console.error('SWR cache error:', error) }

// Fetch fresh data const fresh = await fetcher()

// Store with timestamp const batch = new CacheBatch() batch.set(`${key}:data`,
fresh, staleTtl) batch.set(`${key}:timestamp`, Date.now(), staleTtl) await
batch.execute()

return fresh }

// Request deduplication const inFlightRequests = new Map<string,
Promise<any>>()

export async function dedupe<T>( key: string, fetcher: () => Promise<T> ):
Promise<T> { // Check if request is already in flight const existing =
inFlightRequests.get(key) if (existing) { return existing }

// Create new request const request = fetcher().finally(() => {
inFlightRequests.delete(key) })

inFlightRequests.set(key, request) return request }

// Cached API handler wrapper export function cachedHandler<T = any>( handler:
(req: Request) => Promise<T>, cacheKey: (req: Request) => string, ttl = 300 ) {
return async (req: Request): Promise<Response> => { const key = cacheKey(req)

    try {
      const data = await withCache(
        key,
        () => handler(req),
        { ttl }
      )

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, s-maxage=${ttl}, stale-while-revalidate`,
        },
      })
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500 }
      )
    }

} }

Rules:

- Use Redis for caching
- Implement SWR pattern
- Deduplicate requests
- Handle cache failures
```

#### Sub-task 7.2.3: Create Image Optimization

```markdown
Create src/lib/cache/image-optimization.ts:

import { getPlaiceholder } from 'plaiceholder' import sharp from 'sharp' import
{ cache } from 'react' import fs from 'fs/promises' import path from 'path'

// Generate blur placeholder export const getBlurDataUrl = cache(async (src:
string) => { try { const buffer = await fs.readFile(path.join(process.cwd(),
'public', src)) const { base64 } = await getPlaiceholder(buffer, { size: 10 })
return base64 } catch (error) { console.error('Failed to generate blur
placeholder:', error) return undefined } })

// Optimize images at build time export async function optimizeImages() { const
publicDir = path.join(process.cwd(), 'public') const imagesDir =
path.join(publicDir, 'images') const optimizedDir = path.join(publicDir,
'images', 'optimized')

// Ensure optimized directory exists await fs.mkdir(optimizedDir, { recursive:
true })

// Get all images const files = await fs.readdir(imagesDir) const imageFiles =
files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file) )

// Process each image for (const file of imageFiles) { const inputPath =
path.join(imagesDir, file) const name = path.parse(file).name

    // Skip if already optimized
    const optimizedPath = path.join(optimizedDir, `${name}.webp`)
    try {
      await fs.access(optimizedPath)
      continue // Already exists
    } catch {
      // File doesn't exist, continue processing
    }

    // Generate multiple sizes
    const sizes = [640, 750, 828, 1080, 1200, 1920]

    for (const size of sizes) {
      await sharp(inputPath)
        .resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: 85 })
        .toFile(path.join(optimizedDir, `${name}-${size}w.webp`))
    }

    // Generate AVIF version for modern browsers
    await sharp(inputPath)
      .avif({ quality: 80 })
      .toFile(path.join(optimizedDir, `${name}.avif`))

} }

// Image component with optimization export function OptimizedImage({ src, alt,
width, height, priority = false, className, sizes = '100vw', }: { src: string
alt: string width: number height: number priority?: boolean className?: string
sizes?: string }) { const [blurDataUrl, setBlurDataUrl] = useState<string |
undefined>()

useEffect(() => { if (!priority) { getBlurDataUrl(src).then(setBlurDataUrl) } },
[src, priority])

return ( <Image src={src} alt={alt} width={width} height={height}
priority={priority} className={className} sizes={sizes} placeholder={blurDataUrl
? 'blur' : 'empty'} blurDataURL={blurDataUrl} /> ) }

// Cloudinary integration for dynamic optimization export function
getCloudinaryUrl( publicId: string, options?: { width?: number height?: number
quality?: number format?: 'auto' | 'webp' | 'avif' crop?: 'fill' | 'fit' |
'scale' } ) { const { width, height, quality = 'auto', format = 'auto', crop =
'fill' } = options || {}

const transformations = [ width && `w_${width}`, height && `h_${height}`,
`q_${quality}`, `f_${format}`, `c_${crop}`, 'dpr_auto',
].filter(Boolean).join(',')

return
`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`
}

// Lazy load images with native loading export function LazyImage({ src, alt,
className, onLoad, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
return ( <img src={src} alt={alt} loading="lazy" decoding="async"
className={className} onLoad={onLoad} {...props} /> ) }

// Picture element for art direction export function ResponsivePicture({ src,
alt, className, sources, }: { src: string alt: string className?: string
sources: Array<{ srcSet: string media?: string type?: string }> }) { return (
<picture> {sources.map((source, index) => ( <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        /> ))} <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      /> </picture> ) }

Rules:

- Generate optimized formats
- Create blur placeholders
- Support responsive images
- Integrate CDN optimization
```

#### Sub-task 7.2.4: Create Service Worker

```markdown
Create public/sw.js:

// Service Worker version const VERSION = 'v1' const CACHE_NAME =
`course-platform-${VERSION}`

// Assets to cache immediately const STATIC_ASSETS = [ '/', '/offline',
'/manifest.json', '/favicon.ico', ]

// Cache strategies const CACHE_STRATEGIES = { networkFirst: ['/api/',
'/auth/'], cacheFirst: ['/images/', '/fonts/', '/_next/static/'],
staleWhileRevalidate: ['/courses/', '/lessons/'], }

// Install event - cache static assets self.addEventListener('install', (event)
=> { event.waitUntil( caches.open(CACHE_NAME).then((cache) => { return
cache.addAll(STATIC_ASSETS) }) ) self.skipWaiting() })

// Activate event - clean old caches self.addEventListener('activate', (event)
=> { event.waitUntil( caches.keys().then((cacheNames) => { return Promise.all(
cacheNames .filter((name) => name.startsWith('course-platform-') && name !==
CACHE_NAME) .map((name) => caches.delete(name)) ) }) ) self.clients.claim() })

// Fetch event - implement cache strategies self.addEventListener('fetch',
(event) => { const { request } = event const url = new URL(request.url)

// Skip non-GET requests if (request.method !== 'GET') return

// Network first strategy if (CACHE_STRATEGIES.networkFirst.some((path) =>
url.pathname.includes(path))) { event.respondWith(networkFirst(request)) return
}

// Cache first strategy if (CACHE_STRATEGIES.cacheFirst.some((path) =>
url.pathname.includes(path))) { event.respondWith(cacheFirst(request)) return }

// Stale while revalidate strategy if
(CACHE_STRATEGIES.staleWhileRevalidate.some((path) =>
url.pathname.includes(path))) { event.respondWith(staleWhileRevalidate(request))
return }

// Default to network first event.respondWith(networkFirst(request)) })

// Cache strategies implementation async function networkFirst(request) { try {
const response = await fetch(request) const cache = await
caches.open(CACHE_NAME) cache.put(request, response.clone()) return response }
catch (error) { const cached = await caches.match(request) return cached ||
caches.match('/offline') } }

async function cacheFirst(request) { const cached = await caches.match(request)
if (cached) return cached

try { const response = await fetch(request) const cache = await
caches.open(CACHE_NAME) cache.put(request, response.clone()) return response }
catch (error) { return caches.match('/offline') } }

async function staleWhileRevalidate(request) { const cached = await
caches.match(request)

const fetchPromise = fetch(request).then((response) => { const cache =
caches.open(CACHE_NAME) cache.then((c) => c.put(request, response.clone()))
return response })

return cached || fetchPromise }

// Background sync for progress self.addEventListener('sync', (event) => { if
(event.tag === 'sync-progress') { event.waitUntil(syncProgress()) } })

async function syncProgress() { const cache = await
caches.open('progress-queue') const requests = await cache.keys()

for (const request of requests) { try { const response = await fetch(request) if
(response.ok) { await cache.delete(request) } } catch (error) {
console.error('Sync failed:', error) } } }

// Push notifications self.addEventListener('push', (event) => { const data =
event.data?.json() || {}

event.waitUntil( self.registration.showNotification(data.title || 'Course
Update', { body: data.body || 'Check out new content!', icon:
'/icon-192x192.png', badge: '/badge-72x72.png', data: data.url, }) ) })

self.addEventListener('notificationclick', (event) => {
event.notification.close()

event.waitUntil( clients.openWindow(event.notification.data || '/') ) })

// Register service worker in app export function registerServiceWorker() { if
('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
window.addEventListener('load', () => { navigator.serviceWorker
.register('/sw.js') .then((registration) => { console.log('SW registered:',
registration)

          // Check for updates periodically
          setInterval(() => {
            registration.update()
          }, 60 * 60 * 1000) // Every hour
        })
        .catch((error) => {
          console.error('SW registration failed:', error)
        })
    })

} }

Rules:

- Implement cache strategies
- Handle offline mode
- Support background sync
- Clean old caches
```

#### Sub-task 7.2.5: Create CDN Configuration

```markdown
Create src/lib/cache/cdn-config.ts:

// CDN configuration for different environments export const CDN_CONFIG = {
development: { enabled: false, url: '', }, production: { enabled: true, url:
process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.your-domain.com', }, }

// Get CDN URL for assets export function getCdnUrl(path: string): string {
const config = CDN_CONFIG[process.env.NODE_ENV] || CDN_CONFIG.development

if (!config.enabled) { return path }

// Remove leading slash const cleanPath = path.startsWith('/') ? path.slice(1) :
path

return `${config.url}/${cleanPath}` }

// Next.js configuration for CDN export const cdnLoader = ({ src, width, quality
}: { src: string width: number quality?: number }) => { const params = new
URLSearchParams({ w: width.toString(), q: (quality || 75).toString(), })

return `${getCdnUrl(src)}?${params}` }

// Headers for CDN caching export const CDN_HEADERS = { // Static assets - cache
for 1 year static: { 'Cache-Control': 'public, max-age=31536000, immutable',
'CDN-Cache-Control': 'max-age=31536000', },

// Dynamic content - cache for 5 minutes dynamic: { 'Cache-Control': 'public,
max-age=0, s-maxage=300, stale-while-revalidate=600', 'CDN-Cache-Control':
'max-age=300', },

// API responses - cache for 1 minute api: { 'Cache-Control': 'public,
max-age=0, s-maxage=60, stale-while-revalidate=300', 'CDN-Cache-Control':
'max-age=60', 'Vary': 'Accept-Encoding, Authorization', },

// No cache noCache: { 'Cache-Control': 'no-cache, no-store, must-revalidate',
'CDN-Cache-Control': 'no-cache', }, }

// Cloudflare configuration export const CLOUDFLARE_CONFIG = { // Page rules for
different paths rules: [ { match: '/*.(js|css|woff2|woff|ttf|otf)', cache:
'aggressive', ttl: 31536000, }, { match: '/images/*', cache: 'standard', ttl:
86400, polish: 'lossless', mirage: true, }, { match: '/api/*', cache: 'bypass',
}, { match: '/*', cache: 'standard', ttl: 300, }, ],

// Worker for edge caching worker: ` addEventListener('fetch', event => {
event.respondWith(handleRequest(event.request)) })

    async function handleRequest(request) {
      const url = new URL(request.url)

      // Add security headers
      const response = await fetch(request)
      const headers = new Headers(response.headers)

      headers.set('X-Content-Type-Options', 'nosniff')
      headers.set('X-Frame-Options', 'DENY')
      headers.set('X-XSS-Protection', '1; mode=block')
      headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }

`, }

// Preload critical resources export function preloadResources() { if (typeof
window === 'undefined') return

const resources = [ { href: getCdnUrl('/fonts/inter-var.woff2'), as: 'font',
type: 'font/woff2' }, { href: getCdnUrl('/_next/static/css/app.css'), as:
'style' }, ]

resources.forEach(({ href, as, type }) => { const link =
document.createElement('link') link.rel = 'preload' link.href = href link.as =
as if (type) link.type = type if (as === 'font') link.crossOrigin = 'anonymous'
document.head.appendChild(link) }) }

// Purge CDN cache export async function purgeCdnCache(paths: string[]) { if
(process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ZONE_ID) { const
response = await fetch(
`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`,
{ method: 'POST', headers: { 'Authorization':
`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type':
'application/json', }, body: JSON.stringify({ files: paths.map(path =>
`${CDN_CONFIG.production.url}${path}`), }), } )

    if (!response.ok) {
      throw new Error('Failed to purge CDN cache')
    }

} }

Rules:

- Configure CDN URLs
- Set cache headers
- Implement edge workers
- Support cache purging
```

---

## 📋 Phase 8: Testing & Quality Assurance

### Task 8.1: Unit Testing Setup

#### Sub-task 8.1.1: Configure Testing Framework

```markdown
Create jest.config.js:

const nextJest = require('next/jest')

const createJestConfig = nextJest({ // Provide the path to your Next.js app to
load next.config.js and .env files in your test environment dir: './', })

// Add any custom config to be passed to Jest const customJestConfig = {
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], testEnvironment:
'jest-environment-jsdom', moduleNameMapper: { // Handle module aliases
'^@/(.\*)$': '<rootDir>/src/$1',

    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',

}, testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
transformIgnorePatterns: [ '/node_modules/', '^.+\\.module\\.(css|sass|scss)$',
], collectCoverageFrom: [ 'src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts',
'!src/**/*.stories.{js,jsx,ts,tsx}', '!src/**/__tests__/**', ],
coverageThreshold: { global: { branches: 80, functions: 80, lines: 80,
statements: 80, }, }, testMatch: [
'<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
'<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}', ], }

// createJestConfig is exported this way to ensure that next/jest can load the
Next.js config which is async module.exports =
createJestConfig(customJestConfig)

// Create jest.setup.ts: import '@testing-library/jest-dom' import {
TextEncoder, TextDecoder } from 'util'

// Polyfills global.TextEncoder = TextEncoder global.TextDecoder = TextDecoder
as any

// Mock next/router jest.mock('next/router', () => ({ useRouter() { return {
route: '/', pathname: '', query: {}, asPath: '', push: jest.fn(), prefetch:
jest.fn(), } }, }))

// Mock next/navigation jest.mock('next/navigation', () => ({ useRouter() {
return { push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back:
jest.fn(), } }, usePathname() { return '/' }, useSearchParams() { return new
URLSearchParams() }, }))

// Mock window.matchMedia Object.defineProperty(window, 'matchMedia', {
writable: true, value: jest.fn().mockImplementation(query => ({ matches: false,
media: query, onchange: null, addListener: jest.fn(), // deprecated
removeListener: jest.fn(), // deprecated addEventListener: jest.fn(),
removeEventListener: jest.fn(), dispatchEvent: jest.fn(), })), })

// Mock IntersectionObserver global.IntersectionObserver =
jest.fn().mockImplementation(() => ({ observe: jest.fn(), unobserve: jest.fn(),
disconnect: jest.fn(), }))

// Create **mocks**/styleMock.js: module.exports = {}

// Create **mocks**/fileMock.js: module.exports = 'test-file-stub'

Rules:

- Configure module resolution
- Mock browser APIs
- Set coverage thresholds
- Handle CSS/image imports
```

#### Sub-task 8.1.2: Test Utilities and Helpers

```markdown
Create src/test/utils.tsx:

import { ReactElement } from 'react' import { render, RenderOptions } from
'@testing-library/react' import { QueryClient, QueryClientProvider } from
'@tanstack/react-query' import { SessionProvider } from 'next-auth/react' import
{ ThemeProvider } from '@/components/theme/theme-provider' import userEvent from
'@testing-library/user-event'

// Create a custom render function interface CustomRenderOptions extends
Omit<RenderOptions, 'wrapper'> { session?: any queryClient?: QueryClient theme?:
'light' | 'dark' | 'system' }

export function createQueryClient() { return new QueryClient({ defaultOptions: {
queries: { retry: false, gcTime: 0, }, }, }) }

const AllTheProviders = ({ children, session = null, queryClient =
createQueryClient(), theme = 'light' }: { children: React.ReactNode session?:
any queryClient?: QueryClient theme?: 'light' | 'dark' | 'system' }) => { return
( <QueryClientProvider client={queryClient}> <SessionProvider session={session}>
<ThemeProvider defaultTheme={theme}> {children} </ThemeProvider>
</SessionProvider> </QueryClientProvider> ) }

export function renderWithProviders( ui: ReactElement, { session, queryClient,
theme, ...renderOptions }: CustomRenderOptions = {} ) { const user =
userEvent.setup()

return { user, ...render(ui, { wrapper: ({ children }) => ( <AllTheProviders
          session={session}
          queryClient={queryClient}
          theme={theme}
        > {children} </AllTheProviders> ), ...renderOptions, }), } }

// Mock data factories export const mockUser = (overrides = {}) => ({ id:
'user-123', email: 'test@example.com', name: 'Test User', role: 'user',
createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-01'),
...overrides, })

export const mockCourse = (overrides = {}) => ({ id: 'course-123', slug:
'test-course', title: 'Test Course', description: 'A test course', author: 'Test
Author', duration: 120, difficulty: 'beginner', tags: ['test', 'course'],
modules: [], createdAt: new Date('2024-01-01'), updatedAt: new
Date('2024-01-01'), ...overrides, })

export const mockLesson = (overrides = {}) => ({ id: 'lesson-123', slug:
'test-lesson', title: 'Test Lesson', description: 'A test lesson', type: 'text',
duration: 10, order: 1, ...overrides, })

// API mocking utilities export function mockFetch(data: any, options: {
status?: number; ok?: boolean } = {}) { return jest.fn().mockResolvedValue({ ok:
options.ok ?? true, status: options.status ?? 200, json: async () => data, text:
async () => JSON.stringify(data), }) }

// Wait utilities export const waitForLoadingToFinish = () => waitFor(() => {
expect(screen.queryByText(/loading/i)).not.toBeInTheDocument() })

// Custom matchers export const expectToBeAccessible = async (container:
HTMLElement) => { const results = await axe(container)
expect(results).toHaveNoViolations() }

// Re-export everything from Testing Library export \* from
'@testing-library/react' export { userEvent }

Rules:

- Create render wrapper
- Include all providers
- Export mock factories
- Add custom utilities
```

#### Sub-task 8.1.3: Component Tests

```markdown
Create src/components/ui/**tests**/button.test.tsx:

import { renderWithProviders, screen } from '@/test/utils' import { Button }
from '../button'

describe('Button', () => { it('renders with text', () => {
renderWithProviders(<Button>Click me</Button>) expect(screen.getByRole('button',
{ name: /click me/i })).toBeInTheDocument() })

it('handles click events', async () => { const handleClick = jest.fn() const {
user } = renderWithProviders( <Button onClick={handleClick}>Click me</Button> )

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)

})

it('can be disabled', () => {
renderWithProviders(<Button disabled>Disabled</Button>)
expect(screen.getByRole('button')).toBeDisabled() })

it('shows loading state', () => { renderWithProviders( <Button loading> Loading
</Button> ) expect(screen.getByRole('button')).toHaveAttribute('aria-busy',
'true') })

it('applies variant styles', () => { const { rerender } = renderWithProviders(
<Button variant="destructive">Delete</Button> )
expect(screen.getByRole('button')).toHaveClass('bg-destructive')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')

}) })

// Create src/components/course/**tests**/course-card.test.tsx: import {
renderWithProviders, screen, mockCourse } from '@/test/utils' import {
CourseCard } from '../course-card'

describe('CourseCard', () => { const course = mockCourse({ title: 'Advanced
React', description: 'Learn advanced React patterns', duration: 300, modules: [
{ id: '1', lessons: [{}, {}, {}] }, { id: '2', lessons: [{}, {}] }, ], })

it('displays course information', () => {
renderWithProviders(<CourseCard course={course} />)

    expect(screen.getByText('Advanced React')).toBeInTheDocument()
    expect(screen.getByText('Learn advanced React patterns')).toBeInTheDocument()
    expect(screen.getByText('5h')).toBeInTheDocument() // 300 minutes = 5 hours
    expect(screen.getByText('2 modules')).toBeInTheDocument()

})

it('shows progress when provided', () => { const progress = { courseId:
course.id, totalLessons: 5, completedLessons: 3, percentComplete: 60,
estimatedTimeRemaining: 120, certificate: null, }

    renderWithProviders(
      <CourseCard course={course} progress={progress} />
    )

    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()

})

it('links to course page', () => {
renderWithProviders(<CourseCard course={course} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/courses/test-course')

})

it('shows completion badge when 100% complete', () => { const progress = {
courseId: course.id, totalLessons: 5, completedLessons: 5, percentComplete: 100,
estimatedTimeRemaining: 0, certificate: null, }

    renderWithProviders(
      <CourseCard course={course} progress={progress} />
    )

    expect(screen.getByText('Completed')).toBeInTheDocument()

}) })

Rules:

- Test user interactions
- Test different states
- Test accessibility
- Test edge cases
```

#### Sub-task 8.1.4: Hook Tests

```markdown
Create src/hooks/**tests**/use-progress.test.ts:

import { renderHook, act } from '@testing-library/react' import {
useCourseProgress } from '../use-progress' import { useProgressStore } from
'@/stores/progress-store' import { mockCourse } from '@/test/utils'

// Mock the store jest.mock('@/stores/progress-store')

describe('useCourseProgress', () => { const course = mockCourse({ modules: [ {
id: 'module-1', slug: 'intro', lessons: [ { id: 'lesson-1', slug:
'getting-started' }, { id: 'lesson-2', slug: 'basics' }, ], }, { id: 'module-2',
slug: 'advanced', lessons: [ { id: 'lesson-3', slug: 'patterns' }, ], }, ], })

beforeEach(() => { jest.clearAllMocks() })

it('calculates progress correctly', () => { const mockCompleted = {
'test-course/intro/getting-started': true, 'test-course/intro/basics': false,
'test-course/advanced/patterns': true, }

    const mockTimeSpent = {
      'test-course/intro/getting-started': 600,
      'test-course/intro/basics': 300,
      'test-course/advanced/patterns': 450,
    }

    ;(useProgressStore as jest.Mock).mockReturnValue({
      completed: mockCompleted,
      timeSpent: mockTimeSpent,
    })

    const { result } = renderHook(() => useCourseProgress(course))

    expect(result.current.totalLessons).toBe(3)
    expect(result.current.completedLessons).toBe(2)
    expect(result.current.percentage).toBe(67) // 2/3 = 66.67%
    expect(result.current.timeSpent).toBe(1350) // Total seconds

})

it('finds next incomplete lesson', () => { const mockCompleted = {
'test-course/intro/getting-started': true, 'test-course/intro/basics': false,
'test-course/advanced/patterns': false, }

    ;(useProgressStore as jest.Mock).mockReturnValue({
      completed: mockCompleted,
      timeSpent: {},
    })

    const { result } = renderHook(() => useCourseProgress(course))

    expect(result.current.nextLesson).toEqual({
      module: course.modules[0],
      lesson: course.modules[0].lessons[1], // 'basics' lesson
    })

})

it('returns null for next lesson when all complete', () => { const mockCompleted
= { 'test-course/intro/getting-started': true, 'test-course/intro/basics': true,
'test-course/advanced/patterns': true, }

    ;(useProgressStore as jest.Mock).mockReturnValue({
      completed: mockCompleted,
      timeSpent: {},
    })

    const { result } = renderHook(() => useCourseProgress(course))

    expect(result.current.nextLesson).toBeNull()
    expect(result.current.isCompleted).toBe(true)

}) })

// Create src/hooks/**tests**/use-theme.test.ts: import { renderHook, act } from
'@testing-library/react' import { useThemeUtils } from '../use-theme' import {
ThemeProvider } from '@/components/theme/theme-provider'

describe('useThemeUtils', () => { const wrapper = ({ children }: { children:
React.ReactNode }) => ( <ThemeProvider>{children}</ThemeProvider> )

it('toggles theme between light and dark', () => { const { result } =
renderHook(() => useThemeUtils(), { wrapper })

    expect(result.current.theme).toBe('system')

    act(() => {
      result.current.setTheme('light')
    })
    expect(result.current.theme).toBe('light')
    expect(result.current.isLight).toBe(true)

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('dark')
    expect(result.current.isDark).toBe(true)

})

it('cycles through all themes', () => { const { result } = renderHook(() =>
useThemeUtils(), { wrapper })

    const themes = ['light', 'dark', 'system']
    let currentIndex = themes.indexOf(result.current.theme)

    for (let i = 0; i < themes.length; i++) {
      act(() => {
        result.current.cycleTheme()
      })
      currentIndex = (currentIndex + 1) % themes.length
      expect(result.current.theme).toBe(themes[currentIndex])
    }

}) })

Rules:

- Mock external dependencies
- Test hook return values
- Test state updates
- Use proper wrappers
```

#### Sub-task 8.1.5: API and Utility Tests

```markdown
Create src/lib/**tests**/utils.test.ts:

import { cn, debounce, formatTime, slugify } from '../utils'

describe('cn utility', () => { it('combines class names', () => {
expect(cn('foo', 'bar')).toBe('foo bar') })

it('handles conditional classes', () => { expect(cn('foo', false && 'bar',
'baz')).toBe('foo baz') })

it('merges Tailwind classes correctly', () => { expect(cn('px-2',
'px-4')).toBe('px-4') expect(cn('text-red-500',
'text-blue-500')).toBe('text-blue-500') }) })

describe('debounce', () => { jest.useFakeTimers()

it('delays function execution', () => { const fn = jest.fn() const debouncedFn =
debounce(fn, 100)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

})

it('cancels previous calls', () => { const fn = jest.fn() const debouncedFn =
debounce(fn, 100)

    debouncedFn('first')
    jest.advanceTimersByTime(50)
    debouncedFn('second')
    jest.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('second')

}) })

describe('formatTime', () => { it('formats seconds to readable time', () => {
expect(formatTime(30)).toBe('30s') expect(formatTime(90)).toBe('1m 30s')
expect(formatTime(3661)).toBe('1h 1m') }) })

describe('slugify', () => { it('converts text to slug', () => {
expect(slugify('Hello World')).toBe('hello-world') expect(slugify('Test &
Example')).toBe('test-example') expect(slugify(' Extra Spaces
')).toBe('extra-spaces') }) })

// Create src/lib/content/**tests**/scanner.test.ts: import { scanCourses,
scanModule } from '../scanner' import fs from 'fs/promises' import path from
'path'

jest.mock('fs/promises')

describe('Course Scanner', () => { const mockFileStructure = { 'course-1': {
'course.json': JSON.stringify({ title: 'Test Course', description: 'A test
course', author: 'Test Author', duration: 120, difficulty: 'beginner', tags:
['test'], createdAt: '2024-01-01', updatedAt: '2024-01-01', }), modules: {
'module-1': { 'module.json': JSON.stringify({ title: 'Introduction',
description: 'Getting started', order: 1, duration: 30, }), lessons: {
'lesson-1.mdx': '---\ntitle: First Lesson\n---\nContent', }, }, }, }, }

beforeEach(() => { jest.clearAllMocks() setupMockFileSystem(mockFileStructure)
})

it('scans course directory structure', async () => { const { courses, errors } =
await scanCourses()

    expect(courses).toHaveLength(1)
    expect(errors).toHaveLength(0)
    expect(courses[0]).toMatchObject({
      slug: 'course-1',
      metadata: {
        title: 'Test Course',
        author: 'Test Author',
      },
      modules: expect.arrayContaining([
        expect.objectContaining({
          slug: 'module-1',
          metadata: {
            title: 'Introduction',
          },
        }),
      ]),
    })

})

it('handles missing metadata gracefully', async () => { ;(fs.readFile as
jest.Mock).mockRejectedValueOnce(new Error('File not found'))

    const { courses, errors } = await scanCourses()

    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatchObject({
      message: expect.stringContaining('File not found'),
    })

}) })

function setupMockFileSystem(structure: any) { ;(fs.readdir as
jest.Mock).mockImplementation(async (dir) => { // Mock implementation based on
structure const parts = dir.split(path.sep) const current = parts.reduce((acc,
part) => acc?.[part], structure) return Object.keys(current || {}) })

;(fs.stat as jest.Mock).mockImplementation(async (filePath) => ({ isDirectory:
() => !filePath.endsWith('.json') && !filePath.endsWith('.mdx'), }))

;(fs.readFile as jest.Mock).mockImplementation(async (filePath) => { const parts
= filePath.split(path.sep) const content = parts.reduce((acc, part) =>
acc?.[part], structure) if (typeof content === 'string') return content throw
new Error('File not found') }) }

Rules:

- Test edge cases
- Mock file system
- Use fake timers
- Test async functions
```

### Task 8.2: E2E Testing

#### Sub-task 8.2.1: Setup Cypress

```markdown
Create cypress.config.ts:

import { defineConfig } from 'cypress'

export default defineConfig({ e2e: { baseUrl: 'http://localhost:3000',
viewportWidth: 1280, viewportHeight: 720, video: true, screenshotOnRunFailure:
true, setupNodeEvents(on, config) { // implement node event listeners here
on('task', { log(message) { console.log(message) return null }, table(message) {
console.table(message) return null }, }) }, }, component: { devServer: {
framework: 'next', bundler: 'webpack', }, }, })

// Create cypress/support/e2e.ts: import './commands'

// Add custom commands Cypress.Commands.add('login', (email: string, password:
string) => { cy.session([email, password], () => { cy.visit('/auth/login')
cy.get('input[name="email"]').type(email)
cy.get('input[name="password"]').type(password)
cy.get('button[type="submit"]').click() cy.url().should('include', '/dashboard')
}) })

Cypress.Commands.add('seedDatabase', () => { cy.task('seedDatabase') })

Cypress.Commands.add('clearDatabase', () => { cy.task('clearDatabase') })

// Type definitions declare global { namespace Cypress { interface Chainable {
login(email: string, password: string): Chainable<void> seedDatabase():
Chainable<void> clearDatabase(): Chainable<void> } } }

// Create cypress/support/commands.ts: Cypress.Commands.add('getByTestId',
(testId: string) => { return cy.get(`[data-testid="${testId}"]`) })

Cypress.Commands.add('findByText', (text: string) => { return cy.contains(text)
})

Cypress.Commands.add('interceptAPI', (method: string, url: string, fixture?:
string) => { cy.intercept(method, url, fixture ? { fixture } :
{}).as(url.split('/').pop() || 'api') })

Rules:

- Configure base URL
- Add custom commands
- Setup node events
- Enable video recording
```

#### Sub-task 8.2.2: Create E2E Test Scenarios

```markdown
Create cypress/e2e/auth.cy.ts:

describe('Authentication', () => { beforeEach(() => { cy.clearDatabase()
cy.seedDatabase() })

it('allows user to register', () => { cy.visit('/auth/register')

    cy.get('input[name="name"]').type('New User')
    cy.get('input[name="email"]').type('newuser@example.com')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('input[name="confirmPassword"]').type('Password123!')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/auth/login')
    cy.findByText('Account created successfully').should('be.visible')

})

it('allows user to login', () => { cy.visit('/auth/login')

    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.findByText('Welcome back').should('be.visible')

})

it('shows error for invalid credentials', () => { cy.visit('/auth/login')

    cy.get('input[name="email"]').type('wrong@example.com')
    cy.get('input[name="password"]').type('wrongpassword')

    cy.get('button[type="submit"]').click()

    cy.findByText('Invalid credentials').should('be.visible')
    cy.url().should('include', '/auth/login')

})

it('redirects to login for protected routes', () => { cy.visit('/dashboard')
cy.url().should('include', '/auth/login') cy.url().should('include',
'callbackUrl=%2Fdashboard') })

it('persists session across page reloads', () => { cy.login('test@example.com',
'password') cy.reload() cy.url().should('include', '/dashboard') }) })

// Create cypress/e2e/course-navigation.cy.ts: describe('Course Navigation', ()
=> { beforeEach(() => { cy.login('test@example.com', 'password') })

it('displays course list', () => { cy.visit('/courses')

    cy.findByText('Available Courses').should('be.visible')
    cy.get('[data-testid="course-card"]').should('have.length.at.least', 1)

})

it('navigates to course details', () => { cy.visit('/courses')

    cy.get('[data-testid="course-card"]').first().click()

    cy.url().should('match', /\/courses\/[\w-]+/)
    cy.get('h1').should('be.visible')
    cy.findByText('Start Course').should('be.visible')

})

it('tracks lesson progress', () => {
cy.visit('/courses/intro-to-react/basics/getting-started')

    // Scroll to bottom to trigger auto-complete
    cy.scrollTo('bottom')
    cy.wait(1000) // Wait for debounced progress update

    // Check completion checkbox
    cy.get('input[type="checkbox"][aria-label="Mark as complete"]').check()

    // Verify progress is saved
    cy.reload()
    cy.get('input[type="checkbox"][aria-label="Mark as complete"]').should('be.checked')

})

it('navigates between lessons', () => {
cy.visit('/courses/intro-to-react/basics/getting-started')

    cy.findByText('Next').click()
    cy.url().should('include', '/components')

    cy.findByText('Previous').click()
    cy.url().should('include', '/getting-started')

})

it('shows course progress', () => { cy.visit('/courses/intro-to-react')

    cy.get('[data-testid="progress-bar"]').should('be.visible')
    cy.get('[data-testid="progress-percentage"]').should('contain', '%')

}) })

// Create cypress/e2e/admin.cy.ts: describe('Admin Dashboard', () => {
beforeEach(() => { cy.login('admin@example.com', 'adminpassword') })

it('displays admin dashboard', () => { cy.visit('/admin')

    cy.findByText('Dashboard').should('be.visible')
    cy.get('[data-testid="stat-card"]').should('have.length', 4)

})

it('manages users', () => { cy.visit('/admin/users')

    cy.get('table').should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 1)

    // Change user role
    cy.get('select[aria-label="User role"]').first().select('admin')
    cy.findByText('Role updated').should('be.visible')

})

it('manages courses', () => { cy.visit('/admin/courses')

    cy.findByText('Add Course').click()

    cy.get('input[name="title"]').type('New Test Course')
    cy.get('textarea[name="description"]').type('A test course description')
    cy.get('button[type="submit"]').click()

    cy.findByText('Course created successfully').should('be.visible')

})

it('views analytics', () => { cy.visit('/admin/analytics')

    cy.get('[data-testid="analytics-chart"]').should('be.visible')
    cy.get('select[aria-label="Date range"]').select('Last 30 days')

    // Charts should update
    cy.get('.recharts-wrapper').should('have.length.at.least', 1)

}) })

Rules:

- Test user journeys
- Use data-testid attributes
- Test error scenarios
- Verify persistence
```

#### Sub-task 8.2.3: Mobile and Accessibility Tests

````markdown
Create cypress/e2e/mobile.cy.ts:

describe('Mobile Experience', () => { beforeEach(() => { cy.viewport('iphone-x')
cy.login('test@example.com', 'password') })

it('shows mobile navigation', () => { cy.visit('/')

    // Desktop nav should be hidden
    cy.get('nav.desktop-nav').should('not.be.visible')

    // Mobile menu button should be visible
    cy.get('[aria-label="Toggle menu"]').should('be.visible').click()

    // Mobile menu should open
    cy.get('[role="dialog"]').should('be.visible')
    cy.findByText('Courses').should('be.visible')

})

it('handles touch interactions', () => { cy.visit('/courses')

    // Swipe gestures on course cards
    cy.get('[data-testid="course-card"]').first()
      .trigger('touchstart', { touches: [{ clientX: 300, clientY: 100 }] })
      .trigger('touchmove', { touches: [{ clientX: 100, clientY: 100 }] })
      .trigger('touchend')

})

it('adapts layout for mobile', () => { cy.visit('/courses/intro-to-react')

    // Sidebar should be hidden by default
    cy.get('[data-testid="course-sidebar"]').should('not.be.visible')

    // Should have mobile-specific navigation
    cy.get('[data-testid="mobile-course-nav"]').should('be.```markdown

visible') })

it('supports offline mode', () => {
cy.visit('/courses/intro-to-react/basics/getting-started')

    // Go offline
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false)
    })

    // Should still show cached content
    cy.reload()
    cy.findByText('Getting Started').should('be.visible')
    cy.get('[data-testid="offline-indicator"]').should('be.visible')

}) })

// Create cypress/e2e/accessibility.cy.ts: describe('Accessibility', () => {
beforeEach(() => { cy.login('test@example.com', 'password') cy.injectAxe() })

it('has no accessibility violations on home page', () => { cy.visit('/')
cy.checkA11y() })

it('has no violations on course page', () => { cy.visit('/courses')
cy.checkA11y() })

it('supports keyboard navigation', () => { cy.visit('/courses')

    // Tab through interactive elements
    cy.get('body').tab()
    cy.focused().should('have.attr', 'href', '/')

    cy.get('body').tab()
    cy.focused().should('contain', 'Courses')

    // Enter key should activate links
    cy.focused().type('{enter}')
    cy.url().should('include', '/courses')

})

it('announces page changes to screen readers', () => { cy.visit('/')

    // Check for aria-live region
    cy.get('[aria-live="polite"]').should('exist')

    // Navigate and check announcement
    cy.findByText('Courses').click()
    cy.get('[aria-live="polite"]').should('contain', 'Navigated to Courses')

})

it('supports high contrast mode', () => { cy.visit('/')

    // Enable high contrast
    cy.window().then((win) => {
      win.document.documentElement.classList.add('high-contrast')
    })

    // Check contrast ratios
    cy.get('button').each(($button) => {
      cy.wrap($button).should('have.css', 'border-width', '2px')
    })

})

it('provides skip links', () => { cy.visit('/')

    // Focus skip link
    cy.get('body').tab()
    cy.focused().should('contain', 'Skip to main content')

    // Activate skip link
    cy.focused().click()
    cy.focused().should('have.id', 'main-content')

}) })

Rules:

- Test mobile viewports
- Check accessibility
- Test keyboard navigation
- Verify offline support
````

#### Sub-task 8.2.4: Performance Tests

```markdown
Create cypress/e2e/performance.cy.ts:

describe('Performance', () => { beforeEach(() => { cy.login('test@example.com',
'password') })

it('loads pages within performance budget', () => { cy.visit('/', {
onBeforeLoad: (win) => { win.performance.mark('start') }, onLoad: (win) => {
win.performance.mark('end') win.performance.measure('pageLoad', 'start', 'end')
const measure = win.performance.getEntriesByName('pageLoad')[0]

        expect(measure.duration).to.be.lessThan(3000) // 3 seconds
      },
    })

})

it('lazy loads images', () => { cy.visit('/courses')

    // Images below fold should not be loaded
    cy.get('img[loading="lazy"]').should('exist')

    // Scroll to trigger lazy loading
    cy.scrollTo('bottom')

    // Images should now be loaded
    cy.get('img[loading="lazy"]').each(($img) => {
      cy.wrap($img).should('have.prop', 'complete', true)
    })

})

it('implements code splitting', () => { cy.visit('/')

    // Check initial bundle size
    cy.window().then((win) => {
      const scripts = Array.from(win.document.scripts)
      const mainBundle = scripts.find(s => s.src.includes('_app'))

      if (mainBundle) {
        cy.request(mainBundle.src).then((response) => {
          expect(response.body.length).to.be.lessThan(200 * 1024) // 200KB
        })
      }
    })

})

it('caches static assets', () => { cy.visit('/')

    // Check cache headers
    cy.intercept('GET', '**/*.js', (req) => {
      req.continue((res) => {
        expect(res.headers['cache-control']).to.include('max-age=31536000')
      })
    })

    cy.reload()

})

it('prefetches next navigation', () => { cy.visit('/courses')

    // Hover over link to trigger prefetch
    cy.get('[data-testid="course-card"]').first().trigger('mouseenter')

    // Check for prefetch link
    cy.get('link[rel="prefetch"]').should('exist')

}) })

// Create cypress/e2e/seo.cy.ts: describe('SEO', () => { it('has proper meta
tags', () => { cy.visit('/')

    cy.get('head title').should('contain', 'Course Platform')
    cy.get('meta[name="description"]').should('have.attr', 'content')
    cy.get('meta[property="og:title"]').should('exist')
    cy.get('meta[property="og:description"]').should('exist')
    cy.get('meta[property="og:image"]').should('exist')

})

it('generates proper URLs', () => { cy.visit('/courses/intro-to-react')

    cy.url().should('match', /^https?:\/\/[^\/]+\/courses\/intro-to-react$/)
    cy.get('link[rel="canonical"]').should('have.attr', 'href', Cypress.config().baseUrl + '/courses/intro-to-react')

})

it('has sitemap', () => { cy.request('/sitemap.xml').then((response) => {
expect(response.status).to.eq(200)
expect(response.headers['content-type']).to.include('xml')
expect(response.body).to.include('<urlset') }) })

it('has robots.txt', () => { cy.request('/robots.txt').then((response) => {
expect(response.status).to.eq(200)
expect(response.body).to.include('User-agent')
expect(response.body).to.include('Sitemap') }) }) })

Rules:

- Measure performance metrics
- Test lazy loading
- Verify caching
- Check SEO elements
```

#### Sub-task 8.2.5: Create Test Utilities

```markdown
Create cypress/support/test-utils.ts:

// Database utilities export const testUser = { email: 'test@example.com',
password: 'password', name: 'Test User', role: 'user', }

export const adminUser = { email: 'admin@example.com', password:
'adminpassword', name: 'Admin User', role: 'admin', }

export const testCourse = { slug: 'test-course', title: 'Test Course',
description: 'A course for testing', modules: [ { slug: 'module-1', title:
'Module 1', lessons: [ { slug: 'lesson-1', title: 'Lesson 1', content: 'Test
content', }, ], }, ], }

// API mocking utilities export function mockSuccessResponse(data: any) { return
{ statusCode: 200, body: data, } }

export function mockErrorResponse(message: string, statusCode = 400) { return {
statusCode, body: { error: message }, } }

// Visual regression utilities export function takeSnapshot(name: string) {
cy.percySnapshot(name) }

// Accessibility utilities export function checkA11yWithRules(rules?: any) {
cy.checkA11y(null, rules) }

export function logA11yViolations(violations: any[]) { cy.task( 'table',
violations.map(({ id, impact, description, nodes }) => ({ id, impact,
description, nodes: nodes.length, })) ) }

// Create cypress/plugins/index.ts: import { lighthouse, prepareAudit } from
'@cypress-audit/lighthouse' import { pa11y } from '@cypress-audit/pa11y'

export default (on: any, config: any) => { // Lighthouse integration
on('before:browser:launch', (browser: any = {}, launchOptions: any) => {
prepareAudit(launchOptions) })

on('task', { lighthouse: lighthouse(), pa11y: pa11y(),

    // Database tasks
    async seedDatabase() {
      // Implementation to seed test data
      console.log('Seeding database...')
      return null
    },

    async clearDatabase() {
      // Implementation to clear test data
      console.log('Clearing database...')
      return null
    },

    // File system tasks
    readFile(filename: string) {
      return require('fs').readFileSync(filename, 'utf8')
    },

}) }

// Create cypress/support/assertions.ts:
chai.Assertion.addMethod('haveProgress', function (expected: number) { const
$el = this._obj
  const actual = parseInt($el.attr('aria-valuenow') || '0')

this.assert( actual === expected,
`expected #{this} to have progress ${expected}, but got ${actual}`,
`expected #{this} not to have progress ${expected}`, expected, actual ) })

chai.Assertion.addMethod('beAccessible', function () { const $el = this.\_obj

// Check for basic accessibility attributes const hasRole = $el.attr('role') !==
undefined const hasAriaLabel = $el.attr('aria-label') !== undefined const
hasAriaLabelledBy = $el.attr('aria-labelledby') !== undefined

this.assert( hasRole || hasAriaLabel || hasAriaLabelledBy, 'expected #{this} to
be accessible with proper ARIA attributes', 'expected #{this} not to be
accessible' ) })

// TypeScript declarations declare global { namespace Chai { interface Assertion
{ haveProgress(value: number): Assertion beAccessible(): Assertion } } }

Rules:

- Create reusable utilities
- Add custom assertions
- Mock API responses
- Setup database helpers
```

## 🎯 Final Implementation Checklist

### Pre-Launch Checklist

```markdown
## Performance

- [ ] Lighthouse score > 95 on all metrics
- [ ] Bundle size < 200KB initial load
- [ ] All images optimized with next/image
- [ ] Service worker implemented and tested
- [ ] CDN configured for static assets

## Security

- [ ] All environment variables secured
- [ ] CSP headers configured
- [ ] Input validation on all forms
- [ ] Rate limiting on API endpoints
- [ ] SQL injection prevention

## Accessibility

- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus indicators visible

## SEO

- [ ] Meta tags on all pages
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Structured data implemented

## Testing

- [ ] Unit test coverage > 80%
- [ ] E2E tests for critical paths
- [ ] Performance tests passing
- [ ] Accessibility tests passing
- [ ] Cross-browser testing complete

## Documentation

- [ ] README.md complete
- [ ] API documentation
- [ ] Component storybook
- [ ] Deployment guide
- [ ] Contributing guidelines

## Monitoring

- [ ] Error tracking (Sentry) configured
- [ ] Analytics (GA4) implemented
- [ ] Performance monitoring setup
- [ ] Uptime monitoring active
- [ ] Log aggregation configured

## Deployment

- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Static assets deployed to CDN
- [ ] SSL certificates configured
- [ ] Backup strategy implemented
```

### Post-Launch Tasks

```markdown
## Week 1

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Fix critical bugs
- [ ] Optimize slow queries

## Week 2-4

- [ ] Implement user-requested features
- [ ] Optimize based on analytics
- [ ] A/B test improvements
- [ ] Expand test coverage
- [ ] Performance tuning

## Month 2+

- [ ] Scale infrastructure as needed
- [ ] Add new course content
- [ ] Implement advanced features
- [ ] Expand to new markets
- [ ] Mobile app development
```

---

## 🚀 Deployment Instructions

### Vercel Deployment

```bash
# Install Vercel CLI
pnpm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add NEXTAUTH_SECRET production
vercel env add DATABASE_URL production
# ... add all other env vars
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

---

This completes the comprehensive implementation guide for the Static MDX Course
Learning Platform. The system is now ready for development following these
detailed specifications and implementation patterns.
