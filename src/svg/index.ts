import XMLNode from "../XMLNode";
import fs from "fs";
import {KeyValueMap} from "./helpers";

type Vector2 = number[];

export abstract class Canvas extends XMLNode {
  rect(x : number, y : number, width : number, height : number, rx ?: number, ry ?: number) {
    // create and add rect
    const p = new Rectangle();
    this.add(p);
    // add points
    const c = (rx && ry) ? {x : rx, y : ry} : undefined;
    c ? p.shape({x, y, width, height}, c) : p.shape({x, y, width, height});
    // return this
    return p;
  }
  circle(cx : number, cy : number, r : number) {
    // create and add circle
    const p = new Circle();
    this.add(p);
    // add points
    p.shape({x: cx, y: cy, r});
    // return this
    return p;
  }
  ellipse(cx : number, cy : number, rx : number, ry : number) {
    // create and add circle
    const p = new Ellipse();
    this.add(p);
    // add points
    p.shape({x: cx, y: cy, rx, ry});
    // return this
    return p;
  }
  line(x1 : number, y1 : number, x2 : number, y2 : number) {
    // create and add circle
    const p = new Line();
    this.add(p);
    // add points
    p.shape({x1, y1, x2, y2});
    // return this
    return p;
  }
  polyline(points ?: Vector2[]) {
    // create and add poly
    const p = new Polyline();
    this.add(p);
    // add points
    points && p.points(points);
    // return this
    return p;
  }
  polygon(points ?: Vector2[]) {
    // create and add poly
    const p = new Polygon();
    this.add(p);
    // add points
    points && p.points(points);
    // return this
    return p;
  }
  path() {
    // create and add poly
    const p = new Path();
    this.add(p);
    // return this
    return p;
  }
}


export class GroupNode extends Canvas {

  constructor() {
    super('g');
  }

  code(format?: boolean): string {
    return super.code(format);
  }

}

export class SVGNode extends Canvas {

  planWidth : number  = 1189; // default A0 width
  planHeight : number = 841;  // default A0 height
  scale : number      = 0.02; // default 1:50
  unitScale : number  = 10;   // default centimeter (10 mm)

  patterns : Pattern[] = [];  // definition of fill patterns

  constructor() {
    super('svg');
  }

  toString() {
    return this.code(true);
  }

  export(filename : string) {
    fs.writeFileSync(filename, this.code(true));
  }

  view(width : number, height : number, scale : number, unitScale : number = 10) {
    // set plan sizes
    this.planWidth = width;
    this.planHeight = height;
    this.scale = scale;
    this.unitScale = unitScale;
    // return
    return this;
  }

  group(id : string) {
    // create and set id
    const group = new GroupNode().id(id);
    // add group
    this.add(group);
    // return group
    return group;
  }

  pattern(id : string) {
    const p = new Pattern(id);
    this.add(p);
    return p;
  }

  _attr() {
    // init attributes
    let attr = {...super._attr()};
    // calculate view box
    const w = this.planWidth / (this.scale * this.unitScale);
    const h = this.planHeight / (this.scale * this.unitScale);
    // add view port and view box (TODO: revers y-axis)
    attr.xmlns = "http://www.w3.org/2000/svg";
    attr.version = "1.1";
    attr.width = `${this.planWidth}mm`;
    attr.height = `${this.planHeight}mm`
    attr.viewBox = `0 0 ${w} ${h}`;
    // return
    return attr;
  }

  code(format?: boolean): string {
    return '<?xml version="1.0" standalone="no"?>\n'
      + super.code(format);
  }

}

export function SVG(id ?: string) {
  // create svg node and add ID
  const svgNode = new SVGNode();
  id && svgNode.id(id);
  // return node
  return svgNode;
}


export abstract class Shape extends XMLNode {
  _fill : string | undefined;
  _fillOpacity : number | undefined;
  _stroke : string | undefined;
  _strokeWidth : number | undefined;
  fill(color : string, opacity ?: number) {
    this._fill = color;
    this._fillOpacity = opacity;
    return this;
  }
  stroke(color : string, width ?: number) {
    this._stroke = color;
    width && (this._strokeWidth = width);
    return this;
  }
  _attr(): KeyValueMap {
    const a = {...super._attr()};
    this._fill && (a.fill = this._fill);
    this._fillOpacity && (a['fill-opacity'] = this._fillOpacity);
    this._stroke && (a.stroke = this._stroke);
    this._strokeWidth && (a['stroke-width'] = this._strokeWidth);
    return a;
  }
}

type PosAndDimensions = {
  x: number
  y: number
  width: number
  height: number
}

type PosAndRadii = {
  x: number
  y: number
  rx: number
  ry: number
}

type TwoPositions = {
  x1: number
  y1: number
  x2: number
  y2: number
}

type PosAndRadius = {
  x: number
  y: number
  r : number
}

type XYVector = {
  x: number
  y: number
}

export class Rectangle extends Shape {
  _position : PosAndDimensions = {x : 0, y : 0, width : 10, height : 10};
  _corners : XYVector | undefined;
  constructor() {
    super('rect');
  }
  shape(pos : PosAndDimensions, corners ?: XYVector) {
    this._position = pos;
    corners && (this._corners = corners);
    return this;
  }
  _attr(): KeyValueMap {
    const a = {...super._attr()};
    a.x = this._position.x;
    a.y = this._position.y;
    a.width = this._position.width;
    a.height = this._position.height;
    this._corners && (a.rx = this._corners.x)
    this._corners && (a.ry = this._corners.y)
    return a;
  }
}


export class Circle extends Shape {
  _position : PosAndRadius = {x : 0, y : 0, r : 10};
  constructor() {
    super('circle');
  }
  shape(pos : PosAndRadius) {
    this._position = pos;
    return this;
  }
  _attr(): KeyValueMap {
    const a = {...super._attr()};
    a.cx = this._position.x;
    a.cy = this._position.y;
    a.r = this._position.r;
    return a;
  }
}

export class Ellipse extends Shape {
  _position : PosAndRadii = {x : 0, y : 0, rx : 10, ry : 5};
  constructor() {
    super('ellipse');
  }
  shape(pos : PosAndRadii) {
    this._position = pos;
    return this;
  }
  _attr(): KeyValueMap {
    const a = {...super._attr()};
    a.cx = this._position.x;
    a.cy = this._position.y;
    a.rx = this._position.rx;
    a.ry = this._position.ry;
    return a;
  }
}


export class Line extends Shape {
  _position : TwoPositions = {x1 : 0, y1 : 0, x2 : 10, y2 : 5};
  constructor() {
    super('line');
  }
  shape(pos : TwoPositions) {
    this._position = pos;
    return this;
  }
  _attr(): KeyValueMap {
    const a = {...super._attr()};
    a.x1 = this._position.x1;
    a.y1 = this._position.y1;
    a.x2 = this._position.x2;
    a.y2 = this._position.y2;
    return a;
  }
}


export abstract class MultiPointShape extends Shape {
  _points : Vector2[] = [];
  protected constructor(type : string) {
    super(type);
  }
  points(points : Vector2[]) {
    this._points = points;
    return this;
  }
  _attr() {
    const a = {...super._attr()};
    a.points = this._points.map(p => `${p[0]},${p[1]}`).join(" ");
    a.fill = 'none';
    a.stroke = 'black';
    a['stroke-width'] = 5;
    return a;
  }
}


export class Polyline extends MultiPointShape {
  constructor() {
    super('polyline');
  }
}

export class Polygon extends MultiPointShape {
  constructor() {
    super('polyline');
  }
}

export class Path extends Shape {
  _steps : string[] = [];
  constructor(steps ?: string[]) {
    super('path');
    steps && (this._steps = steps);
  }
  _attr() {
    const a = {...super._attr()};
    a.d = this._steps.join(' ');
    return a;
  }
  step(step : string) {
    this._steps.push(step);
    return this;
  }
  moveTo(x : number, y : number) {
    return this.step(`M ${x} ${y}`);
  }
  moveBy(dx : number, dy : number) {
    return this.step(`m ${dx} ${dy}`);
  }
  lineTo(x : number, y : number) {
    return this.step(`L ${x} ${y}`);
  }
  lineBy(dx : number, dy : number) {
    return this.step(`l ${dx} ${dy}`);
  }
  hLineTo(x : number) {
    return this.step(`H ${x}`);
  }
  hLineBy(dx : number) {
    return this.step(`h ${dx}`);
  }
  vLineTo(y : number) {
    return this.step(`V ${y}`);
  }
  vLineBy(dy : number) {
    return this.step(`v ${dy}`);
  }
  cubicBezierTo(x1 : number, y1 : number, x2 : number, y2 : number, x : number, y : number) {
    return this.step(`C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`);
  }
  bezierBy(dx1 : number, dy1 : number, dx2 : number, dy2 : number, dx : number, dy : number) {
    return this.step(`c ${dx1} ${dy1}, ${dx2} ${dy2}, ${dx} ${dy}`);
  }
  extendCubicBezierTo(x2 : number, y2 : number, x : number, y : number) {
    return this.step(`S ${x2} ${y2}, ${x} ${y}`);
  }
  extendBezierBy(dx2 : number, dy2 : number, dx : number, dy : number) {
    return this.step(`s ${dx2} ${dy2}, ${dx} ${dy}`);
  }
  quadraticBezierTo(x1 : number, y1 : number, x : number, y : number) {
    return this.step(`Q ${x1} ${y1}, ${x} ${y}`);
  }
  cubicBezierBy(dx1 : number, dy1 : number, dx : number, dy : number) {
    return this.step(`q ${dx1} ${dy1}, ${dx} ${dy}`);
  }
  extendQuadraticBezierTo(x : number, y : number) {
    return this.step(`T ${x} ${y}`);
  }
  extendCubicBezierBy(dx : number, dy : number) {
    return this.step(`t ${dx} ${dy}`);
  }
  arcTo(rx : number, ry : number, xAxisRotation : number, largeArcFlag : number, sweepFlag : number, x : number, y : number,) {
    return this.step(`A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`);
  }
  arcBy(rx : number, ry : number, xAxisRotation : number, largeArcFlag : number, sweepFlag : number, dx : number, dy : number,) {
    return this.step(`a ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${dx} ${dy}`);
  }
  close() {
    return this.step('z');
  }
}

export class Pattern extends XMLNode {
  width : number = 0;
  height : number = 0;
  constructor(id : string) {
    super('pattern');
    this.id(id);
  }
  size(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this;
  }
  path(path : string[]) {
    const p = new Path(path);
    this.add(p);
    return this
  }
  _attr() {
    const a = {...super._attr()};
    a.patternUnits = "userSpaceOnUse";
    a.width = this.width;
    a.height = this.height;
    return a;
  }
}
