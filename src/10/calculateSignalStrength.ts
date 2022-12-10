import { parseInput } from '../lib/parseInput';

// Split input in a form of
// noop
// addx 5
// addx 3
// To array of ['noop', 'addx', '5', 'addx', '3']
// This way each number index is corresponding to respective operation position
export const calculateSignalStrength = (inputPath: string): number => {
    const input = parseInput(inputPath).split(/\n|\s/gm);
    let xValue = 1;
    let result = 0;
    for (let i = 0; i <= 220; i++) {
        const command = parseInt(input[i], 10);
        if ([20, 60, 100, 140, 180, 220].includes(i + 1)) result += (i + 1) * xValue;
        if (!isNaN(command)) xValue += command;
    }
    return result;
};

// Get xValues the same way
export const printSignal = (inputPath: string): void => {
    const input = parseInput(inputPath).split(/\n|\s/gm);
    let xValue = 1;
    let screen = '';
    for (let i = 0; i <= input.length - 1; i++) {
        const command = parseInt(input[i], 10);
        screen += Math.abs((i % 40) - xValue) >= 2 ? '.' : '#';
        if (!isNaN(command)) xValue += command;
        // Add new line for every 40 elements
        if ((i + 1) % 40 === 0) screen += '\n';
    }
    console.log(screen);
};
