import {
  Board as BoardModel,
  User as UserModel,
  Column as ColumnModel,
  Card as CardModel
} from '@/db/models';
import { User } from './user';
import { Board } from './board';
import {Column} from "@/db/repositories/column";
import {Card} from "@/db/repositories/card";

const user = new User({
  UserModel,
});

const board = new Board({
  BoardModel,
});

const column = new Column({
  ColumnModel,
});

const card = new Card({
  CardModel,
});

export {
  user,
  board,
  column,
  card,
};
