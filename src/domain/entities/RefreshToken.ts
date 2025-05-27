export class RefreshToken {
  constructor(
    public readonly id: string | undefined,
    public readonly userId: string,
    public readonly token: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
