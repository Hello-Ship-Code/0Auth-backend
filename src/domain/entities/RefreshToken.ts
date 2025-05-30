export class RefreshToken {
  constructor(
    public readonly id: string | undefined,
    public readonly userId: string,
    private _refreshToken: string,
    public readonly createdAt: Date = new Date(),
    public readonly expiredAt: Date,
  ) {
    if (!_refreshToken) throw new Error('Refresh token must not be empty.')
    if (expiredAt <= createdAt) throw new Error('ExpiredAt must be later than createdAt.')
  }

  getRefreshToken(): string {
    return this._refreshToken
  }

  setRefreshToken(newRefreshToken: string) {
    if (!newRefreshToken) throw new Error('refresh token must not be empty.')
    this._refreshToken = newRefreshToken
  }

  getUserId(): string {
    return this.userId
  }

  isExpired(currentDate: Date = new Date()): boolean {
    return currentDate >= this.expiredAt
  }
}
