import path from 'path';
import { calculateStepsPart1, calculateStepsPart2 } from '../../src/12/calculateSteps';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 12', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateStepsPart1(INPUT_PATH);
        expect(result).toBe(31);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateStepsPart2(INPUT_PATH);
        expect(result).toBe(29);
    });
});
