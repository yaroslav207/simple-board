import { ErrorRequestHandler } from 'express';
import { HttpError } from '@/exceptions';
import { HttpCode } from '@/common/enums';

const handleError: ErrorRequestHandler = (err: HttpError, _req, res, _next) => {
  const { status = HttpCode.INTERNAL_SERVER_ERROR, message } = err;

  return res.status(status).send({
    message,
  });
};

export { handleError };
