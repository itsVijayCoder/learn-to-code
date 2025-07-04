import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { signOut, getSession } from "next-auth/react";
import type { User, AuthState } from "@/types";

/**
 * Authentication store interface
 */
interface AuthStore extends AuthState {
   // Actions
   setUser: (user: User | null) => void;
   setLoading: (isLoading: boolean) => void;
   setError: (error: Error | null) => void;
   login: (user: User) => void;
   logout: () => Promise<void>;
   refreshSession: () => Promise<void>;
   clearError: () => void;
}

/**
 * Authentication store with persistent state
 */
export const useAuthStore = create<AuthStore>()(
   devtools(
      persist(
         immer((set) => ({
            // Initial state
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,

            // Actions
            setUser: (user) =>
               set((state) => {
                  state.user = user;
                  state.isAuthenticated = !!user;
               }),

            setLoading: (isLoading) =>
               set((state) => {
                  state.isLoading = isLoading;
               }),

            setError: (error) =>
               set((state) => {
                  state.error = error;
                  state.isLoading = false;
               }),

            login: (user) =>
               set((state) => {
                  state.user = user;
                  state.isAuthenticated = true;
                  state.isLoading = false;
                  state.error = null;
               }),

            logout: async () => {
               try {
                  set((state) => {
                     state.isLoading = true;
                  });

                  await signOut({ callbackUrl: "/" });

                  set((state) => {
                     state.user = null;
                     state.isAuthenticated = false;
                     state.isLoading = false;
                     state.error = null;
                  });
               } catch (error) {
                  set((state) => {
                     state.error =
                        error instanceof Error
                           ? error
                           : new Error("Logout failed");
                     state.isLoading = false;
                  });
               }
            },

            refreshSession: async () => {
               try {
                  set((state) => {
                     state.isLoading = true;
                  });

                  const session = await getSession();

                  if (session?.user) {
                     const user: User = {
                        id: session.user.id as User["id"],
                        email: session.user.email,
                        name: session.user.name,
                        role: session.user.role,
                        avatar: session.user.image || null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        preferences: {
                           theme: "system",
                           notifications: {
                              email: true,
                              push: false,
                              marketing: false,
                           },
                           language: "en",
                        },
                        profile: {
                           bio: null,
                           location: null,
                           website: null,
                           twitter: null,
                           github: null,
                           linkedin: null,
                        },
                     };

                     set((state) => {
                        state.user = user;
                        state.isAuthenticated = true;
                        state.isLoading = false;
                     });
                  } else {
                     set((state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                        state.isLoading = false;
                     });
                  }
               } catch (error) {
                  set((state) => {
                     state.error =
                        error instanceof Error
                           ? error
                           : new Error("Session refresh failed");
                     state.isLoading = false;
                  });
               }
            },

            clearError: () =>
               set((state) => {
                  state.error = null;
               }),
         })),
         {
            name: "auth-store",
            partialize: (state) => ({
               user: state.user,
               isAuthenticated: state.isAuthenticated,
            }),
         }
      ),
      { name: "auth-store" }
   )
);

/**
 * Selectors for optimized re-renders
 */
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
   useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
