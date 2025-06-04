# Full-Stack User Management Platform

A modern, scalable full-stack application built with TypeScript, featuring GraphQL Federation, microservices architecture, and a responsive web dashboard.

## 🏗️ Architecture Overview

This project uses a **monorepo structure** with **microservices architecture** and **GraphQL Federation** to create a maintainable, scalable system.

```
fullstack-project/
├── apps/                    # Frontend applications
│   └── web-dashboard/       # Next.js admin dashboard
├── services/                # Backend microservices
│   ├── gateway/            # API Gateway (GraphQL Federation)
│   └── user/               # User management service
├── shared/                  # Shared packages
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Common utility functions
│   ├── ui/                 # Shared React components (planned)
│   └── config/             # Configuration schemas (planned)
└── tools/                   # Development and deployment tools
```

## 🚀 Tech Stack

### Backend

- **Framework**: NestJS with TypeScript
- **API**: GraphQL with Apollo Federation
- **Database**: SQLite with Prisma ORM
- **Architecture**: Microservices with federated schema

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **GraphQL Client**: Apollo Client
- **UI Components**: Custom components with modern design patterns

### Development

- **Monorepo**: Yarn Workspaces
- **Code Quality**: ESLint, Prettier, Husky
- **Type Safety**: Shared TypeScript definitions
- **Database**: Prisma migrations and seeding

## ⚡ Quick Start

### Prerequisites

- Node.js >= 22.0.0
- Yarn >= 3.0.0

### Installation & Setup

1. **Clone and install dependencies**

   ```bash
   git clone https://github.com/ognb/fullstack-project.git
   cd fullstack-project
   yarn install
   ```

2. **Complete setup (recommended for new developers)**

   ```bash
   yarn setup
   ```

   This automatically:

   - Builds shared packages
   - Generates Prisma client
   - Runs database migrations
   - Seeds sample data

3. **Start all services**

   ```bash
   yarn dev
   ```

   **Startup sequence** (with smart timing):

   - **User Service**: http://localhost:4002 (starts first)
   - **API Gateway**: http://localhost:4000 (starts after 3s delay)
   - **Web Dashboard**: http://localhost:3000

   You'll see colored logs like:

   ```
   [USER] 👤 User Service running on: http://localhost:4002
   [GATEWAY] 🚀 Gateway running on: http://localhost:4000
   [WEB] ▲ Next.js ready on http://localhost:3000
   ```

### Individual Service Commands

```bash
# Start individual services (in order)
yarn dev:user      # User Service (start first)
yarn dev:gateway   # API Gateway (needs User Service running)
yarn dev:web       # Web Dashboard

# Start only backend services
yarn dev:services  # User Service + Gateway with timing

# Start only frontend
yarn dev:apps      # Web Dashboard only

# Build commands
yarn build         # Build everything in correct order
yarn build:services # Backend services only
yarn build:apps     # Frontend apps only
```

## 🎯 Current Features

### ✅ User Management System

- **CRUD Operations**: Create, read, update, delete users
- **User Roles**: Admin, User, Moderator with role-based access
- **User Status**: Active, Inactive, Suspended status management
- **Profile Management**: Names, avatars, contact information
- **Activity Tracking**: Login counts, last login timestamps
- **Email Verification**: Track verification status

### ✅ GraphQL Federation

- **Unified API**: Single endpoint for all frontend queries
- **Service Federation**: Automatic schema composition
- **Type Safety**: End-to-end TypeScript support
- **Real-time**: Live data updates across services

### ✅ Modern Web Dashboard

- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Real-time Updates**: Live user data with Apollo Client
- **Form Handling**: Validation and error handling
- **Loading States**: Smooth UX with loading indicators

### ✅ Development Experience

- **Hot Reload**: Live updates across all services
- **Type Safety**: Shared TypeScript definitions
- **Code Quality**: Automated linting and formatting
- **Database Tools**: Migrations, seeding, and Prisma Studio

## 📊 Services Overview

### API Gateway (Port 4000)

- **Purpose**: GraphQL Federation gateway
- **Features**: Query routing, health checks, CORS
- **Endpoints**:
  - GraphQL Playground: http://localhost:4000/graphql
  - Health Check: http://localhost:4000/health

### User Service (Port 4002)

- **Purpose**: User management and authentication
- **Database**: SQLite with Prisma ORM
- **Features**: User CRUD, role management, activity tracking
- **Schema**: Users table with comprehensive user data

### Web Dashboard (Port 3000)

- **Purpose**: Admin interface for user management
- **Features**: User listing, creation, editing, deletion
- **Design**: Modern, responsive interface with Tailwind CSS

## 🗄️ Database Schema

### User Entity

```sql
users {
  id            String   @id @default(cuid())
  email         String   @unique
  username      String?
  firstName     String?
  lastName      String?
  displayName   String?
  avatar        String?
  phoneNumber   String?
  role          String   @default("user")        # user|admin|moderator
  status        String   @default("active")      # active|inactive|suspended
  emailVerified Boolean  @default(false)
  phoneVerified Boolean  @default(false)
  loginCount    Int      @default(0)
  lastLoginAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 🔄 Data Flow

```
Frontend (Next.js)
    ↓ Apollo Client
API Gateway (Port 4000) ← Starts after User Service ready
    ↓ GraphQL Federation
User Service (Port 4002) ← Starts first
    ↓ Prisma ORM
SQLite Database
```

**Smart Startup Timing**: The development setup ensures User Service is ready before Gateway attempts schema introspection, preventing connection errors.

## 🛠️ Development Commands

### Quick Start

```bash
yarn setup                # Complete setup for new developers
yarn dev                  # Start all services with smart timing
yarn health               # Check if services are running
```

### Package Management

```bash
yarn install              # Install all dependencies
yarn clean                # Clean all build artifacts
yarn build                # Build everything in correct order
yarn reset                # Clean everything and reinstall
```

### Service Management

```bash
# Development (with proper startup timing)
yarn dev                  # All services: User → Gateway → Web
yarn dev:services         # Backend only: User → Gateway
yarn dev:apps            # Frontend only: Web Dashboard

# Individual services (manual control)
yarn dev:user            # User Service (SQLite + GraphQL)
yarn dev:gateway         # API Gateway (Federation)
yarn dev:web             # Web Dashboard (Next.js)
```

### Code Quality

```bash
yarn lint                 # Lint all packages
yarn lint:fix             # Fix linting issues
yarn type-check           # TypeScript type checking
```

### Database Operations

```bash
# Prisma commands (run from user service)
yarn workspace @project/user-service prisma:studio    # Open Prisma Studio
yarn workspace @project/user-service prisma:migrate   # Run migrations
yarn workspace @project/user-service prisma:reset     # Reset database
yarn workspace @project/user-service db:seed          # Seed sample data
```

### Testing

```bash
yarn test                 # Run all tests
yarn test:watch           # Run tests in watch mode
```

## 🚧 Roadmap

### Phase 1: Authentication & Security

- [ ] JWT-based authentication service
- [ ] Password hashing and validation
- [ ] Session management
- [ ] Role-based authorization middleware

### Phase 2: Enhanced Features

- [ ] File upload service (avatars, documents)
- [ ] Email notification service
- [ ] Audit logging system
- [ ] API rate limiting

### Phase 3: Advanced Capabilities

- [ ] Real-time notifications (WebSocket/SSE)
- [ ] Multi-tenant support
- [ ] Advanced search and filtering
- [ ] Data export/import functionality

### Phase 4: Production Readiness

- [ ] Docker containerization
- [ ] Kubernetes deployment manifests
- [ ] CI/CD pipeline setup
- [ ] Monitoring and logging integration

## 📁 Key Directories

| Directory             | Purpose           | Technology                 |
| --------------------- | ----------------- | -------------------------- |
| `apps/web-dashboard/` | Admin interface   | Next.js + Tailwind         |
| `services/gateway/`   | API Gateway       | NestJS + Apollo Federation |
| `services/user/`      | User management   | NestJS + Prisma + SQLite   |
| `shared/types/`       | Type definitions  | TypeScript                 |
| `shared/utils/`       | Utility functions | TypeScript                 |
| `tools/`              | Development tools | Bash scripts               |

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript strict mode
- Use Prettier for code formatting
- Write tests for new features
- Update documentation for API changes
- **Startup Order**: Always start User Service before Gateway
- Use `yarn dev` for automatic service orchestration
- Check `yarn health` to verify all services are running

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Quick Troubleshooting

- **Services won't start**: Run `yarn reset` for clean installation
- **GraphQL errors**: Ensure User Service starts before Gateway (`yarn dev` handles this)
- **Database issues**: Run `yarn db:reset` to reset and reseed database
- **Port conflicts**: Check if ports 3000, 4000, 4002 are available

### Getting Help

- **Documentation**: Check the individual service README files
- **Health Check**: Run `yarn health` to check service status
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ using modern TypeScript, GraphQL, and React technologies.**
