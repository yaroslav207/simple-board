import {Router} from 'express';
import {ApiPath, BoardApiPath, HttpCode, HttpMethod} from '@/common/enums';
import {handleAsyncApi} from '@/helpers';
import {board as boardC} from '@/controllers';
import {
  checkAuth as checkAuthMiddleware, checkHasPermitBoard,
  validateSchema as validateSchemaMiddleware,
} from '@/middlewares';
import {BoardLoadFilter, User} from "@/common/types";
import {createBoard as createBoardValidationSchema} from "@/validation-schemas";

type Args = {
  apiRouter: Router;
  boardController: typeof boardC;
};

const initBoardRoute = ({ apiRouter, boardController }: Args): Router => {
  const boardRouter = Router();

  apiRouter.use(ApiPath.BOARD, boardRouter);

  boardRouter.get(
    BoardApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const result = await boardController.getByQuery({
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
        userId: (<User>req.user).id,
      } as BoardLoadFilter);

      res.json(result).status(HttpCode.OK);
    }),
  );

  boardRouter.post(
    BoardApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createBoardValidationSchema),
    handleAsyncApi(async (req, res) => {
      const board = await boardController.create({ ...req.body, userId: (<User>req.user).id });

      res.json(board).status(HttpCode.CREATED);
    }),
  );

  boardRouter.get(
    BoardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    checkHasPermitBoard(),
    handleAsyncApi(async (req, res) => {
      const board = await boardController.getById(Number(req.params.id));

      res.json(board).status(HttpCode.OK);
    }),
  );

  boardRouter.delete(
    BoardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkHasPermitBoard(),
    handleAsyncApi(async (req, res) => {
      await boardController.delete(Number(req.params.id));

      res.send('Deleted').status(HttpCode.OK);
    }),
  );

  return boardRouter;
};

export { initBoardRoute };
