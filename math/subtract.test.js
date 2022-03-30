const diff = require('./subtract');

test('5 subtracted by 3 is 2', () => {
  expect(diff(5, 3)).toBe(2);
});