import fs from 'fs';
import { ElfShape, PlayerShape, MatchScore, StragegyMap, ShapeScore, WinningMap, LosingMap, DrapMap } from './types';

const getScorePart1 = (elfShape: ElfShape, playerShape: PlayerShape): number => {
    // Player is guaranteed to have a score depending on chosen figure
    // And score consists of of figure and end result - winning / losing / draw
    const figureResult = ShapeScore[playerShape];
    if (DrapMap[elfShape] === playerShape) {
        return figureResult + MatchScore.DRAW;
    }
    if (WinningMap[elfShape] === playerShape) {
        return figureResult + MatchScore.WIN;
    }
    // Losing adds 0 points, so its not calculated explicitely
    return figureResult;
};

const getScorePart2 = (elfShape: ElfShape, resultShape: PlayerShape): number => {
    // Player is guaranteed to have a score depending on chosen result
    // However, score consists of result score and chosen figure
    // Which is calculated depending on result.
    // When winning - we pick result respective map
    const resultValue = StragegyMap[resultShape];
    let map = LosingMap;
    if (resultValue === MatchScore.DRAW.valueOf()) {
        map = DrapMap;
    }
    if (resultValue === MatchScore.WIN.valueOf()) {
        map = WinningMap;
    }
    const chosenFigure = map[elfShape];
    return resultValue + ShapeScore[chosenFigure];
};

export const calculatePlayerScore = (inputPath: string, type: 1 | 2): number => {
    const input = fs.readFileSync(inputPath, { encoding: 'utf8', flag: 'r' });
    return input.split('\n').reduce<number>((acc, value) => {
        const [elfShape, playerShape] = value.split(' ');
        if (type === 1) {
            return acc + getScorePart1(elfShape as ElfShape, playerShape as PlayerShape);
        }
        if (type === 2) {
            return acc + getScorePart2(elfShape as ElfShape, playerShape as PlayerShape);
        }
        return acc;
    }, 0);
};
