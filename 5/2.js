const { open } = require('node:fs/promises');

(async () => {
    const file = await open('./input.txt');
    let sum = 0
    const rules = {}
    let isRuleParsing = true
    const invalidReports = []
    for await (const line of file.readLines()) {
	if (isRuleParsing, line.includes("|")) {
	    const [before, after] = line.trim().split("|").map(v => parseInt(v, 10))
	    if (!(before in rules)) {
		rules[before] = []
	    }
	    rules[before].push(after)
	} else if (line.length === 0 && isRuleParsing) {
	    isRuleParsing = false
	} else if (!isRuleParsing && line.length > 0) {
	    const report = line.trim().split(",").map(v => parseInt(v, 10))
	    const seen = new Set()
	    if (!isReportValid(report, rules)) {
		invalidReports.push(report)
	    }
	}
    }

    for (const report of invalidReports) {
	let all = new Set(report)
	let seen = new Set()
	const result = []
	for (let i=0; i < report.length; ++i) {
	    const node = report[i]
	    dfs(node)
	}
	console.assert(report.length === result.length, `Report and result length doesn't match ${report.length} vs ${result.length}`)

	sum += result.reverse()[Math.floor(result.length / 2)]
	function dfs(node) {
	    if (seen.has(node)) return

	    seen.add(node)
	    if (rules[node]) {
		for (let edge of rules[node]) {
		    if (all.has(edge)) {
			dfs(edge)
		    }
		}
	    }
	    result.push(node)
	}
    }

    console.log(sum)

    function isReportValid(report, rules) {
	const seen = new Set()

	for (const val of report) {
	    for(const edge of rules[val] ?? []) {
		if (seen.has(edge)) return false
	    }
	    seen.add(val)
	}

	return true
    }

})();
