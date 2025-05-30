export interface ITokenService {
  generateAccessToken(payload: { userId: string }): string
  verifyAccessToken(token: string): object | null

  generateRefreshToken(payload: { userId: string }): string
  verifyRefreshToken(token: string): { userId: string } | null | string
}
