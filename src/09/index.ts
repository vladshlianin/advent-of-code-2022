import path from 'path';
import { calculateRopePositions } from './calculateRopePositions';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateRopePositions(INPUT_PATH, 2);
const result2 = calculateRopePositions(INPUT_PATH, 10);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
