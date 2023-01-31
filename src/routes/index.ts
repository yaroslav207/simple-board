import { Router } from 'express';
import { ENV } from '@/common/enums';
import {initAuthRoute} from "@/routes/auth";
import {initBoardRoute} from "@/routes/board";

import {
  auth as authController,
  board as boardController,
  column as columnController,
  card as cardController
} from '@/controllers';
import {initColumnRoute} from "@/routes/column";
import {initCardRoute} from "@/routes/card";

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API.V1_PREFIX, apiRouter);

  initAuthRoute({
    apiRouter,
    authController,
  });

  initBoardRoute({
    apiRouter,
    boardController,
  });

  initColumnRoute({
    apiRouter,
    columnController,
  });

  initCardRoute({
    apiRouter,
    cardController,
  });

  return apiRouter;
};

export { initApi };
