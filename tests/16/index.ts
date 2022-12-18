import path from 'path';
import { calculatePressure, calculateCombinedPressure } from '../../src/16/calculatePressure';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 16', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculatePressure(INPUT_PATH);
        expect(result).toBe(1651);
    });
    test('Correctly computing valid input for part 1', () => {
        const result = calculateCombinedPressure(INPUT_PATH);
        expect(result).toBe(1707);
    });
});
