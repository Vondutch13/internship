const qout = require('./division');

test('10 dividd by 2 is 5', () => {
  expect(qout(10, 2)).toBe(5);
});