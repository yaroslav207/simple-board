import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJwt from 'passport-jwt';
import { user as userRepository } from '@/db/repositories';
import {
  HttpCode,
  ErrorMessage,
  StrategyName,
  UserPayloadKey,
} from '@/common/enums';
import { checkIsCryptsEqual } from '@/helpers';

type Constructor = {
  secret: string;
  passportJwt: typeof passportJwt;
  LocalStrategy: typeof LocalStrategy;
  userRepository: typeof userRepository;
};

class Passport {
  #options: passportJwt.StrategyOptions;
  #JwtStrategy;
  #LocalStrategy;
  #userRepository;

  constructor({
    secret,
    passportJwt,
    LocalStrategy,
    userRepository,
  }: Constructor) {
    this.#options = {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    };
    this.#JwtStrategy = passportJwt.Strategy;
    this.#LocalStrategy = LocalStrategy;
    this.#userRepository = userRepository;
  }

  private getLoginStrategy(): passportJwt.Strategy {
    return new this.#LocalStrategy(
      {
        usernameField: UserPayloadKey.EMAIL,
      },
      async (email, password, done) => {
        try {
          const user = await this.#userRepository.getByEmail(email);
          if (!user) {
            return done(
              {
                status: HttpCode.UNAUTHORIZED,
                message: ErrorMessage.USER_NOT_FOUND,
              },
              false,
            );
          }
          const hashPassword = await this.#userRepository.getPasswordByEmail(email);

          const isCryptsEqual = await checkIsCryptsEqual(
            password,
            hashPassword,
          );

          return isCryptsEqual
            ? done(null, user)
            : done(
              {
                status: HttpCode.UNAUTHORIZED,
                message: ErrorMessage.WRONG_PASSWORD,
              },
              false,
            );
        } catch (err) {
          return done(err);
        }
      },
    );
  }

  private getJwtStrategy(): passportJwt.Strategy {
    return new this.#JwtStrategy(this.#options, async ({ userId }, done) => {
      try {
        const user = await this.#userRepository.getById(userId);

        if (user) {
          return done(null, user);
        }

        return done(
          {
            status: HttpCode.UNAUTHORIZED,
            message: ErrorMessage.BAD_TOKEN,
          },
        );
      } catch (err) {
        return done(err);
      }
    });
  }

  public init(passport: PassportStatic): void {
    passport.use(this.getJwtStrategy());
    passport.use(StrategyName.LOGIN, this.getLoginStrategy());
  }
}

export { Passport };
