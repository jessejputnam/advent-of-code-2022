import { NestedArray, Pair, input } from "./day13-data";

function comparePackets(pair: Pair) {
  const [left, right] = [pair.left, pair.right];

  for (let i = 0; i < left.length; i++) {}
  // Check typeof at indices
  // -- If both are integers:
  // -- -- left < right ? return correct_order
  // -- -- left > right ? return incorrect_order
  // -- -- left === right ? check next part of input
  // -- If both are arrays:
  // -- -- Loop over arrays to compare values
  // -- -- -- if left[] runs out before right[] ? return correct_order
  // -- -- -- if left[] runs out after right[] ? return incorrect_order
  // -- -- -- if left[].length === right.legth && [ children ] ? continue to next part of input
  // -- -- --  -- left < right ? return correct_order
  // -- -- --  -- left > right ? return incorrect_order
  // -- -- --  -- left === right ? check next part of input
  // -- If mixed types:
  // -- -- convert the number to [number] and compare
}

comparePackets(input[0]);

function sumPacketIndices(input: Pair[]) {}
