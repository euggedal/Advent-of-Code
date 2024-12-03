const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);

    const leftNumbers = [], rightNumbers = [];
    data.trim().split('\n').forEach(line => {
        const [left, right] = line.trim().split(/\s+/);
        leftNumbers.push(+left);
        rightNumbers.push(+right);
    });

    leftNumbers.sort((a, b) => a - b);
    rightNumbers.sort((a, b) => a - b);

    const sumOfDifferences = leftNumbers.reduce((sum, num, i) => sum + Math.abs(num - rightNumbers[i]), 0);
    console.log('Sum of Differences:', sumOfDifferences);

    const rightCountMap = rightNumbers.reduce((map, num) => map.set(num, (map.get(num) || 0) + 1), new Map());
    const sum = leftNumbers.reduce((sum, num) => sum + (rightCountMap.get(num) || 0) * num, 0);
    console.log('Sum:', sum);
});