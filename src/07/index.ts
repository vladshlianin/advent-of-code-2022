import path from 'path';
import { calculateDirectoriesSize } from './calculateDirectoriesSize';

const INPUT_PATH = path.join(__dirname, 'input.txt');

const result1 = calculateDirectoriesSize(INPUT_PATH, 1);
const result2 = calculateDirectoriesSize(INPUT_PATH, 2);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
