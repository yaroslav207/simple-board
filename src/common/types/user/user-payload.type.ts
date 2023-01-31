import { UserPayloadKey } from '@/common/enums';

type UserPayload = {
  [UserPayloadKey.EMAIL]: string;
};

export type { UserPayload };
