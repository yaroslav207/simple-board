import { CardValidationRule } from './card-validation-rule.enum';

const CardValidationMessage = {
  TITLE_REQUIRE: 'Title is required',
  TITLE_MIN_LENGTH: `Title must be at least ${CardValidationRule.TITLE_MIN_LENGTH} characters long`,
  TITLE_MAX_LENGTH: `Title must be at most ${CardValidationRule.TITLE_MAX_LENGTH} characters long`,
} as const;

export { CardValidationMessage };
