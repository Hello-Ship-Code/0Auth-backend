import { prisma } from '../Http/config/db.config'
import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interface/IUserRepository'

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const createUser = await prisma.user.create({
      data: {
        email: user.getEmail(),
        userName: user.getUsername(),
        password: user.getPassword(),
      },
    })
    return new User(createUser.id, createUser.email, createUser.userName, createUser.password)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!userRecord) return null
    return userRecord
      ? new User(userRecord.id, userRecord.email, userRecord.userName, userRecord.password)
      : null
  }

  async findUserById(id: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({ where: { id } })
    if (!userRecord) return null
    return userRecord
      ? new User(userRecord.id, userRecord.email, userRecord.userName, userRecord.password)
      : null
  }

  // async update(user: User): Promise<User> {
  //   const updated = await prisma.user.update({
  //     where: { id: user.id! },
  //     data: {
  //       email: user.getEmail(),
  //       userName: user.getUsername(),
  //       password: user.getPassword(),
  //     },
  //   })
  //   return new User(updated.id, updated.email, updated.userName, updated.password)
  // }

  // async delete(id: string): Promise<void> {
  //   await prisma.user.delete({ where: { id } })
  // }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users.map((user) => new User(user.id, user.email, user.userName, user.password))
  }
}
