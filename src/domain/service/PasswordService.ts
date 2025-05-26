import bcrypt from 'bcrypt'
import { env } from '../../config/env.config'
import { IPasswordHasher } from '../interface/IPasswordHasher'

export class PasswordService implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.SALTROUNDS)
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash)
  }
}
