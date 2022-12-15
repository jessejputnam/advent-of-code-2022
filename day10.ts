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

// ####################################### PART 2 ################################
// register === x position of sprite 3 pixels wide
// crt = 40 col x 6 row
// -- row

// CRT[0][0] === cycle 1
// CRT[5][39] === cycle 240

/* MONITOR CRT 

  ########################################
  ########################################
  ########################################
  ########################################
  ########################################
  ########################################

*/

function CRTFactory(): string[][] {
  const crt = new Array(6);
  for (let i = 0; i < crt.length; i++) {
    crt[i] = new Array(40).fill(".");
  }

  return crt;
}

function getSpritePosition(register: number): number[] {
  const x_values = [register - 1, register, register + 1];
  const position: number[] = x_values.filter((x) => x > -1 && x < 40);
  return position;
}

function markPixel(row: number, col: number, crt: string[][]): void {
  crt[row][col] = "#";
}

function renderImage(input: Cmd[]) {
  let register: number = 1;
  let cycle: number = 0;
  const crt: string[][] = CRTFactory();

  for (let i = 0; i < input.length; i++) {
    const cmd: Cmd = input[i];
    const value: number = cmd.value;
    const steps: number = cmd.type === "noop" ? 1 : 2;

    for (let j = 0; j < steps; j++) {
      // End cycle
      const row: number = Math.floor(cycle / 40);
      const col: number = cycle % 40;

      const sprite_position: number[] = getSpritePosition(register);
      if (sprite_position.includes(col)) markPixel(row, col, crt);

      cycle++;
    }

    // End command
    register += value;
  }

  return crt;
}

const crt = renderImage(input).map((row) => row.join(""));
crt.forEach((row) => console.log(row));
