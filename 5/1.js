const { open } = require('node:fs/promises');

(async () => {
    const file = await open('./input.txt');
    let sum = 0
    const rules = {}
    let isRuleParsing = true
    for await (const line of file.readLines()) {
	if (isRuleParsing, line.includes("|")) {
	    const [before, after] = line.trim().split("|").map(v => parseInt(v, 10))
	    if (!(after in rules)) {
		rules[after] = []
	    }
	    rules[after].push(before)
	} else if (line.length === 0 && isRuleParsing) {
	    isRuleParsing = false
	} else if (!isRuleParsing && line.length > 0) {
	    const report = line.trim().split(",").map(v => parseInt(v, 10))
	    const seen = new Set()
	    if (isReportValid(report, rules)) {
		sum += report[Math.floor(report.length / 2)]
	    }
	}
    }

    function isReportValid(report, rules) {
	const all = new Set(report)
	const seen = new Set()

	console.log("Checking", report)
	for (const val of report) {
	    const beforeVals = rules[val]

	    seen.add(val)
	    if (beforeVals === undefined) continue
	    console.log(beforeVals)
	    for (const b of beforeVals) {
		if (all.has(b) && !seen.has(b)) {
		    console.log(`violation found! ${b} should go before ${val}`, seen)
		    return false
		}
	    }
	    
	}

	console.log("all good for", report)
	return true
    }
    console.log(rules)
    console.log(sum)
})();
