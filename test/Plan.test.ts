import {Plan} from '../src/plan';

test('Draw point on plan', () => {
	const plan = new Plan();
	plan.export('./out/plan.svg');
});