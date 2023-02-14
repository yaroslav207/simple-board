import { ErrorRequestHandler } from 'express';
import { HttpError } from '@/exceptions';
import {ErrorMessage, HttpCode} from '@/common/enums';

const handleError: ErrorRequestHandler = (err: HttpError, _req, res, _next) => {
  const { status = HttpCode.INTERNAL_SERVER_ERROR, message = ErrorMessage.INTERNAL_SERVER_ERROR } = err;

  return res.status(status).json({
    message,
  });
};

export { handleError };
