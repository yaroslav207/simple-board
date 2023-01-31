import { RequestHandler } from 'express';
import {card as cardController} from '@/controllers';
import {ErrorMessage, HttpCode} from "@/common/enums";
import {HttpError} from "@/exceptions";
import {User} from "@/common/types";


const checkHasPermitCard = (cardIdKey: string = "id"): RequestHandler => async (req, res, next) => {
  const board = await cardController.getBoardByCardId(Number(req.params[cardIdKey]))

  if (!board) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: ErrorMessage.CARD_NOT_FOUND
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

export { checkHasPermitCard };
