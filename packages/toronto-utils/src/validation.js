const isUsernameValid = username => {
  if (username === '') {
    return { valid: false, msg: 'Empty' };
  }

  if (username.length > 40) {
    return { valid: false, msg: 'Max length is 40' };
  }

  return { valid: true };
};

const appendFailureMessage = (result, msg) => {
  result.valid = false;
  result.msg.push(msg);
};

const isPasswordValid = password => {
  let result = { valid: true, msg: [] };

  const atLeastEightCharacters = new RegExp('(?=.{8,})');
  if (!atLeastEightCharacters.test(password)) {
    appendFailureMessage(result, 'Password must be at least 8 characters long');
  }

  const atLeastOneLower = new RegExp('(?=.*[a-z])');
  if (!atLeastOneLower.test(password)) {
    appendFailureMessage(
      result,
      'Password must contain at least one lowercase character'
    );
  }

  const atLeastOneUpper = new RegExp('(?=.*[A-Z])');
  if (!atLeastOneUpper.test(password)) {
    appendFailureMessage(
      result,
      'Password must contain at least one uppercase character'
    );
  }

  const atLeastOneDigit = new RegExp('(?=.*[0-9])');
  if (!atLeastOneDigit.test(password)) {
    appendFailureMessage(
      result,
      'Password must contain at least one numeric character'
    );
  }

  const atLeastOneSpecial = new RegExp(
    '(?=.[\\[\\]!@#$%^&*(){};:\'",.<>/?`~|\\\\])'
  );
  if (!atLeastOneSpecial.test(password)) {
    appendFailureMessage(
      result,
      'Password must contain at least one special character'
    );
  }

  return result;
};

export { isUsernameValid, isPasswordValid };
