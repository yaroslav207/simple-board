import { Router } from 'express';
import { ApiPath, HttpCode, AuthApiPath } from '@/common/enums';
import { handleAsyncApi } from '@/helpers';
import { auth as authC } from '@/controllers';
import {
  validateSchema as validateSchemaMiddleware,
  authentication as authenticationMiddleware,
} from '@/middlewares';
import {
  signIn as signInValidationSchema,
} from '@/validation-schemas';

type Args = {
  apiRouter: Router;
  authController: typeof authC;
};

const initAuthRoute = ({ apiRouter, authController }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.AUTH, userRouter);

  /**
   * @swagger
   *
   * /auth/sign-in:
   *    post:
   *      summary: sign in user
   *      tags: [Authorization]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - email
   *                - password
   *              properties:
   *                email:
   *                  type: string
   *                  description: user email
   *                password:
   *                  type: string
   *                  description: user password
   *              example:
   *                email: user1@gmail.com
   *                password: "123456"
   *      responses:
   *        200:
   *          description: user data and authorization token
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user:
   *                    $ref: '#/components/schemas/User'
   *                  token:
   *                    type: string
   *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3NDQyNTUwMH0.r0f4rB57QK8QQjFC3MdsJZG8iVYqTHsnr4JuBHpwaOQ
   */
  userRouter.post(
    AuthApiPath.SIGN_IN,
    validateSchemaMiddleware(signInValidationSchema),
    authenticationMiddleware,
    handleAsyncApi(async (req, res) => {
      console.log(req.body)
      const user = await authController.signIn(req.body);

      res.json(user).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initAuthRoute };
