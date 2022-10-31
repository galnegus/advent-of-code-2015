console.time("Execution time");
const input: string[] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "input"), "utf-8")
  .split(/\r?\n/)
  .filter(Boolean);

type Santa = [x: number, y: number];
const xIndex = 0;
const yIndex = 1;

const realSanta: Santa = [0, 0];
const roboSanta: Santa = [0, 0];

// 16 bits per position should be enough, add "middle" to handle negative numbers
const middle = 1 << 15;
function hash([x, y]: Santa): number {
  return ((x + middle) << 16) | (y + middle);
}

const visited = new Set<number>();

type Direction = "^" | ">" | "v" | "<";
function isDirection(char: string): char is Direction {
  return char === '^' || char === '>' || char === 'v' || char === '<';
}

function move(santa: Santa, direction: Direction): void {
  if (direction === '^') santa[yIndex] -= 1;
  else if (direction === '>') santa[xIndex] += 1;
  else if (direction === 'v') santa[yIndex] += 1;
  else if (direction === "<") santa[xIndex] -= 1;
  visited.add(hash(santa));
}

function reset(): void {
  visited.clear();
  visited.add(hash([0, 0]));
  realSanta[0] = 0;
  realSanta[1] = 0;
  roboSanta[0] = 0;
  roboSanta[1] = 0;
}

reset();
for (let i = 0; i < input[0].length; ++i) {
  const direction = input[0].charAt(i);
  if (!isDirection(direction)) throw new Error("Somethings wrong with the input");
  move(realSanta, direction);
}
console.log('Only Santa:', visited.size);

reset();
for (let i = 0; i < input[0].length; ++i) {
  const direction = input[0].charAt(i);
  if (!isDirection(direction))
    throw new Error("Somethings wrong with the input");
  if (i % 2 === 0) move(realSanta, direction);
  else move(roboSanta, direction);
}
console.log("Santa and Robo-Santa:", visited.size);

console.timeEnd("Execution time");
export {};
