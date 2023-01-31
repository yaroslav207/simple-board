import {Router} from 'express';
import {ApiPath, ColumnApiPath, HttpCode, HttpMethod} from '@/common/enums';
import {handleAsyncApi} from '@/helpers';
import {column as columnC} from '@/controllers';
import {
  checkAuth as checkAuthMiddleware,
  validateSchema as validateSchemaMiddleware,
} from '@/middlewares';
import {createColumn as createColumnValidationSchema,
  updateColumn as updateColumnValidationSchema} from "@/validation-schemas";

type Args = {
  apiRouter: Router;
  columnController: typeof columnC;
};

const initColumnRoute = ({ apiRouter, columnController }: Args): Router => {
  const columnRouter = Router();

  apiRouter.use(ApiPath.COLUMN, columnRouter);

  columnRouter.get(
    ColumnApiPath.$BOARD_ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const result = await columnController.getByBoardId(Number(req.params.boardId));

      res.json(result).status(HttpCode.OK);
    }),
  );

  columnRouter.post(
    ColumnApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createColumnValidationSchema),
    handleAsyncApi(async (req, res) => {
      const column = await columnController.create(req.body);

      res.json(column).status(HttpCode.CREATED);
    }),
  );

  columnRouter.patch(
    ColumnApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PATCH),
    validateSchemaMiddleware(updateColumnValidationSchema),
    handleAsyncApi(async (req, res) => {
      const column = await columnController.update(Number(req.params.id), req.body);

      res.json(column).status(HttpCode.OK);
    }),
  );

  columnRouter.delete(
    ColumnApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    handleAsyncApi(async (req, res) => {
      await columnController.delete(Number(req.params.id));

      res.send('Deleted').status(HttpCode.OK);
    }),
  );

  return columnRouter;
};

export { initColumnRoute };
