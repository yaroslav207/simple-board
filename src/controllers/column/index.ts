import {
  CreateColumnDtoPayload,
  Column as ColumnT, UpdateColumnDtoPayload, Board
} from '@/common/types';
import {column as columnR} from "@/db/repositories";

type Constructor = {
  columnRepository: typeof columnR;
};

class Column {
  #columnRepository: typeof columnR;

  constructor({ columnRepository }: Constructor) {
    this.#columnRepository = columnRepository;
  }

  public getBoardByColumnId(columnId: number): Promise<Board | undefined> {
    return this.#columnRepository.getBoardByColumnId(columnId);
  }

  public getByBoardId(boardId: number): Promise<ColumnT[]> {
    return this.#columnRepository.getByBoardId(boardId);
  }

  public create(payload: CreateColumnDtoPayload): Promise<ColumnT> {
    return this.#columnRepository.create(payload);
  }

  public update(id: number, payload: UpdateColumnDtoPayload): Promise<ColumnT> {
    return this.#columnRepository.update(id, payload);
  }

  public async delete(id: number): Promise<void> {
    await this.#columnRepository.delete(id)
  }
}

export { Column };
