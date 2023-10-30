// remove the line below when uploading on shopify
import { Row, extractNum, createElement, setColspan } from "./common.js";
// remove the line above when uploading on shopify

// get db from session storage
const db = JSON.parse(sessionStorage.getItem('db'));

// mainDB loses its custom constructor when it is stringified, so this function reassigns it to its original class which is "Row"
const mainDB = db.mainDB.map(item => {
	return Object.assign(new Row(), item)
});

// const maxRowsInDB = db.maxNumOfRows
const maxRowsInDB = 12;
const baseValue = db.base.toUpperCase();
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let dateValue = `${year}/${month}/${day}`;
const categoryValue = db.category.toUpperCase();
const tableUnit = db.chartUnit.toUpperCase();

const fabricValue = db.fabric.toUpperCase()
const styleValue = db.style.toUpperCase()
const lastRow = mainDB[0].getLastFilledCol();
const maxNumOfRowsPerPage = 24;
var startFrom = 0;
var didPrint = false;


const thead = document.getElementById('thead');

const tbody = document.getElementById('tbody');

const tfoot = document.getElementById('tfoot');


function createTableHead() {
	// table head elements
	let categoryCell = createElement('th', { className: 'gray-bg', innerText: 'CATEGORY', colspan: '4' })

	let categoryDataCell = createElement('th', { id: 'category-data-cell', innerText: categoryValue, colspan: '2' })

	let styleCell = createElement('th', { className: 'gray-bg', innerText: 'BRAND/ STYLE:', colspan: '4' })
    let styleDataCell = createElement('th', { id: 'style-data-cell', innerText: styleValue, colspan: '4' })

	

	let baseCell = createElement('th', { className: 'gray-bg', innerText: 'BASE SIZE', colspan: '3' })

	let baseDataCell = createElement('th', { id: 'base-data-cell', innerText: baseValue, colspan: '1' })
    let dateDataCell = createElement('th', { id: 'date-data-cell', innerText: dateValue, colspan: '2' })
	let fabricCell = createElement('th', { className: 'gray-bg', innerText: 'FABRIC TYPE', colspan: '4' })

	let fabricDataCell = createElement('th', { id: 'fabric-data-cell', innerText: fabricValue, colspan: '2' })

	let inCell = createElement('th', {id: 'in', className: 'unit', innerText: 'IN', colspan: '1', custAttr: {name: 'unit', val: 'inches'}});

	let cmCell = createElement('th', { id: 'cm', className: 'unit', innerText: 'CM', colspan: '1', custAttr: {name: 'unit', val: 'cm'} });

	let sizeChartCell = createElement('th', {innerText: 'SIZE CHART', colspan: '5'});

	let pomCell = createElement('th', {innerText: 'POM #', colspan: '1'});

	let descriptionCell = createElement('th', { className: 'left-align', innerText: 'DESCRIPTION', colspan: '3' });
	
	let getSizeCell = (index) => {
      const th = createElement('th', {
        className: `size-headers col-${index} gray-bg bigger-font`,
        innerText: mainDB[index] ? mainDB[index].size : '',
        colspan: '1'
      });
      th.setAttribute('colIndex', index);
      return th;
    };

	// first row in thead
	let theadOne = createElement('tr')

	theadOne.appendChild(categoryCell);
	theadOne.appendChild(categoryDataCell);
	theadOne.appendChild(styleCell);
  	theadOne.appendChild(styleDataCell);
	
  theadOne.appendChild(dateDataCell);

	// second row in thead
	let theadTwo = createElement('tr')

	theadTwo.appendChild(fabricCell);
	theadTwo.appendChild(fabricDataCell);
	
	theadTwo.appendChild(sizeChartCell);
    theadTwo.appendChild(baseCell);
    theadTwo.appendChild(baseDataCell);
    theadTwo.appendChild(inCell);
	theadTwo.appendChild(cmCell);

	// third row in thead
	let theadThree = createElement('tr')

	theadThree.appendChild(pomCell);
	theadThree.appendChild(descriptionCell);
  
	for (let i = 0; i < maxRowsInDB; i++) {
		theadThree.appendChild(getSizeCell(i))
	}

	// append rows to table
	thead.appendChild(theadOne)
	thead.appendChild(theadTwo)
	thead.appendChild(theadThree)
}

function createTbodyRow(num) {
	let row = createElement('tr', { className: 'alternate-color' });
	
	let pomNumberCell = createElement('th', { innerText: num + 1 })
	
	let optionCell = createElement('td', { className: `measurement-type-header row-${num % maxNumOfRowsPerPage} left-align`, colspan: '3', innerText: mainDB[0][`measurement-${num}`].colName })
	
	const getMeasurementCell = (ind) => {
		let cell = createElement('td', { className: `measurement-${ind} col-${ind} row-${num % maxNumOfRowsPerPage} bigger-font ind-col`, colspan: '1' })
        cell.setAttribute('col-index', ind);
		if (mainDB[ind] && mainDB[ind][`measurement-${num}`]) {
			cell.innerText = mainDB[ind][`measurement-${num}`].value
		}
		if (mainDB[ind] && mainDB[ind].isBaseRow) {
			cell.classList.add('gray-bg');
		}
		return cell
	}

	row.appendChild(pomNumberCell);
	row.appendChild(optionCell);
	for (let i = 0; i < maxRowsInDB; i++) {
		row.appendChild(getMeasurementCell(i));
	}
	return row
}

function createTableFoot() {
	let refCell = createElement('td', {className: 'bold ref-cell', colspan: '16'})

	let refText = createElement('span', { innerText: 'SIZE CHART GENERATOR BY: ' })

	let refLink = createElement('a', { className: 'pointer', innerText: 'SMARTPATTERNMAKING.COM', href: 'https://smartpatternmaking.com', target: '_blank' })

	refCell.appendChild(refText)
	refCell.appendChild(refLink)

	let backBtn = createElement('td', { className: 'center-align bold hover-bg pointer', eventListener: { eventName: ['click'], func: [backToChart] } })
	
	let backSymbol = createElement('span', { className: 'gen-chart-arrow', innerHTML: '&#8672;' });

	let backText = createElement('span', { innerText: ' BACK TO SIZE CHART' })

	backBtn.appendChild(backSymbol)
	backBtn.appendChild(backText)

	let prevPageBtn = createElement('td', { className: 'green-hover bold pointer', eventListener: { eventName: ['click'], func: [prevPage] } })
	
	let prevPageSymbol = createElement('span', { className: 'gen-chart-arrow', innerHTML: '&#8672;' });

	let prevPageText = createElement('span', { innerText: ' PREVIOUS PAGE' })

	prevPageBtn.appendChild(prevPageSymbol)
	prevPageBtn.appendChild(prevPageText)


	let nextPageBtn = createElement('td', { className: 'green-hover bold pointer next-btn', eventListener: { eventName: ['click'], func: [nextPage] } })

	let nextPageText = createElement('span', { innerText: 'NEXT PAGE ' })
	
	let nextPageSymbol = createElement('span', { className: 'gen-chart-arrow', innerHTML: '&#8674;' });

	nextPageBtn.appendChild(nextPageText)
	nextPageBtn.appendChild(nextPageSymbol)

	let printChartBtn = createElement('td', { id: 'print-btn', className: 'black-hover bold pointer', innerText: 'PRINT', eventListener: { eventName: ['click'], func: [printChart] } })

	// first row in tfoot
	let tfootOne = createElement('tr', { className: 'gen-foot ref-row' });

	tfootOne.appendChild(refCell)

	tfoot.appendChild(tfootOne)
	
	// second row in tfoot
	let tfootTwo = createElement('tr', { className: 'gen-foot ctrl-row' });

	tfootTwo.appendChild(setColspan(backBtn, '4'));
	tfootTwo.appendChild(setColspan(prevPageBtn, '3'));
	tfootTwo.appendChild(setColspan(nextPageBtn, '3')); 
	tfootTwo.appendChild(setColspan(printChartBtn, '6'));

	tfoot.appendChild(tfootTwo)
}

function backToChart() {
	history.back();
}

function prevPage() {
	if (startFrom - maxNumOfRowsPerPage >= 0) {
		startFrom -= maxNumOfRowsPerPage;
		changeVisibility(tbody, startFrom, startFrom + maxNumOfRowsPerPage)
	}
}

function nextPage() {
	if (lastRow) {
		let lastRowNum = extractNum(lastRow)
		let currentViewNum = (startFrom / maxNumOfRowsPerPage) + 1
		let numOfViews = ~~(lastRowNum / maxNumOfRowsPerPage) + 1;
		if (currentViewNum + 1 <= numOfViews) {
			startFrom += maxNumOfRowsPerPage;
			changeVisibility(tbody, startFrom, startFrom + maxNumOfRowsPerPage)
		}
	}
}

function changeVisibility(rowCont, min, max) {
	let rows = [...rowCont.querySelectorAll('tr')];
	rows.forEach((item, index) => {
        item.setAttribute('data-index', index);
		if (index >= min && index < max) {
			item.classList.remove('hidden');
		}
		else {
			item.classList.add('hidden');
		}
	});

    if(rows.length <= 24){
      
    }
    
    if(document.querySelector('.gen-table .alternate-color[data-index="23"]')?.classList.contains('hidden') || !document.querySelector('.gen-table .alternate-color[data-index="23"]')){
      document.querySelector('.next-btn')?.classList.add('hidden');
      document.getElementById('print-btn')?.setAttribute('colspan',9);
    }
    else{
      document.querySelector('.next-btn')?.classList.remove('hidden');
      document.getElementById('print-btn')?.setAttribute('colspan',6);
    }
}

function highlightUnit() {
	let unit = tableUnit;
	let unitElems = [...document.getElementsByClassName('unit')]
	unitElems.forEach(item => {
		// let attr = item.getAttribute('data-unit')
		if (item.innerText.toLowerCase() === unit.substring(0, 2).toLowerCase()/* || attr.toLowerCase() === unit.toLowerCase()*/) {
			item.classList.add('gray-bg');
            item.style.display = 'table-cell';
		}
	})
}

// function printChart() {
// 	changeVisibility(tfoot, 0, 1);
//     if(document.querySelector('.gen-table .alternate-color[data-index="24"]')?.classList.contains('hidden')){
//       changeVisibility(tbody, 0, 24)
//     }
//   else{
// 	if (lastRow) {
// 		let lastRowNum = extractNum(lastRow)+1
// 		changeVisibility(tbody, 0, lastRowNum)
// 	}
//   }
  
// 	window.print() // commence printing
// }

function printChart() {
    document.querySelector('.gen-table').style.width = '100%';
	changeVisibility(tfoot, 0, 1);
	if (lastRow) {
		let lastRowNum = extractNum(lastRow) + 1
		changeVisibility(tbody, 0, lastRowNum)
	}
	window.print() // commence printing
}

function setClearStorageBool() {
	if (db.count === undefined) {
		db.count = 1;
	}
	else {
		db.count += 1;
	}
	sessionStorage.setItem('db', JSON.stringify(db))
}

window.addEventListener('load', () => {
	setClearStorageBool();
	createTableHead();
	highlightUnit();
	if (lastRow) {
		let lastRowNum = extractNum(lastRow)
		for (let i = 0; i <= lastRowNum; i++) {
			tbody.appendChild(createTbodyRow(i))
		}
	}
	createTableFoot();
  
	changeVisibility(tbody, startFrom, startFrom + maxNumOfRowsPerPage);

  // Get all the <th> elements within the <tr>
const thElements = document.querySelectorAll('.size-headers');

// Initialize an array to store the indices of non-empty <th> elements
const nonEmptyIndices = [];

// Iterate through the <th> elements to identify non-empty ones
thElements.forEach((th) => {
  let attr = th.getAttribute('colIndex');
  if (th.textContent.trim() !== '') {
    nonEmptyIndices.push(attr);
  } else {
    // If the <th> has no content, remove it
    th.parentNode.removeChild(th);
    document.querySelectorAll(`.ind-col[col-index="${attr}"]`).forEach((i) => {
      i.remove();
    });
  }
});

// Calculate the dynamic colspan value
  debugger;
const totalColumns = nonEmptyIndices.length;
const newColspan = totalColumns > 0 ? 12 / totalColumns : 0;

// Set colspan for the remaining <th> elements based on the dynamic value
thElements.forEach((th) => {
  th.setAttribute('colspan', newColspan);
  let attr = th.getAttribute('colIndex');
  document.querySelectorAll(`.ind-col[col-index="${attr}"]`).forEach((i) => {
    i.setAttribute('colspan', newColspan);
  });
});
})

// NB: 'afterprinting' does not work consistently across all platforms. The timing of it works differently depending on the OS and browser. So it's purpose here is to change the bool 'didPrint'
window.addEventListener('afterprint', () => {
	didPrint = true
  document.querySelector('.gen-table').style.width = '70vw';
})

// NB: for devices that use a mouse, when the print dialog closes and mouse movement is detected, the handler function should run. Since 'didPrint' was changed in the 'afterprinting' event, the callback function for 'mousemove' will run to restore the rows to the way they were before printing. 'didPrint' is changed to false so that the function doesn't run again until it changes to 'true'
window.addEventListener('mousemove', () => {
	if (didPrint) {
		changeVisibility(tbody, startFrom, startFrom + maxNumOfRowsPerPage);
		changeVisibility(tfoot, 0, tfoot.childElementCount);
		didPrint = false;
        
	}
})

// NB: for touch devices, the window gains focus after the print dialog box is closed, hence the 'focus' event. Its callback function also restores the rows to how they were before printing and changes 'didPrint' to false.
window.addEventListener('focus', () => {
	if (didPrint) {
		changeVisibility(tbody, startFrom, startFrom + maxNumOfRowsPerPage);
		changeVisibility(tfoot, 0, tfoot.childElementCount);
		didPrint = false;
	}
})