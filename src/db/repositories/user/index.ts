import {
  User as TUser,
} from '@/common/types';
import { User as UserM } from '@/db/models';
import {Op} from 'sequelize'

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  public getById(id: number): Promise<TUser | null> {
    return this.#UserModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  public async getByEmail(email: string): Promise<TUser | null> {
    return this.#UserModel.findOne({
      attributes: {exclude: ['password']},
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
  }

  public async getPasswordByEmail(email: string): Promise<string | undefined> {
    const result = await this.#UserModel.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });

    return result?.password;
  }
}

export { User };
