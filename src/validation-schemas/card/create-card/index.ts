import {Joi} from '@/helpers';
import {
  CardPayloadKey,
  CardValidationMessage,
  CardValidationRule,
} from '@/common/enums';

const createCard = Joi.object({
  [CardPayloadKey.TITLE]: Joi.string()
    .trim()
    .required()
    .min(CardValidationRule.TITLE_MIN_LENGTH)
    .max(CardValidationRule.TITLE_MAX_LENGTH)
    .messages({
      'string.empty': CardValidationMessage.TITLE_REQUIRE,
      'string.min': CardValidationMessage.TITLE_MIN_LENGTH,
      'string.max': CardValidationMessage.TITLE_MAX_LENGTH,
    }),
  [CardPayloadKey.BOARD_ID]: Joi.number()
    .required(),
  [CardPayloadKey.COLUMN_ID]: Joi.number()
    .required()
});

export {createCard};
