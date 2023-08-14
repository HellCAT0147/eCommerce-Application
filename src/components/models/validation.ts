enum MailErrors {
  at = "Email must contain an '@'.",
  domain = 'Email must contain a domain name (e.g., example.com).',
  space = 'Email must not contain leading or trailing whitespace.',
  format = 'Email must be properly formatted (e.g., user@example.com).',
}

enum PasswordErrors {
  lower = 'Password must contain at least one lowercase letter (a-z).',
  upper = 'Password must contain at least one uppercase letter (A-Z).',
  digit = 'Password must contain at least one digit (0-9).',
  char = 'Password must contain at least one special character (e.g., !@#$%^&*).',
  short = 'Password must be at least 8 characters long.',
  space = 'Password must not contain whitespace.',
}

type Errors = MailErrors | PasswordErrors;

export { MailErrors, PasswordErrors, Errors };
