# What is an Interface?

An **interface** is a programming concept that defines a **contract** specifying the methods and properties an object or class must implement — without providing the implementation itself.

* It defines **what** functions/properties are available.
* It **does not** define **how** those functions work.
* Helps enforce **structure** and **consistency** across different implementations.
* Promotes **decoupling** by allowing code to depend on abstractions rather than concrete implementations.
* Makes code more **maintainable**, **testable**, and **flexible**.

---

## Why Use Interfaces?

* To **standardize behavior** across different classes or modules.
* To enable **interchangeability** of implementations.
* To support the **dependency inversion principle** in clean architecture.
* To facilitate **mocking** in unit testing.

---

## Examples of Interfaces

### 1. User Repository Interface (TypeScript)

Defines user-related database operations.

```ts
interface IUserRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(user: User): Promise<User>;
}
```

---

### 2. Refresh Token Repository Interface

Defines methods for managing refresh tokens.

```ts
interface IRefreshTokenRepository {
  saveToken(userId: string, refreshToken: string): Promise<void>;
  findToken(token: string): Promise<string | null>;
  revokeToken(token: string): Promise<void>;
}
```

---

### 3. Token Service Interface

Handles token creation and verification.

```ts
interface ITokenService {
  generateAccessToken(payload: any): Promise<string>;
  generateRefreshToken(payload: any): Promise<string>;
  verifyAccessToken(token: string): Promise<any | null>;
  verifyRefreshToken(token: string): Promise<any | null>;
}
```

---

### 4. Password Hasher Interface

Abstracts password hashing logic.

```ts
interface IPasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
}
```

---

### 5. Shape Interface (Simple Example)

A geometric example to calculate area.

```ts
interface Shape {
  getArea(): number;
}
```
