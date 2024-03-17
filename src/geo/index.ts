export class Vector2 {
	e : [number, number] = [0, 0];
  constructor(x = 0, y = 0) {
    this.e[0] = x;
    this.e[1] = y; 
  } 
	x () { return this.e[0] }
	y () { return this.e[1] }
	static fromArray(v : [number, number]) {
		const vec = new Vector2();
		vec.e[0] = v[0];
		vec.e[1] = v[1];
		return vec;
	}
}

export class Matrix22 {
	e : [[number, number], [number, number]] = [[0,0], [0,0]];
	inverse() {
		const f = 1.0 / (this.e[0][0] * this.e[1][1] - this.e[0][1] * this.e[1][0]);
		return Matrix22.fromArray([[f * this.e[1][1], -f * this.e[0][1]], [-f * this.e[1][0], f * this.e[0][0]]]);
	}
	static fromArray(m : [[number, number], [number, number]]) {
		const mat = new Matrix22; 
		mat.e = [[...m[0]], [...m[1]]];
		return mat;
	}
}

export const mat = (m : [[number, number], [number, number]]) => Matrix22.fromArray(m);

export const vec = (v : [number, number]) => Vector2.fromArray(v);

export function zero() {
  return new Vector2(0, 0);
}

export class Straight {
  r0 : Vector2 = zero();
  p : Vector2 = zero();
  constructor(r0 : Vector2, p : Vector2) {
    this.r0 = r0;
    this.p = p;
  }
  point(s : number) {
    return Geometry.add(this.r0, this.p, s);
  }
  static fromArrays(r0 : [number, number], p : [number, number]) {
    return new Straight(vec([r0[0], r0[1]]), vec([p[0], p[1]]));
  }
}

export const Geometry = {
  add(v1 : Vector2, v2 : Vector2, d : number = 1.0) {
    return vec([v1.x() + d * v2.x(), v1.y() + d * v2.y()]);
  },
	dot(mat : Matrix22, v : Vector2) {
		return vec([
			mat.e[0][0] * v.x() + mat.e[0][1] * v.y(),
			mat.e[1][0] * v.x() + mat.e[1][1] * v.y(),
		]);
	},
  intersect(s0 : Straight, s1 : Straight) {
		// calculate matrix
		const m = mat([[s0.p.x(), -s1.p.x()], [s0.p.y(), -s1.p.y()]]).inverse();
		const v = vec([s1.r0.x() - s0.r0.x(), s1.r0.y() - s0.r0.y()]);
		const a = Geometry.dot(m, v);
		return {
			t0 : a.x(), 
			t1 : a.y(),
			r : s0.point(a.x())
		}
  }
}
