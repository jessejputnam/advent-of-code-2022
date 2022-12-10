import { input, Cmd } from "./day10-data";

function checkInterestingSignal(cycle: number): boolean {
  return cycle === 20 || (cycle - 20) % 40 === 0;
}

function getSignalStrength(cycle: number, register: number): number {
  return cycle * register;
}

function interestingSignalsSum(input: Cmd[]) {
  let signal_sum = 0;
  let register: number = 1;
  let cycle: number = 0;

  for (let i = 0; i < input.length; i++) {
    const cmd: Cmd = input[i];
    const value: number = cmd.value;
    const steps: number = cmd.type === "noop" ? 1 : 2;

    for (let j = 0; j < steps; j++) {
      cycle++;
      if (checkInterestingSignal(cycle)) {
        const signal_strength: number = getSignalStrength(cycle, register);
        signal_sum += signal_strength;
      }
    }

    register += value;
  }

  return signal_sum;
}

const result = interestingSignalsSum(input);

console.log(result);
