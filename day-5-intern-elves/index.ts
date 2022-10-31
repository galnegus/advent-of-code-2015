console.time("Execution time");
const input: string[] = require("fs")
  .readFileSync(require("path").resolve(__dirname, "input"), "utf-8")
  .split(/\r?\n/)
  .filter(Boolean);

const vowels = new Set<string>(["a", "e", "i", "o", "u"]);
function isNice(str: string): boolean {
  let nVowels = 0;
  let hasLetterTwiceInRow = false;
  for (let i = 0; i < str.length; ++i) {
    if (nVowels < 3 && vowels.has(str[i])) nVowels += 1;
    if (i >= str.length - 1) continue;
    if (str[i] === str[i + 1]) hasLetterTwiceInRow = true;
    if (
      (str[i] === "a" && str[i + 1] === "b") ||
      (str[i] === "c" && str[i + 1] === "d") ||
      (str[i] === "p" && str[i + 1] === "q") ||
      (str[i] === "x" && str[i + 1] === "y")
    )
      return false;
  }
  return nVowels >= 3 && hasLetterTwiceInRow;
}

function testIsNice(): void {
  console.assert(isNice("ugknbfddgicrmopn"));
  console.assert(isNice("aaa"));
  console.assert(!isNice("jchzalrnumimnmhp"));
  console.assert(!isNice("haegwjzuvuyypxyu"));
  console.assert(!isNice("dvszwmarrgswjxmb"));
}
testIsNice();
const niceStrings = input.filter(isNice);
console.log("Number of nice strings:", niceStrings.length);

function isNicer(str: string): boolean {
  /** All letter pairs as keys, and their start index as value */
  const letterPairs = new Map<string, number>();
  let hasDoublePairs = false;
  let hasSandwichedLetter = false;
  for (let i = 0; i < str.length - 1; ++i) {
    const letterPair = str[i] + str[i + 1];
    const existingLetterPair = letterPairs.get(letterPair);
    if (existingLetterPair !== undefined && existingLetterPair < i - 1) hasDoublePairs = true;
    if (existingLetterPair === undefined) letterPairs.set(letterPair, i);
    if (i >= str.length - 2) continue;
    if (str[i] === str[i + 2]) hasSandwichedLetter = true;
  }
  return hasDoublePairs && hasSandwichedLetter;
}

function testIsNicer(): void {
  console.assert(isNicer("qjhvhtzxzqqjkmpb"));
  console.assert(isNicer("xxyxx"));
  console.assert(isNicer("aaaa"));
  console.assert(!isNicer("uurcxstgmygtbstg"));
  console.assert(!isNicer("ieodomkazucvgmuy"));
}
testIsNicer();
const nicerStrings = input.filter(isNicer);
console.log("Number of nicer strings:", nicerStrings.length);

console.timeEnd("Execution time");
export {};
