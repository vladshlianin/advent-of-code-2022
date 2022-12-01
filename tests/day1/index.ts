import fs from 'fs';
import path from 'path';
import { calculateCalories } from '../../src/01/calculateCalories';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const TOP_N_ELVES = 3;

const input = fs.readFileSync(INPUT_PATH, { encoding: 'utf8', flag: 'r' });

describe('testing day 1', () => {
    test('Correctly computing valid input', () => {
        const calories = calculateCalories(input, TOP_N_ELVES);
        expect(calories.topCalories).toBe(24000);
        expect(calories.topNCalories).toBe(45000);
    });
    test('Throwing an error on invalid input', () => {
        expect(() => {
            calculateCalories('abc', TOP_N_ELVES);
        }).toThrow('Invalid input');
    });
});
