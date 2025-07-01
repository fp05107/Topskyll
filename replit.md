# Topskyll - Remote Tech Jobs Portal

## Overview

Topskyll is a modern job portal specifically designed for remote tech jobs in India. The application is built as a full-stack web application with a React frontend and Express backend, focusing on connecting Indian tech professionals with remote opportunities across 20+ specializations including AI/ML, Cloud Computing, Cybersecurity, and Software Development.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Authentication**: bcrypt for password hashing
- **File Uploads**: Multer middleware for resume and document uploads

### Project Structure
```
├── client/           # React frontend application
├── server/           # Express backend application
├── shared/           # Shared TypeScript schemas and types
├── migrations/       # Database migration files
└── uploads/         # File upload directory
```

## Key Components

### Database Schema
The application uses a PostgreSQL database with the following main entities:
- **Users**: User profiles with authentication and job seeker information
- **Job Categories**: Categorization system for different tech specializations
- **Jobs**: Job listings with detailed requirements and company information
- **Job Applications**: Tracking applications between users and jobs

### Authentication System
- Custom authentication using bcrypt for password hashing
- Session-based authentication (infrastructure for session management present)
- User registration and login endpoints
- Protected routes requiring authentication

### File Upload System
- Multer configuration for handling resume uploads
- Support for PDF, DOC, DOCX, and image formats
- 5MB file size limit
- Uploads stored in local filesystem

### UI Components
- Comprehensive component library using Shadcn/ui
- Dark/light theme support with theme context
- Responsive design optimized for mobile and desktop
- Toast notifications for user feedback

## Data Flow

1. **User Registration/Login**: Users create accounts with personal and professional information
2. **Job Discovery**: Users browse jobs by categories or search functionality
3. **Job Application**: Users apply to jobs with their profiles and uploaded resumes
4. **Data Persistence**: All data stored in PostgreSQL with Drizzle ORM handling queries
5. **Real-time Updates**: TanStack Query manages cache invalidation and data synchronization

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- UI components (@radix-ui/* packages for accessible primitives)
- Form handling (React Hook Form with Zod validation)
- HTTP client (Fetch API with TanStack Query)
- Styling (Tailwind CSS, class-variance-authority for component variants)

### Backend Dependencies
- Express.js framework with middleware
- Database (Drizzle ORM, Neon Database serverless driver)
- Authentication (bcrypt for password hashing)
- File handling (Multer for uploads)
- Validation (Zod schemas shared between frontend and backend)

### Development Dependencies
- TypeScript for type safety
- Vite for frontend build process
- ESBuild for backend bundling
- Drizzle Kit for database migrations

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: tsx for TypeScript execution with hot reloading
- Database: Drizzle push for schema synchronization

### Production Build
- Frontend: Vite builds to `dist/public`
- Backend: ESBuild bundles to `dist/index.js`
- Static files served by Express in production
- Environment variables for database connection

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- `NODE_ENV` for environment-specific behavior
- Development mode includes Replit-specific tooling

## Changelog
```
Changelog:
- July 01, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```