const { renameSync } = require('fs');
const glob = require('glob').sync;

const idealSuffix = `---q50.png`;

glob('src/assets/illustrations/**.png')
	.filter((name) => !name.endsWith(idealSuffix))
	.forEach((filePath) => {
		const newFilePath = filePath.replace(/(?:---q\d{1,3})?\.png/, idealSuffix);
		renameSync(filePath, newFilePath);
	});
