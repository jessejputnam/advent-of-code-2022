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
/* ###################### HELPER FUNCS ########################## */
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
      // ########## Expand Grid - No Shifting

      if (dir === "D") {
        // Use length to get last index of grid after addition
        const idx: number = this.grid.length;
        const row_len: number = this.grid[0].length;

        this.grid.push([]);
        for (let i = 0; i < row_len; i++) {
          this.grid[idx][i] = GridItem();
        }

        return;
      }

      if (dir === "R") {
        const newGrid = this.grid.map((row) => {
          row.push(GridItem());
          return row;
        });
        this.grid = newGrid;
        return;
      }

      // ########### Expand Grid - With Shifting
      const grid = this.grid;
      const newGrid: GridItem[][] = [[]];

      const num_rows =
        dir === "U" || dir === "D" ? grid.length + 1 : grid.length;
      const num_cols =
        dir === "U" || dir === "D" ? grid[0].length : grid[0].length + 1;

      for (let i = 0; i < num_rows; i++) {
        if (!newGrid[i]) newGrid[i] = [];

        for (let j = 0; j < num_cols; j++) {
          // Adds column to the left or row above
          if (dir === "L") {
            // Add new grid item
            if (j === 0) newGrid[i][j] = GridItem();
            // Shift old grid item horizontally
            else {
              newGrid[i][j] = GridItem(grid[i][j - 1].visited);
            }
          } else if (dir === "U") {
            // Add new grid item
            if (i === 0) newGrid[i][j] = GridItem();
            // Shift old grid items vertically
            else {
              if (!newGrid[i]) newGrid[i] = [];
              newGrid[i][j] = GridItem(grid[i - 1][j].visited);
            }
          }
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
      let isUpdated = dir === "U" || dir === "L";

      if (dir === "U") this.coords[0] = row + 1;
      if (dir === "L") this.coords[1] = col + 1;

      return isUpdated;
    },

    moveHead: function (dir, bridge): boolean {
      // Expand Grid if necessary
      let updatedCoords = false;

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

// PART 1

// function findVisited(input: Cmd[]) {
//   const bridge: Bridge = BridgeFactory();
//   const head: Knot = KnotFactory();
//   const tail: Knot = KnotFactory();

//   for (let cmd of input) {
//     let count = cmd.steps;
//     const dir = cmd.dir;

//     while (count > 0) {
//       const coordsUpdated = head.moveHead(dir, bridge);
//       if (coordsUpdated) tail.updateCoords(dir);
//       tail.moveTail(head.coords, bridge);
//       count--;
//     }
//   }

//   let visited = 0;

//   for (let i = 0; i < bridge.grid.length; i++) {
//     for (let j = 0; j < bridge.grid[0].length; j++) {
//       if (bridge.grid[i][j].visited) visited++;
//     }
//   }

//   return visited;
// }

// PART 2

function findVisited(input: Cmd[]) {
  const bridge: Bridge = BridgeFactory();

  const head: Knot = KnotFactory();

  const one: Knot = KnotFactory();
  const two: Knot = KnotFactory();
  const three: Knot = KnotFactory();
  const four: Knot = KnotFactory();
  const five: Knot = KnotFactory();
  const six: Knot = KnotFactory();
  const seven: Knot = KnotFactory();
  const eight: Knot = KnotFactory();
  const tail: Knot = KnotFactory(true);

  const tails: Knot[] = [one, two, three, four, five, six, seven, eight, tail];

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
