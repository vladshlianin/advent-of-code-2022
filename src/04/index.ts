import path from 'path';
import { calculateSectionOverlap } from './calculateSectionOverlap';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateSectionOverlap(INPUT_PATH);
const result2 = calculateSectionOverlap(INPUT_PATH, false);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
