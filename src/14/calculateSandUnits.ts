/* eslint-disable no-constant-condition */
import { parseInput } from '../lib/parseInput';

const parseRockPositions = (input: Array<string>) => {
    const map: Set<string> = new Set();
    let mapBase = 0;
    const baseInput = input.map((item) =>
        item.split(' -> ').map((nestedItem) => {
            const [x, y] = nestedItem.split(',');
            return [parseInt(x, 10), parseInt(y, 10)];
        }),
    );
    baseInput.forEach((line) => {
        for (let i = 0; i < line.length - 1; i++) {
            const [x, y] = line[i];
            const [nextX, nextY] = line[i + 1];
            if (x !== nextX) {
                for (let gridX = Math.min(x, nextX); gridX <= Math.max(x, nextX); gridX++) {
                    map.add(`${gridX}:${y}`);
                }
            }
            if (y !== nextY) {
                for (let gridY = Math.min(y, nextY); gridY <= Math.max(y, nextY); gridY++) {
                    map.add(`${x}:${gridY}`);
                }
            }
            if (y > mapBase || nextY > mapBase) mapBase = Math.max(y, nextY);
        }
    });
    return { map, mapBase };
};

export const calculateSandUnits = (inputPath: string, part: 1 | 2): number => {
    const input = parseInput(inputPath).split('\n');
    const { map, mapBase } = parseRockPositions(input);
    const getCoord = (x: number, y: number) => map.has(`${x}:${y}`);
    const lowestPoint = part === 2 ? mapBase + 2 : mapBase;
    let sandItems = 0;
    while (true) {
        let currentY = 0;
        let currentX = 500;
        while (true) {
            const currentIsFree = !getCoord(currentX, currentY);
            const nextToBottom = part === 2 && currentY + 1 === lowestPoint;
            const lowerIsFree = !nextToBottom && !getCoord(currentX, currentY + 1);
            if (lowerIsFree) {
                currentY += 1;
            }
            if (!lowerIsFree) {
                const lowerLeftIsFree = !nextToBottom && !getCoord(currentX - 1, currentY + 1);
                const lowerRightIsFree = !nextToBottom && !getCoord(currentX + 1, currentY + 1);
                if (lowerLeftIsFree) {
                    currentY += 1;
                    currentX -= 1;
                    continue;
                }
                if (lowerRightIsFree) {
                    currentY += 1;
                    currentX += 1;
                    continue;
                }
                if (currentIsFree) {
                    map.add(`${currentX}:${currentY}`);
                    sandItems += 1;
                    break;
                }
            }
            // If sand is going to the abyss or if the bottom is filled
            if (currentY >= lowestPoint || currentY === 0) {
                return sandItems;
            }
        }
    }
};
