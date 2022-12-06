import { calculateUnique } from '../../src/06/calculateUnique';

describe('testing day 6', () => {
    test('Correctly computing valid input for part 1', () => {
        const result1 = calculateUnique('bvwbjplbgvbhsrlpgdmjqwftvncz', 4);
        expect(result1).toBe(5);
        const result2 = calculateUnique('nppdvjthqldpwncqszvftbrmjlhg', 4);
        expect(result2).toBe(6);
        const result3 = calculateUnique('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4);
        expect(result3).toBe(10);
        const result4 = calculateUnique('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4);
        expect(result4).toBe(11);
    });
    test('Correctly computing valid input for part 1', () => {
        const result1 = calculateUnique('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14);
        expect(result1).toBe(19);
        const result2 = calculateUnique('bvwbjplbgvbhsrlpgdmjqwftvncz', 14);
        expect(result2).toBe(23);
        const result3 = calculateUnique('nppdvjthqldpwncqszvftbrmjlhg', 14);
        expect(result3).toBe(23);
        const result4 = calculateUnique('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14);
        expect(result4).toBe(29);
        const result5 = calculateUnique('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14);
        expect(result5).toBe(26);
    });
});
