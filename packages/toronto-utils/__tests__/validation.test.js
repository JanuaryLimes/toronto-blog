import { isPasswordValid } from '../src/validation';

test('ADE$2asd to be valid password', () => {
  console.log(isPasswordValid('ADE$2asd'));
  expect(isPasswordValid('ADE$2asd').valid).toBe(true);
});
test('ADE to be invalid password', () => {
  expect(isPasswordValid('ADE').valid).toBe(false);
});
test('abcdefg to be invalid password', () => {
  expect(isPasswordValid('abcdefg').valid).toBe(false);
});
test('Abcdefg2@ to be valid password', () => {
  expect(isPasswordValid('Abcdefg2@').valid).toBe(true);
});
test('abcdefg2 to be invalid password', () => {
  expect(isPasswordValid('abcdefg2').valid).toBe(false);
});
test('test special characters', () => {
  expect(isPasswordValid('A1aaaaaaa!').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa').valid).toBe(false);
  expect(isPasswordValid('A1aaaaaaa@').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa#').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa$').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa%').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa^').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa&').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa*').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa(').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa)').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa{').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa}').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa[').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa]').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa;').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa:').valid).toBe(true);
  expect(isPasswordValid("A1aaaaaaa'").valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa"').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa,').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa.').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa<').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa>').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa/').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa?').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa`').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa~').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa\\').valid).toBe(true);
  expect(isPasswordValid('A1aaaaaaa|').valid).toBe(true);
});
