import path from 'path';
import { calculateMonkeyBusiness } from '../../src/11/calculateMonkeyBusiness';

const INPUT_PATH = path.join(__dirname, 'input.txt');
// const INPUT_PATH2 = path.join(__dirname, 'input2.txt');

describe('testing day 11', () => {
    test('Correctly computing valid input for part 1', () => {
        const result = calculateMonkeyBusiness(INPUT_PATH, 1);
        expect(result).toBe(10605);
    });
    test('Correctly computing valid input for part 2', () => {
        const result = calculateMonkeyBusiness(INPUT_PATH, 2);
        expect(result).toBe(2713310158);
    });
});
