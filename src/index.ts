import { config } from "../appConfig";

export interface CellMap {
  [key: string]: boolean;
}

function getCellId(x: number, y: number) {
  return `x${x}y${y}`;
};

export function initUniverse(size: number, seed: CellMap = {}) {
  const universe: CellMap = { ...seed };
  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      const cellId = getCellId(x, y);
      universe[cellId] = seed[cellId] ? seed[cellId] : false;
    }
  }

  return universe;
};

export function getNeighborIds(x: number, y: number, universeSize: number) {
  const xValues = [x, x - 1, x + 1].filter(value => value < universeSize && value >= 0);
  const yValues = [y - 1, y, y + 1].filter(value => value < universeSize && value >= 0);
  const neighbors: string[] = [];
  xValues.forEach(x => {
    yValues.forEach(y => {
      neighbors.push(getCellId(x, y));
    });
  });

  return neighbors.filter(neighbor => neighbor !== getCellId(x, y));
};

export function getNextStateForCell(x: number, y: number, universeSize: number, universeState: CellMap) {
  const neighbors = getNeighborIds(x, y, universeSize);
  const livingNeighbors = neighbors.filter(neighbor => universeState[neighbor]);
  const cellId = getCellId(x, y);
  const isAlive = universeState[cellId];

  if (isAlive) {
    return livingNeighbors.length === 2 || livingNeighbors.length === 3;
  } else {
    return livingNeighbors.length === 3 ? true : false;
  }
};

function getNextTick(size: number, state: CellMap) {
  const newState: CellMap = {};
  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      const cellId = getCellId(x, y);
      const nextState = getNextStateForCell(x, y, size, state);
      newState[cellId] = nextState;
    }
  }
  return newState;
};

function printUniverse(size: number, state: CellMap) {
  let result = "";
  for(let y = size - 1; y >= 0; y--) {
    for(let x = 0; x < size; x++) {
      const nextChar = state[getCellId(x, y)] ? "[x]" : "[ ]";
      result = result + nextChar;
    }
    result = result + "\n";
  }
  console.clear();
  console.log(result);
};

const defaultSeed: CellMap = {
  "x12y12": true,
  "x13y12": true,
  "x14y12": true,
  "x14y13": true,
  "x13y14": true,
};

export function play(iterations: number = config.iterations, size: number = config.universeSize, seed: CellMap = defaultSeed) {
  let currentState = initUniverse(size, seed);
  for(let i = 0; i < iterations; i++) {
    setTimeout(() => {
      printUniverse(size, currentState);
      console.log("---------",`iteration: ${i + 1}`, "---------");
      const next = getNextTick(size, currentState);
      currentState = next;
    }, 200 * i);
  }
}

