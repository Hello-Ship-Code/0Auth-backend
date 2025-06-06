export default class HttpError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = Number(statusCode)

    Object.setPrototypeOf(this, HttpError.prototype)
  }

  static from(message: string, status: number): HttpError {
    return new HttpError(message, Number(status))
  }
}
