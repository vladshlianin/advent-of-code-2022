import path from 'path';
import { calculateSignalStrength } from '../../src/10/calculateSignalStrength';

const INPUT_PATH = path.join(__dirname, 'input.txt');
// const INPUT_PATH2 = path.join(__dirname, 'input2.txt');

describe('testing day 10', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateSignalStrength(INPUT_PATH);
        expect(result).toBe(13140);
    });
});
