const fs = require("fs");

function countXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const word = "XMAS";
  let count = 0;

  function isMatch(r, c, dr, dc) {
    for (let i = 0; i < word.length; i++) {
      const nr = r + i * dr;
      const nc = c + i * dc;
      if (
        nr < 0 ||
        nr >= rows ||
        nc < 0 ||
        nc >= cols ||
        grid[nr][nc] !== word[i]
      ) {
        return false;
      }
    }
    return true;
  }

  const directions = [
    [0, 1], //right horizontal
    [0, -1], //left horizontal
    [1, 0], // down vertical
    [-1, 0], // up vertical
    [1, 1], //diogonal down right
    [-1, -1], //diogonal up left
    [1, -1], // diogonal down left
    [-1, 1], // diogonal up right
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      directions.forEach(([dr, dc]) => {
        if (isMatch(r, c, dr, dc)) {
          count++;
        }
      });
    }
  }

  return count;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const grid = data.split("\n").map((line) => line.trim().split(""));
  const result = countXMAS(grid);
  console.log(`"XMAS" appears ${result} times.`);
});
