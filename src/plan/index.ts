import { SVGNode } from "../svg";

export class Plan {
    _scale : number = 1/25;
    _x0 : number = 0.0;
    _y0 : number = 0.0;
    /**
     * Sets the plan size
     * @param width Width of the plan
     * @param height Height of the plan
     */
    scale(scale : number) {
        this._scale = scale;
        return this;
    }
    /**
     * Sets the origin of the plan
     * @param x0 The x value of the lower left corner
     * @param y0 The y value of the lower left corner
     */
    origin(x0 : number, y0 : number) {
      this._x0 = x0;
      this._y0 = y0;
    }
    export(filename : string) {
      // define sizes
      const x0 = 50;
      const y0 = 50;
      const width = 889;
      const height = 741;
      // create paper
      const paper = new SVGNode()
        .size('1189mm', '841mm')
        .version('1.1')
        .viewBox(0, 0, 1189, 841);
      // frame in mm (paper system)
      paper.rect(1, 1, 1187, 839)
        .transparent()
        .stroke('black', 1)
      // add rect as frame for plan
      paper.rect(x0, y0, width, height)
        .transparent()
        .stroke('black', 1);
      // create plan
      const plan = paper.group('plan')
        .transform(`translate(${x0} ${y0}) scale(${this._scale},-${this._scale})`);
      // draw line
      for (let i = 0; i < width / this._scale; i += 1000) {
        plan.line(0, i, 100, i);
      }
      // add circle
      plan.circle(0, 0, 200);
      plan.circle(22225, 0, 200);
      // export
      paper.export(filename);
    }
}