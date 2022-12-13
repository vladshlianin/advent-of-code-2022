import path from 'path';
import { calculateSignalIndices, getDecoderKey } from '../../src/13/calculateSignalIndices';

const INPUT_PATH = path.join(__dirname, 'input.txt');

describe('testing day 13', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateSignalIndices(INPUT_PATH);
        expect(result).toBe(13);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = getDecoderKey(INPUT_PATH);
        expect(result).toBe(140);
    });
});
