// Database Schema and Configuration for ArdhiX Land Registry

export interface DatabaseConfig {
  type: 'sqlite' | 'postgresql' | 'mysql' | 'mongodb'
  host?: string
  port?: number
  database: string
  username?: string
  password?: string
  filename?: string // for SQLite
}

// SQLite schema for development (can be easily migrated to PostgreSQL for production)
export const createTables = `
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    avatar TEXT,
    phone TEXT,
    national_id TEXT,
    bio TEXT,
    location TEXT,
    date_joined TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Properties table
  CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    type TEXT CHECK(type IN ('residential', 'commercial', 'agricultural', 'industrial')) NOT NULL,
    location TEXT NOT NULL,
    county TEXT NOT NULL,
    ward TEXT,
    size TEXT NOT NULL,
    status TEXT CHECK(status IN ('verified', 'pending', 'rejected')) DEFAULT 'pending',
    value REAL NOT NULL,
    currency TEXT DEFAULT 'KES',
    coordinates_lat REAL,
    coordinates_lng REAL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Property documents table
  CREATE TABLE IF NOT EXISTS property_documents (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('title_deed', 'survey_map', 'valuation', 'tax_receipt', 'other')) NOT NULL,
    url TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
  );

  -- Property transfers table
  CREATE TABLE IF NOT EXISTS property_transfers (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    from_user_id TEXT NOT NULL,
    to_user_id TEXT,
    to_name TEXT,
    to_email TEXT,
    to_phone TEXT,
    to_national_id TEXT,
    transfer_reason TEXT,
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected', 'completed')) DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Sessions table for JWT token management
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Property history/audit log
  CREATE TABLE IF NOT EXISTS property_history (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    performed_by TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
  CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
  CREATE INDEX IF NOT EXISTS idx_properties_county ON properties(county);
  CREATE INDEX IF NOT EXISTS idx_documents_property_id ON property_documents(property_id);
  CREATE INDEX IF NOT EXISTS idx_transfers_property_id ON property_transfers(property_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
  CREATE INDEX IF NOT EXISTS idx_history_property_id ON property_history(property_id);
`;

// Database configuration for different environments
export const databaseConfig: Record<string, DatabaseConfig> = {
  development: {
    type: 'sqlite',
    database: 'ardhix_dev.db',
    filename: './data/ardhix_dev.db'
  },
  production: {
    type: 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ardhix_production',
    username: process.env.DB_USER || 'ardhix_user',
    password: process.env.DB_PASSWORD || ''
  },
  test: {
    type: 'sqlite',
    database: ':memory:',
    filename: ':memory:'
  }
}

export const getCurrentConfig = (): DatabaseConfig => {
  const env = process.env.NODE_ENV || 'development'
  return databaseConfig[env] || databaseConfig.development
}
