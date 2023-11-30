import { parseInput } from '../lib/parseInput';

// Rocks are represented as set of x/y coordinates
// x = 0 corresponds to center of tower and y = 0 corresponds to its bottom
type RockPartPosition = [x: number, y: number];

const VERTICAL_OFFSET = 4;
const LEFT_BOUNDARY = -3;
const RIGHT_BOUNDARY = 3;

/*------ GENERATING ROCKS ------*/

/*
|..@@@@.|
*/
const getFirstRockStartPosition = (highestBottomRock: number): Array<RockPartPosition> => {
    const lowestYRockPosition = highestBottomRock + VERTICAL_OFFSET;
    return [
        [-1, lowestYRockPosition],
        [0, lowestYRockPosition],
        [1, lowestYRockPosition],
        [2, lowestYRockPosition],
    ];
};

/*
|...@...|
|..@@@..|
|...@...|
*/
const getSecondRockStartPosition = (highestBottomRock: number): Array<RockPartPosition> => {
    const lowestYRockPosition = highestBottomRock + VERTICAL_OFFSET;
    return [
        [0, lowestYRockPosition + 2],
        [-1, lowestYRockPosition + 1],
        [0, lowestYRockPosition + 1],
        [1, lowestYRockPosition + 1],
        [0, lowestYRockPosition],
    ];
};

/*
|....@..|
|....@..|
|..@@@..|
*/
const getThirdRockStartPosition = (highestBottomRock: number): Array<RockPartPosition> => {
    const lowestYRockPosition = highestBottomRock + VERTICAL_OFFSET;
    return [
        [1, lowestYRockPosition + 2],
        [1, lowestYRockPosition + 1],
        [-1, lowestYRockPosition],
        [0, lowestYRockPosition],
        [1, lowestYRockPosition],
    ];
};

/*
|..@....|
|..@....|
|..@....|
|..@....|
*/
const getFourthRockStartPosition = (highestBottomRock: number): Array<RockPartPosition> => {
    const lowestYRockPosition = highestBottomRock + VERTICAL_OFFSET;
    return [
        [-1, lowestYRockPosition + 3],
        [-1, lowestYRockPosition + 2],
        [-1, lowestYRockPosition + 1],
        [-1, lowestYRockPosition],
    ];
};

/*
|..@@...|
|..@@...|
*/
const getFifthRockStartPosition = (highestBottomRock: number): Array<RockPartPosition> => {
    const lowestYRockPosition = highestBottomRock + VERTICAL_OFFSET;
    return [
        [-1, lowestYRockPosition + 1],
        [0, lowestYRockPosition + 1],
        [-1, lowestYRockPosition],
        [-0, lowestYRockPosition],
    ];
};

function getStartingRockPosition(rockIteration: number, highestBottomRock: number) {
    if (rockIteration % 5 == 0) {
        return getFifthRockStartPosition(highestBottomRock);
    }
    if (rockIteration % 5 == 4) {
        return getFourthRockStartPosition(highestBottomRock);
    }
    if (rockIteration % 5 == 3) {
        return getThirdRockStartPosition(highestBottomRock);
    }
    if (rockIteration % 5 == 2) {
        return getSecondRockStartPosition(highestBottomRock);
    }
    return getFirstRockStartPosition(highestBottomRock);
}

/*------ CALCULATING AND MANIPULATING ROCK POSITIONS ------*/
const getHighestRockPosition = (input: Array<RockPartPosition>): number =>
    input.reduce((acc, val) => {
        if (val[1] > acc) return val[1];
        return acc;
    }, 0);

const updateRockPosition = (
    rock: Array<RockPartPosition>,
    settledRocksPosition: Array<RockPartPosition>,
    direction: 'down' | 'left' | 'right',
): Array<RockPartPosition> => {
    if (direction === 'down') {
        // Subtract 1 from y
        return rock.map((rock) => [rock[0], rock[1] - 1]);
    }
    if (direction === 'left') {
        if (rockCanBeMovedLeft(rock, settledRocksPosition)) {
            // Move 1 to the left
            return rock.map((rock) => [rock[0] - 1, rock[1]]);
        }
    }
    if (direction === 'right') {
        if (rockCanBeMovedRight(rock, settledRocksPosition)) {
            // Move 1 to the left
            return rock.map((rock) => [rock[0] + 1, rock[1]]);
        }
    }
    return rock;
};

// This method checks for collisions with other rocks and cave boundary
const rockCanBeMovedLeft = (rock: Array<RockPartPosition>, settledRocksPosition: Array<RockPartPosition>): boolean => {
    for (const rockPosition of rock) {
        // Reached edge
        if (rockPosition[0] === LEFT_BOUNDARY) return false;

        // Look from the end, because higher rocks are pushed to the end of array
        for (let i = settledRocksPosition.length - 1; i >= 0; i--) {
            const settledRock = settledRocksPosition[i];
            if (settledRock[0] === rockPosition[0] - 1 && settledRock[1] === rockPosition[1]) return false;
        }
    }
    return true;
};

// This method checks for collisions with other rocks and cave boundary
const rockCanBeMovedRight = (rock: Array<RockPartPosition>, settledRocksPosition: Array<RockPartPosition>): boolean => {
    for (const rockPosition of rock) {
        // Reached edge
        if (rockPosition[0] === RIGHT_BOUNDARY) return false;

        // Look from the end, because higher rocks are pushed to the end of array
        for (let i = settledRocksPosition.length - 1; i >= 0; i--) {
            const settledRock = settledRocksPosition[i];
            if (settledRock[0] === rockPosition[0] + 1 && settledRock[1] === rockPosition[1]) return false;
        }
    }
    return true;
};

// This method checks for collisions with other rocks or cave bottom
const rockCanBeLovered = (rock: Array<RockPartPosition>, settledRocksPosition: Array<RockPartPosition>): boolean => {
    for (const rockPosition of rock) {
        // Reached bottom
        if (rockPosition[1] === 1) return false;

        // Look from the end, because higher rocks are pushed to the end of array
        for (let i = settledRocksPosition.length - 1; i >= 0; i--) {
            const settledRock = settledRocksPosition[i];
            if (rockPosition[0] === settledRock[0] && rockPosition[1] - settledRock[1] === 1) return false;
        }
    }
    return true;
};

export const calculateHeight = (inputPath: string, iterations: number): number => {
    const input = parseInput(inputPath);

    // Map of all rocks, which stopped moving
    const settledRocksPosition: Array<RockPartPosition> = [];

    // Cache for part 2 to store repeated patterns
    const cache = new Map<string, { towerHeight: number; rock: number }>();
    let heightFromPattern: number | null = null;

    // Current rock number
    let rock = 1;
    // Index of input
    let currentInputIndex = 0;

    // Simulate rock falling into cave
    while (rock <= iterations) {
        const highestSettledHeight = getHighestRockPosition(settledRocksPosition);
        // Create new rock based on index
        let rockPosition = getStartingRockPosition(rock, highestSettledHeight);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            // Move to the left or right depending on wind
            rockPosition = updateRockPosition(
                rockPosition,
                settledRocksPosition,
                input[currentInputIndex] === '<' ? 'left' : 'right',
            );
            // Update input index. If reached the end of input - repeat again
            currentInputIndex = currentInputIndex === input.length - 1 ? 0 : currentInputIndex + 1;
            // Check if it can be lovered. If not - rock reached final position
            if (!rockCanBeLovered(rockPosition, settledRocksPosition)) {
                // Store rock as settled
                settledRocksPosition.push(...rockPosition);
                // Update rock number
                ++rock;
                break;
            }
            // If can be moved - move one position lower
            rockPosition = updateRockPosition(rockPosition, settledRocksPosition, 'down');
        }

        // Try to find pattern but only for large amount of iterations
        if (!heightFromPattern && iterations > 10_000) {
            // Store highest Y positions for each X cell -> [LEFT_BOUNDARY, RIGHT_BOUNDARY]
            const highestPositions: Array<number> = [];
            for (let i = LEFT_BOUNDARY; i <= RIGHT_BOUNDARY; i++) {
                const yCellPositions = settledRocksPosition
                    .filter((settledPosition) => settledPosition[0] === i)
                    .sort((a, b) => b[1] - a[1]);
                highestPositions.push(yCellPositions.length ? yCellPositions[0][1] : 0);
            }

            // Also find the lowest column
            const lowestColumn = Math.min(...highestPositions);
            // And find height of settled positions relative to the lowest one
            const relativePositions = highestPositions.map((position) => position - lowestColumn);
            const rockIndex = rock % 5;

            // Store relative positions, rock index [1,5] and index of input as state
            const state = JSON.stringify({ relativePositions, rockIndex, currentInputIndex });
            const towerHeight = Math.max(...highestPositions);

            const cachedState = cache.get(state);

            // If such pattern already occurred - just compute repeated pattern height
            if (cachedState) {
                const patternHeight = towerHeight - cachedState.towerHeight;
                const rocksInPattern = rock - cachedState.rock;
                const patternCycles = Math.floor((iterations - rock) / rocksInPattern);
                heightFromPattern = patternCycles * patternHeight;
                // Fast forward
                rock += patternCycles * rocksInPattern;
            }
            // If not - store state
            if (!cachedState) {
                cache.set(state, { rock: rock, towerHeight });
            }
        }
    }
    return getHighestRockPosition(settledRocksPosition) + (heightFromPattern || 0);
};
