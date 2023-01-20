import {
  parseInput,
  calculateNextGeneration,
  printCells,
} from "./bacteria.mjs";

const [cells, generations] = await parseInput();

let result = cells;

for (var i = 0; i < generations; i++) {
  result = calculateNextGeneration(result);
}

printCells(result);
