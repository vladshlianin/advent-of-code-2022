import path from 'path';
import { calculatePressure } from '../../src/16/calculatePressure';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 16', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculatePressure(INPUT_PATH);
        expect(result).toBe(1651);
    });
});
