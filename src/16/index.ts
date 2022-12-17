import path from 'path';
import { calculatePressure } from './calculatePressure';

// const INPUT_PATH = path.join(__dirname, '../../tests/16/input.txt');
const INPUT_PATH = path.join(__dirname, 'input.txt');

const result1 = calculatePressure(INPUT_PATH);

console.log(`Result for part 1 is: ${result1}`);
