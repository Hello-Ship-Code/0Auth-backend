import { IPasswordService } from '../service/IPasswordService'

export class User {
  constructor(
    public readonly id: string | undefined,
    public email: string,
    public userName: string,
    private _password: string,
  ) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format!!!')
    }

    if (userName.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }

    if (_password.length < 6) {
      throw new Error('password must be at least 6 characters')
    }
  }

  getPassword(): string {
    return this._password
  }

  getEmail(): string {
    return this.email
  }

  getUsername(): string {
    return this.userName
  }

  // getPublicProfile(): Readonly<{ email: string; userName: string }> {
  //   return Object.freeze({
  //     email: this.email,
  //     userName: this.userName,
  //   })
  // }

  async verifyPassword(inputPassword: string, passwordService: IPasswordService): Promise<boolean> {
    return passwordService.compare(inputPassword, this._password)
  }

  setUsername(newUsername: string): void {
    if (newUsername.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }
    this.userName = newUsername
  }

  setEmail(newEmail: string): void {
    if (!this.isValidEmail(newEmail)) {
      throw new Error('Invalid email format!!!')
    }
    this.email = newEmail
  }

  setPassword(newPassword: string) {
    if (newPassword.length < 6) throw new Error('password must be at least 6 characters')
    this._password = newPassword
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
