import { Response, Request, NextFunction, RequestHandler } from 'express';
import { jwt as jwtMiddleWare } from '../jwt';
import { HttpMethod } from '@/common/enums';

const checkAuth = (...methods: HttpMethod[]): RequestHandler => {
  const handler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    methods.some((method) => method === req.method)
      ? jwtMiddleWare(req, res, next)
      : next();
  };

  return handler;
};

export { checkAuth };
