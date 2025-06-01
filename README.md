# OAuth-backend

This project is a robust, modular backend implementation for authentication using **OAuth 2.0**, structured with **Uncle Bob’s Clean Architecture** principles.

## 🔍 Overview

The goal of this backend is to provide a **scalable**, **testable**, and **framework-agnostic** authentication system with support for:

- ✅ Google OAuth 2.0 Authentication
- ✅ JWT-based session management (Access & Refresh Tokens)
- ✅ Type-safe, validated inputs using Zod
- ✅ Express.js REST API
- ✅ Prisma ORM for database operations
- ✅ Cleanly separated layers for long-term maintainability

---

## 🧱 Clean Architecture Layers

```c

┌───────────────────────────┐
│        Frameworks         │ ← Express, Prisma, Passport
│     & Drivers Layer       │
├───────────────────────────┤
│   Interface Adapters      │ ← Controllers, Repositories
├───────────────────────────┤
│     Application Layer     │ ← Use Cases, DTOs
├───────────────────────────┤
│       Domain Layer        │ ← Core Business Logic, Entities
└───────────────────────────┘

```

---

## 📂 Folder Structure

``` python
src/
├── domain/                           # 💡 Pure business logic (no external dependencies)
│   ├── entities/                     #   - Core domain models (e.g., User, Token)
│   ├── interfaces/                   #   - Interfaces/ports like IUserRepository
│   └── services/                     #   - Business service interfaces (e.g., ITokenService)
│
├── application/                      # 🧠 Application-specific logic (orchestration)
│   ├── usecases/                     #   - Use cases (e.g., SignUpUseCase, LoginUseCase)
│   ├── DTO/                          #   - Data Transfer Objects used in and out of use cases
│   └── validation/                   #   - Input validation logic (e.g., Zod schemas)
│
├── infrastructure/                  # ⚙️ External tech implementations (adapters)
│   ├── repositories/                 #   - DB implementations of repository interfaces (e.g., PrismaUserRepo)
│   ├── services/                     #   - Services like JWT, Bcrypt implementing domain interfaces
│   └── http/
│       ├── middleware/              #     - Middleware (e.g., auth checks, error handlers)
│       └── config/                  #     - Config files (e.g., passport, env setup, Prisma)
│
├── presentation/                    # 🌐 Web interface layer (Express)
│   ├── controllers/                 #   - Controllers that call use cases (e.g., AuthController)
│   ├── routes/                      #   - Express routers mapping endpoints to controllers
│   └── wiring/                      #   - Composition root: inject dependencies, wire up everything
│
└── index.ts                         # 🚪 Entry point of the application (Express app bootstrap)


```

---

## 🛠️ Tech Stack

| Tool/Library      | Purpose                          |
| ----------------- | -------------------------------- |
| **Node.js**       | Runtime                          |
| **TypeScript**    | Type safety                      |
| **Express.js**    | HTTP server                      |
| **Passport.js**   | OAuth 2.0 Strategy               |
| **Prisma**        | Database ORM                     |
| **Zod**           | Input validation                 |
| **JWT**           | Token-based authentication       |
| **Bcrypt**        | Password hashing                 |
| **ESLint + Prettier** | Code quality and formatting |

---

## ⚙️ Scripts

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `npm run dev` | Run the server in development mode   |
| `npm run build` | Compile TypeScript to JavaScript   |
| `npm start`   | Run compiled JS from `dist/`         |
| `npm run lint`| Run ESLint                          |
| `npm run format`| Auto-format code using Prettier    |
| `npm run push`| Push Prisma schema to DB             |
| `npm run generate`| Generate Prisma client            |

---

## 🔐 Auth Flow (Google OAuth Example)

1. User hits `/auth/google`
2. Redirects to Google Consent Screen
3. Google sends back user profile
4. If user doesn't exist: create one
5. Generate and return `accessToken` and `refreshToken`

---

## ✅ Benefits of This Architecture

- 🔁 Easily swap out Passport, Prisma, etc. without touching business logic
- 🧪 Use cases are unit testable without mocks for Express or DB
- 🔒 Keeps domain rules (e.g., valid email) protected at core
- ♻️ Clean separation of concerns

---

## 📌 To Do

- [ ]  Add GitHub OAuth 2.0
- [✅] Implemented Clean Architecture
- [✅] Add logout and token revocation
- [ ]  Add unit and integration tests
- [ ]  Rate limiting and throttling

---

## 🧑‍💻 Author

Made with ❤️ by [hello-ship-code](https://github.com/hello-ship-code)
