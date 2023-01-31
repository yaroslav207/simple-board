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

  /**
   * @swagger
   *
   * /card/board/:boardId:
   *    get:
   *      tags: [Cards]
   *      summary: get cards by board id
   *      responses:
   *        200:
   *          description: all card by board id
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                    data:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Card'
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
  cardRouter.get(
    CardApiPath.$BOARD_ID,
    checkAuthMiddleware(HttpMethod.GET),
    checkHasPermitBoard('boardId'),
    handleAsyncApi(async (req, res) => {
      const result = await cardController.getByBoardId(Number(req.params.boardId));

      res.json(result).status(HttpCode.OK);
    }),
  );

  /**
   * @swagger
   *
   * /card:
   *    post:
   *      tags: [Cards]
   *      summary: create card
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateCard'
   *      responses:
   *        201:
   *          description: card created
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Card'
   *
   */
  cardRouter.post(
    CardApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createCardValidationSchema),
    handleAsyncApi(async (req, res) => {
      const card = await cardController.create({ ...req.body, userId: (<User>req.user).id });

      res.json(card).status(HttpCode.CREATED);
    }),
  );


  /**
   * @swagger
   *
   * /card/:id:
   *    patch:
   *      tags: [Cards]
   *      summary: update card
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/EditCard'
   *      responses:
   *        200:
   *          description: card updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Card'
   *        404:
   *          description: card not found
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
  cardRouter.patch(
    CardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PATCH),
    validateSchemaMiddleware(updateCardValidationSchema),
    handleAsyncApi(async (req, res) => {
      const card = await cardController.update(Number(req.params.id), req.body);

      res.json(card).status(HttpCode.CREATED);
    }),
  );

  /**
   * @swagger
   *
   * /card/:id:
   *    get:
   *      tags: [Cards]
   *      summary: get card by id
   *      responses:
   *        200:
   *          description: card by id
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Card'
   *        404:
   *          description: card not found
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
  cardRouter.get(
    CardApiPath.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const card = await cardController.getById(Number(req.params.id));

      res.json(card).status(HttpCode.OK);
    }),
  );

  /**
   * @swagger
   *
   * /card/:id:
   *    delete:
   *      tags: [Cards]
   *      summary: delete card by id
   *      responses:
   *        200:
   *          description: deleted
   *          content:
   *            application/json:
   *              schema:
   *                message:
   *                  type: string
   *        404:
   *          description: card not found
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
