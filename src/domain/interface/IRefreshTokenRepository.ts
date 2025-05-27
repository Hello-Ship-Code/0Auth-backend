export interface IRefreshTokenRepository {
  saveToken(userId: string, refreshToken: string): Promise<void>
  getToken(userId: string): Promise<string | null>
}
