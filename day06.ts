import input from "./day06-data";

/* ############################### Algorithm ######################################## */

// HELPER Create Key
function createKey(index: number, input: string, length: number): string[] {
  const key: string[] = [];
  let count: number = index - length;
  for (let i = 0; i < length; i++) {
    key.push(input[count]);
    count++;
  }
  return key;
}

// HELPER Validate Key
function validateKey(key: string[], length: number): boolean {
  const key_set: Set<string> = new Set();
  key.forEach((char) => key_set.add(char));
  return key_set.size === length;
}

// MAIN Find Marker
function findMarker(input: string, length: number): number | string {
  for (let i = length; i < input.length; i++) {
    const key: string[] = createKey(i, input, length);
    const isValidKey: boolean = validateKey(key, length);

    if (isValidKey) return i;
  }

  return "No valid key found in datastream";
}

/* ############################### Results ######################################## */

const result_part1: number | string = findMarker(input, 4);
console.log("Part 1 Result:", result_part1);

const result_part2: number | string = findMarker(input, 14);
console.log("Part 2 Result:", result_part2);
