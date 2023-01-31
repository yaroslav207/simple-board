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
   * components:
   *  schemas:
   *    User:
   *      type: object
   *      required:
   *        - email
   *      properties
   *        id:
   *          type: string
   *          description: The auto-generated id of the user
   *        email:
   *          type: string
   *          description: The auto-generated id of the user
   *        username:
   *          type: string
   *          description: The auto-generated id of the user
   *        createdAt:
   *          type: date
   *          description: date
   *        updatedAt:
   *          type: date
   *          description: date
   *
   */
  userRouter.post(
    AuthApiPath.SIGN_IN,
    authenticationMiddleware,
    validateSchemaMiddleware(signInValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authController.signIn(req.body);

      res.json(user).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initAuthRoute };
