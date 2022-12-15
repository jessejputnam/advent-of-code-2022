import rock_coords from "./day14-data";

class Sand {
  coords: number[] = [0, 500];
  // fall(max_row: number, path: Record<number, Set<number>>): number[] | null {
  fall(max_row: number, path: Record<number, Set<number>>): number[] {
    let falling: boolean = true;
    const sand_coords = [0, 500];

    while (falling) {
      const [row, col] = sand_coords;

      // // If reaches the abyss
      // if (row > max_row) {
      //   return null;
      // }

      // If no stone/sand blocking trajectory
      if (!path.hasOwnProperty(row) || !path[row].has(col)) {
        sand_coords[0]++;
        continue;
      }

      // If stone/sand blocking trajectory
      // -- try left
      if (!path[row].has(col - 1)) {
        sand_coords[1]--;
        continue;
      }

      // -- then try right
      if (!path[row].has(col + 1)) {
        sand_coords[1]++;
        continue;
      }

      // -- Must rest above current spot
      sand_coords[0]--;
      break;
    }

    return sand_coords;
  }
}

function getMaxRow(path: Record<number, Set<number>>): number {
  return Object.keys(path)
    .map((key) => Number(key))
    .reduce((prev, cur) => Math.max(prev, cur), 0);
}

function isNextWithinOne(cur: number[], next: number[]): boolean {
  return cur[0] === next[0]
    ? cur[1] === next[1] + 1 || cur[1] === next[1] - 1
    : cur[0] === next[0] + 1 || cur[0] === next[0] - 1;
}

function buildRockWall(input: number[][][]): Record<number, Set<number>> {
  const rock_wall: Record<number, Set<number>> = {};

  input.forEach((line) => {
    // fill in missing rocks
    for (let i = 0; i < line.length; i++) {
      const this_coord: number[] = line[i];
      const next_coord: number[] = line[i + 1] ?? null;

      const [col1, row1]: number[] = this_coord;

      // add this_coord to rock_wall
      if (!rock_wall.hasOwnProperty(row1)) rock_wall[row1] = new Set();
      rock_wall[row1].add(col1);

      if (!next_coord) continue;
      // check next coord and fill in between coords if necessary
      if (isNextWithinOne(this_coord, next_coord)) continue;

      const [col2, row2]: number[] = next_coord;
      if (col1 === col2) {
        const isNeg: boolean = row2 < row1;
        const nums = new Array(Math.abs(row2 - row1) - 1).fill(row1);
        const rows_to_add = nums.map((num, i) =>
          isNeg ? num - (i + 1) : num + (i + 1)
        );
        rows_to_add.forEach((row) => {
          const toAdd: Set<number> = !rock_wall.hasOwnProperty(row)
            ? new Set()
            : rock_wall[row];
          toAdd.add(col2);
          rock_wall[row] = toAdd;
        });
      } else {
        const isNeg: boolean = col2 < col1;
        const nums = new Array(Math.abs(col2 - col1) - 1).fill(col1);
        const cols_to_add = nums.map((num, i) =>
          isNeg ? num - (i + 1) : num + (i + 1)
        );
        cols_to_add.forEach((col) => {
          rock_wall[row2].add(col);
        });
      }
    }
  });

  return rock_wall;
}

const path = buildRockWall(rock_coords);

// Once sand can reach a number higher than path[max.num], stop counting
function getUnitsOfSand(path: Record<number, Set<number>>) {
  const max_row = getMaxRow(path) + 2;

  path[max_row] = new Set();
  for (let i = 0; i < 1000; i++) {
    path[max_row].add(i);
  }

  let count = 0;
  // let abyss_reached: boolean = false;
  let top_reached: boolean = false;

  // while (!abyss_reached) {
  while (!top_reached) {
    const sand = new Sand();
    const at_rest = sand.fall(max_row, path);
    count = count + 1;

    if (at_rest[0] === 0 && at_rest[1] === 500) top_reached = true;
    else {
      if (!path[at_rest[0]]) path[at_rest[0]] = new Set();
      path[at_rest[0]].add(at_rest[1]);
    }
  }

  return count;
  // return count - 1;

  // console.log(path);
  // if (abyss_reached) return null;
}

// console.log(path);

const result = getUnitsOfSand(path);

console.log(result);
