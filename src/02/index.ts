// import fs from 'fs';
import path from 'path';
import { calculatePlayerScore } from './calculatePlayerScore';

const INPUT_PATH = path.resolve(__dirname, 'input.txt');

const result1 = calculatePlayerScore(INPUT_PATH, 1);
const result2 = calculatePlayerScore(INPUT_PATH, 2);

console.log(`Result for part 1 ${result1}`);
console.log(`Result for part 1 ${result2}`);
