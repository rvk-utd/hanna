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

const str = (str) => new sass.types.String(str);
const num = (num, unit) => new sass.types.Number(num, unit);
const bool = (bool) => sass.types.Boolean[bool ? 'TRUE' : 'FALSE'];

module.exports = {
	'encodeURIComponent($val)': (val) => {
		assertString(val);
		return str(encodeURIComponent(val.getValue()));
	},

	'decodeURIComponent($val)': (val) => {
		assertString(val);
		return str(decodeURIComponent(val.getValue()));
	},

	'getEnv($variable)': (variable) => {
		assertString(variable);
		return str(process.env[variable]);
	},

	'isDevMode()': () => bool(process.env.NODE_ENV !== 'production'),

	'fileChecksum($file)': (file) => {
		assertString(file);
		let ret = '';
		try {
			ret = require('md5-file').sync(file.getValue());
		} catch (error) {
			console.error('Can\'t do `_fileChecksum` for "' + file.getValue() + '"\n - - - -');
		}
		return str(ret);
	},

	'pct($number)': (number) => {
		assertNumber(number);
		return num(number.getValue() * 100, '%');
	},
	'px($number)': (number) => {
		assertNumber(number);
		return num(number.getValue(), 'px');
	},
	'vw($number)': (number) => {
		assertNumber(number);
		return num(number.getValue() * 100, 'vw');
	},
	'vh($number)': (number) => {
		assertNumber(number);
		return num(number.getValue() * 100, 'vh');
	},
	'rem($number)': (number) => {
		assertNumber(number);
		return num(number.getValue(), 'rem');
	},
	'num($number)': (number) => {
		assertNumber(number);
		return num(number.getValue());
	},
	'set-unit($number, $unit)': (number, unit) => {
		assertNumber(number);
		assertString(unit);
		return num(number.getValue(), unit.getValue());
	},
};
