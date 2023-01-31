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
    /**
     * @swagger
     *
     * /board:
     *    get:
     *      tags: [Boards]
     *      summary: get all boards of an authorized user
     *      responses:
     *        200:
     *          description: all boards of an authorized user
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                    data:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/Board'
     *                    totalCount:
     *                      type: number
     *                      example: 1
     */
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

  /**
   * @swagger
   *
   * /board:
   *    post:
   *      tags: [Boards]
   *      summary: create board
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateBoard'
   *      responses:
   *        201:
   *          description: board created
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Board'
   */
  boardRouter.post(
    BoardApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createBoardValidationSchema),
    handleAsyncApi(async (req, res) => {
      const board = await boardController.create({ ...req.body, userId: (<User>req.user).id });

      res.json(board).status(HttpCode.CREATED);
    }),
  );

  /**
   * @swagger
   *
   * /board/:id:
   *    get:
   *      tags: [Boards]
   *      summary: get board by id
   *      responses:
   *        200:
   *          description: board by id
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Board'
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
  boardRouter.get(
    BoardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    checkHasPermitBoard(),
    handleAsyncApi(async (req, res) => {
      const board = await boardController.getById(Number(req.params.id));

      res.json(board).status(HttpCode.OK);
    }),
  );

  /**
   * @swagger
   *
   * /board/:id:
   *    delete:
   *      tags: [Boards]
   *      summary: get board by id
   *      responses:
   *        200:
   *          description: deleted
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
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
  boardRouter.delete(
    BoardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkHasPermitBoard(),
    handleAsyncApi(async (req, res) => {
      await boardController.delete(Number(req.params.id));

      res.json({
        message: 'Deleted'
      }).status(HttpCode.OK);
    }),
  );

  return boardRouter;
};

export { initBoardRoute };
