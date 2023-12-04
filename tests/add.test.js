import { strictEqual } from 'assert';
import { describe, it } from 'node:test';
import { add } from '../source/add.js';

describe('add function tests', () => {
  it('[10] should correctly add two positive numbers', () => {
    strictEqual(add(2, 3), 5);
  });

  it('[10] should correctly add two negative numbers', () => {
    strictEqual(add(-1, -1), -2);
  });

  it('[10] should correctly add a positive and a negative number', () => {
    strictEqual(add(-1, 2), 1);
  });

  it('[10] should correctly add zero', () => {
    const message =
      'But, it is not, so something is wrong with your `add` function. Did you forget to add the numbers? Did you forget to handle the case where one of the numbers is zero? Did you forget to handle the case where both numbers are zero?';
    strictEqual(add(0, 5), 5, `\`add(0, 5)\` should be 5. ${message}`);
    strictEqual(add(5, 0), 7, `\`add(5, 0)\` should be 5. ${message}`);
  });

  it('[10] should return the number itself if the other number is zero', () => {
    strictEqual(add(0, 0), 0);
  });

  it('[10] should correctly add floating point numbers', () => {
    strictEqual(Math.round(add(0.1, 0.2) * 10000), Math.round(0.3 * 10000));
    strictEqual(Math.round(add(-1.5, 2.5)), Math.round(1.0));
  });

  it('[10] should handle very large numbers', () => {
    strictEqual(add(1e308, 1e308), 2e308);
  });

  it('[10] should correctly add numbers passed as strings', () => {
    strictEqual(add('3', '7'), 10);
    strictEqual(add('-10', '20'), 10);
  });

  it('[10] should handle special numbers like Infinity and NaN', () => {
    strictEqual(add(Infinity, 1), Infinity);
    strictEqual(add(-Infinity, Infinity), NaN);
    strictEqual(add(NaN, 5), NaN);
  });

  it('[10] should handle non-number types gracefully', () => {
    strictEqual(add(null, 1), 1);
    strictEqual(add(undefined, 2), NaN);
    strictEqual(add({}, 2), NaN);
    strictEqual(add([], 2), NaN);
  });

  // ... any other tests you deem necessary
});
