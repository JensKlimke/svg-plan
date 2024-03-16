import {Path, SVG} from "./svg";
import fs from 'fs';

// svg
const svg = SVG('my-svg')
  .view(297, 420, 0.02, 10);

const path = [
  {d: 'M', x: -1, y: 1}, // M-1,1
  {d: 'l', x: 2, y: -2}, // l2,-2
  {d: 'M', x: 0, y: 4},  // M0,4
  {d: 'l', x: 4, y: -4}, // l4,-4
  {d: 'M', x: 3, y: 5},  // M3,5
  {d: 'l', x: 2, y: -2}  // l2,-2
];

svg.pattern('diagonalHatch')
  .size(4, 4)
  .path(path);

const group = svg
  .group('wall-01')
  .polygon([[0,0], [136.5, 0], [136.5, 30], [0, 30]])



console.log(svg.code(true));

console.info('Writing file');
fs.writeFileSync('./out.svg', svg.code(true));
