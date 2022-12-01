type ElfData = {
    topCalories: number;
    topNCalories: number;
};

// Transform string that looks like 1000\n2000\n into array and sum it
const getCaloriesPerElfFromInput = (input: string): number => {
    return input.split('\n').reduce((acc, value) => acc + parseInt(value, 10), 0);
};

// Find elf that carries the most calories
// Find sum of calories, which are carried by top 3 elves
// With reduce this function achieves O(n) performance
export const calculateCalories = (input: string, topElves: number): ElfData => {
    const arrayInput = input.split('\n\n');
    if (arrayInput.length < 2) {
        throw new Error('Invalid input');
    }
    // Here we obtain sorted array in a descending order
    // So top elf is guaranteed to be at [0]
    // And top 3 are guaranteed to be in the range of [0] - [n]
    const sortedList = arrayInput
        .reduce<Array<number>>((acc, val) => {
            const calories = getCaloriesPerElfFromInput(val);
            acc.push(calories);
            return acc;
        }, [])
        .sort((a, b) => b - a);
    const topNCalories = sortedList.slice(0, topElves).reduce<number>((acc, value) => acc + value, 0);
    return {
        topCalories: sortedList[0],
        topNCalories,
    };
};
