import {
  Card as TCard, Board as TBoard, CreateCardDtoPayload, UpdateCardDtoPayload
} from '@/common/types';
import {Board, Card as CardM} from '@/db/models';
import {Op} from 'sequelize'

type Constructor = {
  CardModel: typeof CardM;
};

class Card {
  #CardModel: typeof CardM;

  constructor({ CardModel }: Constructor) {
    this.#CardModel = CardModel;
  }

  public getById(id: number): Promise<TCard | null> {
    return this.#CardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      },
    });
  }

  public async getBoardById(id: number): Promise<TBoard | undefined> {
    const card = await this.#CardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      },
      include: [
        {model: Board, as: 'board'}
      ]
    });

    return card?.board
  }

  public getByBoardId(boardId: number): Promise<TCard[]> {
    return this.#CardModel.findAll({
      where: {
        boardId: {
          [Op.eq]: boardId
        }
      }
    });
  }

  public create(payload: CreateCardDtoPayload): Promise<TCard> {
    return this.#CardModel.create(payload)
  }

  public async update(id: number, payload: UpdateCardDtoPayload): Promise<TCard> {
    const card = await this.#CardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });

    return card?.update(payload) as Promise<TCard>
  }

  public async delete(id: number): Promise<void> {
    await this.#CardModel.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
}

export { Card };
