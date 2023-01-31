import {
  Board as TBoard,
  Column as TColumn, CreateColumnDtoPayload, UpdateColumnDtoPayload
} from '@/common/types';
import { Column as ColumnM, Board as BoardM } from '@/db/models';
import {Op} from 'sequelize'

type Constructor = {
  ColumnModel: typeof ColumnM;
};

class Column {
  #ColumnModel: typeof ColumnM;

  constructor({ ColumnModel }: Constructor) {
    this.#ColumnModel = ColumnModel;
  }

  public async getBoardByColumnId(columnId: number): Promise<TBoard | undefined> {
    const column = await this.#ColumnModel.findOne({
      where: {
        id: {
          [Op.eq]: columnId
        }
      },
      include: [
        {model: BoardM, as: 'board'}
      ]
    });

    return column?.board
  }

  public getByBoardId(boardId: number): Promise<TColumn[]> {
    return this.#ColumnModel.findAll({
      where: {
        boardId: {
          [Op.eq]: boardId
        }
      }
    });
  }

  public create(payload: CreateColumnDtoPayload): Promise<TColumn> {
    return this.#ColumnModel.create(payload)
  }

  public async update(id: number, payload: UpdateColumnDtoPayload): Promise<TColumn> {
    const column = await this.#ColumnModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });

    return column?.update(payload) as Promise<TColumn>
  }

  public async delete(id: number): Promise<void> {
    await this.#ColumnModel.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
}

export { Column };
