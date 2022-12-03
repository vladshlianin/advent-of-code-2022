import { parseInput } from '../lib/parseInput';

// a-z letters have value in range [1,26]
// A-Z letters have value in range [27,52]
// However, every char in js has a respective UTF-16 code
// For lowercase a it is 97, for lowercase b - 98
// for lowercase c - 99, and so on.
// Given it's incremental, we can easily convert it to [1,26] or [27, 52] range
// With fixed offset

const UPPER_CASE_BASE = 38;
const LOWER_CASE_BASE = 96;

const splitString = (input: string): Array<string> => {
    const stringLength = input.length;
    const middle = Math.floor(stringLength / 2);
    return [input.slice(0, middle), input.slice(middle, stringLength)];
};

const getCharValue = (char: string): number => {
    const charCode = char.charCodeAt(0);
    return charCode < LOWER_CASE_BASE ? charCode - UPPER_CASE_BASE : charCode - LOWER_CASE_BASE;
};

export const calculatePriorityPart1 = (inputPath: string): number => {
    const input = parseInput(inputPath);
    return input.split('\n').reduce<number>((acc, value) => {
        const [leftSection, rightSection] = splitString(value);
        // Only 1 char is overlapping
        for (const char of leftSection) {
            if (rightSection.includes(char)) {
                return acc + getCharValue(char);
            }
        }
        return acc;
    }, 0);
};

export const calculatePriorityPart2 = (inputPath: string): number => {
    // Split every 3 rows by regex. Add \n to include the last one
    const input = parseInput(inputPath) + '\n';
    const matches = input.match(/(.*?\n){3}/gm);
    if (matches) {
        return matches.reduce<number>((acc, value) => {
            const [firstGroup, secondGroup, thirdGroup] = value.split('\n');
            // Still only 1 char is overlapping
            for (const char of firstGroup) {
                if (secondGroup.includes(char) && thirdGroup.includes(char)) {
                    return acc + getCharValue(char);
                }
            }
            return acc;
        }, 0);
    }
    return 0;
};
