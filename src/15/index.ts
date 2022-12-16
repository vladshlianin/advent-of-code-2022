import path from 'path';
import { calculatePositionsWithoutBeacon } from './calculatePositionsWithoutBeacon';

// const INPUT_PATH = path.join(__dirname, '../../tests/15/input.txt');
const INPUT_PATH = path.join(__dirname, 'input.txt');
// 2000000
const { positions, frequency } = calculatePositionsWithoutBeacon(INPUT_PATH, 2000000);

console.log(`Result for day 1: ${positions}`);
console.log(`Result for day 1: ${frequency}`);
