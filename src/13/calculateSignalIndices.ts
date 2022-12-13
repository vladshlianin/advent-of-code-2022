import { parseInput } from '../lib/parseInput';

const DIVIDERS = [[[2]], [[6]]];

const compare = (left: number | Array<number>, right: number | Array<number>): boolean | null => {
    const leftIsArr = Array.isArray(left);
    const rightIsArr = Array.isArray(right);
    if (!leftIsArr && !rightIsArr) {
        return left === right ? null : left < right;
    }
    if (leftIsArr && !rightIsArr) return compare(left, [right]);
    if (!leftIsArr && rightIsArr) return compare([left], right);
    if (leftIsArr && rightIsArr) {
        for (let j = 0; j < left.length && j < right.length; j++) {
            const isCorrect = compare(left[j], right[j]);
            if (isCorrect !== null) return isCorrect;
        }
        return compare(left.length, right.length);
    }
    return true;
};

export const calculateSignalIndices = (inputPath: string): number => {
    const input = parseInput(inputPath);
    return input.split('\n\n').reduce((acc, value, index) => {
        const [leftPart, rightPart] = value.split('\n');
        if (compare(JSON.parse(leftPart), JSON.parse(rightPart))) {
            return acc + index + 1;
        }
        return acc;
    }, 0);
};

export const getDecoderKey = (inputPath: string): number => {
    const items = parseInput(inputPath)
        .split('\n\n')
        .map((value) => {
            const [left, right] = value.split('\n');
            return [JSON.parse(left), JSON.parse(right)];
        })
        .flat();
    return [...items, ...DIVIDERS]
        .sort((a, b) => (compare(b, a) ? 1 : 0) - (compare(a, b) ? 1 : 0))
        .reduce((acc, el, index) => (DIVIDERS.includes(el) ? acc * (index + 1) : acc), 1);
};
