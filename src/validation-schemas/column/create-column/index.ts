import { Joi } from '@/helpers';
import {
  ColumnPayloadKey,
  ColumnValidationMessage,
  ColumnValidationRule,
} from '@/common/enums';

const createColumn = Joi.object({
  [ColumnPayloadKey.TITLE]: Joi.string()
    .trim()
    .required()
    .min(ColumnValidationRule.TITLE_MIN_LENGTH)
    .max(ColumnValidationRule.TITLE_MAX_LENGTH)
    .messages({
      'string.empty': ColumnValidationMessage.TITLE_REQUIRE,
      'string.min': ColumnValidationMessage.TITLE_MIN_LENGTH,
      'string.max': ColumnValidationMessage.TITLE_MAX_LENGTH,
    }),
  [ColumnPayloadKey.BOARD_ID]: Joi.number()
    .required(),
  [ColumnPayloadKey.ORDER]: Joi.number()
    .required()
});

export { createColumn };
