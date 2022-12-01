import fs from 'fs';
import path from 'path';
import { calculateCalories } from './calculateCalories';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const TOP_N_ELVES = 3;

const getInput = (): string => {
    return fs.readFileSync(INPUT_PATH, { encoding: 'utf8', flag: 'r' });
};

const input = getInput();
const { topCalories, topNCalories } = calculateCalories(input, TOP_N_ELVES);
console.log(`Top calories - ${topCalories}`);
console.log(`Top ${TOP_N_ELVES} elves carrying calories - ${topNCalories}`);
