import { RequestHandler } from 'express';
import { ValidationSchema } from '@/common/types';
import { HttpCode } from '@/common/enums';

const validateSchema = (schema: ValidationSchema): RequestHandler => {
  const handler: RequestHandler = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(HttpCode.BAD_REQUEST).json(error.details.reduce((acc, err) => {
        return {...acc, [<string>err.context?.key || 'data']: err.message}
      }, {}))
    }

    next();
  };

  return handler;
};

export { validateSchema };
