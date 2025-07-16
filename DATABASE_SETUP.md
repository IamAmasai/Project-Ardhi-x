# Database Setup for ArdhiX Land Registry System

## Recommended Database: PostgreSQL with Prisma ORM

### Why PostgreSQL?
- **Excellent for land registry systems**: Strong ACID compliance, spatial data support
- **Scalable**: Handles large datasets efficiently
- **Geographic capabilities**: PostGIS extension for location-based queries
- **Production-ready**: Used by major applications worldwide
- **Free and open-source**: No licensing costs

### Alternative Options:
1. **Supabase** (Recommended for rapid development)
   - PostgreSQL with built-in auth, real-time, and APIs
   - Free tier: 500MB database, 2GB bandwidth
   - Easy deployment and scaling

2. **Neon** (Serverless PostgreSQL)
   - Modern serverless PostgreSQL
   - Automatic scaling and branching

3. **MongoDB** (If you prefer NoSQL)
   - Good for flexible document structures
   - Easy to scale horizontally

## Setup Instructions

### Option 1: Supabase (Recommended)

1. **Install dependencies:**
```bash
npm install @supabase/supabase-js
npm install prisma @prisma/client
npm install prisma-supabase
```

2. **Sign up at supabase.com and create a project**

3. **Get your database URL from Supabase dashboard**

### Option 2: Local PostgreSQL

1. **Install PostgreSQL locally**
2. **Install dependencies:**
```bash
npm install prisma @prisma/client
npm install pg @types/pg
```

### Option 3: Railway/Vercel Postgres

1. **Create account on Railway or Vercel**
2. **Create PostgreSQL database**
3. **Get connection string**

## Database Schema

The schema will include:
- Users table (authentication)
- Properties table (land properties)
- Documents table (property documents)
- Locations table (counties, wards)
- Transactions table (property transfers)
- Audit logs (all changes)

## Environment Variables Needed

```env
DATABASE_URL="postgresql://..."
SUPABASE_URL="https://..."
SUPABASE_ANON_KEY="..."
NEXTAUTH_SECRET="..."
GOOGLE_MAPS_API_KEY="..."
```

## Next Steps

1. Choose your database provider
2. Run `npx prisma init`
3. Define schema in `prisma/schema.prisma`
4. Run migrations
5. Generate Prisma client

Would you like me to set up the complete Prisma schema and database integration?
