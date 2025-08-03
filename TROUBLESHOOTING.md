# ArdhiX Troubleshooting Guide

This guide helps resolve common issues encountered when developing, testing, or deploying the ArdhiX land registry system.

## Quick Diagnosis

### Is the issue...?
- **🚫 Not starting up?** → [Startup Issues](#startup-issues)
- **🔐 Authentication related?** → [Authentication Issues](#authentication-issues)
- **🛤️ Navigation/routing?** → [Navigation Issues](#navigation-issues)
- **📁 File upload problems?** → [File Upload Issues](#file-upload-issues)
- **📱 Mobile/responsive?** → [Mobile Issues](#mobile-responsive-issues)
- **🎨 UI/styling problems?** → [UI/Styling Issues](#uistyling-issues)
- **⚡ Performance issues?** → [Performance Issues](#performance-issues)
- **🌐 Deployment problems?** → [Deployment Issues](#deployment-issues)

## Startup Issues

### Application Won't Start

**Error: `next: not found`**
```bash
# Solution: Install dependencies
npm install --legacy-peer-deps
# or
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Error: `ERESOLVE dependency conflict`**
```bash
# Solution: Use legacy peer deps flag
npm install --legacy-peer-deps
# or use npm with --force (not recommended)
npm install --force
```

**Error: `Missing environment variables`**
```bash
# Solution: Create environment file
cp .env.example .env.local

# Edit .env.local with your values:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Error: `Port 3000 already in use`**
```bash
# Solution 1: Kill process on port 3000
npx kill-port 3000

# Solution 2: Use different port
npm run dev -- -p 3001
```

### Build Failures

**Error: `Build failed to compile`**
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

**Error: `Module not found`**
```bash
# Verify all imports exist
# Check for case-sensitive file names
# Ensure correct relative paths

# Common fix: Restart development server
npm run dev
```

## Authentication Issues

### Login Not Working

**Issue: Valid credentials rejected**
```bash
# Check browser console for errors
# Verify environment variables are loaded
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

# Test with demo credentials:
# Email: admin@ardhix.com
# Password: admin123
```

**Issue: Login succeeds but no redirect**
```javascript
// Check AuthProvider component
// Verify localStorage is available
// Check browser console for errors
// Ensure no conflicting redirects
```

**Issue: Session not persisting**
```javascript
// Check localStorage in browser DevTools
// Verify session storage implementation
// Check for localStorage restrictions (private browsing)
```

### Route Protection Problems

**Issue: Protected routes accessible without login**
```typescript
// Check auth-provider.tsx
// Verify publicPaths array
// Ensure route protection logic:
const publicPaths = ["/", "/auth/sign-up", "/auth/forgot-password", "/auth/reset-password"]
const isPublicPath = publicPaths.some((path) => {
  if (path === "/") {
    return pathname === "/"
  }
  return pathname === path || pathname.startsWith(path)
})
```

**Issue: Infinite redirect loops**
```typescript
// Check redirectingRef usage
// Verify no conflicting redirects
// Clear browser cache and localStorage
localStorage.clear()
```

### Logout Issues

**Issue: Logout doesn't clear session**
```typescript
// Verify logout function in AuthProvider
const logout = async () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authUser')
    }
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    setUser(null)
    router.push("/")
  }
}
```

## Navigation Issues

### Page Not Found Errors

**Issue: 404 on valid routes**
```bash
# Check file structure in app/ directory
# Verify page.tsx files exist
# Check for typos in route names
# Ensure proper Next.js App Router structure
```

**Issue: Dynamic routes not working**
```bash
# Verify [id] folder structure
# Check dynamic route implementation
# Ensure proper page.tsx in dynamic folders
```

### Browser Navigation Problems

**Issue: Back button doesn't work**
```typescript
// Check for window.location.href usage (replace with router.push)
// Verify proper Next.js navigation
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/dashboard') // Good
// window.location.href = '/dashboard' // Avoid
```

**Issue: Navigation state lost**
```typescript
// Check AuthProvider state management
// Verify proper context implementation
// Ensure no state conflicts
```

## File Upload Issues

### Upload Failures

**Issue: Files not uploading**
```javascript
// Check file size (max 10MB)
// Verify file type (PDF, JPG, PNG only)
// Check browser console for errors
// Verify upload component implementation
```

**Issue: Large files timing out**
```javascript
// Reduce file size
// Check network connection
// Implement progress indicators
// Add proper error handling
```

### File Validation Problems

**Issue: Wrong file types accepted**
```javascript
// Check validation logic in upload component
const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
// Verify file type checking implementation
```

**Issue: File size validation not working**
```javascript
// Check file size validation
const maxSize = 10 * 1024 * 1024 // 10MB
if (file.size > maxSize) {
  // Handle error
}
```

## Mobile/Responsive Issues

### Layout Problems on Mobile

**Issue: Horizontal scrolling on mobile**
```css
/* Check for fixed widths */
/* Ensure proper responsive classes */
/* Verify viewport meta tag */
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Issue: Touch targets too small**
```css
/* Ensure minimum 44px touch targets */
.button {
  @apply min-h-[44px] min-w-[44px];
}
```

**Issue: Text too small on mobile**
```css
/* Use responsive text sizes */
.text {
  @apply text-sm md:text-base lg:text-lg;
}
```

### Mobile-Specific Functionality

**Issue: File upload not working on mobile**
```javascript
// Check mobile browser compatibility
// Verify file input implementation
// Test with different mobile browsers
```

**Issue: Navigation menu not working on mobile**
```javascript
// Check mobile menu implementation
// Verify touch event handling
// Test responsive breakpoints
```

## UI/Styling Issues

### Tailwind CSS Problems

**Issue: Styles not applying**
```bash
# Check Tailwind is properly configured
# Verify tailwind.config.ts
# Check for purging issues
# Restart development server
npm run dev
```

**Issue: Dark mode not working**
```typescript
// Check theme provider implementation
// Verify theme toggle functionality
// Check localStorage theme persistence
```

### Component Styling Issues

**Issue: Components not displaying correctly**
```bash
# Check shadcn/ui component imports
# Verify component props
# Check for CSS conflicts
# Inspect with browser DevTools
```

**Issue: Responsive design broken**
```css
/* Check responsive classes */
/* Verify breakpoint usage */
/* Test with browser responsive mode */
```

## Performance Issues

### Slow Loading

**Issue: Initial page load too slow**
```bash
# Run Lighthouse audit
# Check bundle size
npm run build

# Optimize images
# Reduce JavaScript bundle size
# Implement code splitting
```

**Issue: Navigation between pages slow**
```typescript
// Check for unnecessary re-renders
// Verify proper component memoization
// Check for memory leaks
```

### Memory Issues

**Issue: Application consuming too much memory**
```javascript
// Check for memory leaks
// Verify proper cleanup in useEffect
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  }
}, [])
```

**Issue: Browser crashes or freezes**
```javascript
// Check for infinite loops
// Verify large data handling
// Implement pagination for large datasets
```

## Deployment Issues

### Vercel Deployment Problems

**Issue: Build fails on Vercel**
```bash
# Check build locally first
npm run build

# Verify environment variables in Vercel dashboard
# Check for Node.js version compatibility
# Review build logs for specific errors
```

**Issue: Environment variables not working**
```bash
# Verify variables are set in Vercel dashboard
# Check variable names (case-sensitive)
# Ensure NEXT_PUBLIC_ prefix for client-side variables
```

### Other Platform Deployments

**Issue: Static site generation errors**
```typescript
// Check for client-side only code in SSR
// Verify proper dynamic imports
// Check for window/document usage in SSR
```

**Issue: API routes not working**
```bash
# Verify API route structure
# Check for proper HTTP methods
# Verify serverless function configuration
```

## Browser-Specific Issues

### Chrome Issues

**Issue: CORS errors in Chrome**
```bash
# Use proper development setup
# Check API endpoint configuration
# Verify headers in API responses
```

### Safari Issues

**Issue: Features not working in Safari**
```javascript
// Check for Safari-specific polyfills needed
// Verify ES6+ feature compatibility
// Test with latest Safari version
```

### Firefox Issues

**Issue: Styling differences in Firefox**
```css
/* Check for vendor prefixes */
/* Verify flexbox compatibility */
/* Test with latest Firefox version */
```

## Database Issues (Supabase)

### Connection Problems

**Issue: Cannot connect to Supabase**
```bash
# Verify Supabase URL and keys
# Check project status in Supabase dashboard
# Verify network connectivity
```

**Issue: RLS policies blocking requests**
```sql
-- Check Row Level Security policies
-- Verify user permissions
-- Test with policy disabled temporarily
```

### Data Issues

**Issue: Data not saving**
```javascript
// Check browser console for errors
// Verify table schema matches data
// Check for required field violations
```

**Issue: Data not loading**
```javascript
// Check query syntax
// Verify table permissions
// Check for null/undefined handling
```

## Development Environment Issues

### Node.js Version Problems

**Issue: Compatibility errors**
```bash
# Check Node.js version
node --version

# Use recommended version (18+)
# Consider using nvm for version management
nvm use 18
```

### IDE/Editor Issues

**Issue: TypeScript errors in IDE**
```bash
# Restart TypeScript server
# Check tsconfig.json configuration
# Verify proper file imports
```

**Issue: Intellisense not working**
```bash
# Restart VS Code
# Check extension installation
# Verify workspace settings
```

## Debugging Strategies

### Browser DevTools

**Console Debugging:**
```javascript
// Add strategic console.logs
console.log('User state:', user)
console.log('Route:', pathname)

// Use debugger statements
debugger;

// Check network tab for API calls
// Monitor performance tab for bottlenecks
```

**React DevTools:**
```javascript
// Install React Developer Tools extension
// Inspect component state and props
// Monitor re-renders and performance
```

### Application Debugging

**Check Application State:**
```javascript
// Verify localStorage in browser
localStorage.getItem('authUser')

// Check session state
// Monitor network requests
```

**Error Boundary Implementation:**
```typescript
// Add error boundaries to catch React errors
// Implement proper error logging
// Provide user-friendly error messages
```

## Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Review error messages carefully**
3. **Check browser console for errors**
4. **Test in incognito/private mode**
5. **Try with different browsers**
6. **Clear cache and localStorage**

### When Reporting Issues

Include this information:
- **Exact error message**
- **Steps to reproduce**
- **Browser and version**
- **Operating system**
- **Screenshots or screen recordings**
- **Console errors**
- **Network tab information**

### Resources

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check all `.md` files in repository
- **Community**: Use GitHub Discussions for questions
- **Stack Overflow**: Search for similar issues

## Prevention Tips

### Best Practices

1. **Regular Testing**: Use the QA checklist regularly
2. **Browser Compatibility**: Test on multiple browsers
3. **Error Handling**: Implement comprehensive error handling
4. **Performance Monitoring**: Regular performance audits
5. **Security Updates**: Keep dependencies updated
6. **Backup Plans**: Implement fallbacks for critical features

### Development Workflow

1. **Test locally** before pushing code
2. **Use linting** to catch errors early
3. **Implement proper logging** for debugging
4. **Document changes** that might affect others
5. **Follow coding standards** consistently

---

This troubleshooting guide should be updated as new issues are discovered and resolved. Always test fixes thoroughly before deploying to production.