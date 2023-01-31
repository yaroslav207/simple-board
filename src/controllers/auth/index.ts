import {
  UserSignInPayload,
  SignResponse,
} from '@/common/types';
import { checkIsCryptsEqual } from '@/helpers';
import { HttpError } from '@/exceptions';
import { HttpCode, ErrorMessage } from '@/common/enums';
import { token } from '@/controllers';
import {user as userR} from "@/db/repositories";

type Constructor = {
  userRepository: typeof userR;
  tokenService: typeof token;
};

class Auth {
  #userRepository: typeof userR;
  #tokenService: typeof token;

  constructor({ userRepository, tokenService }: Constructor) {
    this.#userRepository = userRepository;
    this.#tokenService = tokenService;
  }

  public async signIn(payload: UserSignInPayload): Promise<SignResponse> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    }

    const hashPassword = await this.#userRepository.getPasswordByEmail(email);

    const isCryptsEqual = await checkIsCryptsEqual(password, hashPassword);

    if (!isCryptsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.WRONG_PASSWORD,
      });
    }

    const token = this.#tokenService.create({
      userId: <number>user.id,
    });

    return {
      token,
      user,
    };
  }
}

export { Auth };
