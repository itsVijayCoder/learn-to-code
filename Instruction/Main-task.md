    # Copilot Implementation Guide: Static MDX Course Learning Platform

    ## 🎯 Global Rules & Principles for All Tasks

    ```markdown
    ALWAYS FOLLOW THESE RULES:
    1. Use TypeScript strict mode - no 'any' types allowed
    2. Follow SOLID principles - Single Responsibility for all components
    3. Apply DRY principle - Extract repeated code into utilities/hooks
    4. Use 'use client' directive only when necessary
    5. Implement error boundaries for all dynamic content
    6. Add JSDoc comments for all exported functions
    7. Use Zod for all external data validation
    8. Implement loading states for all async operations
    9. Mobile-first responsive design with Tailwind
    10. Accessibility first - ARIA labels, keyboard navigation

    ```

    ---

    ## 📋 Phase 1: Project Setup & Foundation

    ### Task 1.1: Initialize Next.js Project

    ```markdown
    Create a new Next.js 15 project with:
    - TypeScript with strict mode enabled
    - Tailwind CSS with custom configuration
    - App Router structure
    - ESLint with strict rules
    - Prettier configuration
    - Path aliases (@/components, @/lib, etc.)

    Rules:
    - Use npm for package management
    - Enable turbo mode in next.config.js
    - Configure absolute imports in tsconfig.json
    - Set up .env.example with all required variables

    ```

    ### Task 1.2: Setup Project Structure

    ```markdown
    Create the following directory structure in src/:

    src/
    ├── app/                    # Next.js app router
    ├── components/             # Reusable components
    │   ├── ui/                # shadcn/ui components
    │   ├── animation/         # Framer motion wrappers
    │   └── shared/            # Common components
    ├── lib/                   # Utilities and helpers
    │   ├── mdx/              # MDX processing
    │   ├── auth/             # Auth utilities
    │   └── utils/            # Common utilities
    ├── hooks/                 # Custom React hooks
    ├── stores/                # Zustand stores
    ├── types/                 # TypeScript types
    └── styles/               # Global styles

    Rules:
    - Each folder must have an index.ts barrel export
    - Types folder must export all types from single index.ts
    - No business logic in components - use hooks/utilities

    ```

    ### Task 1.3: Install Dependencies

    ```markdown
    Install these exact packages:

    Core:
    - next@15.x
    - react@18.x
    - react-dom@18.x
    - typescript@5.x

    Styling:
    - tailwindcss@3.x
    - @tailwindcss/typography
    - tailwind-merge
    - clsx

    UI Components:
    - @radix-ui/react-*
    - framer-motion@11.x
    - lucide-react

    State Management:
    - zustand@4.x
    - @tanstack/react-query@5.x

    MDX:
    - next-mdx-remote@5.x
    - gray-matter@4.x
    - rehype-pretty-code
    - rehype-slug
    - rehype-autolink-headings
    - remark-gfm

    Auth:
    - next-auth@beta
    - @auth/supabase-adapter

    Validation:
    - zod@3.x
    - @hookform/resolvers

    Dev Dependencies:
    - @types/* for all packages
    - eslint-* plugins
    - prettier
    - jest & @testing-library/*

    Rules:
    - Lock all versions in package.json
    - No alpha/beta packages except next-auth
    - Verify peer dependency compatibility

    ```

    ### Task 1.4: Configure Tailwind & Design System

    ```markdown
    Create tailwind.config.ts with:

    1. Custom color palette with CSS variables
    2. Fluid typography scale using clamp()
    3. Animation utilities for micro-interactions
    4. Glassmorphism utilities
    5. Custom spacing scale (4px base)

    Rules:
    - Use CSS custom properties for theme colors
    - Define animation durations as variables
    - Create utility classes for common patterns
    - Configure content paths correctly
    - Add custom fonts to config

    ```

    ### Task 1.5: Setup TypeScript Configuration

    ```markdown
    Configure tsconfig.json with:

    {
      "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "skipLibCheck": true,
        "paths": {
          "@/*": ["./src/*"],
          "@/components/*": ["./src/components/*"],
          "@/lib/*": ["./src/lib/*"],
          "@/hooks/*": ["./src/hooks/*"],
          "@/stores/*": ["./src/stores/*"],
          "@/types/*": ["./src/types/*"]
        }
      }
    }

    Rules:
    - Enable all strict checks
    - Configure module resolution
    - Set up path aliases
    - Include necessary lib types

    ```

    ---

    ## 📋 Phase 2: Core Infrastructure

    ### Task 2.1: Create Type Definitions

    ```markdown
    In src/types/index.ts, define all core types:

    1. User types (User, Role, Session)
    2. Course types (Course, Module, Lesson)
    3. Progress types (Progress, Completion)
    4. MDX types (FrontMatter, MDXContent)
    5. API types (ApiResponse, ApiError)

    Rules:
    - Use discriminated unions for variants
    - Make all fields readonly where possible
    - Use branded types for IDs
    - Export everything from index.ts
    - Add JSDoc comments for complex types

    ```

    ### Task 2.2: Setup Environment Configuration

    ```markdown
    Create src/config/env.ts with Zod validation:

    1. Parse all environment variables
    2. Validate with Zod schemas
    3. Export typed config object
    4. Throw on missing required vars
    5. Provide defaults for optional vars

    Rules:
    - Never access process.env directly
    - All env vars must be validated
    - Use NEXT_PUBLIC_ prefix correctly
    - Create .env.example with all vars
    - Add runtime validation

    ```

    ### Task 2.3: Implement MDX Processing Pipeline

    ```markdown
    Create src/lib/mdx/ with these files:

    1. processor.ts - Main MDX processing logic
    2. plugins.ts - Rehype/Remark plugin config
    3. components.ts - Custom MDX components
    4. cache.ts - Build-time caching logic
    5. types.ts - MDX-specific types

    Rules:
    - Cache processed MDX in memory
    - Use dynamic imports for heavy plugins
    - Implement error boundaries
    - Support custom components
    - Add frontmatter validation with Zod

    ```

    ### Task 2.4: Create Animation System

    ```markdown
    In src/lib/animations/, create:

    1. variants.ts - Reusable Framer Motion variants
    2. transitions.ts - Transition presets
    3. hooks.ts - Animation hooks (useInView, etc.)
    4. components.tsx - Animated wrapper components

    Rules:
    - All animations < 500ms duration
    - Use spring physics for natural motion
    - Respect prefers-reduced-motion
    - Export typed variant objects
    - Create composable animations

    ```

    ### Task 2.5: Setup Zustand Stores

    ```markdown
    Create these stores in src/stores/:

    1. useAuthStore.ts - Authentication state
    2. useProgressStore.ts - Course progress tracking
    3. useUIStore.ts - UI state (theme, sidebar, etc.)
    4. useContentStore.ts - Content caching

    Rules:
    - Use immer for immutable updates
    - Implement persistence middleware
    - Add devtools in development
    - Type all store slices properly
    - Use selectors for performance

    ```

    ---

    ## 📋 Phase 3: Authentication System

    ### Task 3.1: Configure NextAuth

    ```markdown
    Create src/lib/auth/ with:

    1. config.ts - NextAuth configuration
    2. providers.ts - Auth providers setup
    3. callbacks.ts - Session/JWT callbacks
    4. middleware.ts - Route protection

    Rules:
    - Implement CSRF protection
    - Use secure session cookies
    - Add rate limiting
    - Validate all inputs with Zod
    - Implement proper error handling

    ```

    ### Task 3.2: Create Auth Components

    ```markdown
    Build these components in src/components/auth/:

    1. LoginForm.tsx - Email/password login
    2. RegisterForm.tsx - User registration
    3. ForgotPassword.tsx - Password reset
    4. OAuthButtons.tsx - Social login buttons
    5. AuthGuard.tsx - Route protection wrapper

    Rules:
    - Use React Hook Form + Zod
    - Show loading states
    - Handle all error cases
    - Implement proper accessibility
    - Add client-side validation

    ```

    ### Task 3.3: Implement Role-Based Access

    ```markdown
    Create src/lib/auth/rbac.ts with:

    1. Permission definitions
    2. Role hierarchies
    3. Permission checking utilities
    4. Route guards
    5. Component-level guards

    Rules:
    - Use const assertions for roles
    - Implement least privilege
    - Cache permission checks
    - Add TypeScript guards
    - Document all permissions

    ```

    ---

    ## 📋 Phase 4: Content Management System

    ### Task 4.1: Build Course File Scanner

    ```markdown
    Create src/lib/content/scanner.ts to:

    1. Recursively scan content directory
    2. Parse course/module/lesson structure
    3. Extract frontmatter metadata
    4. Generate course manifest
    5. Validate content structure

    Rules:
    - Use Node.js fs/promises
    - Implement caching layer
    - Validate with Zod schemas
    - Handle missing files gracefully
    - Generate TypeScript types

    ```

    ### Task 4.2: Create Content API Layer

    ```markdown
    Build src/lib/content/api.ts with:

    1. getCourses() - List all courses
    2. getCourse(slug) - Get single course
    3. getLesson(course, module, lesson)
    4. getNavigation(courseId)
    5. searchContent(query)

    Rules:
    - All functions must be async
    - Return typed responses
    - Implement error boundaries
    - Cache in development
    - Use static imports where possible

    ```

    ### Task 4.3: Build MDX Components

    ```markdown
    Create custom MDX components in src/components/mdx/:

    1. CodeBlock.tsx - Syntax highlighted code
    2. VideoPlayer.tsx - Course video player
    3. Quiz.tsx - Interactive quiz component
    4. Callout.tsx - Info/warning boxes
    5. Navigation.tsx - Previous/Next links

    Rules:
    - Lazy load heavy components
    - Implement loading states
    - Add error boundaries
    - Make fully accessible
    - Support offline mode

    ```

    ---

    ## 📋 Phase 5: User Interface Implementation

    ### Task 5.1: Create Layout Components

    ```markdown
    Build in src/components/layout/:

    1. RootLayout.tsx - Main app layout
    2. Navigation.tsx - Top navigation bar
    3. Sidebar.tsx - Course navigation sidebar
    4. Footer.tsx - App footer
    5. MobileMenu.tsx - Mobile navigation

    Rules:
    - Use CSS Grid for layouts
    - Implement responsive design
    - Add skip navigation links
    - Use semantic HTML
    - Optimize for CLS

    ```

    ### Task 5.2: Build Course Components

    ```markdown
    Create in src/components/course/:

    1. CourseCard.tsx - Course preview card
    2. CourseGrid.tsx - Course listing grid
    3. LessonView.tsx - Lesson content viewer
    4. ProgressBar.tsx - Course progress indicator
    5. CompletionBadge.tsx - Completion status

    Rules:
    - Implement virtual scrolling for lists
    - Use Intersection Observer
    - Add loading skeletons
    - Optimize images with next/image
    - Implement error states

    ```

    ### Task 5.3: Implement Theme System

    ```markdown
    Create src/components/theme/:

    1. ThemeProvider.tsx - Theme context
    2. ThemeToggle.tsx - Dark/light switch
    3. useTheme.ts - Theme hook
    4. themes.ts - Theme definitions

    Rules:
    - Use CSS custom properties
    - Implement system preference detection
    - Store preference in localStorage
    - Add smooth transitions
    - Support high contrast mode

    ```

    ---

    ## 📋 Phase 6: Progress Tracking System

    ### Task 6.1: Build Progress Tracking

    ```markdown
    Implement in src/features/progress/:

    1. ProgressTracker.tsx - Main tracking component
    2. useProgress.ts - Progress hook
    3. ProgressSync.ts - Cloud sync logic
    4. ProgressAnalytics.tsx - Progress charts
    5. Certificate.tsx - Completion certificate

    Rules:
    - Store progress locally first
    - Sync to cloud asynchronously
    - Handle offline scenarios
    - Implement optimistic updates
    - Add progress animations

    ```

    ### Task 6.2: Create Admin Dashboard

    ```markdown
    Build admin features in src/app/(admin)/:

    1. dashboard/page.tsx - Overview stats
    2. courses/page.tsx - Course management
    3. users/page.tsx - User management
    4. analytics/page.tsx - Platform analytics
    5. settings/page.tsx - Platform settings

    Rules:
    - Implement data tables with sorting
    - Add bulk actions
    - Use server components where possible
    - Implement real-time updates
    - Add export functionality

    ```

    ---

    ## 📋 Phase 7: Performance Optimization

    ### Task 7.1: Implement Code Splitting

    ```markdown
    Optimize bundle size by:

    1. Dynamic imports for routes
    2. Lazy load heavy components
    3. Split vendor bundles
    4. Implement route prefetching
    5. Optimize image loading

    Rules:
    - Keep initial bundle < 200KB
    - Use webpack bundle analyzer
    - Implement progressive enhancement
    - Preload critical resources
    - Use resource hints

    ```

    ### Task 7.2: Add Caching Strategies

    ```markdown
    Implement caching in src/lib/cache/:

    1. Static content caching
    2. API response caching
    3. Image optimization caching
    4. Service worker setup
    5. CDN cache headers

    Rules:
    - Cache static content forever
    - Implement cache invalidation
    - Use stale-while-revalidate
    - Add offline support
    - Monitor cache hit rates

    ```

    ---

    ## 📋 Phase 8: Testing & Quality Assurance

    ### Task 8.1: Unit Testing Setup

    ```markdown
    Create tests for:

    1. Utility functions
    2. Custom hooks
    3. Store logic
    4. API functions
    5. Components

    Rules:
    - Minimum 80% coverage
    - Test error scenarios
    - Use Testing Library
    - Mock external dependencies
    - Write descriptive test names

    ```

    ### Task 8.2: E2E Testing

    ```markdown
    Write Cypress tests for:

    1. Authentication flow
    2. Course navigation
    3. Progress tracking
    4. Admin operations
    5. Mobile responsiveness

    Rules:
    - Test critical user paths
    - Include accessibility tests
    - Test offline scenarios
    - Add visual regression tests
    - Run in CI pipeline

    ```

    ---

    ## 🚨 Critical Implementation Notes

    ```markdown
    REMEMBER FOR EVERY FILE:
    1. Add 'use client' only for interactive components
    2. Export types from barrel exports
    3. Handle loading and error states
    4. Implement proper TypeScript types
    5. Follow mobile-first approach
    6. Add proper ARIA labels
    7. Implement keyboard navigation
    8. Use semantic HTML elements
    9. Optimize for Core Web Vitals
    10. Document complex logic with comments

    ```

    ---

    ## 🎯 Success Checklist

    ```markdown
    Before marking any task complete, verify:
    - [ ] TypeScript strict mode passes
    - [ ] No ESLint errors or warnings
    - [ ] Component has loading state
    - [ ] Component has error boundary
    - [ ] Responsive on all screen sizes
    - [ ] Accessible via keyboard
    - [ ] Has proper ARIA labels
    - [ ] Follows DRY principle
    - [ ] Follows SOLID principles
    - [ ] Has JSDoc comments where needed

    ```
