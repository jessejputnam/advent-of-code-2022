const test_data: string = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

interface Input {
  heightmap: number[][];
  start_point: number[];
  end_point: number[];
}

function parseData(data: string): Input {
  let start_point: number[] = [];
  let end_point: number[] = [];

  const rows = data.split("\n");
  const heightmap = rows.map((row, i) =>
    row.split("").map((col, j) => {
      if (col === "S") {
        start_point = [i, j];
        return 0;
      }
      if (col === "E") {
        end_point = [i, j];
        return 25;
      }

      return col.charCodeAt(0) - 97;
    })
  );

  return {
    heightmap,
    start_point,
    end_point
  };
}

const input = parseData(test_data);
export { Input, input };
