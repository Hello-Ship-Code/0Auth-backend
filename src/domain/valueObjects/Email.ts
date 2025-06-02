export class Email {
  private readonly value: string
  constructor(email: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format')
    }
    this.value = email
  }
  getValue(): string {
    return this.value
  }
}
