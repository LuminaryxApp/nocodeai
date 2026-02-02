import { create } from 'zustand';
export const useUIStore = create((set) => ({
    sidebarOpen: true,
    theme: 'system',
    toggleSidebar: () => { set((state) => ({ sidebarOpen: !state.sidebarOpen })); },
    setSidebarOpen: (open) => { set({ sidebarOpen: open }); },
    setTheme: (theme) => { set({ theme }); },
}));
