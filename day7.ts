import { input, test_data } from "./day7-data";

interface File {
  size: number;
  name: string;
}

interface Dir {
  [key: string]: File[] | Dir;
}

function getOutputType(line: string[]): string {
  const output_type = line.shift();

  if (output_type === "$") return "cmd";
  else if (output_type === "dir") return "dir";
  else return output_type as string;
}

function parseCmd(line: string[], history: string[]): void {
  const cmd_type = line.shift();

  if (cmd_type === "ls") return;

  // Case: Change directory
  if (line[0] === "/") history.length === 0;
  else if (line[0] === "..") history.pop();
  else {
    history.push(line[0]);
  }
}

function addItem(history: string[], dir: Dir, item: string | File): void {
  // Create shallow copy of history to not affect main function history
  const local_history = history.slice();

  if (!history.length) {
    // If new directory does not exist in directory, create it
    if (typeof item === "string") {
      if (!(item in dir)) dir[item] = {};
    } else {
      if (!("files" in dir)) dir["files"] = [];
      (dir["files"] as Array<File>).push(item);
    }
    return;
  } else {
    // Get outermost folder name
    const folder: string = local_history.shift() as string;
    // Recurse through until no more history
    addItem(local_history, dir[folder] as Dir, item);
  }
}

// MAIN find sum of total sizes of directories
function buildFileSystem(input: string[][]): Dir {
  const root: Dir = {};
  const history: string[] = [];

  // Loop over command line outputs
  for (let i = 0; i < input.length; i++) {
    // Create variable for single command line output
    const line: string[] = input[i];

    // Get command line output type [cmd, dir, file]
    const type: string = getOutputType(line);

    if (type === "cmd") parseCmd(line, history);
    else if (type === "dir") addItem(history, root, line[0]);
    else {
      const file: File = {
        size: Number(type),
        name: line[0]
      };
      addItem(history, root, file);
    }
  }

  return root;
}

const root = buildFileSystem(test_data);
// console.log(root);

function getTargetedDirSize(root: Dir | File[], sum: number = 0) {
  // console.log("-------- START ----------", Object.keys(root));
  if (Array.isArray(root)) return;
  // console.log("===== RECURSE ======");

  for (let dir in root) {
    getTargetedDirSize(root[dir], sum);

    const files: File[] = root.files as File[];
    if (Array.isArray(root[dir])) {
      files.forEach((file) => (sum += file.size));
      console.log(files);
    }
  }

  // console.log(sum, Object.keys(root));
  // console.log("######### END ############");
  console.log(sum);
}

getTargetedDirSize(root);

// files.forEach((file) => {
//   sum += file.size;
//   // console.log(file.size, file.name);
// });
