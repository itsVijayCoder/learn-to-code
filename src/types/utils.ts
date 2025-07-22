/**
 * Type utility for making object properties more readable
 */
export type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

/**
 * Deep partial utility type
 */
export type DeepPartial<T> = {
   [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep readonly utility type
 */
export type DeepReadonly<T> = {
   readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Branded type utility for creating nominal types
 */
export type Brand<T, K> = T & { __brand: K };

/**
 * Extract keys that have values of a specific type
 */
export type KeysOfType<T, U> = {
   [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
