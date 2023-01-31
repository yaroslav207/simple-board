import {
  BoardLoadFilter,
  BoardCreateDTOPayload,
  Board as BoardT, ResponseList, Board as TBoard,
} from '@/common/types';
import {board as boardR} from "@/db/repositories";
import {HttpError} from "@/exceptions";
import {ErrorMessage, HttpCode} from "@/common/enums";

type Constructor = {
  boardRepository: typeof boardR;
};

class Board {
  #boardRepository: typeof boardR;

  constructor({ boardRepository }: Constructor) {
    this.#boardRepository = boardRepository;
  }

  public getByQuery(filter: BoardLoadFilter): Promise<ResponseList<TBoard>> {
    return this.#boardRepository.getByQuery(filter);
  }

  public async getById(id: number): Promise<BoardT> {
    const board = await this.#boardRepository.getById(id);

    if (!board) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.BOARDS_NOT_FOUND,
      });
    }

    return board;
  }

  public create(payload: BoardCreateDTOPayload): Promise<BoardT> {
    return this.#boardRepository.create(payload);
  }

  public async delete(id: number): Promise<void> {
    await this.#boardRepository.delete(id)
  }
}

export { Board };
