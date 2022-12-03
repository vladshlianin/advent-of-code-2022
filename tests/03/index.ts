import path from 'path';
import { calculatePriorityPart1, calculatePriorityPart2 } from '../../src/03/calculateRucksackPriority';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 3', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculatePriorityPart1(INPUT_PATH);
        expect(result).toBe(157);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculatePriorityPart2(INPUT_PATH);
        expect(result).toBe(70);
    });
});
