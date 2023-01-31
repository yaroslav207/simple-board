import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  PASSWORD_WRONG: 'Password is wrong',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
} as const;

export { UserValidationMessage };
