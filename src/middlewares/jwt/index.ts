import passport from 'passport';
import {ErrorMessage, HttpCode, StrategyName} from '@/common/enums';
import {RequestHandler} from "express";

const jwt: RequestHandler = (req, res, next) => {
  passport.authenticate(StrategyName.JWT, {session: false},(err, user) => {
    if (err) {
      next(err);
    }
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: ErrorMessage.UNAUTHORIZED_TOKEN
      })
    }

    req.user = user;

    return next();
  })(req, res, next);
};

export { jwt };
