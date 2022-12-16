import path from 'path';
import { calculatePositionsWithoutBeacon } from '../../src/15/calculatePositionsWithoutBeacon';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 16', () => {
    const result = calculatePositionsWithoutBeacon(INPUT_PATH, 10);
    test('Correctly computing valid input for part 1', () => {
        expect(result.positions).toBe(26);
    });
});
