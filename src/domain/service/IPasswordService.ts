export interface IPasswordService {
  hash(password: string): Promise<string>
  compare(raw: string, hash: string): Promise<boolean>
}
