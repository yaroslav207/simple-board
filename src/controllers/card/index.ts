import {
  CreateCardDtoPayload,
  Card as CardT, UpdateCardDtoPayload, Board
} from '@/common/types';
import {card as cardR} from "@/db/repositories";
import {HttpError} from "@/exceptions";
import {ErrorMessage, HttpCode} from "@/common/enums";

type Constructor = {
  cardRepository: typeof cardR;
};

class Card {
  #cardRepository: typeof cardR;

  constructor({ cardRepository }: Constructor) {
    this.#cardRepository = cardRepository;
  }

  public getByBoardId(boardId: number): Promise<CardT[]> {
    return this.#cardRepository.getByBoardId(boardId);
  }

  public async getById(id: number): Promise<CardT> {
    const card = await this.#cardRepository.getById(id);

    if (!card) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.CARD_NOT_FOUND,
      });
    }

    return card;
  }

  public async getBoardByCardId(id: number): Promise<Board> {
    const board = await this.#cardRepository.getBoardById(id);

    if (!board) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.CARD_NOT_FOUND,
      });
    }

    return board;
  }

  public create(payload: CreateCardDtoPayload): Promise<CardT> {
    return this.#cardRepository.create(payload);
  }

  public update(id: number, payload: UpdateCardDtoPayload): Promise<CardT> {
    return this.#cardRepository.update(id, payload);
  }

  public async delete(id: number): Promise<void> {
    await this.#cardRepository.delete(id)
  }
}

export { Card };
