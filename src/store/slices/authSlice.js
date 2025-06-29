import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authHelpers } from '../../lib/supabase';

const initialState = {
  user: null,
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const session = await authHelpers.getCurrentSession();
      
      if (session?.user) {
        const profile = await authHelpers.getUserProfile(session.user.id);
        return { user: session.user, profile };
      }
      
      return { user: null, profile: null };
    } catch (error) {
      console.error('Auth initialization error:', error);
      return { user: null, profile: null }; // Don't reject, just return empty state
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { user } = await authHelpers.signUp(email, password, name);
      
      const profile = {
        id: user.id,
        email: user.email,
        name: name,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { user, profile };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await authHelpers.signIn(email, password);
      
      const profile = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email.split('@')[0],
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { user, profile };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await authHelpers.signOut();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      const { user, profile } = action.payload || {};
      state.user = user;
      state.profile = profile;
      state.isAuthenticated = !!user;
      state.loading = false;
      state.initialized = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.initialized = false;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign up failed';
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign in failed';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;