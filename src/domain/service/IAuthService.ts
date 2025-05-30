import { AuthTokenDTO, RegisterRequestDTO } from '../../application/DTO/AuthTokenDTO'

export interface IAuthService {
  login(email: string, password: string): Promise<AuthTokenDTO>
  register(userData: RegisterRequestDTO): Promise<AuthTokenDTO>
  refreshToken(refreshToken: string): Promise<AuthTokenDTO>
}
