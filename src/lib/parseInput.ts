import fs from 'fs';

export const parseInput = (inputPath: string) => {
    return fs.readFileSync(inputPath, { encoding: 'utf8', flag: 'r' });
};
