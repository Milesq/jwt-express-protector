import isPrime from '../src/main';

test('adds 1 + 2 to equal 3', () => {
  expect(isPrime(9)).toBe(false);
  expect(isPrime(11)).toBe(true);
});
