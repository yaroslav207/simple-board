import {Joi} from '@/helpers';
import {
  CardPayloadKey,
  CardValidationMessage,
  CardValidationRule,
} from '@/common/enums';

const updateCard = Joi.object({
  [CardPayloadKey.TITLE]: Joi.string()
    .trim()
    .min(CardValidationRule.TITLE_MIN_LENGTH)
    .max(CardValidationRule.TITLE_MAX_LENGTH)
    .messages({
      'string.min': CardValidationMessage.TITLE_MIN_LENGTH,
      'string.max': CardValidationMessage.TITLE_MAX_LENGTH,
    }),
  [CardPayloadKey.COLUMN_ID]: Joi.number(),
  [CardPayloadKey.ORDER]: Joi.number(),
});

export {updateCard};
