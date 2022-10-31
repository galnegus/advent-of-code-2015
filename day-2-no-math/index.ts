console.time("Execution time");
const input: string[] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "input"), "utf-8")
  .split(/\r?\n/)
  .filter(Boolean);

type Box = [l: number, w: number, h: number];
const l = 0;
const w = 1;
const h = 2;

const boxes: Array<Box> = input.map((line) => line.split('x').map((dim) => parseInt(dim, 10)) as Box);

function boxPaper(box: Box): number {
  const side1 = box[l] * box[w];
  const side2 = box[w] * box[h];
  const side3 = box[h] * box[l];
  const smallestSide = Math.min(side1, side2, side3);
  return 2 * side1 + 2 * side2 + 2 * side3 + smallestSide;
}

function boxRibbons(box: Box): number {
  const side1 = 2 * box[l] + 2 * box[w];
  const side2 = 2 * box[w] + 2 * box[h];
  const side3 = 2 * box[h] + 2 * box[l];
  const smallestSide = Math.min(side1, side2, side3);
  return smallestSide + box[l] * box[w] * box[h];
}

const totalPaper = boxes.reduce((sum, box) => sum + boxPaper(box), 0);
const totalRibbons = boxes.reduce((sum, box) => sum + boxRibbons(box), 0);

console.log('Total paper needed:', totalPaper);
console.log("Total ribbons needed:", totalRibbons);

console.timeEnd("Execution time");
export {};
