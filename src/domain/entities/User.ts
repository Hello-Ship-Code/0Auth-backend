export class User {
  constructor(
    public readonly id: string | undefined,
    public email: string,
    public userName: string,
    private _password: string,
  ) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format')
    }

    if (userName.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }

    if (this._password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
  }

  get password(): string {
    return this._password
  }

  set password(newPassword: string) {
    if (newPassword.length < 6) throw new Error('password should at least contains 6 characters')
    this._password = newPassword
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
