import {describe, expect, test} from '@jest/globals';
import {Geometry, Straight, Vector2} from '../src/geo'

describe('Points on straight', () => {
  test('(0,0) -> (1,0)', () => {
    // create straight
    const s = Straight.fromArrays([0, 0], [1, 0]);
    // calculate points
    const p0 = s.point(0.0);
    const p1 = s.point(0.5);
    const p2 = s.point(1.0);
    const p3 = s.point(2.0);
    const p4 = s.point(-1.0);
    // check results
    expect(p0.x()).toBe(0.0);
    expect(p0.y()).toBe(0.0);
    expect(p1.x()).toBe(0.5);
    expect(p1.y()).toBe(0.0);
    expect(p2.x()).toBe(1.0);
    expect(p2.y()).toBe(0.0);
    expect(p3.x()).toBe(2.0);
    expect(p3.y()).toBe(0.0);
    expect(p4.x()).toBe(-1.0);
    expect(p4.y()).toBe(0.0);
  });
  test('(0,0) -> (-1,1)', () => {
    // create straight
    const s = Straight.fromArrays([0, 0], [-1, 1]);
    // calculate points
    const p0 = s.point( 0.0);
    const p1 = s.point( 0.5);
    const p2 = s.point( 1.0);
    const p3 = s.point( 2.0);
    const p4 = s.point(-1.0);
    // check results
    expect(p0.x()).toBe( 0.0);
    expect(p0.y()).toBe( 0.0);
    expect(p1.x()).toBe(-0.5);
    expect(p1.y()).toBe( 0.5);
    expect(p2.x()).toBe(-1.0);
    expect(p2.y()).toBe( 1.0);
    expect(p3.x()).toBe(-2.0);
    expect(p3.y()).toBe( 2.0);
    expect(p4.x()).toBe( 1.0);
    expect(p4.y()).toBe(-1.0);
  });
  test('(1,-1) -> (-1,1)', () => {
    // create straight
    const s = Straight.fromArrays([1, -1], [-1, 1]);
    // calculate points
    const p0 = s.point( 0.0);
    const p1 = s.point( 0.5);
    const p2 = s.point( 1.0);
    const p3 = s.point( 2.0);
    const p4 = s.point(-1.0);
    // check results
    expect(p0.x()).toBe( 1.0);
    expect(p0.y()).toBe(-1.0);
    expect(p1.x()).toBe( 0.5);
    expect(p1.y()).toBe(-0.5);
    expect(p2.x()).toBe( 0.0);
    expect(p2.y()).toBe( 0.0);
    expect(p3.x()).toBe(-1.0);
    expect(p3.y()).toBe( 1.0);
    expect(p4.x()).toBe( 2.0);
    expect(p4.y()).toBe(-2.0);
  });
});

describe('Math with straights', () => {
    test('Intersecting straights', () => {
      // create straight
      const s0 = Straight.fromArrays([0,  0], [2, 0]);
      const s1 = Straight.fromArrays([1, -1], [0, 4]);
      // calculate points
      const p = Geometry.intersect(s0, s1);
      // check results
      expect(p.t0).toBe(0.5);
      expect(p.t1).toBe(0.25);
      expect(p.r.x()).toBe(1);
      expect(p.r.y()).toBe(0);
    });
  });