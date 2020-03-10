import { pureKeyRemove, pureArrayRemove } from '../pureFunctions';

describe('Pure Functions', () => {
  describe('Pure Key Remove', () => {
    const TEST_OBJ = {
      a: 1,
      b: 2,
      c: 3,
    };

    test('should remove correct elements, with no effect on the original object', () => {
      expect(pureKeyRemove(TEST_OBJ, 'a')).toEqual({
        b: 2,
        c: 3,
      });
      expect(pureKeyRemove(TEST_OBJ, 'b')).toEqual({
        a: 1,
        c: 3,
      });
      expect(pureKeyRemove(TEST_OBJ, 'c')).toEqual({
        a: 1,
        b: 2,
      });
    });

    test('should return original object when key is not present', () => {
      expect(pureKeyRemove(TEST_OBJ, 'd')).toEqual(TEST_OBJ);
    });
  });

  describe('Pure Array Remove', () => {
    const TEST_ARR = [1,2,3];

    test('should remove correct item by index, with no effec on the original array', () => {
      expect(pureArrayRemove(TEST_ARR, 0)).toEqual([2,3]);
      expect(pureArrayRemove(TEST_ARR, 1)).toEqual([1,3]);
      expect(pureArrayRemove(TEST_ARR, 2)).toEqual([1,2]);
    });

    test('should return original array when index is out of bounds or bad', () => {
      expect(pureArrayRemove(TEST_ARR, -1)).toEqual(TEST_ARR);
      expect(pureArrayRemove(TEST_ARR, 10)).toEqual(TEST_ARR);
      expect(pureArrayRemove(TEST_ARR, 'item')).toEqual(TEST_ARR);
      expect(pureArrayRemove(TEST_ARR)).toEqual(TEST_ARR);
    })
  })
});
