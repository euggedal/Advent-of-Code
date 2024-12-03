const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const reports = input.trim().split('\n').map(line => line.split(' ').map(Number))

function isSafeReport(report) {
    let increasing = true
    let decreasing = true

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1]
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false
        if (diff > 0) decreasing = false
        if (diff < 0) increasing = false
    }

    return increasing || decreasing; 
}
    function isSafeWithDampener(report) {
        if (isSafeReport(report)) return true

        for (let i = 0; i < report.length; i++) {
            const dampReport = report.slice(0, i).concat(report.slice(i + 1))
            if (isSafeReport(dampReport)) return true
        }
        return false
    }


const safeReportsCount = reports.filter(isSafeReport).length;
const safeDampReportsCount = reports.filter(isSafeWithDampener).length;

console.log(`Number of safe reports: ${safeReportsCount}`);
console.log(`Number of safe reports with dampener: ${safeDampReportsCount}`);