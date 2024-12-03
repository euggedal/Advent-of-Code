const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const historianRegex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;

let historian;
let warehouseSum = 0;

while ((historian = historianRegex.exec(input)) !== null) {
    const chief = parseInt(historian[1], 10);
    const stock = parseInt(historian[2], 10);
    warehouseSum += chief * stock;
}

let accurateSum = 0;
let instructionsEnabled = true;

let memoryIndex = 0;
while (memoryIndex < input.length) {
    if (input.slice(memoryIndex).startsWith("do()")) {
        instructionsEnabled = true;
        memoryIndex += 4;
    } else if (input.slice(memoryIndex).startsWith("don't()")) {
        instructionsEnabled = false;
        memoryIndex += 7;
    } else {
        const historianMatch = historianRegex.exec(input.slice(memoryIndex));
        if (historianMatch && historianMatch.index === 0) {
            if (instructionsEnabled) {
                const chief = parseInt(historianMatch[1], 10);
                const stock = parseInt(historianMatch[2], 10);
                accurateSum += chief * stock;
            }
            memoryIndex += historianMatch[0].length;
        } else {
            memoryIndex++;
        }
    }
    historianRegex.lastIndex = 0;
}

console.log(`The sum of all valid multiplications (original code) is: ${warehouseSum}`);
console.log(`The sum of all valid multiplications (with do() and don't()) is: ${accurateSum}`);