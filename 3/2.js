const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./input.txt');
    let text = ""
    let sum = 0
    const doRegex = /do\(\)/gm
    const dontRegex = /don\'t\(\)/gm
    const mulRegex = /mul\((\d+),(\d+)\)/gm
    
    for await (const line of file.readLines()) {
	text += line
    }

    const ifs = text.matchAll(/(do\(\))|(don\'t\(\))/gm)
    
    const segments = [0]
    let isStartSearch = false
    
    for (const match of ifs) {
	const isDo = match[0] === "do()"
	if (isStartSearch) {
	    if (isDo) {
		segments.push(match.index)
		isStartSearch = false
		continue
	    } else {
		console.log(`skipping ${match.index}`)
	    }
	} else {
	    if (!isDo) {
		segments.push(match.index)
		isStartSearch = true
		continue
	    } else {
		console.log(`skipping ${match.index}`)
	    }
	}
    }
    
    if (segments.length % 2 !== 0) {
	segments.push(text.length)
    }

    console.log(segments)

    for (let i = 0; i < segments.length; i = i + 2) {
	const result = text.slice(segments[i], segments[i + 1]).matchAll(mulRegex)
	for (const match of result) {
	    const [,a,b] = match
	    sum += parseInt(a, 10) * parseInt(b, 10);
	}
    }
    
    

    console.log(sum)
})();
