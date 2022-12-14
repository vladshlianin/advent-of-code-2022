export enum ElfShape {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C',
}

export enum PlayerShape {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z',
}

export enum MatchScore {
    LOSE = 0,
    DRAW = 3,
    WIN = 6,
}

export const ShapeScore: Record<PlayerShape, number> = {
    X: 1,
    Y: 2,
    Z: 3,
};

export const StragegyMap: Record<PlayerShape, MatchScore> = {
    [PlayerShape.ROCK]: MatchScore.LOSE,
    [PlayerShape.PAPER]: MatchScore.DRAW,
    [PlayerShape.SCISSORS]: MatchScore.WIN,
};

export const DrawMap: Record<ElfShape, PlayerShape> = {
    [ElfShape.ROCK]: PlayerShape.ROCK,
    [ElfShape.PAPER]: PlayerShape.PAPER,
    [ElfShape.SCISSORS]: PlayerShape.SCISSORS,
};

export const WinningMap: Record<ElfShape, PlayerShape> = {
    [ElfShape.ROCK]: PlayerShape.PAPER,
    [ElfShape.PAPER]: PlayerShape.SCISSORS,
    [ElfShape.SCISSORS]: PlayerShape.ROCK,
};

export const LosingMap: Record<ElfShape, PlayerShape> = {
    [ElfShape.ROCK]: PlayerShape.SCISSORS,
    [ElfShape.PAPER]: PlayerShape.ROCK,
    [ElfShape.SCISSORS]: PlayerShape.PAPER,
};
