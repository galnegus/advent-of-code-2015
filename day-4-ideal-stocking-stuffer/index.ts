import md5 from "md5";

console.time("Execution time");
const input: string[] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "input"), "utf-8")
  .split(/\r?\n/)
  .filter(Boolean);

const key = input[0];
let i = 1;
while (i < 10e9) {
  const md5Hash = md5(`${key}${i}`);
  if (md5Hash.startsWith("000000")) break;
  i += 1;
}

console.log(i);

console.timeEnd("Execution time");
export {};
