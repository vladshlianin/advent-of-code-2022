import { parseInput } from '../lib/parseInput';

type Point = { x: number; y: number };

const POSITION_LIMIT = 4_000_000;

type Polygon = {
    top: Point;
    left: Point;
    bottom: Point;
    right: Point;
    radius: number;
};

const NumRegExp = /(-|)\d+/g;

const getDistance = (sourceX: number, sourceY: number, destX: number, destY: number) => {
    return Math.abs(destX - sourceX) + Math.abs(destY - sourceY);
};

const withinDiamond = (polygon: Polygon, { x, y }: Point) => {
    return getDistance(x, y, polygon.top.x, polygon.left.y) <= polygon.radius;
};

const prepareInput = (inputPath: string, boundary: number) => {
    const input = parseInput(inputPath).split('\n');
    const polygons: Array<Polygon> = [];
    let minX = 0;
    let maxX = 0;
    const filledCells: Array<number> = [];
    for (let i = 0; i < input.length; i++) {
        const [sensor, beacon] = input[i].split(':');
        const [sensorX, sensorY] = sensor.match(NumRegExp)?.map((i) => parseInt(i, 10)) ?? [];
        const [beaconX, beaconY] = beacon.match(NumRegExp)?.map((i) => parseInt(i, 10)) ?? [];
        const distance = getDistance(sensorX, sensorY, beaconX, beaconY);
        const leftX = sensorX - distance;
        const rightX = sensorX + distance;
        // Y is incrementing as we are going down
        if (beaconY === boundary) filledCells.push(beaconX);
        polygons.push({
            top: { x: sensorX, y: sensorY - distance },
            left: { x: leftX, y: sensorY },
            bottom: { x: sensorX, y: sensorY + distance },
            right: { x: rightX, y: sensorY },
            radius: distance,
        });
        if (!minX || Math.min(leftX, beaconX) < minX) minX = Math.min(leftX, beaconX);
        if (!maxX || Math.max(rightX, beaconX) > maxX) maxX = Math.max(rightX, beaconX);
    }
    return { polygons, filledCells, maxX, minX };
};

const getHiddenBeacon = (polygons: Array<Polygon>) => {
    for (let j = 0; j < polygons.length; j++) {
        const polygon = polygons[j];
        let width = 0;
        for (let y = polygon.top.y - 1; y <= polygon.bottom.y; y++) {
            const goindDown = polygon.left.y <= y;
            if (goindDown) width -= 1;
            if (!goindDown) width += 1;
            if (y >= 0 && y <= POSITION_LIMIT) {
                const leftPoint = polygon.top.x - width - 1;
                const rightPoint = polygon.top.x + width + 1;
                const testPoints = [];
                if (leftPoint >= 0 && leftPoint <= POSITION_LIMIT) testPoints.push(leftPoint);
                if (rightPoint >= 0 && rightPoint <= POSITION_LIMIT) testPoints.push(rightPoint);
                for (const testPoint of testPoints) {
                    const isOutside = polygons.every((polygon) => !withinDiamond(polygon, { x: testPoint, y }));
                    if (isOutside) return 4000000 * testPoint + y;
                }
            }
        }
    }
    return null;
};

export const calculatePositionsWithoutBeacon = (inputPath: string, boundary: number) => {
    const { polygons, filledCells, maxX, minX } = prepareInput(inputPath, boundary);
    // Part 1
    let positions = 0;
    for (let x = minX; x <= maxX; x++) {
        if (!filledCells.includes(x) && polygons.some((polygon) => withinDiamond(polygon, { x, y: boundary }))) {
            positions += 1;
        }
    }

    return {
        positions,
        // Part 2
        frequency: getHiddenBeacon(polygons),
    };
};
