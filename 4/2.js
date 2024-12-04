const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./input.txt');
    let lines = []
    let count = 0
    for await (const line of file.readLines()) {
	lines.push(line)
    }

    for(let i=1;i < lines.length - 1 ;i++) {
	for(let j=1; j < lines[0].length - 1 ;j++) {
	    const letter = lines[i][j]
	    if (letter === "A") {
	        // check left diagonal letters are M and right S
		if (lines[i-1][j-1] === "M" && lines[i+1][j-1] === "M" && lines[i-1][j+1] === "S" && lines[i+1][j+1] === "S") count++;
		// check below are two Ms and above two S
		if (lines[i-1][j-1] === "S" && lines[i+1][j-1] === "M" && lines[i-1][j+1] === "S" && lines[i+1][j+1] === "M") count++;
		// check on the right two Ms and left S
		if (lines[i-1][j-1] === "S" && lines[i+1][j-1] === "S" && lines[i-1][j+1] === "M" && lines[i+1][j+1] === "M") count++;
		// check on the top are Ms and bottow S
		if (lines[i-1][j-1] === "M" && lines[i+1][j-1] === "S" && lines[i-1][j+1] === "M" && lines[i+1][j+1] === "S") count++;
	    }
	}
    }

    function matchRest(m, a, s) {
	return m === "M" && a === "A" && s === "S"
    }
    
    console.log(count)
})();
