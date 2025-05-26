export class User {
  constructor(
    public email: string,
    public userName: string,
    public password: string,
    public refreshToken: string,
  ) {}

  updateRefreshToken(hash: string) {
    this.refreshToken = hash
  }
}
