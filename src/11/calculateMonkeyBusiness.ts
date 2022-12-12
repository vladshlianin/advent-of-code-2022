import { parseInput } from '../lib/parseInput';

type Operation = (input: number) => number;

class Monkey {
    items: Array<number> = [];
    inspectedItems = 0;
    operation;
    divisibleBy;
    throwToTrue;
    throwToFalse;
    constructor(
        items: Array<number>,
        operation: Operation,
        divisibleBy: number,
        throwToTrue: number,
        throwToFalse: number,
    ) {
        this.items = items;
        this.operation = operation;
        this.divisibleBy = divisibleBy;
        this.throwToTrue = throwToTrue;
        this.throwToFalse = throwToFalse;
    }
}

const parseOperation = (input: string): Operation => {
    if (input.includes('old * old')) {
        return (input: number) => input * input;
    }
    const rawOperand = input.match(/\d+/);
    if (!rawOperand) {
        throw new Error('invalid operation');
    }
    const operand = parseInt(rawOperand[0], 10);
    if (input.includes('+')) return (input: number) => input + operand;
    if (input.includes('*')) return (input: number) => input * operand;
    throw new Error('Operation not found');
};

const parseMonkeys = (input: Array<string>): Array<Monkey> => {
    const result: Array<Monkey> = [];
    for (let i = 0; i < input.length - 1; i += 7) {
        const items = input[i + 1].match(/\d+/g);
        const operation = parseOperation(input[i + 2]);
        if (!items || !operation) {
            throw new Error('Invalid input');
        }
        const parsedItems = items.map((num) => parseInt(num, 10));
        const divisibleBy = parseInt(input[i + 3].replace('Test: divisible by ', ''), 10);
        const throwToTrue = parseInt(input[i + 4].replace('If true: throw to monkey ', ''), 10);
        const throwToFalse = parseInt(input[i + 5].replace('If false: throw to monkey ', ''), 10);
        result.push(new Monkey(parsedItems, operation, divisibleBy, throwToTrue, throwToFalse));
    }
    return result;
};

// Get Least Common Multiple for all the monkeys and use it for handling large numberd
export const calculateMonkeyBusiness = (inputPath: string, part: 1 | 2): number => {
    const input = parseInput(inputPath).split('\n');
    const monkeys = parseMonkeys(input);
    const LCM = monkeys.reduce((a, b) => a * b.divisibleBy, 1);
    for (let i = 0; i < (part === 1 ? 20 : 10000); i++) {
        for (let j = 0; j < monkeys.length; j++) {
            const monkey = monkeys[j];
            // console.log('monkey', monkey);
            if (monkey && monkey.items.length) {
                monkey.items.forEach((currentItemRaw) => {
                    const currentItem = currentItemRaw;
                    const worryLevel = Math.floor(monkey.operation(currentItem as number) / (part === 1 ? 3 : 1));
                    const monkeyId = worryLevel % monkey.divisibleBy === 0 ? monkey.throwToTrue : monkey.throwToFalse;
                    monkeys[monkeyId].items.push(worryLevel % LCM);
                    monkey.inspectedItems++;
                });
                monkey.items = [];
            }
        }
    }
    const sortedMonkeys = monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems);
    return sortedMonkeys[0].inspectedItems * sortedMonkeys[1].inspectedItems;
};
