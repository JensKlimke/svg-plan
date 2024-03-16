import {Canvas, SVG} from "../src/svg";
import {beforeAll} from "@jest/globals";
import fs from "fs";

beforeAll(() => {
  if (!fs.existsSync('./out')){
    fs.mkdirSync('./out');
  }
})

test('Generate a path with move', () => {
  const svg = SVG();
  svg.view(200, 200, 1, 1);
  svg.path().moveTo(10, 10);
  svg.circle(10, 10, 2).fill('red');
  svg.export('./out/path_move.svg');
});


test('Generate a path with h/v lines', () => {
  const svg = SVG();
  svg.view(200, 200, 1, 1);
  svg.path()
    .moveTo(10, 10)
    .hLineTo(90)
    .vLineTo(90)
    .hLineTo(10)
    .lineTo(10, 10);
  svg.circle(10, 10, 2).fill('red');
  svg.circle(90, 10, 2).fill('red');
  svg.circle(90, 90, 2).fill('red');
  svg.circle(10, 90, 2).fill('red');
  svg.export('./out/path_vhLine.svg');
});


/*
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">

  <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M 70 10 C 70 20, 110 20, 110 10" stroke="black" fill="transparent"/>
  <path d="130, 10, 120, 20, 180, 20, 170, 10" stroke="black" fill="transparent"/>
  <path d="10, 60, 20, 80, 40, 80, 50, 60" stroke="black" fill="transparent"/>
  <path d="70, 60, 70, 80, 110, 80, 110, 60" stroke="black" fill="transparent"/>
  <path d="130, 60, 120, 80, 180, 80, 170, 60" stroke="black" fill="transparent"/>
  <path d="10, 110, 20, 140, 40, 140, 50, 110" stroke="black" fill="transparent"/>
  <path d="70, 110, 70, 140, 110, 140, 110, 110" stroke="black" fill="transparent"/>
  <path d="130, 110, 120, 140, 180, 140, 170, 110" stroke="black" fill="transparent"/>

</svg>

 */

const markers = (svg: Canvas, x0 : number, y0 : number, x1 : number, y1 : number, x2 : number, y2 : number, x3 : number, y3 : number) => {
  svg.line(x0, y0, x1, y1).stroke('red');
  svg.circle(x0, y0, 2).fill('red');
  svg.circle(x1, y1, 2).fill('red');
  svg.line(x2, y2, x3, y3).stroke('red');
  svg.circle(x2, y2, 2).fill('red');
  svg.circle(x3, y3, 2).fill('red');
}

const bezierWithMarkers = (svg: Canvas, x0 : number, y0 : number, x1 : number, y1 : number, x2 : number, y2 : number, x3 : number, y3 : number) => {
  // draw path
  svg.path()
    .moveTo(x0, y0)
    .cubicBezierTo(x1, y1, x2, y2, x3, y3)
    .fill('transparent')
    .stroke('black');
  // draw markers
  markers(svg, x0, y0, x1, y1, x2, y2, x3, y3);
}

test('Generate a path with beziers', () => {
  const svg = SVG();
  svg.view(190, 160, 1, 1);
  bezierWithMarkers(svg, 10, 10, 20, 20, 40, 20, 50, 10);
  bezierWithMarkers(svg, 70, 10, 70, 20, 110, 20, 110, 10);
  bezierWithMarkers(svg, 130, 10, 120, 20, 180, 20, 170, 10);
  bezierWithMarkers(svg, 10, 60, 20, 80, 40, 80, 50, 60);
  bezierWithMarkers(svg, 70, 60, 70, 80, 110, 80, 110, 60);
  bezierWithMarkers(svg, 130, 60, 120, 80, 180, 80, 170, 60);
  bezierWithMarkers(svg, 10, 110, 20, 140, 40, 140, 50, 110);
  bezierWithMarkers(svg, 70, 110, 70, 140, 110, 140, 110, 110);
  bezierWithMarkers(svg, 130, 110, 120, 140, 180, 140, 170, 110);
  svg.export('./out/beziers.svg');
});

test('Generate a path with beziers 2', () => {
  const svg = SVG();
  svg.view(190, 160, 1, 1);
  bezierWithMarkers(svg, 10, 80, 40, 10, 65, 10, 95, 80);
  bezierWithMarkers(svg, 95, 80, 125, 150, 150, 150, 180, 80);
  svg.path()
    .moveTo(10, 80)
    .cubicBezierTo(40, 10, 65, 10, 95, 80)
    .extendCubicBezierTo(150, 150, 180, 80)
    .fill('transparent')
    .stroke('green', 1)
  svg.export('./out/beziers2.svg');
});


test('Generate a path with beziers 3', () => {
  const svg = SVG();
  svg.view(190, 160, 1, 1);
  markers(svg, 10, 80, 52.5, 10, 51.5, 10, 95, 80);
  markers(svg, 95, 80, 137.5, 150, 137.5, 150, 180, 80);
  svg.path()
    .moveTo(10, 80)
    .quadraticBezierTo(52.5, 10, 95, 80)
    .extendQuadraticBezierTo(180, 80)
    .fill('transparent')
    .stroke('green', 1)
  svg.export('./out/beziers3.svg');
});


/*
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320">
  <path d="M 10 315
           L 110 215
           A 36 60 0 0 1 150.71 170.29
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
  <circle cx="150.71" cy="170.29" r="2" fill="red"/>
  <circle cx="110" cy="215" r="2" fill="red"/>
  <ellipse cx="144.931" cy="229.512" rx="36" ry="60" fill="transparent" stroke="blue"/>
  <ellipse cx="115.779" cy="155.778" rx="36" ry="60" fill="transparent" stroke="blue"/>
</svg>

 */

test('Generate a path with arcs', () => {
  const svg = SVG();
  svg.view(320, 320, 1, 1);
  svg.path()
    .moveTo(10, 315)
    .lineTo(110, 215)
    .arcTo(36, 60, 0, 0, 1, 150.71, 170.29)
    .lineTo(172.55, 152.45)
    .arcTo(30, 50, -45, 0, 1, 215.1, 109.9)
    .lineTo(315, 10)
    .fill('green', 0.5)
    .stroke('black', 2)
  svg.circle(150.71, 170.29, 2).fill('red');
  svg.circle(110, 215, 2).fill('red');
  svg.ellipse(144.931, 229.512, 36, 60)
    .fill('transparent')
    .stroke('blue');
  svg.ellipse(115.779, 155.778, 36, 60)
    .fill('transparent')
    .stroke('blue');
  svg.export('./out/arcs.svg');
});

