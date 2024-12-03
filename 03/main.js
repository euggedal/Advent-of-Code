const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const santaRegex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;

let elf;
let reindeerSum = 0;

while ((elf = santaRegex.exec(input)) !== null) {
    const candyCane = parseInt(elf[1], 10);
    const snowflake = parseInt(elf[2], 10);
    reindeerSum += candyCane * snowflake;
}

let sleighSum = 0;
let santaEnabled = true;

let chimney = 0;
while (chimney < input.length) {
    if (input.slice(chimney).startsWith("do()")) {
        santaEnabled = true;
        chimney += 4;
    } else if (input.slice(chimney).startsWith("don't()")) {
        santaEnabled = false;
        chimney += 7;
    } else {
        const santaMatch = santaRegex.exec(input.slice(chimney));
        if (santaMatch && santaMatch.index === 0) {
            if (santaEnabled) {
                const candyCane = parseInt(santaMatch[1], 10);
                const snowflake = parseInt(santaMatch[2], 10);
                sleighSum += candyCane * snowflake;
            }
            chimney += santaMatch[0].length;
        } else {
            chimney++;
        }
    }
    santaRegex.lastIndex = 0;
}

console.log(`The sum of all valid multiplications (original code) is: ${reindeerSum}`);
console.log(`The sum of all valid multiplications (with do() and don't()) is: ${sleighSum}`);