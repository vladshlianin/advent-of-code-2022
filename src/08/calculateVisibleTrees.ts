import { parseInput } from '../lib/parseInput';

const createEmpty2dArray = (length: number): Array<Array<number>> => {
    return Array.from({ length }, () => []);
};

// Get rows and columns in O(n) time
const getRowsAndColumns = (input: Array<string>) => {
    // Init empty 2d arrays for columns and rows
    const columns = createEmpty2dArray(input.length);
    const rows = createEmpty2dArray(input.length);
    for (let i = 0; i <= input.length - 1; i++) {
        const currentRow = input[i].split('');
        for (let j = 0; j <= currentRow.length - 1; j++) {
            const tree = parseInt(currentRow[j], 10);
            rows[i].push(tree);
            columns[j].push(tree);
        }
    }
    return [columns, rows];
};

const isLargerNumber = (threshold: number) => (input: number) => input >= threshold;

const getScenicScore = (higherTreeIndex: number, lengthOfDirection: number) => {
    return higherTreeIndex === -1 ? lengthOfDirection : higherTreeIndex + 1;
};

export const calculateVisibleTrees = (inputPath: string): number => {
    const input = parseInput(inputPath).split('\n');
    const [columns, rows] = getRowsAndColumns(input);
    // Get amount of perimeter trees
    let result = rows.length * 2 + (rows.length - 2) * 2;
    for (let i = 1; i <= rows.length - 2; i++) {
        const rowTrees = rows[i];
        for (let j = 1; j <= rowTrees.length - 2; j++) {
            const currentTree = rowTrees[j];
            // Compare with the highest tree in each direction
            if (
                currentTree > Math.max(...columns[j].slice(0, i)) ||
                currentTree > Math.max(...columns[j].slice(i + 1)) ||
                currentTree > Math.max(...rows[i].slice(0, j)) ||
                currentTree > Math.max(...rows[i].slice(j + 1))
            ) {
                result += 1;
            }
        }
    }
    return result;
};

export const calculateScenicScore = (inputPath: string): number => {
    const input = parseInput(inputPath).split('\n');
    const [columns, rows] = getRowsAndColumns(input);
    let max = 0;
    for (let i = 1; i <= rows.length - 2; i++) {
        const rowTrees = rows[i];
        for (let j = 1; j <= rowTrees.length - 2; j++) {
            const indexCallback = isLargerNumber(rowTrees[j]);
            const treesInNorth = columns[j].slice(0, i).reverse();
            const treesInSouth = columns[j].slice(i + 1);
            const treesInWest = rows[i].slice(0, j).reverse();
            const treesInEast = rows[i].slice(j + 1);

            const scoreForTree =
                getScenicScore(treesInNorth.findIndex(indexCallback), treesInNorth.length) *
                getScenicScore(treesInSouth.findIndex(indexCallback), treesInSouth.length) *
                getScenicScore(treesInWest.findIndex(indexCallback), treesInWest.length) *
                getScenicScore(treesInEast.findIndex(indexCallback), treesInEast.length);

            if (scoreForTree > max) {
                max = scoreForTree;
            }
        }
    }
    return max;
};
