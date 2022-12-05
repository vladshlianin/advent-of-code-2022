import path from 'path';
import { calculateSupplyStacks } from './calculateSupplyStacks';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateSupplyStacks(INPUT_PATH);
const result2 = calculateSupplyStacks(INPUT_PATH, true);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
