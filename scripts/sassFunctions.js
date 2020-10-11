const sass = require('sass');

const typeError = (argName = 'argument', typeName) =>
	new Error('Expected ' + argName + ' to be a ' + typeName + '.');

const assert = (type) => (value, argName) => {
	if (!(value instanceof type)) {
		throw typeError(argName, type.name);
	}
};
const assertString = assert(sass.types.String);
const assertNumber = assert(sass.types.Number);
// const assertUnitless = (number, argName) => {
// 	if (number.getUnit()) {
// 		throw typeError(argName, 'unitless number');
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
		return str(process.env[variable.getValue()] || '');
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
	'em($number)': (number) => {
		assertNumber(number);
		return num(number.getValue(), 'em');
	},
	'num($number)': (number) => {
		assertNumber(number);
		return num(number.getValue());
	},
	'set-unit($number, $unit)': (number, unit) => {
		assertNumber(number, '$number');
		assertString(unit, '$unit');
		return num(number.getValue(), unit.getValue());
	},
};
