import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Set } from "immutable";
import { Cell, getNeighbours, calculateNextGeneration } from "./bacteria.mjs";

describe("tests", () => {
  describe("getNeighbours", () => {
    it("should return the correct cells", () => {
      const expected = Set([
        Cell({ x: -1, y: -1 }),
        Cell({ x: 0, y: -1 }),
        Cell({ x: 1, y: -1 }),
        Cell({ x: -1, y: 0 }),
        Cell({ x: 1, y: 0 }),
        Cell({ x: -1, y: 1 }),
        Cell({ x: 0, y: 1 }),
        Cell({ x: 1, y: 1 }),
      ]);

      const result = getNeighbours(Cell({ x: 0, y: 0 }));

      assert.ok(result.equals(expected));
    });
  });

  describe("calculateNextGeneration", () => {
    it("should return the correct cells", () => {
      const start = Set([
        Cell({ x: 1, y: 2 }),
        Cell({ x: 2, y: 2 }),
        Cell({ x: 3, y: 2 }),
      ]);

      const expected = Set([
        Cell({ x: 2, y: 1 }),
        Cell({ x: 2, y: 2 }),
        Cell({ x: 2, y: 3 }),
      ]);

      const result = calculateNextGeneration(start);

      assert.ok(result.equals(expected));
    });

    it("should handle large coordinates", () => {
      const start = Set([
        Cell({ x: 1, y: 2 }),
        Cell({ x: 2, y: 2 }),
        Cell({ x: 3, y: 2 }),
        Cell({ x: 1000000001, y: 1000000002 }),
        Cell({ x: 1000000002, y: 1000000002 }),
        Cell({ x: 1000000003, y: 1000000002 }),
      ]);

      const expected = Set([
        Cell({ x: 2, y: 1 }),
        Cell({ x: 2, y: 2 }),
        Cell({ x: 2, y: 3 }),
        Cell({ x: 1000000002, y: 1000000001 }),
        Cell({ x: 1000000002, y: 1000000002 }),
        Cell({ x: 1000000002, y: 1000000003 }),
      ]);

      const result = calculateNextGeneration(start);

      assert.ok(result.equals(expected));
    });
  });
});
