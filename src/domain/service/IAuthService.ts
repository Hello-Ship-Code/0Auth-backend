export interface IAuthService {
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>
  register(userData: {
    email: string
    userName: string
    password: string
  }): Promise<{ refreshToken: string; accessToken: string }>
  refreshToken(refreshToken: string): Promise<{ refreshToken: string; accessToken: string }>
}
