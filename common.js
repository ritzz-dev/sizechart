// remove all "export " keywords when uploading to shopify

export const isEmpty = str => str === '' ? true : false;

export const extractNum = str => Number(str.match(/[0-9]+/)[0]);

export const onlyWhitespace = str => /^ +$/.test(str);

export function convertUnit(val, unit) {

	const round = arg => Number(arg).toFixed(1);

	if (unit === 'in' || unit === 'inches') {
		val = round(val / 2.54);
	}
	else if (unit === 'cm') {
		val = round(val * 2.54);
	}
	return val
}

export function getDateString() {
	let currDate = new Date();
	let year = currDate.getFullYear();
	let month = currDate.getMonth() + 1;
	let day = currDate.getDate();
	if (month < 10) {
		month = `0${month}`
	}
	if (day < 10) {
		day = `0${day}`
	}
	let dateStr = `${year}-${month}-${day}`
	return dateStr
}

export function createElement(type, { colspan, className, innerText, innerHTML, id, name, inputType, placeholder, value, forElem, maxLength, min, href, target, custAttr, eventListener } = {}) {
	let element = document.createElement(type);

	if (colspan) {
		element.setAttribute('colspan', colspan)
	}

	if (className) {
		element.setAttribute('class', className)
	}

	if (innerText) {
		element.innerText = innerText
	}

	if (innerHTML) {
		element.innerHTML = innerHTML
	}

	if (id) {
		element.setAttribute('id', id)
	}

	if (name) {
		element.setAttribute('name', name)
	}

	if (inputType) {
		element.setAttribute('type', inputType)
	}

	if (placeholder) {
		element.setAttribute('placeholder', placeholder)
	}

	if (value) {
		element.value = value
	}

	if (forElem) {
		element.setAttribute('for', forElem)
	}

	if (maxLength) {
		element.setAttribute('maxlength', maxLength)
	}

	if (min) {
		element.setAttribute('min', min)
	}

	if (href) {
		element.href = href;
	}

	if (target) {
		element.target = target;
	}

	if (custAttr) {
		const { name, val } = custAttr
		element.setAttribute(`data-${name}`, val)
	}

	if (eventListener) {
		const { eventName, func } = eventListener;

		eventName.forEach(item => {
			func.forEach(funcRef => {
				element.addEventListener(item, funcRef)
			})
		})
	}

	return element
}

export function setColspan(item, colspan) {
	item.setAttribute('colspan', colspan);
	return item
}

export class Row {
	constructor(rowNumInDB, numOfColsInDB) {
		this.row = rowNumInDB;
		this.size = '';
		this.initMeasurementProps(numOfColsInDB);
		this.isBaseRow = false;
	}

	initMeasurementProps(num) {
		for (let i = 0; i < num; i++) {
			this[`measurement-${i}`] = {
				value: '',
				colName: ''
			}
		}
	}

	addMeasurementProp() {
		if (this.onlyMeasurementProps().length > 0) {
			let num = extractNum(this.onlyMeasurementProps().findLast(item => item))
			this[`measurement-${num + 1}`] = {
				value: '',
				colName: ''
			}
		}
		else {
			this['measurement-0'] = {
				value: '',
				colName: ''
			}
		}
	}

	setRowNum(val) {
		this.row = val;
	}

	setColName(name, colNum) {
		this[`measurement-${colNum}`].colName = name;
	}

	changeDataValue(val, colNum) {
		if (this.hasOwnProperty(`measurement-${colNum}`)) {
			this[`measurement-${colNum}`].value = val
		}
	}

	hasFilledCol() {
		if (this.onlyMeasurementProps().find(prop => !isEmpty(this[prop].colName))) {
			return this
		}
	}

	convertMeasurementValue(unit) {
		this.onlyMeasurementProps().forEach(prop => {
			if (this[prop].value) {
				this[prop].value = convertUnit(this[prop].value, unit)
			}
		})
	}

	setSize(size) {
		this.size = size
	}

	setBase(bool) {
		this.isBaseRow = bool
	}

	onlyMeasurementProps() {
		return Object.getOwnPropertyNames(this).filter(name => name.match(/^measurement-\d+$/))
	}

	delAndShiftColsLeftInDB(colNum) {
		let numOfColsInDB = this.onlyMeasurementProps().length;

		for (let i = colNum; i < numOfColsInDB; i++) {
			if (i < numOfColsInDB - 1) {
				this[`measurement-${i}`].colName = this[`measurement-${i + 1}`].colName;
				this[`measurement-${i}`].value = this[`measurement-${i + 1}`].value;
			}
			else {
				this[`measurement-${i}`].colName = '';
				this[`measurement-${i}`].value = '';
			}
		}
	}

	getLastFilledCol() {
		return this.onlyMeasurementProps().findLast(item => !isEmpty(this[item].colName));
	}

	getColNumInDB(columnName) {
		return this.onlyMeasurementProps().find(item => this[item].colName === columnName)
	}

	getColInDB(columnName) {
		return this.onlyMeasurementProps().find(item => this[item].colName === columnName && !isEmpty(columnName))
	}

	clearSize() {
		this.setSize('');
		this.clearBase();
	}

	clearBase() {
		this.isBaseRow = false;
	}

	clearMeasurementVals() {
		this.onlyMeasurementProps().forEach(item => {
			this[item].value = '';
		})
	}

	appendColumn(columnName) {
		this[this.getEmptyCol()].colName = columnName;
	}

	getEmptyCol() {
		return this.onlyMeasurementProps().find(item => isEmpty(this[item].colName))
	}

	deleteMeasurementProp(all = true) {
		if (all) {
			this.onlyMeasurementProps().forEach(item => {
				delete this[item]
			})
		}
		else {
			let lastProp = this.onlyMeasurementProps().findLast(item => item);
			delete this[lastProp];
		}
	}

	clearAllCols() {
		this.onlyMeasurementProps().forEach(item => {
			this[item].colName = ''
		})
	}

	clearAllMeasurements() {
		this.onlyMeasurementProps().forEach(item => {
			this[item].value = ''
		})
	}
}