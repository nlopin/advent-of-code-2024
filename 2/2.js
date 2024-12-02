const { open } = require('node:fs/promises');

const MIN_DIFF = 1;
const MAX_DIFF = 3;
(async () => {
  const file = await open('./input.txt');

    let safeReportCount = 0;
    const unsafe = [];
    for await (const rawReport of file.readLines()) {
	const report = rawReport.trim().split(/\W+/).map(x => parseInt(x, 10));
	console.assert(report.length > 0, "report is empty!");

	if (report.length === 1) {
	    safeReportCount++;
	    continue;
	}

	const isSafe = checkSafe(report)


	if (isSafe) {
	    safeReportCount++;
	} else {
	    unsafe.push(report);
	}
    }

    for (const report of unsafe) {
	for (let i = 0; i < report.length; i++) {
	    if (checkSafe(report.toSpliced(i, 1))) {
		safeReportCount++;
		break
	    }
	}
    }
    
    console.log(safeReportCount);
})();

function checkSafe(report) {
    let direction = undefined;
	let isSafe = true;

	for (let i = 1; i < report.length; i++) {
	    const prev = report[i - 1];
	    const cur = report[i];

	    const diff = cur - prev;
	    if (Math.abs(diff) > MAX_DIFF ||  Math.abs(diff) < MIN_DIFF) {
		isSafe = false;
		break;
	    }

	    if (direction === undefined) {
		direction = Math.sign(diff);
	    } else if (direction !== Math.sign(diff)) {
		isSafe = false;
		break;
	    }
	}
    return isSafe;
}
