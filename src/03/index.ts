import path from 'path';
import { calculatePriorityPart1, calculatePriorityPart2 } from './calculateRucksackPriority';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const resultPart1 = calculatePriorityPart1(INPUT_PATH);
const resultPart2 = calculatePriorityPart2(INPUT_PATH);

console.log(`Result for part 1 is ${resultPart1}`);
console.log(`Result for part 2 is ${resultPart2}`);
