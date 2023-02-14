import { Sequelize } from  'sequelize-typescript'
import {User, Board, Column, Card} from "@/db/models";
import {ENV} from "@/common/enums";
import {DEFAULT_DB_PORT, DB_DIALECT} from "@/common/constants"

export const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  host: ENV.DB.HOST,
  username: ENV.DB.USERNAME,
  password: ENV.DB.PASSWORD,
  port: Number(ENV.DB.PORT || DEFAULT_DB_PORT),
  database: ENV.DB.NAME,
  logging: false,
  models: [User, Board, Column, Card],
});
