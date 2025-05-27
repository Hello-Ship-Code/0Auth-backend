export interface ITokenService {
  generateAccessToken(payload: object): string
  verifyAccessToken(token: string): object | null

  generateRefreshToken(userId: string): string
  verifyRefreshToken(token: string, userId: string): object | null | string
}
