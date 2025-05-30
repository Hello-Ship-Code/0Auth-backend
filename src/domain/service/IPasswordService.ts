export interface IPasswordService {
  hash(password: string): Promise<string> | string
  compare(raw: string, hash: string): Promise<boolean> | boolean
}
