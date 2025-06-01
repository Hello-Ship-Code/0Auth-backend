# Clean Architecture

Uncle Bob’s **Clean Architecture** is a set of principles for organizing code in a way that makes it **maintainable**, **testable**, and **independent of frameworks, databases, or external agencies**. The idea is to **separate concerns** and structure the code into **layers**, where inner layers are completely unaware of the outer layers.

---

## 🧱 Clean Architecture Layers (from innermost to outermost)

```c
┌───────────────────────────┐
│        Frameworks         │ ← e.g., Express, React, Prisma, etc.
│     & Drivers Layer       │
├───────────────────────────┤
│   Interface Adapters      │ ← Controllers, Repositories (implements interfaces)
├───────────────────────────┤
│     Application Layer     │ ← Use Cases / Services
├───────────────────────────┤
│     Domain Layer          │ ← Entities, Business Rules (pure logic)
└───────────────────────────┘
```

---

## 🛠️ What to Do in Code (with TypeScript + Express + Prisma Example)

We’ll walk through a simple example: **"Create a user"** flow.

---

## 1. **Domain Layer** (`/domain`)

- Focus: **Business entities** and **business rules**
- No imports from any other layer

### 📄 `User.ts`

```ts
export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
  ) {
    if (!email.includes('@')) throw new Error('Invalid email')
  }
}
```

---

## 2. **Application Layer** (`/application`)

- Focus: **Use cases** and **interfaces**
- Talks to domain layer and defines **ports** (interfaces) for outside world

### 📄 `IUserRepository.ts`

```ts
import { User } from '../../domain/User'

export interface IUserRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
```

### 📄 `CreateUserUseCase.ts`

```ts
import { IUserRepository } from './IUserRepository'
import { User } from '../../domain/User'
import { v4 as uuidv4 } from 'uuid'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email)
    if (existing) throw new Error('User already exists')

    const user = new User(uuidv4(), name, email)
    return this.userRepository.create(user)
  }
}
```

---

## 3. **Interface Adapters** (`/infrastructure`, `/controllers`)

- Implements interfaces from the application layer
- Converts framework data (e.g., Prisma/DB models) to domain models and vice versa

### 📄 `PrismaUserRepository.ts`

```ts
import { IUserRepository } from '../../application/IUserRepository'
import { User } from '../../domain/User'
import { prisma } from '../prisma' // Your Prisma client

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({ where: { email } })
    if (!userData) return null
    return new User(userData.id, userData.name, userData.email)
  }
}
```

---

## 4. **Framework & Drivers Layer** (`/routes`, `index.ts`)

- Connects HTTP layer, frameworks, databases to your system
- Express app, environment setup, dependency injection, etc.

### 📄 `UserController.ts`

```ts
import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../application/CreateUserUseCase'

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body
      const user = await this.createUserUseCase.execute(name, email)
      res.status(201).json(user)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}
```

### 📄 `user.routes.ts`

```ts
import { Router } from 'express'
import { PrismaUserRepository } from '../infrastructure/PrismaUserRepository'
import { CreateUserUseCase } from '../application/CreateUserUseCase'
import { UserController } from './controllers/UserController'

const repo = new PrismaUserRepository()
const useCase = new CreateUserUseCase(repo)
const controller = new UserController(useCase)

const router = Router()
router.post('/users', controller.create.bind(controller))

export default router
```

### 📄 `index.ts`

```ts
import express from 'express'
import userRoutes from './routes/user.routes'

const app = express()
app.use(express.json())
app.use('/api', userRoutes)

app.listen(3000, () => console.log('Server running on port 3000'))
```

---

## ✅ Benefits of This Structure

| Benefit                       | Description                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| 💡 Testable                   | You can test use cases without touching DB or Express         |
| 🔁 Replaceable Infrastructure | Switch from Prisma to Mongoose without touching use case code |
| 🔒 Domain Protection          | Domain rules (e.g. valid email) are always enforced           |
| 🧼 Separation of Concerns     | Each layer has a clear, single responsibility                 |

---

## 📦 Folder Structure Summary

```c
src/
├── domain/
│   └── User.ts
├── application/
│   ├── CreateUserUseCase.ts
│   └── IUserRepository.ts
├── infrastructure/
│   └── PrismaUserRepository.ts
├── routes/
│   ├── controllers/
│   │   └── UserController.ts
│   └── user.routes.ts
└── index.ts
```

---

Would you like a repo scaffold or starter template based on this?
