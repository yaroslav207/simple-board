import { BoardValidationRule } from './board-validation-rule.enum';

const BoardValidationMessage = {
  TITLE_REQUIRE: 'Title is required',
  TITLE_MIN_LENGTH: `Title must be at least ${BoardValidationRule.TITLE_MIN_LENGTH} characters long`,
  TITLE_MAX_LENGTH: `Title must be at most ${BoardValidationRule.TITLE_MAX_LENGTH} characters long`,
} as const;

export { BoardValidationMessage };
