import {attributes, style} from "../src/svg/helpers";

test('Generate style string', () => {
  const styleString = style({border: "1px solid red", "stroke-width": 1});
  expect(styleString).toBe("border:'1px solid red'; stroke-width:1");
});

test('Generate attribute string', () => {
  const attributesString = attributes({fill: true, "stroke-width": 1, class: "line"});
  expect(attributesString).toBe('fill="true" stroke-width="1" class="line"');
});
