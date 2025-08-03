# ArdhiX: Blockchain-powered Land Registry System

ArdhiX is a comprehensive land registry management system that combines modern web technologies with blockchain security to provide a robust platform for property registration, verification, and transfer.

## ✨ Features

### 🔐 Authentication & Security
- **Secure Authentication**: Supabase-powered authentication with email/password
- **Role-based Access Control**: User roles and permissions management
- **Session Management**: Secure session handling with auto-logout
- **Route Protection**: Comprehensive protection for authenticated routes

### 🏠 Property Management
- **Property Registration**: Complete property registration with detailed information
- **Property Transfer**: Secure property transfer between parties
- **Verification System**: Multi-step verification process for properties
- **Document Management**: Upload, store, and manage property documents
- **Interactive Maps**: Google Maps integration for property visualization

### 🔗 Blockchain Integration
- **Smart Contract**: Ethereum-compatible smart contract for on-chain records
- **Wallet Integration**: MetaMask and other wallet connectivity
- **Immutable Records**: Blockchain-backed proof of ownership
- **Transfer Recording**: On-chain property transfer recording

### 🎨 User Experience
- **Responsive Design**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliant interface
- **Dark/Light Mode**: Theme switching support
- **Loading States**: Clear feedback for all user actions
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account (for production)
- Ethereum wallet and testnet ETH (for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IamAmasai/Project-Ardhi-x.git
   cd Project-Ardhi-x
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Blockchain Configuration (Optional)
   NEXT_PUBLIC_ARDHIX_CONTRACT_ADDRESS=your_contract_address
   
   # Google Maps (Optional)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Set up the database**
   
   If using Supabase, run the SQL setup script:
   ```sql
   -- See supabase-setup.sql for complete database schema
   ```

5. **Deploy Smart Contract (Optional)**
   
   Deploy the ArdhiX smart contract to your preferred Ethereum-compatible network:
   ```bash
   # Navigate to blockchain directory
   cd blockchain
   # Follow deployment instructions in blockchain/README.md
   ```

6. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials
For testing purposes, you can use:
- **Email**: admin@ardhix.com
- **Password**: admin123

## 📁 Project Structure

```
ArdhiX/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── properties/        # Property management
│   ├── documents/         # Document management
│   ├── map/              # Map interface
│   └── api/              # API routes
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── auth-provider.tsx # Authentication context
│   └── dashboard-layout.tsx # Layout components
├── lib/                  # Utility libraries
│   ├── supabase.ts      # Supabase client
│   ├── blockchain.ts    # Blockchain integration
│   ├── validations.ts   # Form validation schemas
│   └── utils.ts         # General utilities
├── blockchain/           # Smart contracts
│   └── contracts/       # Solidity contracts
├── public/              # Static assets
└── styles/              # Global styles
```

## 🧪 Testing

### Running Tests
```bash
# Lint the codebase
npm run lint

# Build the application
npm run build

# Start production build
npm run start
```

### Quality Assurance
We provide a comprehensive QA checklist to ensure quality:

1. **Review the QA Checklist**: See `QA_CHECKLIST.md` for detailed testing procedures
2. **Test Route Protection**: Use `/test-routes` page to validate all routes
3. **Accessibility Testing**: Verify WCAG compliance using browser dev tools
4. **Performance Testing**: Check Core Web Vitals and loading performance

### Manual Testing Flow
1. **Authentication**: Test login, signup, logout, and password reset
2. **Navigation**: Verify all routes and navigation work correctly
3. **Property Management**: Test property creation, editing, and viewing
4. **Document Upload**: Test file upload with various file types and sizes
5. **Responsive Design**: Test on various screen sizes and devices

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_ARDHIX_CONTRACT_ADDRESS` | Smart contract address | No |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |

### Deployment Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify
- Self-hosted with Docker

## 🛠️ Development

### Code Style
- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Code formatting (configure in your editor)
- **TypeScript**: Strict type checking enabled

### Git Workflow
1. Create feature branch from `main`
2. Make changes and test thoroughly
3. Run `npm run lint` and `npm run build`
4. Create pull request with detailed description
5. Review and merge after approval

### Adding New Features
1. **UI Components**: Use shadcn/ui components when possible
2. **Styling**: Use Tailwind CSS utility classes
3. **State Management**: Use React hooks and context
4. **API Routes**: Create in `app/api/` directory
5. **Type Safety**: Define TypeScript interfaces in `types/`

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### Authentication Issues
- Verify Supabase environment variables
- Check Supabase project settings and RLS policies
- Ensure redirect URLs are configured correctly

#### Route Protection Not Working
- Check AuthProvider implementation
- Verify middleware configuration
- Test in incognito/private browsing mode

#### File Upload Problems
- Check file size limits (10MB default)
- Verify supported file types (PDF, JPG, PNG)
- Ensure Supabase storage bucket is configured

### Getting Help
1. **Check the QA Checklist**: `QA_CHECKLIST.md`
2. **Review Documentation**: All `.md` files in the project
3. **Search Issues**: GitHub issues and discussions
4. **Contact Support**: Create an issue with detailed information

## 📊 Performance

### Optimization Strategies
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: Supabase caching and browser caching
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

### Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS scores
- **Error Tracking**: Implement error tracking service
- **Analytics**: Add analytics for user behavior insights

## 🔒 Security

### Security Measures
- **Input Validation**: Zod schemas for all form inputs
- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Row Level Security (RLS) in Supabase
- **File Upload**: Type and size validation
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: SameSite cookie attributes

### Security Checklist
- [ ] Environment variables properly secured
- [ ] Supabase RLS policies configured
- [ ] File upload validation implemented
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled in production

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our code style and testing guidelines
4. **Test thoroughly**: Run the full QA checklist
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Create Pull Request**: Provide detailed description

### Code Review Process
- All code must pass CI/CD checks
- At least one reviewer approval required
- QA checklist must be completed
- Documentation updated if needed

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Supabase** - Backend as a Service
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Ethereum** - Blockchain platform
- **Google Maps** - Mapping service

## 📞 Support

For support and questions:
- **Documentation**: Check all `.md` files in the repository
- **Issues**: Create a GitHub issue with detailed information
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the development team

---

**Built with ❤️ for land registry modernization**
