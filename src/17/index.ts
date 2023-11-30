import path from 'path';
import { calculateHeight } from './calculateTower';

const INPUT_PATH = path.join(__dirname, 'input.txt');

const result1 = calculateHeight(INPUT_PATH, 2022);
const result2 = calculateHeight(INPUT_PATH, 1_000_000_000_000);

console.log(`Result for part 1 is: ${result1}`);
console.log(`Result for part 2 is: ${result2}`);
