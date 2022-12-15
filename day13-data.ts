const test_data: string = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

interface Pair {
  left: NestedArray<number>;
  right: NestedArray<number>;
}

interface NestedArray<T> extends Array<T | NestedArray<T>> {}

function getArray(packet: string) {
  const arr = packet.split(",");
  const output = [];

  for (let i = 0; i < arr.length; i++) {
    // console.log("i :", arr[i]);
    if (arr[i].length === 1) output.push(arr[i]);
    else {
      const chars = [];
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "[" || arr[i][j] === "]") chars.push(arr[i][j]);
        else if (arr[i][j] === "1" && arr[i][j + 1] === "0") chars.push("10");
        else if (arr[i][j] === "0" && arr[i][j - 1] === "1") continue;
        else chars.push(arr[i][j]);
      }

      chars.forEach((char) => output.push(char));
    }
  }
  return output;
}

function buildPacket(packet: string[]): NestedArray<number> {
  const stack: NestedArray<number> = [];

  for (let i = 0; i < packet.length; i++) {
    if (i === packet.length - 1) return stack.pop() as NestedArray<number>;

    const char = packet[i];
    if (char === "[") stack.push([]);
    else if (char === "]") {
      const arr: NestedArray<number> = stack.pop() as NestedArray<number>;
      (stack.at(-1) as NestedArray<number>)?.push(arr);
    } else (stack.at(-1) as NestedArray<number>).push(Number(char));
  }

  // This is never touched because of for loop guard return clause
  return stack;
}

function parseData(data: string) {
  const output: Pair[] = [];

  // Parse for individual pairs of packets
  const str_pairs: string[][] = data
    .split("\n\n")
    .map((line) => line.split("\n"));

  // Loop over all packet pairs to convert
  str_pairs.forEach((pair) => {
    const packet_pair: Pair = {
      left: buildPacket(getArray(pair[0])),
      right: buildPacket(getArray(pair[1]))
    };

    output.push(packet_pair);
  });

  return output;
}

const input = parseData(test_data);

export { Pair, NestedArray, input };
