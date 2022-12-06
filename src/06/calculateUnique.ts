// Find a sequence of given unique characters
export const calculateUnique = (input: string, uniqueSequenceLength: number): number => {
    const inputArr = input.split('');
    for (let i = 0; i < inputArr.length; i++) {
        // Get unique characters by creating a set of given range
        const currentSequence = new Set(inputArr.slice(i, i + uniqueSequenceLength));
        if (currentSequence.size === uniqueSequenceLength) {
            return i + uniqueSequenceLength;
        }
    }
    return 0;
};
