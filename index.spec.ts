import { initUniverse, getNeighborIds, CellMap } from "./index";

test("it initialized the universe based on seed values", () => {
  const seed = {
    "x1y1": true,
    "x1y2": true,
    "x2y2": true,
  };
  const expected = {
    "x0y0": false,
    "x0y1": false,
    "x0y2": false,
    "x0y3": false,
    "x1y0": false,
    "x1y1": true,
    "x1y2": true,
    "x1y3": false,
    "x2y0": false,
    "x2y1": false,
    "x2y2": true,
    "x2y3": false,
    "x3y0": false,
    "x3y1": false,
    "x3y2": false,
    "x3y3": false,
  }
  const universe = initUniverse(4, seed);
  expect(universe).toEqual(expected)
});

test("it gets the neighbor ids for a cell", () => {
  const universe = initUniverse(4);
  const cellId = "x0y0";
  const expected = ["x0y1", "x1y0", "x1y1"];
  expect(getNeighborIds(0, 0, 4)).toEqual(expected);
});

