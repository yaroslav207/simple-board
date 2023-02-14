import { RequestHandler } from 'express';
import {board as boardControllers, column as columnControllers} from '@/controllers';
import {ErrorMessage, HttpCode} from "@/common/enums";
import {HttpError} from "@/exceptions";
import {User} from "@/common/types";


const checkHasPermitColumn = (columnIdKey: string = "id"): RequestHandler => async (req, res, next) => {
  const board = await columnControllers.getBoardByColumnId(Number(req.params[columnIdKey]))

  if (!board) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: ErrorMessage.COLUMN_NOT_FOUND
    })
  }

  if (board.userId !== (<User>req.user).id) {
    throw new HttpError({
      status: HttpCode.FORBIDDEN,
      message: ErrorMessage.FORBIDDEN
    })
  }

  next()
};

const checkHasPermitCreateColumn: RequestHandler = async (req, res, next) => {
  const board = await boardControllers.getById(Number(req.body.boardId))

  if (!board) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: ErrorMessage.BOARDS_NOT_FOUND
    })
  }

  if (board.userId !== (<User>req.user).id) {
    throw new HttpError({
      status: HttpCode.FORBIDDEN,
      message: ErrorMessage.FORBIDDEN
    })
  }

  next()
};

export { checkHasPermitColumn, checkHasPermitCreateColumn };
