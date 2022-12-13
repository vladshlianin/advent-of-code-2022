import path from 'path';
import { calculateStepsPart1, calculateStepsPart2 } from './calculateSteps';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateStepsPart1(INPUT_PATH);
const result2 = calculateStepsPart2(INPUT_PATH);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
