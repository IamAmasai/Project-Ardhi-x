# ArdhiX Testing Guide

This guide provides comprehensive testing procedures for the ArdhiX land registry system to ensure quality, accessibility, and functionality.

## Test Environment Setup

### Prerequisites
- Node.js 18+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Screen reader software (for accessibility testing)
- Browser developer tools
- Various devices/screen sizes for responsive testing

### Setup Steps
1. **Clone and Install**
   ```bash
   git clone https://github.com/IamAmasai/Project-Ardhi-x.git
   cd Project-Ardhi-x
   npm install --legacy-peer-deps
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Update .env.local with test environment variables
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access at: http://localhost:3000

4. **Test Credentials**
   - Email: `admin@ardhix.com`
   - Password: `admin123`

## Automated Testing

### Build Verification
```bash
# Verify the application builds successfully
npm run build

# Check for linting issues
npm run lint

# Type checking (if configured)
npm run type-check
```

### Continuous Integration Checks
- Build completion without errors
- Linting passes with no critical issues
- Type checking passes
- No security vulnerabilities in dependencies

## Manual Testing Procedures

### 1. Authentication Testing

#### Login Page Testing (`/`)
**Visual Verification:**
- [ ] Page loads within 3 seconds
- [ ] Logo and branding are visible
- [ ] Form fields are properly labeled
- [ ] Buttons have clear call-to-action text
- [ ] Error states are visually distinct
- [ ] Loading states are visible

**Functionality Testing:**
```
Test Case: Successful Login
1. Navigate to http://localhost:3000
2. Enter: admin@ardhix.com
3. Enter: admin123
4. Click "Sign In"
Expected: Redirect to dashboard with welcome message

Test Case: Invalid Credentials
1. Enter: invalid@example.com
2. Enter: wrongpassword
3. Click "Sign In"
Expected: Error message displayed, no redirect

Test Case: Empty Fields
1. Leave email field empty
2. Click "Sign In"
Expected: Validation error for required field

Test Case: Invalid Email Format
1. Enter: notanemail
2. Enter: password123
3. Click "Sign In"
Expected: Email format validation error
```

**Accessibility Testing:**
- [ ] Tab through all elements in logical order
- [ ] Screen reader announces all labels and errors
- [ ] Focus indicators are visible
- [ ] Error messages have `aria-live` or `role="alert"`

#### Sign-Up Page Testing (`/auth/sign-up`)
**Functionality Testing:**
```
Test Case: Successful Registration
1. Navigate to /auth/sign-up
2. Fill all required fields with valid data
3. Check terms agreement
4. Click "Create Account"
Expected: Account created, redirect to dashboard

Test Case: Password Mismatch
1. Enter password: "password123"
2. Enter confirm: "differentpassword"
3. Submit form
Expected: Password mismatch error

Test Case: Missing Required Fields
1. Leave name field empty
2. Submit form
Expected: Required field validation error
```

#### Forgot Password Testing (`/auth/forgot-password`)
**Functionality Testing:**
```
Test Case: Valid Email Reset
1. Navigate to /auth/forgot-password
2. Enter: admin@ardhix.com
3. Click "Send Reset Link"
Expected: Success message and confirmation screen

Test Case: Invalid Email
1. Enter: nonexistent@example.com
2. Click "Send Reset Link"
Expected: Appropriate error handling
```

### 2. Route Protection Testing

#### Unauthenticated Access
**Test all protected routes without login:**
```bash
# Test these URLs in incognito/private browsing
http://localhost:3000/dashboard
http://localhost:3000/properties
http://localhost:3000/documents
http://localhost:3000/documents/upload
http://localhost:3000/history
http://localhost:3000/profile
http://localhost:3000/settings
http://localhost:3000/map
```
**Expected:** All should redirect to login page (`/`)

#### Authenticated Access
**After logging in, test all routes are accessible:**
```
Test Case: Dashboard Access
1. Login with valid credentials
2. Navigate to /dashboard
Expected: Dashboard loads with user data

Test Case: Navigation Persistence
1. Navigate between multiple pages
2. Refresh browser
3. Use browser back/forward buttons
Expected: Authentication persists, navigation works smoothly
```

### 3. User Interface Testing

#### Responsive Design Testing
**Screen Sizes to Test:**
- Mobile: 375x667 (iPhone SE)
- Mobile Large: 414x896 (iPhone 11)
- Tablet: 768x1024 (iPad)
- Desktop: 1366x768 (Laptop)
- Desktop Large: 1920x1080 (Desktop)

**For each screen size:**
- [ ] All content is visible without horizontal scrolling
- [ ] Navigation is accessible and functional
- [ ] Forms are usable and properly sized
- [ ] Images and media scale appropriately
- [ ] Text remains readable

#### Dark/Light Mode Testing
```
Test Case: Theme Toggle
1. Click theme toggle button
2. Verify all components adapt to new theme
3. Refresh page
4. Verify theme persistence
Expected: Smooth theme transition, persistence across sessions
```

### 4. Document Management Testing

#### Documents List Page (`/documents`)
**Functionality Testing:**
```
Test Case: Documents Display
1. Navigate to /documents
2. Verify document list displays
3. Check document status indicators
4. Test search functionality
Expected: Documents load, search filters work

Test Case: Upload Navigation
1. Click "Upload Document" button
2. Verify navigation to upload page
Expected: Successful navigation to /documents/upload
```

#### Document Upload Page (`/documents/upload`)
**File Upload Testing:**
```
Test Case: Valid File Upload
1. Select "Title Deed" from dropdown
2. Add optional description
3. Select valid PDF file (<10MB)
4. Click "Upload Document"
Expected: File uploads successfully, success feedback

Test Case: Invalid File Type
1. Try to upload .txt file
2. Verify rejection with error message
Expected: File rejected, clear error message

Test Case: File Too Large
1. Try to upload file >10MB
2. Verify rejection
Expected: Size validation error

Test Case: Drag and Drop
1. Drag valid file to upload area
2. Verify file is accepted
Expected: File accepted via drag and drop
```

**Accessibility Testing:**
- [ ] Upload area is keyboard accessible
- [ ] File selection works with keyboard
- [ ] Error messages are announced to screen readers
- [ ] Progress indicators are accessible

### 5. Performance Testing

#### Page Load Testing
**Metrics to Measure:**
- First Contentful Paint (FCP) < 2 seconds
- Largest Contentful Paint (LCP) < 3 seconds
- Time to Interactive (TTI) < 4 seconds
- Cumulative Layout Shift (CLS) < 0.1

**Testing Procedure:**
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run performance audit
4. Record metrics for each major page

#### Network Conditions Testing
**Test under different network conditions:**
- Fast 3G
- Slow 3G
- Offline (if applicable)

```
Test Case: Slow Network Performance
1. Throttle network to Slow 3G in DevTools
2. Navigate through major pages
3. Verify loading indicators appear
4. Check for timeout errors
Expected: Graceful degradation, clear loading feedback
```

### 6. Accessibility (a11y) Testing

#### Automated Accessibility Testing
**Tools to Use:**
- Chrome DevTools Accessibility panel
- axe DevTools browser extension
- WAVE Web Accessibility Evaluator

**Testing Procedure:**
1. Install axe DevTools extension
2. Navigate to each page
3. Run accessibility scan
4. Address all critical and serious issues

#### Manual Accessibility Testing

**Keyboard Navigation:**
```
Test Case: Keyboard-Only Navigation
1. Use only Tab, Shift+Tab, Enter, Space, Arrow keys
2. Navigate through entire application
3. Verify all interactive elements are reachable
4. Ensure logical tab order
Expected: Complete functionality via keyboard only
```

**Screen Reader Testing:**
```
Test Case: Screen Reader Compatibility
1. Enable screen reader (NVDA, JAWS, or VoiceOver)
2. Navigate through forms and content
3. Verify all content is announced
4. Check for proper heading structure
Expected: All content accessible via screen reader
```

#### Color Contrast Testing
**Tools:**
- Chrome DevTools Contrast checker
- WebAIM Contrast Checker
- Colour Contrast Analyser

**Requirements:**
- Normal text: 4.5:1 minimum ratio
- Large text: 3:1 minimum ratio
- Interactive elements: 3:1 minimum ratio

### 7. Error Handling Testing

#### Network Error Testing
```
Test Case: API Failure Simulation
1. Block network requests in DevTools
2. Try to submit forms
3. Verify error handling
Expected: User-friendly error messages, retry options

Test Case: Timeout Handling
1. Slow down network significantly
2. Submit long-running requests
3. Verify timeout handling
Expected: Timeout messages, graceful failure
```

#### Input Validation Testing
```
Test Case: XSS Prevention
1. Enter script tags in form fields
2. Submit forms
3. Verify scripts don't execute
Expected: Input sanitized, no script execution

Test Case: File Upload Security
1. Try to upload executable files
2. Try to upload files with malicious names
3. Verify proper validation
Expected: Malicious files rejected
```

### 8. Browser Compatibility Testing

#### Desktop Browser Testing
Test on latest 2 versions of:
- [ ] Google Chrome
- [ ] Mozilla Firefox
- [ ] Apple Safari
- [ ] Microsoft Edge

#### Mobile Browser Testing
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile
- [ ] Samsung Internet

**For each browser:**
- [ ] Authentication flow works
- [ ] All pages render correctly
- [ ] JavaScript functionality works
- [ ] File uploads function
- [ ] No console errors

### 9. Security Testing

#### Authentication Security
```
Test Case: Session Management
1. Login to application
2. Close browser without logout
3. Reopen browser
4. Check session state
Expected: Appropriate session handling

Test Case: Logout Security
1. Login to application
2. Logout
3. Try to access protected routes directly
4. Use browser back button
Expected: Cannot access protected content after logout
```

#### Input Security Testing
```
Test Case: SQL Injection Prevention
1. Enter SQL injection strings in forms
2. Submit forms
3. Verify no database errors
Expected: Input properly sanitized

Test Case: File Upload Security
1. Upload files with various extensions
2. Try to upload oversized files
3. Verify security measures
Expected: Only allowed file types accepted
```

## Test Reporting

### Test Results Documentation
For each test session, document:
- **Test Date:** When testing was performed
- **Test Environment:** Browser, OS, screen size
- **Test Results:** Pass/Fail for each test case
- **Issues Found:** Detailed description of any problems
- **Screenshots:** Visual evidence of issues
- **Priority Level:** Critical, High, Medium, Low

### Issue Reporting Template
```markdown
## Issue Report

**Title:** Brief description of the issue

**Priority:** Critical/High/Medium/Low

**Environment:**
- Browser: Chrome 91.0.4472.124
- OS: Windows 10
- Screen Size: 1366x768

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Result:**
What should happen

**Actual Result:**
What actually happened

**Screenshots:**
[Attach relevant screenshots]

**Additional Notes:**
Any other relevant information
```

### Regression Testing

#### Before Each Release
- [ ] Run complete QA checklist
- [ ] Test all critical user journeys
- [ ] Verify no functionality has broken
- [ ] Check performance hasn't degraded
- [ ] Validate accessibility compliance

#### After Bug Fixes
- [ ] Re-test the specific issue
- [ ] Test related functionality
- [ ] Run smoke tests on core features

## Continuous Testing Strategy

### Pre-commit Testing
- Lint checks pass
- Build completes successfully
- Unit tests pass (if implemented)

### Pre-deployment Testing
- Complete QA checklist review
- Performance benchmarks met
- Security scan passes
- Accessibility audit clean

### Post-deployment Testing
- Smoke test on production
- Monitor error rates
- Check performance metrics
- Validate key user journeys

## Testing Tools and Resources

### Browser Extensions
- **axe DevTools**: Accessibility testing
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Performance and accessibility auditing
- **React Developer Tools**: Component debugging

### Online Tools
- **WebAIM Contrast Checker**: Color contrast validation
- **GTmetrix**: Performance analysis
- **PageSpeed Insights**: Google's performance tool
- **BrowserStack**: Cross-browser testing (if available)

### Testing Checklists
- **WCAG 2.1 Guidelines**: Accessibility compliance
- **Progressive Web App Checklist**: PWA best practices
- **Security Testing Guide**: Security validation steps

---

This testing guide should be updated regularly as new features are added and testing procedures evolve. Always prioritize critical user journeys and accessibility compliance in your testing efforts.