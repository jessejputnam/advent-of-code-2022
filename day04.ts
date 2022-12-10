import data from "./day04-data";

/* #################### Part 1 ###################### */

function getBoundaryInts(pair: string): number[] {
  const pair_arr: number[] = pair.split("-").map((string) => Number(string));
  return pair_arr;
}

function getContainedPairs(list: string[][]) {
  let containing_pairs_count: number = 0;

  list.forEach((assignment) => {
    const pair_A: number[] = getBoundaryInts(assignment[0]);
    const pair_B: number[] = getBoundaryInts(assignment[1]);

    if (pair_A[0] < pair_B[0]) {
      if (pair_B[1] <= pair_A[1]) containing_pairs_count++;
    } else if (pair_A[0] > pair_B[0]) {
      if (pair_A[1] <= pair_B[1]) containing_pairs_count++;
    } else if (pair_A[0] === pair_B[0]) containing_pairs_count++;
  });

  console.log(containing_pairs_count);
  return containing_pairs_count;
}

getContainedPairs(data);

function getOverlappingPairs(list: string[][]) {
  let containing_pairs_count: number = 0;

  list.forEach((assignment) => {
    const pair_A: number[] = getBoundaryInts(assignment[0]);
    const pair_B: number[] = getBoundaryInts(assignment[1]);

    if (pair_A[0] < pair_B[0]) {
      if (pair_B[0] <= pair_A[1]) containing_pairs_count++;
    } else if (pair_A[0] > pair_B[0]) {
      if (pair_A[0] <= pair_B[1]) containing_pairs_count++;
    } else if (pair_A[0] === pair_B[0]) containing_pairs_count++;
  });

  console.log(containing_pairs_count);
  return containing_pairs_count;
}

getOverlappingPairs(data);
