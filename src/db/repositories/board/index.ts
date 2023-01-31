import {
  Board as TBoard, BoardCreateDTOPayload, BoardLoadFilter, ResponseList,
} from '@/common/types';
import {Board as BoardM, Column} from '@/db/models';
import {Op} from 'sequelize'

type Constructor = {
  BoardModel: typeof BoardM;
};

class Board {
  #BoardModel: typeof BoardM;

  constructor({ BoardModel }: Constructor) {
    this.#BoardModel = BoardModel;
  }

  public getById(id: number): Promise<TBoard | null> {
    return this.#BoardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      },
      include: [
        {model: Column, as: Column.tableName}
      ]
    });
  }

  public async getByQuery(filter: BoardLoadFilter): Promise<ResponseList<TBoard>> {
    const data = await this.#BoardModel.findAll({
      offset: filter.offset || 0,
      limit: filter.limit || 5,
      where: {
        userId: {
          [Op.eq]: filter.userId
        }
      }
    });

    const totalCount = await this.#BoardModel.count({
      where: {
        userId: {
          [Op.eq]: filter.userId
        }
      }
    })

    return {
      data,
      totalCount
    }
  }

  public create(payload: BoardCreateDTOPayload): Promise<TBoard> {
    return this.#BoardModel.create(payload)
  }

  public async delete(id: number): Promise<void> {
    await this.#BoardModel.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
}

export { Board };
