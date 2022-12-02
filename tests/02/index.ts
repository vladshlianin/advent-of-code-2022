import path from 'path';
import { calculatePlayerScore } from '../../src/02/calculatePlayerScore';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 2', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculatePlayerScore(INPUT_PATH, 1);
        expect(result).toBe(15);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculatePlayerScore(INPUT_PATH, 2);
        expect(result).toBe(12);
    });
});
