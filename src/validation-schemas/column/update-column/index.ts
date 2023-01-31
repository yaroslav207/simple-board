import { Joi } from '@/helpers';
import {
  ColumnPayloadKey,
  ColumnValidationMessage,
  ColumnValidationRule,
} from '@/common/enums';

const updateColumn = Joi.object({
  [ColumnPayloadKey.TITLE]: Joi.string()
    .trim()
    .min(ColumnValidationRule.TITLE_MIN_LENGTH)
    .max(ColumnValidationRule.TITLE_MAX_LENGTH)
    .messages({
      'string.min': ColumnValidationMessage.TITLE_MIN_LENGTH,
      'string.max': ColumnValidationMessage.TITLE_MAX_LENGTH,
    }),
  [ColumnPayloadKey.ORDER]: Joi.number()
});

export { updateColumn };
