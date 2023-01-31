import { User } from '../index';

type SignResponse = {
  token: string;
  user: User;
};

export type { SignResponse };
