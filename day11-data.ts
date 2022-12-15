const test_data = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const data = `Monkey 0:
Starting items: 65, 78
Operation: new = old * 3
Test: divisible by 5
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 78, 86, 79, 73, 64, 85, 88
Operation: new = old + 8
Test: divisible by 11
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 2:
Starting items: 69, 97, 77, 88, 87
Operation: new = old + 2
Test: divisible by 2
  If true: throw to monkey 5
  If false: throw to monkey 3

Monkey 3:
Starting items: 99
Operation: new = old + 4
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 5

Monkey 4:
Starting items: 60, 57, 52
Operation: new = old * 19
Test: divisible by 7
  If true: throw to monkey 7
  If false: throw to monkey 6

Monkey 5:
Starting items: 91, 82, 85, 73, 84, 53
Operation: new = old + 5
Test: divisible by 3
  If true: throw to monkey 4
  If false: throw to monkey 1

Monkey 6:
Starting items: 88, 74, 68, 56
Operation: new = old * old
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 2

Monkey 7:
Starting items: 54, 82, 72, 71, 53, 99, 67
Operation: new = old + 1
Test: divisible by 19
  If true: throw to monkey 6
  If false: throw to monkey 0`;

// interface Monkey {
//   count: number;
//   items: number[];
//   inspect(item: number): number;
//   throwTo(item: number): number;
// }
interface Monkey {
  count: number;
  items: bigint[];
  inspect(item: bigint): bigint;
  throwTo(item: bigint): number;
}

function parseData(data: string) {
  const lines: string[] = data.split("\n");
  const monkeys: Monkey[] = [];

  for (let i = 0; i < lines.length; i += 7) {
    const items: bigint[] = lines[i + 1]
      .split(": ")[1]
      .split(", ")
      .map((str) => BigInt(str));
    const operation: string[] = lines[i + 2]
      .split(" = ")[1]
      .split(" ")
      .slice(1);
    const op: string = operation[0];
    const op_num: number | string = operation[1];
    const test_num: bigint = BigInt(Number(lines[i + 3].split(" ").at(-1)));
    const test_true_idx: number = Number(lines[i + 4].split(" ").at(-1));
    const test_false_idx: number = Number(lines[i + 5].split(" ").at(-1));

    const monkey: Monkey = {
      count: 0,
      items: items,
      inspect: function (item) {
        const inspect_val: bigint = op_num === "old" ? item : BigInt(op_num);
        const raised_worry: bigint =
          op === "+" ? item + inspect_val : item * inspect_val;
        // return Math.floor(raised_worry / 3);
        return raised_worry;
      },
      throwTo: function (item) {
        return item % test_num === BigInt(0) ? test_true_idx : test_false_idx;
      }
    };

    monkeys.push(monkey);
  }

  return monkeys;
}

const monkeys: Monkey[] = parseData(data);

export { Monkey, monkeys };
