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
   git clone <repository-url>
   cd fullstack-project
   yarn install
   ```

2. **Build shared packages**

   ```bash
   yarn build:shared
   ```

3. **Set up the database**

   ```bash
   # Generate Prisma client
   yarn workspace @project/user-service prisma:generate

   # Run migrations
   yarn workspace @project/user-service prisma:migrate

   # Seed with sample data
   yarn workspace @project/user-service db:seed
   ```

4. **Start all services**

   ```bash
   yarn dev
   ```

   This starts:

   - **API Gateway**: http://localhost:4000
   - **User Service**: http://localhost:4002
   - **Web Dashboard**: http://localhost:3000

### Individual Service Commands

```bash
# Start individual services
yarn dev:gateway    # API Gateway only
yarn dev:user      # User Service only
yarn dev:web       # Web Dashboard only

# Build individual services
yarn build:services # All backend services
yarn build:apps     # All frontend apps
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
API Gateway (Port 4000)
    ↓ GraphQL Federation
User Service (Port 4002)
    ↓ Prisma ORM
SQLite Database
```

## 🛠️ Development Commands

### Package Management

```bash
yarn install              # Install all dependencies
yarn clean                # Clean all build artifacts
yarn build                # Build all packages
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
- Ensure all services start successfully

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the individual service README files
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ using modern TypeScript, GraphQL, and React technologies.**
