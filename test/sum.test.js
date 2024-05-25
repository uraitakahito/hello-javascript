import {sum} from "../src/sum.js";

describe("sum.js", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('Array', () => {
  describe('#indexOf()', () => {
    test('should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(4)).toBe(-1);
    });
  });
});
