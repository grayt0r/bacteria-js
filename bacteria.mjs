import * as readline from "node:readline";
import { argv, stdin as input, stdout as output } from "node:process";
import { Record, Set } from "immutable";

export const Cell = Record({ x: 0, y: 0 });

export function parseInput() {
  const generations = parseInt(argv[2], 10) || 1;
  const cells = [];

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({ input, output });

    rl.write("Please enter the location of the live cells\n");
    rl.prompt();

    rl.on("line", (line) => {
      const [x, y] = line.split(",").map((n) => parseInt(n, 10));

      if (x === -1 && y === -1) {
        rl.close();
      } else {
        cells.push(Cell({ x, y }));
        rl.prompt();
      }
    });

    rl.on("close", () => {
      resolve([Set(cells), generations]);
    });
  });
}

export function getNeighbours({ x, y }) {
  const neighbours = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].map(([nX, nY]) => Cell({ x: nX, y: nY }));

  return Set(neighbours);
}

export function calculateNextGeneration(cells) {
  const cellsWithNeighbours = cells.union(
    cells.flatMap((c) => getNeighbours(c))
  );

  return cellsWithNeighbours.filter((c) => {
    const isAlive = cells.has(c);
    const aliveNeighbours = getNeighbours(c).filter((n) => cells.has(n)).size;

    return (
      (isAlive && (aliveNeighbours === 2 || aliveNeighbours === 3)) ||
      (!isAlive && aliveNeighbours === 3)
    );
  });
}

export function printCells(cells) {
  console.log("\nResult:");
  cells.sort().forEach(({ x, y }) => console.log(`${x},${y}`));
}
