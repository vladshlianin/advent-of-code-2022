import path from 'path';
import { calculatePressure, calculateCombinedPressure } from './calculatePressure';

const INPUT_PATH = path.join(__dirname, 'input.txt');

const result1 = calculatePressure(INPUT_PATH);
const result2 = calculateCombinedPressure(INPUT_PATH);

console.log(`Result for part 1 is: ${result1}`);
console.log(`Result for part 1 is: ${result2}`);
