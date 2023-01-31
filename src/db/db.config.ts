import { Sequelize } from  'sequelize-typescript'
import {User, Board, Column, Card} from "@/db/models";
import {ENV} from "@/common/enums";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: ENV.DB.HOST,
  username: ENV.DB.USERNAME,
  password: ENV.DB.PASSWORD,
  database: ENV.DB.NAME,
  logging: false,
  models: [User, Board, Column, Card],
});
