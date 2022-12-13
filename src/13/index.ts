import path from 'path';
import { calculateSignalIndices, getDecoderKey } from './calculateSignalIndices';

// const INPUT_PATH = path.join(__dirname, '../../tests/13/input.txt');
const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateSignalIndices(INPUT_PATH);
const result2 = getDecoderKey(INPUT_PATH);

console.log(`Result for part 1 is ${result1}`);
console.log(`Result for part 2 is ${result2}`);
