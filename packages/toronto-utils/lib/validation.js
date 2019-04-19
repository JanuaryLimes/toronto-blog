"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPasswordValid = exports.isUsernameValid = void 0;

var isUsernameValid = function isUsernameValid(username) {
  if (username === '') {
    return {
      valid: false,
      msg: 'Empty'
    };
  }

  if (username.length > 40) {
    return {
      valid: false,
      msg: 'Max length is 40'
    };
  }

  return {
    valid: true
  };
};

exports.isUsernameValid = isUsernameValid;

var appendFailureMessage = function appendFailureMessage(result, msg) {
  result.valid = false;
  result.msg.push(msg);
};

var isPasswordValid = function isPasswordValid(password) {
  var result = {
    valid: true,
    msg: []
  };
  var atLeastEightCharacters = new RegExp('(?=.{8,})');

  if (!atLeastEightCharacters.test(password)) {
    appendFailureMessage(result, 'Password must be at least 8 characters long');
  }

  var atLeastOneLower = new RegExp('(?=.*[a-z])');

  if (!atLeastOneLower.test(password)) {
    appendFailureMessage(result, 'Password must contain at least one lowercase character');
  }

  var atLeastOneUpper = new RegExp('(?=.*[A-Z])');

  if (!atLeastOneUpper.test(password)) {
    appendFailureMessage(result, 'Password must contain at least one uppercase character');
  }

  var atLeastOneDigit = new RegExp('(?=.*[0-9])');

  if (!atLeastOneDigit.test(password)) {
    appendFailureMessage(result, 'Password must contain at least one numeric character');
  }

  var atLeastOneSpecial = new RegExp('(?=.[\\[\\]!@#$%^&*(){};:\'",.<>/?`~|\\\\])');

  if (!atLeastOneSpecial.test(password)) {
    appendFailureMessage(result, 'Password must contain at least one special character');
  }

  return result;
};

exports.isPasswordValid = isPasswordValid;