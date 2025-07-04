/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  readonly data: T
  readonly success: boolean
  readonly message?: string
  readonly meta?: ApiMeta
}

/**
 * API error response
 */
export interface ApiError {
  readonly success: false
  readonly error: {
    readonly code: string
    readonly message: string
    readonly details?: Record<string, unknown>
  }
  readonly statusCode: number
}

/**
 * API metadata for pagination
 */
export interface ApiMeta {
  readonly page?: number
  readonly limit?: number
  readonly total?: number
  readonly totalPages?: number
  readonly hasNextPage?: boolean
  readonly hasPrevPage?: boolean
}

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  readonly page?: number
  readonly limit?: number
  readonly sortBy?: string
  readonly sortOrder?: 'asc' | 'desc'
}

/**
 * Search query parameters
 */
export interface SearchQuery extends PaginationQuery {
  readonly q?: string
  readonly filters?: Record<string, string | string[]>
}

/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * API client configuration
 */
export interface ApiClientConfig {
  readonly baseUrl: string
  readonly timeout?: number
  readonly headers?: Record<string, string>
  readonly retries?: number
}
