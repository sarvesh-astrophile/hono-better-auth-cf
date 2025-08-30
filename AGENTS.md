# AGENTS.md - Project Memory

## Project Overview

**Project Name:** hono-better-auth-cf  
**Type:** Cloudflare Workers application with Hono framework and Better Auth integration  
**Purpose:** A serverless authentication system built on Cloudflare Workers using Hono web framework and Better Auth library  

## Architecture & Technology Stack

### Core Technologies
- **Runtime:** Cloudflare Workers (serverless edge computing)
- **Web Framework:** Hono v4.9.5 (lightweight, fast web framework for edge runtimes)
- **Authentication:** Better Auth v1.3.7 (modern authentication library)
- **Database:** Cloudflare D1 (SQLite-based serverless database)
- **ORM:** Drizzle ORM v0.44.5 (TypeScript ORM with excellent TypeScript support)
- **Language:** TypeScript with ESNext target
- **Package Manager:** npm (with bun.lock present, suggesting bun compatibility)

### Development Tools
- **Wrangler v4.33.1:** Cloudflare Workers CLI for development and deployment
- **Drizzle Kit v0.31.4:** Database migration and schema management
- **TSX v4.20.5:** TypeScript execution for development
- **Cloudflare Workers Types v4.20250830.0:** TypeScript definitions for Cloudflare Workers

## Project Structure

```
hono-better-auth-cf/
├── src/
│   ├── index.ts              # Main application entry point
│   └── db/
│       ├── db.ts            # Database connection setup
│       └── schema.ts        # Database schema definitions
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
├── worker-configuration.d.ts # Generated Cloudflare bindings types
├── index.http              # HTTP test file
├── LICENSE                 # MIT License
└── README.md               # Basic project documentation
```

## Database Configuration

### D1 Database Setup
- **Database Name:** hono-better-auth-cf
- **Database ID:** 681d551e-9b58-4ed0-8ffa-1d39eb0347df
- **Binding:** hono_better_auth_cf
- **Migrations Directory:** drizzle/migrations (referenced but not yet created)

### Current Schema
```typescript
// src/db/schema.ts
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});
```

### Database Connection
```typescript
// src/db/db.ts
export const db = (d1: D1Database) => {
  return drizzle(d1, { schema, casing: 'snake_case' });
};
```

## Configuration Files

### Wrangler Configuration (wrangler.jsonc)
- **Compatibility Date:** 2025-08-30
- **Main Entry:** src/index.ts
- **D1 Database:** Configured with binding and migration directory
- **Commented Options:** Node.js compatibility, environment variables, KV namespaces, R2 buckets, AI bindings, observability

### TypeScript Configuration (tsconfig.json)
- **Target:** ESNext
- **Module:** ESNext with Bundler resolution
- **JSX:** React JSX with Hono JSX import source
- **Path Mapping:** @/* → ./src/*
- **Strict Mode:** Enabled

## Available Scripts

### Development
- `npm start` / `npm run dev` - Start development server with Wrangler
- `npm run cf-typegen` - Generate Cloudflare Workers types

### Database Management
- `npm run db:generate` - Generate database migrations with Drizzle Kit
- `npm run db:migrate:local` - Apply migrations to local D1 database
- `npm run db:migrate:prod` - Apply migrations to production D1 database
- `npm run db:check` - Check database schema consistency
- `npm run db:studio` - Open Drizzle Studio for database management

### Deployment
- `npm run deploy` - Deploy to Cloudflare Workers with minification

## Current Implementation Status

### Completed
- ✅ Basic Hono application setup
- ✅ Drizzle ORM integration with D1
- ✅ Database schema definition (users table)
- ✅ Cloudflare Workers configuration
- ✅ TypeScript setup with proper types
- ✅ Development environment configuration

### In Progress / Next Steps
- 🔄 Better Auth integration (not yet implemented in main app)
- 🔄 Authentication routes and middleware
- 🔄 Database migrations setup
- 🔄 User authentication flow implementation

## Development Environment

### Local Development
- **URL:** http://localhost:8787/ (as defined in index.http)
- **Command:** `npm run dev` or `npm start`
- **Database:** Local D1 instance via Wrangler

### Deployment
- **Platform:** Cloudflare Workers
- **Command:** `npm run deploy`
- **Database:** Production D1 instance

## Key Dependencies Analysis

### Better Auth (v1.3.7)
- Modern authentication library with TypeScript support
- Integrates well with Drizzle ORM
- Supports multiple authentication strategies
- **Note:** Not yet integrated into the main application

### Hono (v4.9.5)
- Lightweight web framework optimized for edge runtimes
- Excellent TypeScript support
- Fast and efficient for serverless environments
- Currently has basic "Hello Hono!" endpoint

### Drizzle ORM (v0.44.5)
- Type-safe database ORM
- Excellent TypeScript integration
- Supports SQLite (D1) with proper schema management
- Snake case naming convention configured

## Environment & Bindings

### Cloudflare Bindings
```typescript
interface CloudflareBindings {
  hono_better_auth_cf: D1Database;
}
```

### Type Generation
- Types are auto-generated via `wrangler types --env-interface CloudflareBindings`
- Stored in `worker-configuration.d.ts`
- Hash: 1995825b0dc762edee2dfd2010bfe04f

## Project Goals & Roadmap

### Immediate Goals
1. **Integrate Better Auth** - Set up authentication middleware and routes
2. **Database Migrations** - Create and apply initial database schema
3. **User Management** - Implement user registration, login, and session management
4. **API Endpoints** - Create authentication-related API endpoints

### Future Enhancements
- Multi-provider authentication (OAuth, social login)
- Role-based access control
- Session management and refresh tokens
- API rate limiting and security middleware
- User profile management
- Password reset functionality

## Development Notes

### File Naming Conventions
- Database tables use snake_case (configured in Drizzle)
- TypeScript files use camelCase
- Configuration files use kebab-case

### Git Configuration
- Uses standard .gitignore for Node.js projects
- Excludes .wrangler directory and environment files
- Includes proper IDE exclusions

### Performance Considerations
- Optimized for Cloudflare Workers edge runtime
- Minimal bundle size with tree-shaking
- Efficient database queries with Drizzle ORM
- TypeScript for compile-time optimizations

## Security Considerations

### Current State
- Basic project setup with no sensitive data exposed
- Environment variables properly excluded from git
- TypeScript strict mode enabled for type safety

### Future Security Measures
- Authentication token validation
- CORS configuration
- Rate limiting implementation
- Input validation and sanitization
- Secure session management

## Troubleshooting & Common Issues

### Database Issues
- Ensure D1 database is created in Cloudflare dashboard
- Run migrations before starting development
- Check database binding in wrangler.jsonc

### Development Issues
- Clear .wrangler cache if experiencing issues
- Regenerate types with `npm run cf-typegen`
- Check TypeScript configuration for path resolution

### Deployment Issues
- Verify database ID in wrangler.jsonc
- Ensure all migrations are applied to production
- Check Cloudflare Workers limits and quotas

---

**Last Updated:** $(date)  
**Project Version:** Initial setup  
**Maintainer:** Development Team