import { RequestHandler } from 'express';
import {board as boardController} from '@/controllers';
import {ErrorMessage, HttpCode} from "@/common/enums";
import {HttpError} from "@/exceptions";
import {User} from "@/common/types";


const checkHasPermitBoard = (boardIdKey: string = "id"): RequestHandler => async (req, res, next) => {
  const board = await boardController.getById(Number(req.params[boardIdKey]))

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

export { checkHasPermitBoard };
