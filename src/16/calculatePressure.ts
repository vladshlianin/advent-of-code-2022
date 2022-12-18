import { parseInput } from '../lib/parseInput';

type Valve = {
    name: string;
    rate: number;
    leadsTo: Array<string>;
};

type Valves = Map<string, Valve>;

type Dist = Map<string, Map<string, number>>;

type ComputedSubset = {
    set: Array<string>;
    result: number;
};

const NumberRegEx = /\d+/;

const parseValves = (input: Array<string>): Map<string, Valve> => {
    return input.reduce((acc, value) => {
        const [leftPart, rightPart] = value.split(';');
        const rateRegEx = leftPart.match(NumberRegEx);
        const valveName = leftPart.replace('Valve ', '').slice(0, 2);
        const rate = rateRegEx ? parseInt(rateRegEx[0]) : 0;
        const leadsTo = rightPart
            .replace(' tunnels lead to valves ', '')
            .replace(' tunnel leads to valve ', '')
            .split(', ');
        acc.set(valveName, { rate, leadsTo, name: valveName });
        return acc;
    }, new Map());
};

// Floyd-Warshall algorithm implementation for getting distances between each set of valves
const floydWarshall = (valves: Map<string, Valve>) => {
    const dist: Dist = new Map();
    const keys = [...valves.keys()];
    for (const valveKey of keys) {
        const map = new Map();
        for (const valveKeyCopy of keys) {
            map.set(valveKeyCopy, Infinity);
        }
        dist.set(valveKey, map);
    }

    for (const valveKey of keys) {
        dist.get(valveKey)?.set(valveKey, 0);
        valves.get(valveKey)?.leadsTo.forEach((children) => {
            dist.get(valveKey)?.set(children, 1);
        });
    }

    for (const k of keys) {
        for (const i of keys) {
            for (const j of keys) {
                dist.get(i)?.set(
                    j,
                    Math.min(
                        dist.get(i)?.get(j) as number,
                        (dist.get(i)?.get(k) as number) + (dist.get(k)?.get(j) as number),
                    ),
                );
            }
        }
    }
    return dist;
};

const filterEmpty = (valves: Valves) => {
    const result = new Map();
    const keys = [...valves.keys()];
    for (const key of keys) {
        const valve = valves.get(key);
        if (valve?.rate) result.set(key, valve);
    }
    return result;
};

const findAllSubsets = (arr: Array<string> = []) => {
    return arr.reduce<Array<Array<string>>>((combos, item) => {
        const newCombos = combos.map((combo) => [...combo, item]);
        combos.push([item], ...newCombos);
        return combos;
    }, []);
};

// Recursively get score for every valve
const getScore = (
    currentItem: Valve,
    nonEmpty: Valves,
    dist: Dist,
    maxTime: number,
    time = 0,
    opened: Set<string> = new Set(),
) => {
    let maxPressure = 0;
    for (const key of nonEmpty.keys()) {
        const nextValve = nonEmpty.get(key) as Valve;
        if (opened.has(key) || opened.has(key)) continue;
        const nextTime = time + (dist.get(currentItem.name)?.get(key) ?? 0) + 1;
        if (nextTime >= maxTime) continue;
        const nextPressure = (maxTime - nextTime) * nextValve.rate;
        const openedCopy = new Set(opened);
        openedCopy.add(key);
        const nextScore = nextPressure + getScore(nextValve, nonEmpty, dist, maxTime, nextTime, openedCopy);
        maxPressure = Math.max(maxPressure, nextScore);
    }
    return maxPressure;
};

// Part 1
export const calculatePressure = (inputPath: string): number => {
    const input = parseInput(inputPath).split('\n');
    const parsedValves = parseValves(input);
    const dist = floydWarshall(parsedValves);
    const nonEmpty = filterEmpty(parsedValves);
    // Always starting with AA
    const currentValve = parsedValves.get('AA') as Valve;
    return getScore(currentValve, nonEmpty, dist, 30);
};

// Part 2
export const calculateCombinedPressure = (inputPath: string) => {
    const input = parseInput(inputPath).split('\n');
    const parsedValves = parseValves(input);
    const dist = floydWarshall(parsedValves);
    const nonEmpty = filterEmpty(parsedValves);
    const currentValve = parsedValves.get('AA') as Valve;

    // Get all possible subsets, which are exactly half of non empty pipes
    const subsetMinSize = Math.floor(nonEmpty.size / 2);
    const subsets = findAllSubsets([...nonEmpty.keys()]).filter((item) => item.length === subsetMinSize);

    // And calculate how much pressure each of subsets would release and sort them by descent
    const calculated = subsets
        .reduce<Array<ComputedSubset>>((acc, set) => {
            const map = new Map();
            set.forEach((item) => map.set(item, nonEmpty.get(item)));
            acc.push({
                set,
                result: getScore(currentValve, map, dist, 26),
            });
            return acc;
        }, [])
        .sort((a, b) => b.result - a.result);

    let result = 0;
    // Then pick each subset and find another subset, which is not overlapping with it
    for (let i = 0; i < calculated.length; i++) {
        const firstSet = calculated[i];
        const parallelSet = calculated.find((set) => {
            return set.set.every((secondSetItem) => !firstSet.set.includes(secondSetItem));
        });
        const sum = firstSet.result + (parallelSet?.result ?? 0);
        if (sum > result) result = sum;
    }
    return result;
};
