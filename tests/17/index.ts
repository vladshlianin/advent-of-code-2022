import path from 'path';
import { calculateHeight } from '../../src/17/calculateTower';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 17', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateHeight(INPUT_PATH, 2022);
        expect(result).toBe(3068);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateHeight(INPUT_PATH, 1_000_000_000_000);
        expect(result).toBe(1514285714288);
    });
});
