import passportJwt from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import {Auth} from './auth'
import {Token} from './token'
import {Passport} from "@/controllers/passport";
import {ENV} from "@/common/enums";
import {Board} from "@/controllers/board";
import {Column} from "@/controllers/column";
import {
  user as userRepository,
  board as boardRepository,
  column as columnRepository,
  card as cardRepository,
} from "@/db/repositories";
import {Card} from "@/controllers/card";

const token = new Token({
  secret: <string>ENV.JWT.SECRET,
});

const auth = new Auth({
  userRepository,
  tokenService: token,
});

const passport = new Passport({
  secret: <string>ENV.JWT.SECRET,
  passportJwt,
  LocalStrategy,
  userRepository,
})

const board = new Board({
  boardRepository,
});

const column = new Column({
  columnRepository,
});

const card = new Card({
  cardRepository,
});

export {
  token,
  auth,
  passport,
  board,
  column,
  card,
}

