// import { IUserRepository } from '../../domain/interface/IUserRepository'
// import { UserUpdateDTO } from '../DTO/UpdateUserDTO'

// export class UpdateUserUseCase {
//   constructor(private userRepository: IUserRepository) {}

//   async execute(dto: UserUpdateDTO): Promise<UserUpdateDTO> {
//     const existingUser = await this.userRepository.findUserById(dto.id)
//     if (!existingUser) {
//       throw new Error('user not found')
//     }
//     // Update only provided fields
//     if (dto.userName !== undefined) {
//       existingUser.userName = dto.userName
//     }

//     if (dto.email !== undefined) {
//       existingUser.email = dto.email
//     }

//     if (dto.password !== undefined) {
//       existingUser.setPassword(dto.password)
//     }

//     const updatedUser = await this.userRepository.update(existingUser)
//     return {
//       id: updatedUser.id!,
//       userName: updatedUser.userName,
//       email: updatedUser.email,
//     }
//   }
// }
