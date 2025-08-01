# ArdhiX Land Registry System - Project Documentation

## Project Overview

**ArdhiX** is a modern, secure land registry system built with Next.js 15, React 19, and TypeScript. The system provides comprehensive property management, document handling, and interactive mapping capabilities for land registration and verification in Kenya.

### Key Features
- 🏠 Property registration and management
- 📋 Document upload and verification
- 🗺️ Interactive mapping with geolocation
- 👥 User authentication and authorization
- 📊 Property analytics and statistics
- 🔄 Property transfer workflow
- 📱 Responsive design for all devices

---

## Technology Stack

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless component primitives
- **Lucide React** - Icon library

### Backend & Data
- **Next.js API Routes** - Server-side API endpoints
- **In-Memory Database** - Current implementation (dev)
- **localStorage** - Client-side data persistence
- **Mock Services** - Development data layer

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **PNPM** - Package manager
- **Turbo** - Build system optimization

---

## Project Structure

```
Project-Ardhi-x/
├── 📁 app/                          # Next.js App Router pages
│   ├── 📁 api/                      # API routes (future)
│   ├── 📁 auth/                     # Authentication pages
│   │   ├── 📁 forgot-password/      # Password reset
│   │   ├── 📁 reset-password/       # Password reset form
│   │   └── 📁 sign-up/              # User registration
│   ├── 📁 dashboard/                # Main dashboard
│   ├── 📁 documents/                # Document management
│   │   └── 📁 upload/               # Document upload
│   ├── 📁 history/                  # Activity history
│   ├── 📁 map/                      # Interactive map view
│   ├── 📁 privacy/                  # Privacy policy
│   ├── 📁 profile/                  # User profile
│   ├── 📁 properties/               # Property management
│   │   ├── 📁 [id]/                 # Dynamic property pages
│   │   │   └── 📁 transfer/         # Property transfer
│   │   └── 📁 add/                  # Add new property
│   ├── 📁 settings/                 # User settings
│   ├── 📁 simple/                   # Simple view
│   ├── 📁 terms/                    # Terms of service
│   ├── 📁 test/                     # Test pages
│   ├── 📁 test-redirect/            # Redirect testing
│   ├── 📁 test-routes/              # Route testing
│   ├── 📄 error.tsx                 # Error boundary
│   ├── 📄 globals.css               # Global styles
│   ├── 📄 layout.tsx                # Root layout
│   ├── 📄 not-found.tsx             # 404 page
│   └── 📄 page.tsx                  # Login page (root)
│
├── 📁 components/                   # Reusable UI components
│   ├── 📁 ui/                       # Shadcn/ui components
│   │   ├── 📄 accordion.tsx         # Collapsible content
│   │   ├── 📄 alert-dialog.tsx      # Modal dialogs
│   │   ├── 📄 alert.tsx             # Alert messages
│   │   ├── 📄 avatar.tsx            # User avatars
│   │   ├── 📄 badge.tsx             # Status badges
│   │   ├── 📄 button.tsx            # Interactive buttons
│   │   ├── 📄 card.tsx              # Content containers
│   │   ├── 📄 checkbox.tsx          # Form checkboxes
│   │   ├── 📄 dialog.tsx            # Modal overlays
│   │   ├── 📄 dropdown-menu.tsx     # Context menus
│   │   ├── 📄 form.tsx              # Form components
│   │   ├── 📄 input.tsx             # Text inputs
│   │   ├── 📄 label.tsx             # Form labels
│   │   ├── 📄 select.tsx            # Dropdown selects
│   │   ├── 📄 sidebar.tsx           # Navigation sidebar
│   │   ├── 📄 switch.tsx            # Toggle switches
│   │   ├── 📄 table.tsx             # Data tables
│   │   ├── 📄 tabs.tsx              # Tab navigation
│   │   ├── 📄 textarea.tsx          # Multi-line inputs
│   │   ├── 📄 toast.tsx             # Notifications
│   │   └── 📄 tooltip.tsx           # Hover tooltips
│   ├── 📄 auth-provider.tsx         # Authentication context
│   ├── 📄 dashboard-layout.tsx      # Dashboard wrapper
│   ├── 📄 document-upload.tsx       # File upload component
│   ├── 📄 loading-spinner.tsx       # Loading indicator
│   ├── 📄 map-component.tsx         # Interactive map
│   ├── 📄 mode-toggle.tsx           # Dark/light theme
│   ├── 📄 property-image.tsx        # Property photos
│   ├── 📄 property-location-map.tsx # Location picker
│   ├── 📄 sidebar.tsx               # Main navigation
│   ├── 📄 theme-provider.tsx        # Theme context
│   └── 📄 user-nav.tsx              # User menu
│
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 use-mobile.tsx            # Mobile detection
│   └── 📄 use-toast.ts              # Toast notifications
│
├── 📁 lib/                          # Utility libraries
│   ├── 📄 database.ts               # Data layer abstraction
│   ├── 📄 google-maps.ts            # Maps integration
│   ├── 📄 kenya-locations.ts        # Kenya counties/wards
│   ├── 📄 property-service.ts       # Property operations
│   ├── 📄 utils.ts                  # Helper functions
│   └── 📄 validations.ts            # Form validation schemas
│
├── 📁 public/                       # Static assets
│   ├── 📄 placeholder-logo.png      # Logo images
│   ├── 📄 placeholder-logo.svg      # Vector logo
│   ├── 📄 placeholder-user.jpg      # Default avatar
│   ├── 📄 placeholder.jpg           # Property placeholder
│   └── 📄 placeholder.svg           # Vector placeholder
│
├── 📁 styles/                       # Additional styles
│   └── 📄 globals.css               # Global CSS
│
├── 📁 types/                        # TypeScript definitions
│   └── 📄 auth.ts                   # Authentication types
│
├── 📄 components.json               # Shadcn/ui config
├── 📄 middleware.ts                 # Next.js middleware
├── 📄 next.config.mjs               # Next.js configuration
├── 📄 package.json                  # Dependencies
├── 📄 postcss.config.mjs            # PostCSS config
├── 📄 tailwind.config.ts            # Tailwind config
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 test-duplicates.js            # Location data testing
│
└── 📄 Documentation Files
    ├── 📄 AUTHENTICATION_README.md  # Auth system docs
    ├── 📄 DATABASE_SETUP.md         # Database setup guide
    ├── 📄 PROJECT_DOCUMENTATION.md  # This file
    ├── 📄 PROPERTY_FORM_IMPLEMENTATION.md # Form docs
    ├── 📄 README.md                 # Project overview
    └── 📄 SETUP_GUIDE.md            # Setup instructions
```

---

## Core Modules

### 1. Authentication System (`components/auth-provider.tsx`)

**Features:**
- Mock authentication for development
- User registration and login
- Session management with localStorage
- Route protection and redirects
- Password reset workflow

**Key Functions:**
- `login()` - User authentication
- `register()` - New user registration
- `logout()` - Session termination
- `resetPassword()` - Password recovery
- Route protection via useEffect

### 2. Property Management

**Components:**
- `app/properties/page.tsx` - Property listing
- `app/properties/add/page.tsx` - Add new property
- `app/properties/[id]/page.tsx` - Property details
- `app/properties/[id]/transfer/page.tsx` - Ownership transfer

**Features:**
- Property CRUD operations
- Image gallery management
- Location-based search
- Status tracking (verified, pending, etc.)
- Transfer workflow

### 3. Document Management

**Components:**
- `app/documents/page.tsx` - Document listing
- `app/documents/upload/page.tsx` - File upload
- `components/document-upload.tsx` - Upload component

**Features:**
- Multi-file upload support
- Document categorization
- Status tracking
- Download functionality

### 4. Interactive Mapping

**Components:**
- `app/map/page.tsx` - Map view
- `components/map-component.tsx` - Interactive map
- `components/property-location-map.tsx` - Location picker

**Features:**
- Property markers
- Geolocation integration
- Property clustering
- Location-based filtering

### 5. User Interface System

**Design System:**
- Shadcn/ui component library
- Consistent design tokens
- Dark/light theme support
- Responsive layouts
- Accessible components

---

## Data Models

### User Interface
```typescript
interface User {
  id: string
  email: string
  name: string
  phone: string
  nationalId: string
  role: "admin" | "user"
  dateJoined: string
  avatar?: string
  bio?: string
  location?: string
}
```

### Property Interface
```typescript
interface Property {
  id: string
  userId: string
  title: string
  description: string
  location: {
    county: string
    ward: string
    coordinates?: { lat: number; lng: number }
  }
  size: string
  type: string
  status: "verified" | "pending" | "rejected"
  value: number
  images: string[]
  documents: string[]
  createdAt: string
  updatedAt: string
}
```

### UserStats Interface
```typescript
interface UserStats {
  totalProperties: number
  verifiedProperties: number
  pendingProperties: number
  pendingDocuments: number
  totalValue: number
  currency: string
}
```

---

## Key Features Implementation

### 1. Authentication Flow
1. User visits root page (`/`)
2. Login form submission
3. AuthProvider validates credentials
4. Session stored in localStorage
5. Redirect to dashboard
6. Route protection on subsequent visits

### 2. Property Registration
1. Navigate to `/properties/add`
2. Multi-step form with validation
3. Location selection (county/ward)
4. Document upload
5. Property creation
6. Redirect to property details

### 3. Document Management
1. Access via `/documents`
2. Upload files with categorization
3. Status tracking (pending, approved, rejected)
4. Download and sharing capabilities

### 4. Interactive Mapping
1. Map view at `/map`
2. Property markers with clustering
3. Filter by status, location, type
4. Click markers for property details

---

## Current Status

### ✅ Completed Features
- User authentication system
- Property CRUD operations
- Document upload/management
- Interactive mapping
- Responsive UI design
- Route protection
- Form validation
- Theme switching
- Kenya location data (counties/wards)

### 🚧 In Development
- Real database integration
- File storage system
- Email notifications
- Property verification workflow
- Advanced search functionality

### 📋 Future Enhancements
- Payment integration
- Government API integration
- Mobile app development
- Advanced analytics
- Blockchain integration for security

---

## Development Setup

### Prerequisites
- Node.js 18+ 
- PNPM package manager
- Modern web browser

### Installation
```bash
# Clone repository
git clone <repository-url>
cd Project-Ardhi-x

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Environment Configuration
Currently using mock data and localStorage for development. See `DATABASE_SETUP.md` for production database setup.

---

## File Dependencies

### Core Dependencies
- `next@15.2.4` - React framework
- `react@19.1.0` - UI library
- `typescript@5.7.3` - Type safety
- `tailwindcss@3.4.16` - Styling
- `@radix-ui/*` - UI primitives

### Development Dependencies
- `eslint` - Code linting
- `@types/*` - TypeScript definitions
- `postcss` - CSS processing

---

## API Structure (Future)

### Authentication Endpoints
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`

### Property Endpoints
- `GET /api/properties`
- `POST /api/properties`
- `GET /api/properties/[id]`
- `PUT /api/properties/[id]`
- `DELETE /api/properties/[id]`

### Document Endpoints
- `GET /api/documents`
- `POST /api/documents/upload`
- `GET /api/documents/[id]`
- `DELETE /api/documents/[id]`

---

## Testing Strategy

### Current Testing
- Manual testing via test pages
- Route testing page (`/test-routes`)
- Kenya location data validation (`test-duplicates.js`)

### Future Testing Plans
- Unit tests with Jest
- Integration tests with Cypress
- API testing with Supertest
- Performance testing with Lighthouse

---

## Security Considerations

### Current Implementation
- Client-side form validation
- TypeScript type safety
- Route protection via AuthProvider
- Input sanitization

### Production Requirements
- JWT token authentication
- HTTPS enforcement
- Input validation and sanitization
- Rate limiting
- CSRF protection
- Data encryption

---

## Deployment

### Development
- Local development server
- Hot reloading with Next.js
- Mock data and localStorage

### Production (Planned)
- Vercel deployment
- PostgreSQL database
- Supabase for auth and storage
- CloudFront CDN
- Environment-based configuration

---

## Contributing

### Code Standards
- TypeScript for all new code
- ESLint configuration compliance
- Consistent naming conventions
- Component documentation
- Type definitions for all interfaces

### Git Workflow
- Feature branches for new development
- Pull requests for code review
- Conventional commit messages
- Automated testing before merge

---

## Contact & Support

**Project:** ArdhiX Land Registry System  
**Owner:** IamAmasai  
**Repository:** Project-Ardhi-x  
**Branch:** main  

For technical support or contributions, please refer to the repository issues section.

---

*Last Updated: August 1, 2025*
*Documentation Version: 1.0.0*
