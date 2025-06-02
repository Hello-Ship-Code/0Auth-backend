import { Email } from '../valueObjects/Email'
import { Password } from '../valueObjects/Password'
import { Username } from '../../Domain/valueObjects/Username'

export class User {
  constructor(
    public readonly id: string | undefined,
    private email: Email,
    private password: Password,
    private username: Username,
  ) {}
}
