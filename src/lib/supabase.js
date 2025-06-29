import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Mock authentication for development
const useMockAuth = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Mock user database - stores registered users
const mockUsers = new Map();

export const authHelpers = {
  async signUp(email, password, name) {
    if (useMockAuth) {
      // Check if user already exists
      if (mockUsers.has(email)) {
        throw new Error('User already registered');
      }

      // Store user with hashed password (simple mock hash)
      const mockUser = {
        id: `mock-${Date.now()}`,
        email,
        password: btoa(password), // Simple base64 encoding for demo
        user_metadata: { name },
        created_at: new Date().toISOString()
      };
      
      mockUsers.set(email, mockUser);
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = mockUser;
      return { user: userWithoutPassword };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    if (useMockAuth) {
      // Check if user exists
      const storedUser = mockUsers.get(email);
      if (!storedUser) {
        throw new Error('Invalid login credentials');
      }

      // Verify password
      const storedPassword = atob(storedUser.password);
      if (storedPassword !== password) {
        throw new Error('Invalid login credentials');
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = storedUser;
      return { user: userWithoutPassword };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (useMockAuth) {
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (useMockAuth) {
      return null;
    }
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getCurrentSession() {
    if (useMockAuth) {
      return null;
    }
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getUserProfile(userId) {
    // Always return a basic profile
    return {
      id: userId,
      email: '',
      name: 'User',
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  },

  // Helper method to check mock users (for debugging)
  getMockUsers() {
    if (useMockAuth) {
      return Array.from(mockUsers.entries()).map(([email, user]) => ({
        email,
        name: user.user_metadata?.name,
        id: user.id
      }));
    }
    return [];
  }
};