export class Username {
  private readonly value: string

  constructor(username: string) {
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }
    this.value = username
  }
  getValue(): string {
    return this.value
  }
}
