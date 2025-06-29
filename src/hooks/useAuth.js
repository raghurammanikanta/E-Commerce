import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { setUser, clearAuth } from '../store/slices/authSlice';
import { supabase, authHelpers } from '../lib/supabase';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, profile, loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const session = await authHelpers.getCurrentSession();
        
        if (session?.user && mounted) {
          const profile = await authHelpers.getUserProfile(session.user.id);
          dispatch(setUser({ user: session.user, profile }));
        } else if (mounted) {
          dispatch(clearAuth());
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          dispatch(clearAuth());
        }
      }
    };

    initializeAuth();

    // Only set up auth listener if not using mock data
    if (import.meta.env.VITE_USE_MOCK_DATA !== 'true') {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_IN' && session?.user) {
            const profile = await authHelpers.getUserProfile(session.user.id);
            dispatch(setUser({ user: session.user, profile }));
          } else if (event === 'SIGNED_OUT') {
            dispatch(clearAuth());
          }
        }
      );

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return { user, profile, loading, error, isAuthenticated };
};