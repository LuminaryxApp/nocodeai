import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create()(persist((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    setUser: (user) => { set({ user, isAuthenticated: Boolean(user) }); },
    setToken: (token) => { set({ token }); },
    login: (user, token) => { set({ user, token, isAuthenticated: true, isLoading: false }); },
    logout: () => { set({ user: null, token: null, isAuthenticated: false, isLoading: false }); },
    setLoading: (loading) => { set({ isLoading: loading }); },
}), {
    name: 'auth-storage',
    partialize: (state) => ({ token: state.token }),
}));
