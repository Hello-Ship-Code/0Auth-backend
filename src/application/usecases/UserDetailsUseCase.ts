// import { IUserRepository } from '../../domain/interface/IUserRepository'
// import { UserDetailsDTO } from '../DTO/UserDetailsDTO'

// export class UserDetailsUseCase {
//   constructor(private userRepository: IUserRepository) {}
//   async execute(userId: string): Promise<UserDetailsDTO> {
//     const user = await this.userRepository.findUserById(userId)

//     if (!user) throw new Error('User not found')

//     const userDetails: UserDetailsDTO = {
//       id: user.id!,
//       userName: user.userName,
//       email: user.email,
//       // createdAt: user.createdAt,
//     }

//     return userDetails
//   }
// }
