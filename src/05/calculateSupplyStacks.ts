import { parseInput } from '../lib/parseInput';

type Stack = Record<string, Array<string>>;

const NumericRegex = new RegExp('\\d+', 'g');
const CharRegex = new RegExp('[A-Z]');
const IndentRegex = new RegExp('.{1,4}', 'g');

const parseStackStructure = (input: string): Stack => {
    const inputList = input.split('\n');
    const lastRow = inputList[inputList.length - 1].match(NumericRegex);
    if (!lastRow) {
        throw new Error('Invalid input');
    }
    // Initialize stack with numbers from last line
    const result = lastRow.reduce<Stack>((acc, key) => {
        acc[key] = [];
        return acc;
    }, {});
    for (let i = 0; i < inputList.length - 1; i++) {
        // Here we split string into sections of 4
        const chars = inputList[i].match(IndentRegex);
        chars?.forEach((char, index) => {
            const cargoBlock = char.match(CharRegex);
            // If there is a character, push it;
            if (cargoBlock) {
                result[index + 1].push(cargoBlock[0]);
            }
        });
    }
    return result;
};

const executeMovingCommands = (stack: Stack, operations: string, sameOrder: boolean): Stack => {
    // Create a deep copy
    const copy = Object.entries(stack).reduce<Stack>((acc, [key, value]) => {
        acc[key] = [...value];
        return acc;
    }, {});
    return operations.split('\n').reduce<Stack>((acc, value) => {
        const input = value.match(NumericRegex);
        if (!input) {
            throw new Error('Invalid input for commands');
        }
        const [moveAmount, from, to] = input;
        const slicedPortion = acc[from].splice(0, parseInt(moveAmount, 10));
        const orderedLoad = sameOrder ? slicedPortion : slicedPortion.reverse();
        acc[to] = [...orderedLoad, ...acc[to]];
        return acc;
    }, copy);
};

export const calculateSupplyStacks = (inputPath: string, sameOrder = false): string => {
    const input = parseInput(inputPath);
    const [supplyStacks, operations] = input.split('\n\n');
    const structure = parseStackStructure(supplyStacks);
    const resultingStructure = executeMovingCommands(structure, operations, sameOrder);
    return Object.values(resultingStructure).reduce<string>((acc, value) => {
        return acc + value[0];
    }, '');
};
