# Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. "No public profile got matched" Error

This error occurs when the `profiles` table doesn't exist or the user profile wasn't created properly.

**Solutions:**

#### Option A: Quick Fix (Use without database)
If you want to test the app immediately without setting up Supabase:

1. Update your `.env` file:
```env
VITE_USE_MOCK_DATA=true
```

2. The app will work with mock authentication (no real database needed)

#### Option B: Fix Supabase Setup
1. **Check if profiles table exists:**
   - Go to Supabase Dashboard → Table Editor
   - Look for `profiles` table
   - If missing, run the SQL migration

2. **Run the migration:**
   - Go to SQL Editor in Supabase
   - Copy content from `supabase/migrations/20250629135240_broken_frost.sql`
   - Execute the query

3. **Verify the trigger:**
   ```sql
   -- Check if trigger exists
   SELECT * FROM information_schema.triggers 
   WHERE trigger_name = 'on_auth_user_created';
   ```

4. **Manual profile creation (if needed):**
   ```sql
   -- Create profile for existing user
   INSERT INTO profiles (id, email, name, role)
   VALUES (
     'your-user-id-here',
     'user@example.com',
     'User Name',
     'user'
   );
   ```

### 2. Authentication Not Working

**Check these items:**

1. **Environment Variables:**
   ```bash
   # Verify your .env file has correct values
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Restart Development Server:**
   ```bash
   # After changing .env, restart the server
   npm run dev
   ```

3. **Check Supabase Project Status:**
   - Go to Supabase Dashboard
   - Ensure project is active and not paused

### 3. Profile Creation Fails

**Automatic Fallback:**
The updated code now creates a basic profile automatically if database operations fail:

```javascript
// Fallback profile creation
profile = {
  id: user.id,
  email: user.email,
  name: user.user_metadata?.name || user.email.split('@')[0],
  role: 'user',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};
```

### 4. Email Confirmation Issues

**For Development:**
1. Disable email confirmation:
   - Supabase Dashboard → Authentication → Settings
   - Turn OFF "Enable email confirmations"

**For Production:**
1. Enable email confirmation
2. Configure email templates
3. Set up custom SMTP (optional)

### 5. Session Not Persisting

**Check these settings:**

1. **Supabase Client Configuration:**
   ```javascript
   export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
     auth: {
       autoRefreshToken: true,
       persistSession: true,
       detectSessionInUrl: true
     }
   });
   ```

2. **Browser Storage:**
   - Check if localStorage is enabled
   - Clear browser cache if needed
   - Check for CORS issues

### 6. Development vs Production

**Development Setup:**
- Email confirmation: OFF
- Use localhost URLs
- Debug mode enabled

**Production Setup:**
- Email confirmation: ON
- Custom domain configured
- Email templates customized
- Rate limiting enabled

## Testing Authentication

### 1. Test Signup Flow
```bash
# 1. Go to /signup
# 2. Fill form with test data
# 3. Check browser console for errors
# 4. Verify user appears in Supabase Dashboard
```

### 2. Test Signin Flow
```bash
# 1. Go to /signin
# 2. Use credentials from signup
# 3. Check if redirected to home page
# 4. Verify user state in Redux DevTools
```

### 3. Test Profile Access
```bash
# 1. After signin, check browser console
# 2. Look for profile data in Redux state
# 3. Verify no "profile not found" errors
```

## Debug Commands

### Check User State
```javascript
// In browser console
console.log('Auth State:', store.getState().auth);
```

### Check Supabase Session
```javascript
// In browser console
supabase.auth.getSession().then(console.log);
```

### Check Local Storage
```javascript
// In browser console
console.log('Supabase Session:', localStorage.getItem('sb-your-project-auth-token'));
```

## Getting Help

If you're still having issues:

1. **Check Browser Console:** Look for error messages
2. **Check Supabase Logs:** Go to Supabase Dashboard → Logs
3. **Verify Network Requests:** Check Network tab in DevTools
4. **Test with Mock Data:** Set `VITE_USE_MOCK_DATA=true` to isolate issues

## Quick Recovery

If everything breaks, you can always:

1. **Reset to Mock Mode:**
   ```env
   VITE_USE_MOCK_DATA=true
   ```

2. **Clear All Data:**
   ```bash
   # Clear browser storage
   localStorage.clear();
   sessionStorage.clear();
   ```

3. **Restart Fresh:**
   ```bash
   npm run dev
   ```

The application is designed to work gracefully even when the database is not available, so you can always fall back to mock data for development.