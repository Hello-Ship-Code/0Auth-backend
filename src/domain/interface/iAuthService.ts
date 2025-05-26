export interface IAuthService {
  generateAccessToken(payload: object): string
  verifyAccessToken(token: string): object | null

  generateRefreshHash(payload: string): string
  verifyRefreshHash(hash: string): object | null | string
}
