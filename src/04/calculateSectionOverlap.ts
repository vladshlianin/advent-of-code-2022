import { parseInput } from '../lib/parseInput';

const getFullyOverlapping = (leftStart: number, leftEnd: number, rightStart: number, rightEnd: number): boolean => {
    return (leftStart <= rightStart && leftEnd >= rightEnd) || (rightStart <= leftStart && rightEnd >= leftEnd);
};

const getPartiallyOverlapping = (leftStart: number, leftEnd: number, rightStart: number, rightEnd: number): boolean => {
    return (leftStart <= rightStart && leftEnd >= rightStart) || (rightStart <= leftStart && rightEnd >= leftStart);
};

export const calculateSectionOverlap = (inputPath: string, fullOverlap = true): number => {
    const input = parseInput(inputPath);
    return input.split('\n').reduce<number>((acc, value) => {
        const [leftPart, rightPart] = value.split(',');
        const [leftStart, leftEnd] = leftPart.split('-').map((i) => parseInt(i, 10));
        const [rightStart, rightEnd] = rightPart.split('-').map((i) => parseInt(i, 10));

        if (fullOverlap && getFullyOverlapping(leftStart, leftEnd, rightStart, rightEnd)) {
            return acc + 1;
        }
        if (!fullOverlap && getPartiallyOverlapping(leftStart, leftEnd, rightStart, rightEnd)) {
            return acc + 1;
        }
        return acc;
    }, 0);
};
