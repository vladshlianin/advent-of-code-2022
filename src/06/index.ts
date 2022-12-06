import path from 'path';
import { parseInput } from '../lib/parseInput';
import { calculateUnique } from './calculateUnique';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const input = parseInput(INPUT_PATH);

const result1 = calculateUnique(input, 4);
const result2 = calculateUnique(input, 14);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
