export class RefreshToken {
  constructor(
    public readonly id: string | undefined,
    public readonly userId: string,
    public _refreshToken: string,
    public readonly createdAt: Date = new Date(),
    public readonly expiredAt: Date = new Date(),
  ) {}

  getRefreshToken(): string {
    return this._refreshToken
  }

  setRefreshToken(newRefreshToken: string) {
    if (!newRefreshToken) throw new Error('refresh token must not be empty.')
    this._refreshToken = newRefreshToken
  }
}
