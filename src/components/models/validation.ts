enum MailErrors {
  at = "Email address must contain an '@' symbol separating local part and domain name.",
  domain = 'Email address must contain a domain name (e.g., example.com).',
  space = 'Email address must not contain leading or trailing whitespace.',
  format = 'Email address must be properly formatted (e.g., user@example.com).',
}

export default MailErrors;
