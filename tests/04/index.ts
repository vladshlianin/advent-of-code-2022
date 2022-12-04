import path from 'path';
import { calculateSectionOverlap } from '../../src/04/calculateSectionOverlap';
// import { calculatePriorityPart1, calculatePriorityPart2 } from '../../src/03/calculateRucksackPriority';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 4', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateSectionOverlap(INPUT_PATH);
        expect(result).toBe(2);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateSectionOverlap(INPUT_PATH, false);
        expect(result).toBe(4);
    });
});
