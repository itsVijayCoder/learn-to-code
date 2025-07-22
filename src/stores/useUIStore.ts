import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * Theme type
 */
type Theme = "light" | "dark" | "system";

/**
 * Notification type
 */
type Notification = {
   id: string;
   type: "success" | "error" | "warning" | "info";
   title: string;
   message?: string;
   duration?: number;
};

/**
 * UI store interface
 */
interface UIStore {
   // Theme
   theme: Theme;
   resolvedTheme: "light" | "dark";

   // Layout
   sidebarOpen: boolean;
   sidebarCollapsed: boolean;

   // Modals and overlays
   activeModal: string | null;

   // Loading states
   pageLoading: boolean;

   // Notifications
   notifications: Notification[];

   // Actions
   setTheme: (theme: Theme) => void;
   setResolvedTheme: (theme: "light" | "dark") => void;
   toggleSidebar: () => void;
   setSidebarOpen: (open: boolean) => void;
   toggleSidebarCollapsed: () => void;
   setSidebarCollapsed: (collapsed: boolean) => void;
   openModal: (modal: string) => void;
   closeModal: () => void;
   setPageLoading: (loading: boolean) => void;
   addNotification: (notification: Omit<Notification, "id">) => void;
   removeNotification: (id: string) => void;
   clearNotifications: () => void;
}

/**
 * UI store for managing global UI state
 */
export const useUIStore = create<UIStore>()(
   devtools(
      persist(
         immer((set, get) => ({
            // Initial state
            theme: "system",
            resolvedTheme: "light",
            sidebarOpen: false,
            sidebarCollapsed: false,
            activeModal: null,
            pageLoading: false,
            notifications: [],

            // Actions
            setTheme: (theme) =>
               set((state) => {
                  state.theme = theme;
               }),

            setResolvedTheme: (theme) =>
               set((state) => {
                  state.resolvedTheme = theme;
               }),

            toggleSidebar: () =>
               set((state) => {
                  state.sidebarOpen = !state.sidebarOpen;
               }),

            setSidebarOpen: (open) =>
               set((state) => {
                  state.sidebarOpen = open;
               }),

            toggleSidebarCollapsed: () =>
               set((state) => {
                  state.sidebarCollapsed = !state.sidebarCollapsed;
               }),

            setSidebarCollapsed: (collapsed) =>
               set((state) => {
                  state.sidebarCollapsed = collapsed;
               }),

            openModal: (modal) =>
               set((state) => {
                  state.activeModal = modal;
               }),

            closeModal: () =>
               set((state) => {
                  state.activeModal = null;
               }),

            setPageLoading: (loading) =>
               set((state) => {
                  state.pageLoading = loading;
               }),

            addNotification: (notification) =>
               set((state) => {
                  const id = Math.random().toString(36).substr(2, 9);
                  state.notifications.push({
                     id,
                     duration: 5000,
                     ...notification,
                  });

                  // Auto-remove notification after duration
                  if (notification.duration !== 0) {
                     setTimeout(() => {
                        const currentState = get();
                        const updatedNotifications =
                           currentState.notifications.filter(
                              (n: Notification) => n.id !== id
                           );
                        set((state) => {
                           state.notifications = updatedNotifications;
                        });
                     }, notification.duration || 5000);
                  }
               }),

            removeNotification: (id) =>
               set((state) => {
                  state.notifications = state.notifications.filter(
                     (notification: Notification) => notification.id !== id
                  );
               }),

            clearNotifications: () =>
               set((state) => {
                  state.notifications = [];
               }),
         })),
         {
            name: "ui-store",
            partialize: (state) => ({
               theme: state.theme,
               sidebarCollapsed: state.sidebarCollapsed,
            }),
         }
      ),
      { name: "ui-store" }
   )
);

/**
 * Selectors for optimized re-renders
 */
export const useTheme = () => useUIStore((state) => state.theme);
export const useResolvedTheme = () =>
   useUIStore((state) => state.resolvedTheme);
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useSidebarCollapsed = () =>
   useUIStore((state) => state.sidebarCollapsed);
export const useActiveModal = () => useUIStore((state) => state.activeModal);
export const usePageLoading = () => useUIStore((state) => state.pageLoading);
export const useNotifications = () =>
   useUIStore((state) => state.notifications);
