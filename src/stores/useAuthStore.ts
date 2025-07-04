import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { User, AuthState } from '@/types'

/**
 * Authentication store interface
 */
interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: Error | null) => void
  login: (user: User) => void
  logout: () => void
  clearError: () => void
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
            state.user = user
            state.isAuthenticated = !!user
          }),

        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading
          }),

        setError: (error) =>
          set((state) => {
            state.error = error
            state.isLoading = false
          }),

        login: (user) =>
          set((state) => {
            state.user = user
            state.isAuthenticated = true
            state.isLoading = false
            state.error = null
          }),

        logout: () =>
          set((state) => {
            state.user = null
            state.isAuthenticated = false
            state.isLoading = false
            state.error = null
          }),

        clearError: () =>
          set((state) => {
            state.error = null
          }),
      })),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'auth-store' }
  )
)

/**
 * Selectors for optimized re-renders
 */
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
