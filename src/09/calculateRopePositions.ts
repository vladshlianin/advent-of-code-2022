import { parseInput } from '../lib/parseInput';

type Position = {
    x: number;
    y: number;
};

// Knots are touching if distance between their x and y coordinates
// Is not larger than 1
const isTouching = (front: number, behind: number) => Math.abs(front - behind) <= 1;

export const calculateRopePositions = (inputPath: string, ropeSize: number): number => {
    const input = parseInput(inputPath).split('\n');
    // Store all positions of tail in a set, storing in a `x/y` format
    const tailPositions = new Set(['0/0']);
    const rope: Array<Position> = Array.from({ length: ropeSize }, () => ({ x: 0, y: 0 }));

    input.forEach((move) => {
        const [direction, number] = move.split(' ');
        const parsedNumber = parseInt(number);
        for (let i = 0; i < parsedNumber; i++) {
            const headPosition = rope[rope.length - 1];
            if (direction === 'R') headPosition.x += 1;
            if (direction === 'L') headPosition.x -= 1;
            if (direction === 'U') headPosition.y += 1;
            if (direction === 'D') headPosition.y -= 1;
            for (let j = rope.length - 2; j >= 0; j--) {
                const behind = rope[j];
                const front = rope[j + 1];
                if (!isTouching(front.y, behind.y) || !isTouching(front.x, behind.x)) {
                    // Move at 1 point left or right, following the knot
                    if (Math.abs(front.x - behind.x) >= 1) {
                        behind.x += front.x > behind.x ? 1 : -1;
                    }
                    // Move at 1 point up or down, following the knot
                    if (Math.abs(front.y - behind.y) >= 1) {
                        behind.y += front.y > behind.y ? 1 : -1;
                    }
                }
                tailPositions.add(`${rope[0].x}/${rope[0].y}`);
            }
        }
    });
    return tailPositions.size;
};
