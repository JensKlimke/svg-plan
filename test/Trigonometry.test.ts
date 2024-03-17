import {describe, expect, test} from '@jest/globals';
import {Geometry, Matrix22, Straight, Vector2, mat, vec} from '../src/geo'

describe('Matrix operarations', () => {
  test('Inverse', () => {
    const m = mat([[3, 2], [1, 5]]);
    const inv = m.inverse();
    expect(inv.e[0][0]).toBe( 5/13);
    expect(inv.e[0][1]).toBe(-2/13);
    expect(inv.e[1][0]).toBe(-1/13);
    expect(inv.e[1][1]).toBe( 3/13);
  });
  test('Dot product', () => {
    const m = mat([[3, 2], [1, 5]]);
    const v = vec([1, 2]);
    const res = Geometry.dot(m, v);
    expect(res.x()).toBe(7);
    expect(res.y()).toBe(11);
  });
});