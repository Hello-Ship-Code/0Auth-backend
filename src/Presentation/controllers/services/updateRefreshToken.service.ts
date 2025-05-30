import { prisma } from '../../Infrastructure/config/db.config'

export const updateRefreshToken = async (token: string, userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: token },
  })
}
