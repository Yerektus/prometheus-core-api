import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
};

export const comparePassword = (
  plainPassword: string,
  hasdedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hasdedPassword);
};
