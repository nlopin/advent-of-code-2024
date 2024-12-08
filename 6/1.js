const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();
const map = input.split('\n').map(line => line.split(''));

const directions = [
  { dx: 0, dy: -1 }, // up
  { dx: 1, dy: 0 },  // right
  { dx: 0, dy: 1 },  // down
  { dx: -1, dy: 0 }  // left
];

let guardX, guardY, directionIndex;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (['^', '>', 'v', '<'].includes(map[y][x])) {
      guardX = x;
      guardY = y;
      directionIndex = '^>v<'.indexOf(map[y][x]);
      break;
    }
  }
}

const isInBounds = (x, y) => y >= 0 && y < map.length && x >= 0 && x < map[0].length;

const visited = new Set();
visited.add(`${guardX},${guardY}`);

while (true) {
  const { dx, dy } = directions[directionIndex];
  const nextX = guardX + dx;
  const nextY = guardY + dy;

  if (!isInBounds(nextX, nextY)) break; // Guard leaves the map
  if (map[nextY][nextX] === '#') {
    // Obstacle, turn right
    directionIndex = (directionIndex + 1) % 4;
  } else {
    guardX = nextX;
    guardY = nextY;
    visited.add(`${guardX},${guardY}`);
  }
}

console.log(`Distinct positions visited: ${visited.size}`);
