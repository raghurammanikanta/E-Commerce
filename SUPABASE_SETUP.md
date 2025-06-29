# Supabase Authentication Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or sign in with GitHub
4. Click "New Project"
5. Choose your organization
6. Fill in project details:
   - Name: `ecommerce-app`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
7. Click "Create new project"

## Step 2: Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" in the sidebar
3. Click on "API" 
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

## Step 3: Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

## Step 4: Set Up Database Schema

1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the sidebar
3. Click "New query"
4. Copy and paste the SQL from `supabase/migrations/create_auth_tables.sql`
5. Click "Run" to execute the query

This will create:
- `profiles` table for user data
- Row Level Security policies
- Triggers for automatic profile creation
- Functions for handling user registration

## Step 5: Configure Authentication Settings

1. Go to "Authentication" in the sidebar
2. Click on "Settings"
3. Configure the following:

### Email Settings:
- **Enable email confirmations**: Turn OFF for development (turn ON for production)
- **Enable email change confirmations**: Turn ON
- **Enable secure email change**: Turn ON

### Password Settings:
- **Minimum password length**: 6 characters
- **Password strength**: Medium

### Advanced Settings:
- **JWT expiry**: 3600 seconds (1 hour)
- **Refresh token rotation**: Enable
- **Reuse interval**: 10 seconds

## Step 6: Test Authentication

1. Start your development server: `npm run dev`
2. Navigate to `/signup`
3. Create a test account
4. Check your Supabase dashboard under "Authentication" > "Users"
5. Verify the user appears in both `auth.users` and `profiles` tables

## Step 7: Email Templates (Optional)

For production, customize email templates:

1. Go to "Authentication" > "Email Templates"
2. Customize:
   - **Confirm signup**
   - **Magic Link**
   - **Change Email Address**
   - **Reset Password**

## Step 8: Security Considerations

### Row Level Security (RLS)
- ✅ Already enabled on `profiles` table
- ✅ Users can only access their own data
- ✅ Automatic profile creation on signup

### API Keys
- ✅ Use `anon` key for client-side (already configured)
- ⚠️ Never expose `service_role` key in frontend
- ✅ Environment variables are properly configured

## Step 9: Production Deployment

When deploying to production:

1. **Update Environment Variables**:
   - Set production Supabase URL and keys
   - Enable email confirmations
   - Configure custom domain (optional)

2. **Email Configuration**:
   - Set up custom SMTP (optional)
   - Configure email templates
   - Test email delivery

3. **Security**:
   - Review RLS policies
   - Set up proper CORS settings
   - Configure rate limiting

## Troubleshooting

### Common Issues:

**"Invalid API key" error:**
- Check your `.env` file has correct credentials
- Restart your development server after changing `.env`

**"User not found" error:**
- Ensure the `profiles` table exists
- Check if the trigger is working properly
- Verify RLS policies are correct

**Email not sending:**
- Check if email confirmations are disabled for development
- Verify email templates are configured
- Check Supabase logs for email delivery issues

**Authentication not persisting:**
- Check if `persistSession` is enabled in Supabase client
- Verify browser localStorage is working
- Check for CORS issues

## Features Included

✅ **User Registration**
- Email/password signup
- Automatic profile creation
- Email verification (configurable)

✅ **User Login**
- Email/password signin
- Session management
- Automatic token refresh

✅ **User Profile**
- Profile data storage
- Profile updates
- Avatar support (ready for file uploads)

✅ **Security**
- Row Level Security
- JWT tokens
- Secure password handling

✅ **React Integration**
- Redux state management
- Protected routes
- Real-time auth state updates

## Next Steps

1. **Add Password Reset**: Implement forgot password functionality
2. **Profile Management**: Add user profile editing
3. **Social Auth**: Add Google/GitHub login (optional)
4. **Email Verification**: Enable for production
5. **Admin Panel**: Add admin user management