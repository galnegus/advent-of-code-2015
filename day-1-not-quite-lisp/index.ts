console.time("Execution time");
const input: string[] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "input"), "utf-8")
  .split(/\r?\n/)
  .filter(Boolean);

let floor = 0;
let basementIndexFound = false;
let basementIndex: number = 0;
for (let i = 0; i < input[0].length; ++i) {
  const char = input[0].charAt(i);
  if (char === "(") floor += 1;
  else if (char === ")") floor -= 1;

  if (!basementIndexFound && floor < 0) {
    basementIndex = i + 1;
    basementIndexFound = true;
  }
}

console.log("Floor:", floor);
console.log("First character to hit basement:", basementIndex);

console.timeEnd("Execution time");
export {};
