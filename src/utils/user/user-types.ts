export type userSignupTypes = {
  email: string
  userName: string
  password: string
}

export type userLoginTypes = {
  email: string
  password: string
}

export type User = { id: string; email: string; userName: string; refreshToken: string }
