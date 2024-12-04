const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./input.txt');
    let lines = []
    let count = 0
    for await (const line of file.readLines()) {
	lines.push(line)
    }

    for(let i=0;i<lines.length;i++) {
	for(let j=0; j< lines[0].length;j++) {
	    const letter = lines[i][j]
	    if (letter === "X") {
	        //check up to three up
		if (i >= 3 && matchRest(lines[i-1][j], lines[i-2][j], lines[i-3][j])) count++;
		//check down
		if (i+3 < lines.length && matchRest(lines[i+1][j], lines[i+2][j], lines[i+3][j])) count++;
		//diagonal up left
		if (i >= 3 && matchRest(lines[i-1][j-1], lines[i-2][j-2], lines[i-3][j-3])) count++; 
		// diagonal up right
		if (i >= 3 && matchRest(lines[i-1][j+1], lines[i-2][j+2], lines[i-3][j+3])) count++;
		// diagonal down left
		if (i+3 < lines.length && matchRest(lines[i+1][j-1], lines[i+2][j-2], lines[i+3][j-3])) count++; 
		// diagonal down right
		if (i+3 < lines.length && matchRest(lines[i+1][j+1], lines[i+2][j+2], lines[i+3][j+3])) count++;
		//horizontal left to right
		if (matchRest(lines[i][j+1], lines[i][j+2],  lines[i][j+3])) count++;
		//horizontal right to left
		if (matchRest(lines[i][j-1], lines[i][j-2], lines[i][j-3])) count++;
	    }
	}
    }

    function matchRest(m, a, s) {
	return m === "M" && a === "A" && s === "S"
    }
    
    console.log(count)
})();
