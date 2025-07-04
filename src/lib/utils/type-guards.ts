/**
 * Type guard to check if a value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Type guard to check if a value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Type guard to check if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

/**
 * Type guard to check if an object has a specific property
 */
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj
}

/**
 * Type guard to check if a value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * Type guard to check if a value is a non-empty array
 */
export function isNonEmptyArray<T>(value: unknown): value is [T, ...T[]] {
  return Array.isArray(value) && value.length > 0
}

/**
 * Type guard to check if a value is an object (and not null or array)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Type guard to check if a value is a function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}

/**
 * Type guard to check if a value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Type guard to check if a value is a Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime())
}

/**
 * Type guard to check if a value is a valid URL string
 */
export function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * Type guard to check if a value is a valid email
 */
export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}
