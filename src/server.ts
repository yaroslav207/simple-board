import express, {json, urlencoded} from 'express';
import "reflect-metadata";
import {ENV} from '@/common/enums';
import {sequelize} from "./db/db.config";
import {initApi} from "@/routes";
import passport from "passport";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import {passport as passportController} from '@/controllers';
import {
  handleError as handleErrorMiddleware,
  checkAuth as checkAuthMiddleware,
} from "@/middlewares";
import {DocPath} from "@/common/enums/api";

const app = express();

const optionSwagger: swaggerJSDoc.OAS3Options = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Boards API',
      version: '1.0.0',
      description: 'Simple boards api'
    },
    host: 'localhost:3001',
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    './src/docs/*.yaml',
    './src/routes/**/*.ts'
  ]
}

const spec = swaggerJSDoc(optionSwagger)

app.use(DocPath.SWAGGER, swaggerUI.serve, swaggerUI.setup(spec))

app.use(json({limit: '100mb'}));
app.use(urlencoded({extended: true, limit: '100mb'}));
app.use(passport.initialize());
passportController.init(passport)
app.use(checkAuthMiddleware);

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
