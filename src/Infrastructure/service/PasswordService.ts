import bcrypt from 'bcrypt'
import { env } from '../config/env.config'
import { IPasswordService } from '../../domain/service/IPasswordService'

export class PasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.SALTROUNDS)
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash)
  }
}
