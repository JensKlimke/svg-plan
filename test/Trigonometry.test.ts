import {describe, expect, test} from '@jest/globals';
import {Geometry, Matrix22, Straight, Vector2, mat, vec} from '../src/geo'

describe('Matrix operarations', () => {
  test('Inverse', () => {
    const m = mat([[3, 2], [1, 5]]);
    const inv = m.inverse();
    expect(inv.e[0][0]).toBeCloseTo( 5/13);
    expect(inv.e[0][1]).toBeCloseTo(-2/13);
    expect(inv.e[1][0]).toBeCloseTo(-1/13);
    expect(inv.e[1][1]).toBeCloseTo( 3/13);
  });
  test('Dot product', () => {
    const m = mat([[3, 2], [1, 5]]);
    const v = vec([1, 2]);
    const res = Geometry.dot(m, v);
    expect(res.x()).toBeCloseTo(7);
    expect(res.y()).toBeCloseTo(11);
  });
});

describe('Vector operarations', () => {
  test('Unit', () => {
    // check simple
    const v0 = vec([1, 0]).unit();
    expect(v0.x()).toBeCloseTo(1.0);
    expect(v0.y()).toBeCloseTo(0.0);
    expect(v0.length()).toBeCloseTo(1.0);
    // check complex
    const v1 = vec([1, 1]).unit();
    expect(v1.x()).toBeCloseTo(Math.sqrt(0.5));
    expect(v1.y()).toBeCloseTo(Math.sqrt(0.5));
    expect(v1.length()).toBeCloseTo(1.0);
  });
  test('Orthonogal', () => {
    // check simple
    const v0 = vec([1, 0]).orth();
    expect(v0.x()).toBeCloseTo(0.0);
    expect(v0.y()).toBeCloseTo(1.0);
    expect(v0.length()).toBeCloseTo(1.0);
    // check complex
    const v1 = vec([1, 1]).orth();
    expect(v1.x()).toBeCloseTo(-1);
    expect(v1.y()).toBeCloseTo(1);
  });
});
