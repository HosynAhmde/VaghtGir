import * as bcrypt from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Hash {
  private static saltRounds = 10;

  static async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(data, salt);
  }

  static async compare(data: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(data, hashedData);
  }
}
