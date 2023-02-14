import { Response, Request, NextFunction, RequestHandler } from 'express';
import { jwt as jwtMiddleWare } from '../jwt';
import {PUBLIC_ROUTES} from "@/common/constants/app";

const checkAuth: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const isPublicRoute = PUBLIC_ROUTES.some(route =>
      route.path === req.path && (!route.method || route.method === req.method))

    !isPublicRoute
      ? jwtMiddleWare(req, res, next)
      : next();
};

export { checkAuth };
