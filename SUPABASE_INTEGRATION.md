# ArdhiX Supabase Integration

This document explains the Supabase integration setup for the ArdhiX Land Registry system.

## Overview

The system has been migrated from in-memory user storage to Supabase for:
- Authentication (sign up, sign in, password reset)
- User profiles and data storage
- Property management
- Document storage and management

## Setup Instructions

### 1. Environment Variables

The following environment variables are already configured in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://szubjdadhjjsyragoyzn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dWJqZGFkaGpqc3lyYWdveXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDcxNTksImV4cCI6MjA2OTgyMzE1OX0.GcgJOqAjYLp4gDc_vq4kquESW9Caypz2N_z7OGAQW4U
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dWJqZGFkaGpqc3lyYWdveXpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDI0NzE1OSwiZXhwIjoyMDY5ODIzMTU5fQ.dWq4uLeFwhnaRdAHMoY1KgTc38s-L7Us61tjyxcOTso
JWT_SECRET=ikOs/xhXmiYnE4I9O9D9Jy5wxNOUKkBUTLxV013JQV7mCBjlmy9kr5ZufMKWPSm2ZZt/gibpDZRzVQcE1Wzf4w==
```

### 2. Database Setup

Execute the SQL script in `supabase-setup.sql` in your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Execute the script

This will create all necessary tables and set up Row Level Security (RLS) policies.

### 3. Authentication Configuration

In your Supabase dashboard, go to Authentication > Settings and ensure:
- Email confirmations are configured (optional for development)
- Password reset is enabled
- The site URL is set correctly

## File Structure

### Core Files

- `lib/supabase.ts` - Supabase client configuration and database types
- `lib/supabase-auth.ts` - Authentication service using Supabase
- `supabase-setup.sql` - Database schema and setup script

### Updated API Routes

All authentication routes have been updated to use Supabase:

- `app/api/auth/login/route.ts` - Uses Supabase Auth
- `app/api/auth/register/route.ts` - Creates user and profile
- `app/api/auth/logout/route.ts` - Signs out from Supabase
- `app/api/auth/me/route.ts` - Validates session with Supabase
- `app/api/auth/forgot-password/route.ts` - Uses Supabase password reset
- `app/api/auth/reset-password/route.ts` - Updates password via Supabase

## Database Schema

### Tables Created

1. **profiles** - User profile information (extends auth.users)
2. **properties** - Property records
3. **property_documents** - Document attachments for properties
4. **property_transfers** - Property ownership transfers
5. **property_history** - Audit log for property changes

### Row Level Security

All tables have RLS enabled with policies ensuring:
- Users can only access their own data
- Admins can access all data where appropriate
- Proper access controls for shared data (transfers, etc.)

## Testing

Visit `/test` to verify the Supabase integration:
- Checks Supabase connection
- Verifies authentication setup
- Shows configuration status

## Migration Notes

### What Changed

1. **Authentication**: Moved from JWT with in-memory storage to Supabase Auth
2. **User Storage**: User profiles now stored in Supabase `profiles` table
3. **Session Management**: Uses Supabase session tokens instead of custom JWT
4. **Password Reset**: Now uses Supabase email-based password reset

### Backward Compatibility

The API endpoints remain the same, ensuring frontend components continue to work without modification.

### Security Improvements

- Row Level Security enforces data access rules at the database level
- Supabase handles secure password hashing and session management
- Proper separation of anon and service role permissions

## Next Steps

1. **Execute the SQL setup script** in your Supabase project
2. **Test the authentication flow** by visiting `/test`
3. **Create test user accounts** to verify functionality
4. **Configure email templates** in Supabase for password reset (optional)

## Troubleshooting

### Common Issues

1. **Connection errors**: Verify environment variables are set correctly
2. **Permission errors**: Ensure RLS policies are created properly
3. **Build errors**: The system may have unrelated build issues that don't affect Supabase integration

### Support

Check the Supabase documentation for additional configuration options:
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database