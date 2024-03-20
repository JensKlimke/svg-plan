import { Path, Pattern, Polygon } from "../src/svg";
import { Straight, vec } from "../src/geo";
import { SVGNode } from "../src/svg";

test('Create rect from line', () => {
    // create svg
    const svg = new SVGNode()
        .view(16000, 9000, 1/25, 1);
    // pattern
    svg.pattern('diagonalHatch')
			.size(40, 40)
			.path(new Path([
				'M-10,10',
				'l20,-20',
				'M0,40',
				'l40,-40',
				'M30,50',
				'l20,-20'
			]).stroke('black', 0.2)
		);
		// draw frame
    svg.rect(0, 0, 16000, 9000)
			.stroke('black', 1)
			.transparent(); 
    // create line
    const line = Straight.fromPoints(vec([300,300]), vec([12000,300]))
    const line2 = Straight.parallelFromStraight(line, 300 ).revert(); 
    // draw line
    //  2.svg(svg);
    // calculate box
    const poly = new Polygon()
			.point(line.start().toArray())
			.point(line.end().toArray())
			.point(line2.start().toArray())
			.point(line2.end().toArray())
			.stroke('black', 1 )
			.fill('url(#diagonalHatch)'); 
    // draw poly
    // svg.add(poly); 
		const path = new Path()
			.moveTo(300, 300)
			.lineBy(100, 0)
			.lineBy(0, -30)
			.lineBy(-124, 0)
			.close()
			.stroke('black', 1)
			.fill('url(#diagonalHatch)')
		svg.add(path);
    // save
    svg.export('./out/line2rect.svg');
});