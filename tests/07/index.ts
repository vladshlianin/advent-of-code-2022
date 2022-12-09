import path from 'path';
import { calculateDirectoriesSize } from '../../src/07/calculateDirectoriesSize';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 7', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateDirectoriesSize(INPUT_PATH, 1);
        expect(result).toBe(95437);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateDirectoriesSize(INPUT_PATH, 2);
        expect(result).toBe(24933642);
    });
});
