import path from 'path';
import { calculateRopePositions } from '../../src/09/calculateRopePositions';

const INPUT_PATH1 = path.join(__dirname, 'input.txt');
const INPUT_PATH2 = path.join(__dirname, 'input2.txt');

describe('testing day 9', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateRopePositions(INPUT_PATH1, 2);
        expect(result).toBe(13);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateRopePositions(INPUT_PATH2, 10);
        expect(result).toBe(36);
    });
});
