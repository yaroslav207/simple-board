import express, {json, urlencoded} from 'express';
import "reflect-metadata";
import {ENV} from '@/common/enums';
import {sequelize} from "./db/db.config";
import {initApi} from "@/routes";
import passport from "passport";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { passport as passportController } from '@/controllers';
import {
  identifyUser as identifyUserMiddleware,
  handleError as handleErrorMiddleware,
} from "@/middlewares";
import path from "path";

const app = express();

app.use(json({limit: '100mb'}));
app.use(urlencoded({extended: true, limit: '100mb'}));
app.use(passport.initialize());
passportController.init(passport)
app.use(identifyUserMiddleware);

const optionSwagger: swaggerJSDoc.OAS3Options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api doc",
      version: "1.0.0",
      description: "Board apis"
    },
    servers: [
      {
        url: "http://localhost:3001"
      }
    ],
  },
  apis: [
    './src/docs/*.yaml',
  ]
}

const spec = swaggerJSDoc(optionSwagger)

console.log(spec)

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(spec))

initApi(app);

app.use(handleErrorMiddleware);

(async () => {
  try {
    await sequelize.sync({force: false})

    app.listen(ENV.APP.SERVER_PORT, () => {
      console.log(
        `Listening to connections on Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
