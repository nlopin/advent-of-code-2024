const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./input.txt');
    let text = ""
    let sum = 0
    for await (const line of file.readLines()) {
	text += line
    }

    const result = text.matchAll(/mul\((\d+),(\d+)\)/gm)

    for (const match of result) {
	const [,a,b] = match
	sum += parseInt(a, 10) * parseInt(b, 10);
    }

    console.log(sum)
})();
