import { RequestHandler } from 'express';
import { ValidationSchema } from '@/common/types';
import { HttpError } from '@/exceptions';
import { HttpCode } from '@/common/enums';

const validateSchema = (schema: ValidationSchema): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: JSON.stringify(error),
      });
    }

    next();
  };

  return handler;
};

export { validateSchema };
