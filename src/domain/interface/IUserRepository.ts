import { User } from '../entities/User'

export interface IUserRepository {
  createUser(user: User): Promise<User>
  findUserById(id: string): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  getAllUsers(): Promise<User[]>
  update(user: User): Promise<User>
  delete(id: string): Promise<void>
}
