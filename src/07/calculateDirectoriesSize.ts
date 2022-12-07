import { parseInput } from '../lib/parseInput';

const AVAILABLE_SPACE = 70000000;
const SPACE_TO_UPDATE = 30000000;

type Directories = Record<string, number>;

// Parse FS tree with resulting object with a structure as follows
// /: 1000
// /:a 200
// /:a:b 100
// /:a:c 100
// /:d 800
const evaluateDirSizes = (input: string): Directories => {
    const directories: Directories = {};
    // Store absolute path from root
    const currentPath: Array<string> = [];
    input.split('\n').forEach((row) => {
        const rowContent = row.split(' ');
        const isCommand = rowContent[0] === '$';
        const isDirectory = rowContent[0] === 'dir';
        if (isCommand && rowContent[1] === 'cd') {
            const destination = rowContent[2];
            if (destination === '..') {
                currentPath.pop();
            }
            if (destination !== '..') {
                currentPath.push(destination);
                // PathName is not guaranteed to be unique, so we store
                // Absolute path from the root as the key
                const pathName = currentPath.join(':');
                if (!directories[pathName]) {
                    directories[pathName] = 0;
                }
            }
        }
        if (!isCommand && !isDirectory) {
            // Increment size of current directories and parent ones
            const fileSize = parseInt(rowContent[0], 10);
            if (currentPath.length > 1) {
                const startPosition = currentPath.length - 1;
                for (let i = startPosition; i >= 0; i--) {
                    const pathName = currentPath.slice(0, i + 1).join(':');
                    directories[pathName] += fileSize;
                }
            }
            // Root can contain files too
            if (currentPath.length === 1) {
                directories['/'] += fileSize;
            }
        }
    });
    return directories;
};

// Sum of all directories, which have less size than given threshold
const calculateSize = (directories: Directories): number => {
    return Object.values(directories).reduce<number>((acc, value) => {
        if (value <= 100000) {
            return acc + value;
        }
        return acc;
    }, 0);
};

// Find smallest directory, which satisfies the threshold
const calculateSingleDirectorySize = (directories: Directories): number => {
    const spaceToFree = SPACE_TO_UPDATE - (AVAILABLE_SPACE - directories['/']);
    const largeDirs = Object.values(directories).filter((value) => value >= spaceToFree);
    return Math.min(...largeDirs);
};

export const calculateDirectoriesSize = (inputPath: string, part: 1 | 2): number => {
    const input = parseInput(inputPath);
    const dirs = evaluateDirSizes(input);
    return part === 1 ? calculateSize(dirs) : calculateSingleDirectorySize(dirs);
};
