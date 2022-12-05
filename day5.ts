/*
  Units: crates
  Subcontainers: stacks
  Container: ship
  Tool: crane
*/

import { instructions, ship_init } from "./day5-data";

interface instruc {
  num_crates: number;
  from_stack: number;
  to_stack: number;
}

function getTopCrates(ship: string[][]): string {
  return ship.map((stack) => stack.at(-1)).join("");
}

// ############################ PART 1 ####################################

// function runInstruction(instruction: instruc, ship: string[][]): void {
//   for (let i = instruction.num_crates; i > 0; i--) {
//     const crate = ship[instruction.from_stack].pop();
//     if (!crate) return;
//     ship[instruction.to_stack].push(crate);
//   }
// }

// function findStackTops(instructions: instruc[], ship_init: string[][]): string {
//   const ship: string[][] = ship_init;
//   instructions.forEach((instruction) => runInstruction(instruction, ship));
//   return getTopCrates(ship);
// }

// console.log(findStackTops(instructions, ship_init));

// ######################### PART 2 ############################

function runInstruction9001(instruction: instruc, ship: string[][]): void {
  let crates: string[] = [];
  for (let i = 0; i < instruction.num_crates; i++) {
    const crate = ship[instruction.from_stack].pop();
    if (crate) crates.unshift(crate);
  }

  ship[instruction.to_stack].splice(Infinity, 0, ...crates);
}

function findStackTops9001(instrucs: instruc[], ship_init: string[][]): string {
  const ship: string[][] = ship_init;
  instructions.forEach((instrucs) => runInstruction9001(instrucs, ship));
  return getTopCrates(ship);
}

console.log(findStackTops9001(instructions, ship_init));
