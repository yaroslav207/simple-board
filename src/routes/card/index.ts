import {Router} from 'express';
import {ApiPath, CardApiPath, HttpCode, HttpMethod} from '@/common/enums';
import {handleAsyncApi} from '@/helpers';
import {card as cardC} from '@/controllers';
import {
  checkAuth as checkAuthMiddleware, checkHasPermitBoard,
  validateSchema as validateSchemaMiddleware,
} from '@/middlewares';
import {User} from "@/common/types";
import {createCard as createCardValidationSchema, updateCard as updateCardValidationSchema} from "@/validation-schemas";

type Args = {
  apiRouter: Router;
  cardController: typeof cardC;
};

const initCardRoute = ({ apiRouter, cardController }: Args): Router => {
  const cardRouter = Router();

  apiRouter.use(ApiPath.CARD, cardRouter);

  cardRouter.get(
    CardApiPath.$BOARD_ID,
    checkAuthMiddleware(HttpMethod.GET),
    checkHasPermitBoard('boardId'),
    handleAsyncApi(async (req, res) => {
      const result = await cardController.getByBoardId(Number(req.params.boardId));

      res.json(result).status(HttpCode.OK);
    }),
  );

  cardRouter.post(
    CardApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createCardValidationSchema),
    handleAsyncApi(async (req, res) => {
      const card = await cardController.create({ ...req.body, userId: (<User>req.user).id });

      res.json(card).status(HttpCode.CREATED);
    }),
  );

  cardRouter.patch(
    CardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PATCH),
    validateSchemaMiddleware(updateCardValidationSchema),
    handleAsyncApi(async (req, res) => {
      const card = await cardController.update(Number(req.params.id), req.body);

      res.json(card).status(HttpCode.CREATED);
    }),
  );

  cardRouter.get(
    CardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const card = await cardController.getById(Number(req.params.id));

      res.json(card).status(HttpCode.OK);
    }),
  );

  cardRouter.delete(
    CardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    handleAsyncApi(async (req, res) => {
      await cardController.delete(Number(req.params.id));

      res.send('Deleted').status(HttpCode.OK);
    }),
  );

  return cardRouter;
};

export { initCardRoute };
