import input from "./day8-data";

// PART 1

function findVisibleTrees(data: number[][]) {
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const curTree = data[i][j];

      const north: number[] = [],
        south: number[] = [],
        east: number[] = [],
        west: number[] = [];

      data.forEach((row, idx1) => {
        row.forEach((tree, idx2) => {
          if (idx2 === j && idx1 < i) north.push(tree);
          if (idx2 === j && idx1 > i) south.push(tree);
          if (idx2 < j && idx1 === i) west.push(tree);
          if (idx2 > j && idx1 === i) east.push(tree);
        });
      });

      const checkN: boolean = north.every((tree) => tree < curTree);
      const checkS: boolean = south.every((tree) => tree < curTree);
      const checkW: boolean = west.every((tree) => tree < curTree);
      const checkE: boolean = east.every((tree) => tree < curTree);
      const checks: boolean[] = [checkN, checkS, checkW, checkE];

      if (!checks.every((check) => check === false)) count++;
    }
  }

  return count;
}

// const answer = findVisibleTrees(input);
// console.log(answer);

// PART 2
function getDirScore(dir: number[], curTree: number): number {
  let count = 0;

  for (let i = 0; i < dir.length; i++) {
    count++;
    if (dir[i] >= curTree) break;
  }

  return count;
}

function getDirScoreReverse(dir: number[], curTree: number): number {
  let count = 0;

  for (let i = dir.length - 1; i >= 0; i--) {
    count++;
    if (dir[i] >= curTree) break;
  }

  return count;
}

function findBestScenicScore(data: number[][]) {
  let maxScore = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const curTree = data[i][j];

      const north: number[] = [],
        south: number[] = [],
        east: number[] = [],
        west: number[] = [];

      data.forEach((row, idx1) => {
        row.forEach((tree, idx2) => {
          if (idx2 === j && idx1 < i) north.push(tree);
          if (idx2 === j && idx1 > i) south.push(tree);
          if (idx2 < j && idx1 === i) west.push(tree);
          if (idx2 > j && idx1 === i) east.push(tree);
        });
      });

      const checkN: number = getDirScoreReverse(north, curTree);
      const checkS: number = getDirScore(south, curTree);
      const checkW: number = getDirScoreReverse(west, curTree);
      const checkE: number = getDirScore(east, curTree);
      const score = checkN * checkS * checkW * checkE;

      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
}

const answer = findBestScenicScore(input);
console.log(answer);
