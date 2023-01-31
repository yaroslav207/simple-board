import { Joi } from '@/helpers';
import {
  BoardPayloadKey,
  BoardValidationMessage,
  BoardValidationRule,
} from '@/common/enums';

const createBoard = Joi.object({
  [BoardPayloadKey.TITLE]: Joi.string()
    .trim()
    .required()
    .min(BoardValidationRule.TITLE_MIN_LENGTH)
    .max(BoardValidationRule.TITLE_MAX_LENGTH)
    .messages({
      'string.empty': BoardValidationMessage.TITLE_REQUIRE,
      'string.min': BoardValidationMessage.TITLE_MIN_LENGTH,
      'string.max': BoardValidationMessage.TITLE_MAX_LENGTH,
    }),
  [BoardPayloadKey.DESCRIPTION]: Joi.string()
});

export { createBoard };
