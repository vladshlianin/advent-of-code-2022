import path from 'path';
import { calculateSandUnits } from '../../src/14/calculateSandUnits';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 14', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateSandUnits(INPUT_PATH, 1);
        expect(result).toBe(24);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateSandUnits(INPUT_PATH, 2);
        expect(result).toBe(93);
    });
});
