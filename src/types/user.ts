import { Brand } from "./utils";

/**
 * Branded user ID type for type safety
 */
export type UserId = Brand<string, "UserId">;

/**
 * User role enumeration
 */
export type Role = "admin" | "instructor" | "student";

/**
 * User preferences interface
 */
export interface UserPreferences {
   readonly theme: "light" | "dark" | "system";
   readonly notifications: {
      readonly email: boolean;
      readonly push: boolean;
      readonly marketing: boolean;
   };
   readonly language: string;
}

/**
 * User profile interface
 */
export interface UserProfile {
   readonly bio: string | null;
   readonly location: string | null;
   readonly website: string | null;
   readonly twitter: string | null;
   readonly github: string | null;
   readonly linkedin: string | null;
}

/**
 * User interface
 */
export interface User {
   readonly id: UserId;
   readonly email: string;
   readonly name: string | null;
   readonly role: Role;
   readonly avatar?: string | null;
   readonly createdAt: Date;
   readonly updatedAt: Date;
   readonly preferences: UserPreferences;
   readonly profile: UserProfile;
}

/**
 * User session interface
 */
export interface Session {
   readonly user: User;
   readonly expires: Date;
   readonly accessToken?: string;
}

/**
 * Authentication state interface
 */
export interface AuthState {
   readonly user: User | null;
   readonly isLoading: boolean;
   readonly error: Error | null;
   readonly isAuthenticated: boolean;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
   readonly email: string;
   readonly password: string;
}

/**
 * Registration data interface
 */
export interface RegisterData {
   readonly email: string;
   readonly password: string;
   readonly name: string;
}

/**
 * Password reset interface
 */
export interface PasswordReset {
   readonly email: string;
}
