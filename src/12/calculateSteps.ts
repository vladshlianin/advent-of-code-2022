import { parseInput } from '../lib/parseInput';

const BASE_CHAR_CODE = 'a'.charCodeAt(0);

type Coordinate = {
    x: number;
    y: number;
};

type CoordinateMap = Array<Array<number>>;

const getMap = (input: Array<string>, part: 1 | 2) => {
    let start: Coordinate = { x: -1, y: -1 };
    let end: Coordinate = { x: -1, y: -1 };
    const map: Array<Array<number>> = [];
    const possibleStarts: Array<Coordinate> = [];
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        map[y] = [];
        for (let x = 0; x < row.length; x++) {
            const element = row[x];
            if (element === 'S') {
                start = { x, y };
                map[y].push(0);
                if (part === 2) possibleStarts.push(start);
                continue;
            }
            if (element === 'E') {
                end = { x, y };
                map[y].push(25);
                continue;
            }
            if (part === 2 && element === 'a') {
                possibleStarts.push({ x, y });
            }
            map[y].push(element.toLowerCase().charCodeAt(0) - BASE_CHAR_CODE);
        }
    }
    return { start, end, map, possibleStarts };
};

// In this solution we traverse from destination to every other node
// So we calculate it relatively from destination, not source
// So here we check if point is at least one point higher, not lower
const canGetToPoint = (source: number, target: number) => source - target <= 1;

const getNeighbours = (x: number, y: number, map: CoordinateMap): Map<Coordinate, number> => {
    const sourcePoint = map[y][x];
    const neighbours = new Map();
    const topPoint = y !== 0 ? map[y - 1][x] : null;
    const bottomPoint = y < map.length - 1 ? map[y + 1][x] : null;
    const leftPoint = x !== 0 ? map[y][x - 1] : null;
    const rightPoint = x < map[y].length - 1 ? map[y][x + 1] : null;
    if (topPoint !== null && canGetToPoint(sourcePoint, topPoint)) neighbours.set({ x, y: y - 1 }, topPoint);
    if (bottomPoint !== null && canGetToPoint(sourcePoint, bottomPoint)) neighbours.set({ x, y: y + 1 }, bottomPoint);
    if (leftPoint !== null && canGetToPoint(sourcePoint, leftPoint)) neighbours.set({ x: x - 1, y }, leftPoint);
    if (rightPoint !== null && canGetToPoint(sourcePoint, rightPoint)) neighbours.set({ x: x + 1, y }, rightPoint);

    return neighbours;
};

// Implement Dijkstra alrogithm
// Was totally expecting calculating points height in round 2
const getShortestDistance = (
    start: Coordinate,
    input: CoordinateMap,
    destination?: Coordinate,
): Map<Coordinate, number> => {
    let queue = <Array<Coordinate>>[];
    const dist = new Map();
    const prevNeighbours: Array<Coordinate> = [];
    let startingNode;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const obj = { x, y };
            const isStartObj = x === start.x && y === start.y;
            if (!isStartObj) queue.push(obj);
            if (isStartObj) startingNode = obj;
            dist.set(obj, isStartObj ? 0 : Infinity);
        }
    }
    queue.unshift(startingNode as Coordinate);

    while (queue.length) {
        let current = queue[0];
        if (prevNeighbours.length) {
            current = prevNeighbours.shift() as Coordinate;
        }
        if (current === undefined) {
            throw new Error('Error on computing');
        }

        if (destination && current.x === destination.x && current.y === destination.y) {
            break;
        }

        const neighbours = getNeighbours(current.x, current.y, input);
        const currentDistance = dist.get(current);
        for (const neighbourCoord of neighbours.keys()) {
            const neighbour = [...dist.keys()].find(
                (item) => item.x === neighbourCoord.x && item.y === neighbourCoord.y,
            );
            if (queue.includes(neighbour) && !prevNeighbours.includes(neighbour)) {
                dist.set(neighbour, currentDistance + 1);
                prevNeighbours.push(neighbour);
            }
        }
        queue = queue.filter((item) => !(item.x === current?.x && item.y === current?.y));
    }
    return dist;
};

export const calculateStepsPart1 = (inputPath: string): number => {
    const input = parseInput(inputPath).split('\n');
    const { start, end, map } = getMap(input, 1);
    const dist = getShortestDistance(end, map, start);
    const destKey = [...dist.keys()].find((key) => key.x === start.x && key.y === start.y) as Coordinate;
    return dist.get(destKey) as number;
};

export const calculateStepsPart2 = (inputPath: string): number => {
    const input = parseInput(inputPath).split('\n');
    const { possibleStarts, end, map } = getMap(input, 2);
    // Get distances for all nodes from start to end
    const dist = getShortestDistance(end, map);
    const destData = [...dist.keys()]
        .filter((key) => {
            return possibleStarts.some((ps) => key.x === ps.x && key.y === ps.y);
        })
        .map((key) => dist.get(key))
        .sort();
    return destData[0] as number;
};
