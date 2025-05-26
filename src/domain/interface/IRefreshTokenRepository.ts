export interface IRefreshHashRepository {
  saveToken(userId: string, refreshToken: string): Promise<void>
}
