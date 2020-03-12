/* global process */
const sass = require('sass');

const assertString = (value) => {
	if (!(value instanceof sass.types.String)) {
		throw new Error('$number: Expected a number.');
	}
};
const assertNumber = (value) => {
	if (!(value instanceof sass.types.Number)) {
		throw new Error('$number: Expected a number.');
	}
};
// const assertUnitless = (number) => {
// 	if (number.getUnit()) {
// 		throw new Error('$number: Expected a unitless number.');
// 	}
// };

module.exports = {
	'_getEnv(variable)': (variable) => {
		assertString(variable);
		return new sass.types.String(process.env[variable]);
	},

	'_isDevMode()': () =>
		sass.types.Boolean[process.env.NODE_ENV !== 'production' ? 'TRUE' : 'FALSE'],

	'_fileChecksum($file)': (file) => {
		assertString(file);
		let ret = '';
		try {
			ret = require('md5-file').sync(file.getValue());
		} catch (error) {
			console.error('Can\'t do `_fileChecksum` for "' + file.getValue() + '"\n - - - -');
		}
		return new sass.types.String(ret);
	},

	'pct($number)': (number) => {
		assertNumber(number);
		return new sass.types.Number(number.getValue() * 100, '%');
	},
	'px($number)': (number) => {
		assertNumber(number);
		return new sass.types.Number(number.getValue(), 'px');
	},
	'vw($number)': (number) => {
		assertNumber(number);
		return new sass.types.Number(number.getValue() * 100, 'vw');
	},
	'vh($number)': (number) => {
		assertNumber(number);
		return new sass.types.Number(number.getValue() * 100, 'vh');
	},
	'rem($number)': (number) => {
		assertNumber(number);
		return new sass.types.Number(number.getValue(), 'rem');
	},
};
