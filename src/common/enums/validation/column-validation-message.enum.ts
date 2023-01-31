import { ColumnValidationRule } from './column-validation-rule.enum';

const ColumnValidationMessage = {
  TITLE_REQUIRE: 'Title is required',
  TITLE_MIN_LENGTH: `Title must be at least ${ColumnValidationRule.TITLE_MIN_LENGTH} characters long`,
  TITLE_MAX_LENGTH: `Title must be at most ${ColumnValidationRule.TITLE_MAX_LENGTH} characters long`,
} as const;

export { ColumnValidationMessage };
