import path from 'path';
import { calculateSandUnits } from './calculateSandUnits';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateSandUnits(INPUT_PATH, 1);
const result2 = calculateSandUnits(INPUT_PATH, 2);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
