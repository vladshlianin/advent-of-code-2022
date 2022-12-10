import path from 'path';
import { calculateSignalStrength, printSignal } from './calculateSignalStrength';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const result1 = calculateSignalStrength(INPUT_PATH);

console.log(`Result for part 1 is ${result1}`);
console.log('***** Printing signal for part 2 ***** \n');
printSignal(INPUT_PATH);
