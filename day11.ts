import { monkeys, Monkey } from "./day11-data";

function runMonkeyLoop(monkey: Monkey, monkeys: Monkey[]): void {
  monkey.count++;
  const item: bigint = monkey.items.shift() as bigint;
  const result: bigint = monkey.inspect(item);
  const target: number = monkey.throwTo(result);
  monkeys[target].items.push(result);
}

function getBusinessLevel(monkeys: Monkey[], count: number) {
  const counts: number[] = monkeys
    .map((monkey) => monkey.count)
    .sort((a, b) => b - a);
  const sample = counts.slice(0, count);
  return sample.reduce((prev, cur) => prev * cur, 1);
}

function getMonkeyBusinessLevel(monkeys: Monkey[]) {
  const rounds = 10000;

  console.time("outer");
  for (let i = 0; i < rounds; i++) {
    // Start Round
    for (let j = 0; j < monkeys.length; j++) {
      const monkey: Monkey = monkeys[j];

      while (monkey.items.length) runMonkeyLoop(monkey, monkeys);
    }
  }

  monkeys.forEach((monkey) => console.log(monkey.count));
  const business_level = getBusinessLevel(monkeys, 2);
  console.timeEnd("outer");
  return business_level;
}

const result = getMonkeyBusinessLevel(monkeys);
console.log("RESULT:", result);
