import { z } from 'zod'

/**
 * Environment variables schema with validation
 */
const envSchema = z.object({
  // Next.js environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // App configuration
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL'),
  
  // Authentication
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL'),
  NEXTAUTH_SECRET: z.string().min(32, 'NextAuth secret must be at least 32 characters'),
  
  // Supabase configuration
  SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  SUPABASE_SERVICE_KEY: z.string().min(1, 'Supabase service key is required').optional(),
})

/**
 * Parse and validate environment variables
 */
function parseEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Invalid environment variables:\n${missingVars}`)
    }
    throw error
  }
}

/**
 * Validated environment configuration
 */
export const env = parseEnv()

/**
 * Type for environment variables
 */
export type Environment = z.infer<typeof envSchema>

/**
 * Check if we're in development mode
 */
export const isDevelopment = env.NODE_ENV === 'development'

/**
 * Check if we're in production mode
 */
export const isProduction = env.NODE_ENV === 'production'

/**
 * Check if we're in test mode
 */
export const isTest = env.NODE_ENV === 'test'
