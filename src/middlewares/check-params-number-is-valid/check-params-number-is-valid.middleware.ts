import { RequestHandler } from 'express';
import { HttpError } from '@/exceptions';
import { ErrorMessage, HttpCode, RouterParam } from '@/common/enums';

const checkParamsNumberIsValid = (...params: RouterParam[]): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {

    params.forEach((param) => {
      const checkParam = req.params[param];
      const isCheckParamIsNaN = checkParam && isNaN(Number(checkParam));

      if (isCheckParamIsNaN) {
        return next(new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: ErrorMessage.BAD_REQUEST,
        }));
      }
    });

    return next();
  };

  return handler;
};

export { checkParamsNumberIsValid };
