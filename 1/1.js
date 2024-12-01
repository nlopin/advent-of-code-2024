const { open } = require('node:fs/promises');

const left = [];
const right = [];
(async () => {
  const file = await open('./1.1.txt');

    for await (const line of file.readLines()) {
	const [l, r] = line.trim().split(/\W+/);
	left.push(parseInt(l.trim(), 10));
	right.push(parseInt(r.trim(), 10));
  }
    left.sort();
    right.sort();

    console.assert(left.length === right.length, "arrays have different length");

    let sum = 0;
    for (let i=0; i < left.length; i++) {
	sum += Math.abs(left[i] - right[i]);
    }

    console.log(sum);
})();
