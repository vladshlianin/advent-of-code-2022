import path from 'path';
import { calculateVisibleTrees, calculateScenicScore } from '../../src/08/calculateVisibleTrees';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 8', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateVisibleTrees(INPUT_PATH);
        expect(result).toBe(21);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateScenicScore(INPUT_PATH);
        expect(result).toBe(8);
    });
});
