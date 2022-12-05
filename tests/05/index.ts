import path from 'path';
import { calculateSupplyStacks } from '../../src/05/calculateSupplyStacks';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 5', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateSupplyStacks(INPUT_PATH);
        expect(result).toBe('CMZ');
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateSupplyStacks(INPUT_PATH, true);
        expect(result).toBe('MCD');
    });
});
