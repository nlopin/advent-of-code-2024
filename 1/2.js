const { open } = require('node:fs/promises');

const left = [];
const right = {};
(async () => {
  const file = await open('./1.1.txt');

    for await (const line of file.readLines()) {
	const [l, r] = line.trim().split(/\W+/);
	left.push(parseInt(l.trim(), 10));

	const n = parseInt(r.trim(), 10)	  
	if (!(n in right)) {
	    right[n] = 0;
	}
	right[n]++;
  }

    let sum = 0;
    for (let i=0; i < left.length; i++) {
	const value = left[i];
	sum += value * (value in right ? right[value] : 0);
    }

    console.log(sum);
})();
