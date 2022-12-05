```
/* ############################### SHIP ################################# */

const data_ship = `[H]                 [Z]         [J]
[L]     [W] [B]     [G]         [R]
[R]     [G] [S]     [J] [H]     [Q]
[F]     [N] [T] [J] [P] [R]     [F]
[B]     [C] [M] [R] [Q] [F] [G] [P]
[C] [D] [F] [D] [D] [D] [T] [M] [G]
[J] [C] [J] [J] [C] [L] [Z] [V] [B]
[M] [Z] [H] [P] [N] [W] [P] [L] [C]`;

function getRows(data: string): string[][] {
  return data.split("\n").map((row) => row.split(""));
}

function getRowValues(row: string[]): string[] {
  return row
    .filter((_, i) => (i - 1) % 4 === 0 && i !== 0)
    .map((v) => v.trim());
}

function buildStacks(ship: string[], rows: string[][]): void {
  rows.forEach((row: string[]) =>
    row.forEach((crate: string, i: number) => (ship[i] = crate + ship[i]))
  );
}

function parseShip(data: string) {
  const ship_rows: string[][] = getRows(data).map((row: string[]) =>
    getRowValues(row)
  );

  const ship: string[] = new Array(9).fill("");
  buildStacks(ship, ship_rows);

  return ship.map((stack) => stack.split(""));
}
```
