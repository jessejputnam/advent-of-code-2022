import { input, Input } from "./day12-data";

function convertData(input: Input): void {
  input.heightmap.forEach((row) =>
    console.log(
      row.map((item) => (item < 10 ? " " + item : "" + item)).join(" ")
    )
  );
}

convertData(input);

// console.log(input);
