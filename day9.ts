import { input, Cmd } from "./day9-data";

/* ############################################################## */
/* ###################### INTERFACES ########################## */
/* ############################################################## */

interface GridItem {
  visited: boolean;
}

interface Knot {
  coords: number[];
  tail: boolean;
  updateCoords(dir: string): boolean;
  moveHead(dir: string, bridge: Bridge): boolean;
  moveTail(coords: number[], bridge: Bridge): void;
}

interface Bridge {
  grid: GridItem[][];

  expandGrid(dir: string): void;
  markVisited(coords: number[]): void;
}

/* ############################################################## */
/* ###################### HELPER FUNC ########################## */
/* ############################################################## */

function isTouching(head_coords: number[], tail_coords: number[]): boolean {
  const range_row: number[] = [
    tail_coords[0] - 1,
    tail_coords[0],
    tail_coords[0] + 1
  ];
  const range_col: number[] = [
    tail_coords[1] - 1,
    tail_coords[1],
    tail_coords[1] + 1
  ];
  return (
    range_row.includes(head_coords[0]) && range_col.includes(head_coords[1])
  );
}

/* ############################################################## */
/* ###################### FACTORY FUNCS ########################## */
/* ############################################################## */

function BridgeFactory(): Bridge {
  return {
    grid: [[GridItem(true)]],

    expandGrid: function (dir): void {
      // ########## Expand Grid ############# - No Shifting

      if (dir === "D") {
        // Use length to get last index of grid after addition
        const idx: number = this.grid.length;
        const row_len: number = this.grid[0].length;

        // Add new row && fill with grid items
        this.grid.push([]);
        for (let i = 0; i < row_len; i++) {
          this.grid[idx][i] = GridItem();
        }
        return;
      }

      if (dir === "R") {
        // Append new grid item to end of each row
        const newGrid: GridItem[][] = this.grid.map((row) => {
          row.push(GridItem());
          return row;
        });
        this.grid = newGrid;
        return;
      }

      // ########### Expand Grid ########### - With Shifting

      const grid: GridItem[][] = this.grid;
      const newGrid: GridItem[][] = [[]];

      // Get row and col numbers for expansion dependent on direction
      const num_rows: number =
        dir === "U" || dir === "D" ? grid.length + 1 : grid.length;
      const num_cols: number =
        dir === "U" || dir === "D" ? grid[0].length : grid[0].length + 1;

      // Shift grids
      for (let i = 0; i < num_rows; i++) {
        // If no row, make one
        if (!newGrid[i]) newGrid[i] = [];

        for (let j = 0; j < num_cols; j++) {
          // Adds column to the left or row above
          if (dir === "L")
            newGrid[i][j] = !j ? GridItem() : GridItem(grid[i][j - 1].visited);
          else if (dir === "U")
            newGrid[i][j] = !i ? GridItem() : GridItem(grid[i - 1][j].visited);
        }
      }
      this.grid = newGrid;
    },

    markVisited: function (coords) {
      this.grid[coords[0]][coords[1]].visited = true;
    }
  };
}

function KnotFactory(isTail: boolean = false): Knot {
  return {
    coords: [0, 0],
    tail: isTail,

    updateCoords: function (dir): boolean {
      const [row, col]: number[] = this.coords;

      // Return whether coordinates were updated to trigger tail updates
      let isUpdated = dir === "U" || dir === "L";

      if (dir === "U") this.coords[0] = row + 1;
      if (dir === "L") this.coords[1] = col + 1;

      return isUpdated;
    },

    moveHead: function (dir, bridge): boolean {
      let updatedCoords: boolean = false;

      // Expand Grid if necessary conditions met
      if (
        (dir === "U" && !this.coords[0]) ||
        (dir === "L" && !this.coords[1]) ||
        (dir === "D" && this.coords[0] === bridge.grid.length - 1) ||
        (dir === "R" && this.coords[1] === bridge.grid[0].length - 1)
      ) {
        bridge.expandGrid(dir);
        updatedCoords = this.updateCoords(dir);
      }

      const [row, col]: number[] = this.coords;

      // Move Head in correct direction
      if (dir === "U") this.coords[0] = row - 1;
      if (dir === "D") this.coords[0] = row + 1;
      if (dir === "L") this.coords[1] = col - 1;
      if (dir === "R") this.coords[1] = col + 1;

      return updatedCoords;
    },

    moveTail: function (head_coords, bridge): void {
      // Check if tail needs to move; exit if unnecessary
      const isValid = isTouching(head_coords, this.coords);
      if (isValid) return;

      const [head_row, head_col] = head_coords;
      const [tail_row, tail_col] = this.coords;

      // Scenarios [same row || same col || neither]
      if (head_row === tail_row) {
        tail_col < head_col
          ? (this.coords[1] = tail_col + 1)
          : (this.coords[1] = tail_col - 1);
      } else if (head_col === tail_col) {
        tail_row < head_row
          ? (this.coords[0] = tail_row + 1)
          : (this.coords[0] = tail_row - 1);
      } else {
        this.coords[0] = head_row > tail_row ? tail_row + 1 : tail_row - 1;
        this.coords[1] = head_col > tail_col ? tail_col + 1 : tail_col - 1;
      }

      if (this.tail) bridge.markVisited(this.coords);
    }
  };
}

function GridItem(visited: boolean = false): GridItem {
  return {
    visited: visited
  };
}

/* ############################################################## */
/* ###################### MAIN FUNC ########################## */
/* ############################################################## */

function getTails(num: number): Knot[] {
  const knots: Knot[] = [];
  for (let i = 0; i < num; i++) {
    if (i === num - 1) knots.push(KnotFactory(true));
    else knots.push(KnotFactory());
  }
  return knots;
}

function findVisited(input: Cmd[]) {
  const bridge: Bridge = BridgeFactory();

  const head: Knot = KnotFactory();

  const tails: Knot[] = getTails(1);
  // const tails: Knot[] = getTails(9);

  for (let cmd of input) {
    let count = cmd.steps;
    const dir = cmd.dir;

    while (count > 0) {
      const coordsUpdated = head.moveHead(dir, bridge);
      if (coordsUpdated) tails.forEach((knot) => knot.updateCoords(dir));

      let prevKnot = head;
      for (let i = 0; i < tails.length; i++) {
        tails[i].moveTail(prevKnot.coords, bridge);
        prevKnot = tails[i];
      }

      count--;
    }
  }

  let visited = 0;

  for (let i = 0; i < bridge.grid.length; i++) {
    for (let j = 0; j < bridge.grid[0].length; j++) {
      if (bridge.grid[i][j].visited) visited++;
    }
  }

  return visited;
}

const result = findVisited(input);

console.log("RESULT ---------- :", result);
