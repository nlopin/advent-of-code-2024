const { open } = require('node:fs/promises');

(async () => {
    const sum = (a,b) => a + b
    const mult = (a,b) => a * b
    const join = (a,b) => parseInt(a.toString() + b.toString())
    const operations = [sum, mult, join]
    const file = await open('./input.txt');
    let s = 0
    for await (const line of file.readLines()) {
	const [rawResult, rawNumbers] = line.split(":").map(v => v.trim())
	const result = parseInt(rawResult, 10)
	const numbers = rawNumbers.split(" ").map(v => parseInt(v, 10)).reverse()

	if (canCombine(numbers, result)) {
	    console.log(numbers, result)
	    s += result
	}
    }

    function canCombine(numbers, result) {
	if (numbers.length === 1) return numbers[0] === result;
	const a = numbers.pop()
	const b = numbers.pop()

	for (const operation of operations) {
	    const outcome = operation(a, b)
	    if (canCombine([...numbers, outcome], result)) return true
	}

	return false
    }

    console.log(s)
})();
