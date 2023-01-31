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

  /**
   * @swagger
   *
   * /column/board/:boardId:
   *    get:
   *      tags: [Columns]
   *      summary: get columns by board id
   *      responses:
   *        200:
   *          description: all columns by board id
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                    data:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Column'
   *                    totalCount:
   *                      type: number
   *                      example: 1
   *        404:
   *          description: board not found
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        403:
   *          description: forbidden
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        500:
   *          description: some server error
   *
   */
  columnRouter.get(
    ColumnApiPath.$BOARD_ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const result = await columnController.getByBoardId(Number(req.params.boardId));

      res.json(result).status(HttpCode.OK);
    }),
  );

  /**
   * @swagger
   *
   * /column:
   *    post:
   *      tags: [Columns]
   *      summary: create column
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateColumn'
   *      responses:
   *        201:
   *          description: column created
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Column'
   *        500:
   *          description: some server error
   *
   */
  columnRouter.post(
    ColumnApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createColumnValidationSchema),
    handleAsyncApi(async (req, res) => {
      const column = await columnController.create(req.body);

      res.json(column).status(HttpCode.CREATED);
    }),
  );

  /**
   * @swagger
   *
   * /column/:id:
   *    patch:
   *      tags: [Columns]
   *      summary: update column
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/EditColumn'
   *      responses:
   *        200:
   *          description: card updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Card'
   *        404:
   *          description: column not found
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        403:
   *          description: forbidden
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        500:
   *          description: some server error
   */
  columnRouter.patch(
    ColumnApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PATCH),
    validateSchemaMiddleware(updateColumnValidationSchema),
    handleAsyncApi(async (req, res) => {
      const column = await columnController.update(Number(req.params.id), req.body);

      res.json(column).status(HttpCode.OK);
    }),
  );

  /**
   * @swagger
   *
   * /column/:id:
   *    delete:
   *      tags: [Columns]
   *      summary: delete column by id
   *      responses:
   *        200:
   *          description: deleted
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        404:
   *          description: column not found
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        403:
   *          description: forbidden
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        500:
   *          description: some server error
   */
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
