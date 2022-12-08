import path from 'path';
import { calculateVisibleTrees, calculateScenicScore } from './calculateVisibleTrees';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateVisibleTrees(INPUT_PATH);
const result2 = calculateScenicScore(INPUT_PATH);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
