const { open } = require('node:fs/promises');

const MIN_DIFF = 1;
const MAX_DIFF = 3;
(async () => {
  const file = await open('./input.txt');

    let safeReportCount = 0;
    for await (const rawReport of file.readLines()) {
	const report = rawReport.trim().split(/\W+/).map(x => parseInt(x, 10));
	console.assert(report.length > 0, "report is empty!");

	let direction = undefined;
	let isSafe = true;

	if (report.length === 1) {
	    safeReportCount++;
	    continue;
	}

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

	if (isSafe) {
	    safeReportCount++;
	}
    }
    console.log(safeReportCount);
})();
