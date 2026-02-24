# Architecture

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | NestJS (Node.js) |
| Language | TypeScript |
| ORM | TypeORM |
| Database | PostgreSQL |
| Auth | Passport.js + JWT |
| Password hashing | bcrypt |
| Validation | class-validator + class-transformer |
| Config | @nestjs/config + dotenv |

---

## Project Structure

```
src/
├── main.ts                  # Entry point
├── app.module.ts            # Root module
├── config/                  # Environment configuration
│   ├── app.config.ts
│   ├── database.config.ts
│   └── jwt.config.ts
├── common/                  # Shared across modules
│   ├── dao/                 # TypeORM entities (DB models)
│   ├── entities/            # Domain entity types
│   ├── constants/           # Global constants
│   └── utils/               # Helper functions
└── modules/                 # Feature modules
    ├── auth/
    ├── users/
    ├── roles/
    ├── locations/
    ├── fire-sensors/
    └── sensor-reading/
```

---

## Module Structure (per feature)

Every feature module follows the same internal layered structure:

```
modules/<feature>/
├── <feature>.module.ts      # NestJS module definition
├── data/                    # Repository layer — DB queries
├── domain/                  # Service layer — business logic
├── dto/                     # Input validation (class-validator)
└── presenter/               # Output formatting (response shape)
```

---

## Layer Responsibilities

| Layer | Folder | Responsibility |
|---|---|---|
| **Controller** | `domain/` | Handles HTTP requests, calls services |
| **Service** | `domain/` | Business logic, orchestration |
| **Repository** | `data/` | Data access, TypeORM queries |
| **DTO** | `dto/` | Input validation and typing |
| **Presenter** | `presenter/` | Response structure mapping |
| **DAO** | `common/dao/` | TypeORM entity definitions (shared) |

---

## Request Flow

```
HTTP Request
    │
    ▼
[ Guard / Middleware ]
    │
    ▼
[ Controller ]  ← dto/ (validates input)
    │
    ▼
[ Service ]     ← business logic
    │
    ▼
[ Repository ]  ← data/ (TypeORM)
    │
    ▼
[ Database ]    ← PostgreSQL
    │
    ▼
[ Presenter ]   → formats response
    │
    ▼
HTTP Response
```

---

## Authentication Flow

```
POST /auth/login
    │
    ▼
[ AuthModule ]
    │  validates credentials via Passport strategy
    ▼
[ JWT Strategy ]
    │  issues access token
    ▼
[ JwtAuthGuard ] ← applied on protected routes
    │
    ▼
[ Controller ]
```

---

## Database Entities (DAO)

All TypeORM entities are defined in `src/common/dao/` and shared across modules:

| DAO File | Table |
|---|---|
| `user.dao.ts` | users |
| `user-access-token.dao.ts` | user_access_tokens |
| `role.dao.ts` | roles |
| `location.dao.ts` | locations |
| `fire-sensor.dao.ts` | fire_sensors |
| `sensor-reading.dao.ts` | sensor_readings |

---

## Module Dependency Map

```
AppModule
├── AuthModule
│   └── uses → UserDao, UserAccessTokenDao
├── UsersModule
│   └── uses → UserDao
├── RolesModule
│   └── uses → RoleDao
├── LocationsModule
│   └── uses → LocationDao
├── FireSensorsModule
│   └── uses → FireSensorDao, LocationDao
└── SensorReadingModule
    └── uses → SensorReadingDao, FireSensorDao
```

---

## Configuration

Configs are loaded via `@nestjs/config` from `.env`:

| Config | Provider |
|---|---|
| App (port, etc.) | `app.config.ts` |
| Database | `database.config.ts` |
| JWT secret / expiry | `jwt.config.ts` |

---

## Database Migrations

Migrations are managed via TypeORM CLI:

```bash
npm run migration:generate   # generate from entity diff
npm run migration:run        # apply migrations
npm run migration:revert     # rollback last migration
npm run migration:show       # list applied migrations
```

Migration data source: `database/config/data-source.ts`

---

## Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Development with watch mode |
| `npm run start:prod` | Production build |
| `npm run build` | Compile TypeScript |
| `npm run test` | Unit tests (Jest) |
| `npm run test:e2e` | End-to-end tests |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |