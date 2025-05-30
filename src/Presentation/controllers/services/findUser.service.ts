import { prisma } from '../../Infrastructure/config/db.config'

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  })
}
