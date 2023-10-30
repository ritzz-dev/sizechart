// remove the lines below when uploading on shopify
// Imports
import {
  Row,
  isEmpty,
  extractNum,
  onlyWhitespace,
  createElement,
  getDateString,
  setColspan,
} from "./common.js";
// remove the lines above when uploading on shopify

// Preliminary data
// contains each category item and its corresponding measurement options
const category = {
  tops: [
    "NECK LINE CIR.",
    'CHEST 1" BLW AH',
    "WAIST",
    "BTM HEM /HIP",
    "FRT LGHT HPS.",
    "BCK LGHT CB.",
    "ACROSS SH BCK",
    "SH LGHT",
    "SLV LGHT CB.",
    "AH CIR.",
    "AH DROP FM SH SLANT",
    "SLV OPEN.",
    "SLV CUFF WIDTH",
    "SLV CUFF HEIGHT",
    "SLV RIB WIDTH",
    "SLV RIB HIGHT",
    "NECK WIDTH",
    "FRT NECK DROP",
    "BCK NECK DROP",
    "COL. RIB WIDTH CB",
    "COL. RIB LGHT",
    "FRT PLACKET LGHT",
    "FRT PKT LEGHT",
    "FRT PKT WIDHT",
  ],
  shorts: [
    "CONT. WB",
    "UPPER WB at TOP",
    "LOWER WB at SEAM",
    "STRT. WB",
    "WB HEIGHT",
    "HIGH HIP ( ) BLW WB",
    "LOW HIP ( ) UP CROT",
    'THIGHT 1" BLW CROT',
    "LEG OPENING",
    "FRT RISE",
    "BCK RISE",
    "INSEAM",
    "FRT Dart LGTH BLW WB",
    "BCK Dart LGTH BLW WB",
    "ZIPPER LGTH FLY",
    "ZIPPER LGTH CB",
    "ZIPPER LGTH S. SEAM",
    "FRT PKT OPENING",
    "FRT PKT LGHT",
    "BCK PKT PLMT BLW WB",
    "BCK PKT PLMT Frm CB",
    "BCK PKT OPENING",
    "BCK PKT LENGTH",
  ],
  pants: [
    "CONT. WB",
    "UPPER WB at TOP",
    "LOWER WB at SEAM",
    "STRT. WB",
    "WB HEIGHT",
    "HIGH HIP ( ) BLW WB",
    "LOW HIP ( ) UP CROT",
    'THIGHT 1" BLW CROT',
    "KNEE ( ) BLW CROT",
    "LEG OPENING",
    "FRT RISE",
    "BCK RISE",
    "INSEAM",
    "FRT Dart LGTH BLW WB",
    "BCK Dart LGTH BLW WB",
    "ZIPPER LGTH FLY",
    "ZIPPER LGTH CB",
    "ZIPPER LGTH S. SEAM",
    "FRT PKT OPENING",
    "FRT PKT LGHT",
    "BCK PKT PLMT BLW WB",
    "BCK PKT PLMT Frm CB",
    "BCK PKT OPENING",
    "BCK PKT LENGTH",
  ],
  shirts: [
    "NECK LINE CIR.",
    'CHEST 1" BLW AH',
    "WAIST",
    "BTM HEM/HIP",
    "FRT LGHT HPS.",
    "BCK LGHT CB.",
    "ACROSS SH BCK",
    "SH LGHT",
    "SLV LGHT CB.",
    "AH CIR.",
    "AH DROP FM SH SLANT",
    "SLV OPEN.",
    "SLV CUFF WIDTH",
    "SLV CUFF HEIGHT",
    "NECK WIDTH",
    "FRT NECK DROP",
    "BCK NECK DROP",
    "TOP COL. WIDTH CB",
    "TOP COL. POINT WIDTH",
    "TOP COL ( ) SPREAD",
    "STND COL WIDTH",
    "FRT PKT LEGHT",
    "FRT PKT WIDHT",
  ],
  dresses: [
    "HPS TO BTM HEM",
    "FRT LGHT CENTER",
    "BCK LGHT CENTER",
    'BUST 1" BLW AH',
    "Waist CIR.",
    "HIGH HIP ( ) BLW WB",
    "LOW HIP ( ) BLW WB",
    "AH CIR.",
    "AH DROP FM SH SLANT",
    "SH WIDTH",
    "SLV LGTH Frm SH SEAM",
    "SLV LGTH FM CB",
    "SLV OPEN.",
    "SLV CUFF SIZE",
    "NECK WIDTH",
    "FRT NECK DROP",
    "BCK NECK DROP",
    "Zipper LGTH CB",
    "SLIT OPEN.",
    "Bottom Hem Width",
    "AH Dart LGHT",
    'BUST DART 1" BLW AH',
    "FRENCH DART Frm WB",
    "SH DART",
  ],
  skirts: [
    "CONT. WB",
    "UPPER WB at TOP",
    "LOWER WB at SEAM",
    "STRT. WB",
    "WB HEIGHT",
    "HIGH HIP ( ) BLW WB",
    "LOW HIP ( ) BLW WB",
    "S. SEAM LGTH",
    "CF LGTH Frm TOP WB",
    "CB LGTH Frm TOP WB",
    "HEM SWEEP",
    "SLIT OPEN.",
    "BCK VENT OPEN.",
    "FRT Dart LGTH BLW WB",
    "BCK Dart LGTH BLW WB",
    "ZIPPER LGTH FLY",
    "ZIPPER LGTH CB",
    "ZIPPER LGTH S. SEAM",
    "FRT PKT OPENING",
    "FRT PKT LGHT",
    "BCK PKT PLMT BLW WB",
    "BCK PKT PLMT Frm CB",
    "BCK PKT OPENING",
    "BCK PKT LENGTH",
  ],
  bikini: ["CUP", "BUST", "WAIST", "HIP"],
  "bikini set": ["CUP", "BUST", "WAIST", "HIP"],
  "body suit": [
    "CUP",
    "BUST",
    "WAIST",
    "HIP",
    "S SEAM LGHT",
    "CROTCH WIDTH at OPEN.",
    "SH LGHT",
    "SLV LGHT CB.",
    "AH CIR.",
    "AH DROP FM SH SLANT",
    "SLV OPEN.",
  ],
  underwear: [
    "ELASTIC WAIST HEIGHT",
    "ELASTIC WAIST LGHT",
    "WAIST BLW WB",
    "HIPS",
    "S SEAM LGHT BLW WB",
    "LEG OPEN.",
    "FRT RISE",
    "BCK RISE",
  ],
  jackets: [
    "NECK LINE CIR.",
    'CHEST 1" BLW AH',
    "WAIST",
    "BTM HEM /HIP",
    "FRT LGHT HPS.",
    "BCK LGHT CB.",
    "ACROSS SH BCK",
    "SH LGHT",
    "SLV LGHT CB.",
    "AH CIR.",
    "AH DROP FM SH SLANT",
    "SLV OPEN.",
    "SLV CUFF WIDTH",
    "SLV CUFF HEIGHT",
    "NECK WIDTH",
    "FRT NECK DROP",
    "BCK NECK DROP",
    "TOP COL. WIDTH CB",
    "TOP COL. POINT WIDTH",
    "TOP COL ( ) SPREAD",
    "STND COL WIDTH",
    "FRT PKT LEGHT",
    "FRT PKT WIDHT",
  ],
  outerwear: [
    "NECK LINE CIR.",
    'CHEST 1" BLW AH',
    "WAIST",
    "BTM HEM /HIP",
    "FRT LGHT HPS.",
    "BCK LGHT CB.",
    "ACROSS SH BCK",
    "SH LGHT",
    "SLV LGHT CB.",
    "AH CIR.",
    "AH DROP FM SH SLANT",
    "SLV OPEN.",
    "SLV CUFF WIDTH",
    "SLV CUFF HEIGHT",
    "NECK WIDTH",
    "FRT NECK DROP",
    "BCK NECK DROP",
    "TOP COL. WIDTH CB",
    "TOP COL. POINT WIDTH",
    "TOP COL ( ) SPREAD",
    "STND COL WIDTH",
    "FRT PKT LEGHT",
    "FRT PKT WIDHT",
  ],
  overall: [
    "MAX. STRAP LGHT",
    "BIB LGHT",
    "BIB WIDTH AT TOP",
    "BIB WIDTH AT BTM",
    "WAIST",
    "HIGH HIP ( ) BLW WB",
    "S. SEAM",
    'THIGHT 1" BLW CROT',
    "KNEE ( ) BLW CROT",
    "LEG OPENING",
    "FRT RISE",
    "BCK RISE",
    "INSEAM",
  ],
  coverall: [
    "TOTAL LEGHT",
    "NECK WIDTH",
    "FRT NECK DROP",
    "BCK NECK DROP",
    "TOP COL. WIDTH CB",
    "TOP COL. POINT WIDTH",
    "TOP COL ( ) SPREAD",
    'CHEST 1" BLW AH',
    "WAIST",
    "HIGH HIP ( ) BLW WB",
    "ACROSS SH BCK",
    "SLV LGHT CB.",
    "AH DROP FM SH SLANT",
    'THIGHT 1" BLW CROT',
    "KNEE ( )BLW CROT",
    "LEG OPENING",
    "FRT RISE",
    "BCK RISE",
    "INSEAM",
    "BOOT SIZE",
    "BOOT OPEN.",
    "BOOT HEIGHT",
    "INSOLE LGHT",
    "INSOLE WIDHT",
  ],
};

const resetPoms = () => {
  document.getElementById("category-select-option").value = "tops";
  document
    .getElementById("category-select-option")
    .dispatchEvent(new Event("change"));
  document.querySelector(".extra-pom-row").remove();
  document.querySelector(".extra-pom-cell").textContent = "";
};

// pulls the category names from 'category'
const categoryNames = Object.keys(category).map((item) => item.toLowerCase());

// array of current measurement option names for the selected category
var measurementNames = [];

// holds info about the sizes, measurement values and measurement names in the form of rows and cols
const mainDB = [];

// holds user defined measurement option names for each category
var extraOptionsForEachCategory = (function () {
  let obj = {};
  categoryNames.forEach((item) => {
    obj[item.toLowerCase()] = [];
  });
  return obj;
})();

// Initialize variables and constants

const scrollcellCol = window.outerWidth > 450 ? 10 : 6;
const colHeaderCellNum = window.outerWidth > 450 ? 1 : 2;
const defaultNumOfRows = 3;
const maxNumOfRows = 12;
var numOfDataColsPerView = window.outerWidth > 450 ? 9 : 2;
var screen = window.outerWidth > 450 ? "desktop" : "mobile";
var prevScreen = screen; // will be used to check if the page has changed to being viewed on a small or big screen in the 'resize' event listener
var numOfOptionsPerRow = window.outerWidth > 450 ? 5 : 3;
var numOfOptionRows = 5;
var tableUnit = "inches";
var categoryValue = categoryNames[0];
var styleValue = "";
var fabricValue = "";
var baseValue = "";
var dateValue = getDateString(new Date());
var colStart = 0; // this value points to the starting colnum from which data is viewed from mainDB
var lastRowNumInFocus; // last data row that was in focus
var toggleRowDelete = false; // delete row mode inactive by default
var addPomMode = false; // add POM mode inactive by default
var delPomMode = false; // delete POM mode inactive by default

// Functions for retrieving DOM elements
// returns all measurement option cells
const getMeasurementOptions = () => [
  ...document.querySelectorAll(".measurement-option"),
];

// returns the elements used for selecting the table units
const getTableUnits = () => [...document.getElementsByClassName("unit")];

// returns the rows that contain the size and measurement cell elements
const getDataRows = () => [...document.getElementsByClassName("data-row")];

// returns the input elements that take in the size values
const getRowHeaders = () => [
  ...document.getElementsByClassName("row-header-elem"),
];

// returns the th cells that can hold the measurement names
const getColHeaders = () => [
  ...document.getElementsByClassName("col-header-elem"),
];

// returns the input elements that take in the measurement values
const getMeasurementCells = () => [
  ...document.getElementsByClassName("measurement-elem"),
];

// returns all measurement option rows
const getMeasurementOptionRows = () => [
  ...document.getElementsByClassName("measurement-option-row"),
];

// returns empty measurement option cells
const getEmptyPomCells = () =>
  getMeasurementOptions().filter((item) => isEmpty(item.innerText));

// returns the input elements that will be created when adding new POMs
const getExtraPomInputs = () => [
  ...document.getElementsByClassName("extra-pom-input"),
];

// returns option cells whose innerText is not included in measurement names (NB: this also includes empty option cells)
const getExtraOptionCells = () =>
  getMeasurementOptions().filter(
    (item) => !measurementNames.includes(item.innerText)
  );

// returns measurement option rows that contain only user added measurement options (NB: if a row contains even one cell that is not user added, it is not included here)
const getExtraPomRows = () => [
  ...document.getElementsByClassName("extra-pom-row"),
];

// returns non empty measurement option cells
const nonEmptyPomCells = () =>
  getMeasurementOptions().filter((item) => !isEmpty(item.innerText));

// DOM elements
const tbody = document.getElementById("tbody");

const thead = document.getElementById("thead");

const tfoot = document.getElementById("tfoot");

var categoryInput;
var styleInput;
var baseInput;
var dateInput;
var fabricInput;
var addPomBtn;
var delPomBtn;
var scrollRow;
var scrollBarCont;
var scrollBar;

// Action Functions
function setStyleValue(event) {
  styleValue = event.currentTarget.value;
}

function setDateValue(event) {
  dateValue = event.currentTarget.value;
}

function setFabricValue(event) {
  fabricValue = event.currentTarget.value;
}

// sets the tableUnit to whichever unit element was selected
function setTableUnit(event) {
  tableUnit = event.currentTarget.innerText.toLowerCase();
}

function setCategoryValue(event) {
  categoryValue = event.currentTarget.value;
}

// converts any "measurement values" in mainDB according to the corresponding chosen unit
function convertUnitsInDB() {
  let unit = tableUnit;
  mainDB.forEach((row) => {
    row.convertMeasurementValue(unit);
  });
}

// adds a background color to the selected unit to show it is selected and removes the selection background from other units
function highlightUnit() {
  getTableUnits().forEach((item) => {
    if (tableUnit.toUpperCase() === item.innerText.toUpperCase()) {
      item.classList.add("select-bg");
    } else {
      item.classList.remove("select-bg");
    }
  });
}

// sets the placeholder in the measurement cells to correspond to the tableUnit
function setPlaceholderInCells() {
  getMeasurementCells().forEach((item) => {
    item.placeholder = tableUnit;
  });
}

function switchUnit(event) {
  let itemUnit = event.currentTarget.innerText.toLowerCase();
  if (itemUnit == "inches") {
    event.currentTarget.innerText = "cm";
  } else {
    event.currentTarget.innerText = "inches";
  }
  // if (itemUnit !== tableUnit) {

  setTableUnit(event);
  highlightUnit();
  convertUnitsInDB();
  clearMeasurementCells();
  fillMeasurementCells();
  setPlaceholderInCells();
  // }
}

// assigns measurement names to the measurement options associated with 'categoryValue'
function setMeasurementNames() {
  let val = categoryValue;
  let match = categoryNames.find(
    (item) => item.toLowerCase() === val.toLowerCase()
  );
  measurementNames = category[match].map((item) => item.toUpperCase());
}

// fill measurement option cells with the measurement names of 'categoryValue' and extra options if there are
function fillOptionCells() {
  getMeasurementOptions().forEach((opt, index) => {
    if (measurementNames[index]) {
      opt.innerText = measurementNames[index];
      opt.classList.add("hover-bg", "pointer");
    } else {
      opt.innerText = "";
      opt.classList.remove("hover-bg", "pointer");
    }
  });

  clearBlankExtraOptionRows(); // remove any custom measurement option rows that are blank

  if (addPomMode) {
    // remove bg color from add pom button if addPomMode is active
    addPomBtn.classList.remove("blue-bg");
    addPomMode = false;
  }

  if (delPomMode) {
    // remove bg color from add pom button if addPomMode is active
    delPomBtn.classList.remove("orangeish-bg");
    delPomMode = false;
  }

  loadExtraOptions(); // load any custom measurement options for the selected category item

  // since the format for each row in the "mainDB" has been changed, all "measurement cell values" and "measurement name headers" will have to be cleared
  clearColHeaders();
  clearMeasurementCells();
  colStart = 0;
  setScrollWidth();
}

// deletes the measurement properties (e.g measurement-1 obj) for each row in mainDB and creates new ones.
function restructureDB() {
  // the number of new "measurement properties" becomes the length of "measurementNames"
  mainDB.forEach((item) => {
    item.deleteMeasurementProp();
    item.initMeasurementProps(measurementNames.length);
  });
}

// clears the inputs of all measurement cells
function clearMeasurementCells() {
  let measurementCells = getMeasurementCells();

  measurementCells.forEach((item) => {
    item.value = "";
  });
}

// clears the measurement name headers
function clearColHeaders() {
  let colHeaders = getColHeaders();

  colHeaders.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("select-bg"); // removes the select bg too
  });
}

// clears the size inputs of the size cells
function clearRowHeaders() {
  let rowHeaders = getRowHeaders();

  rowHeaders.forEach((item) => {
    item.value = "";
    item.parentElement.parentElement.classList.remove("base-row"); // also clears the base row class from any row that has it
  });
}

// clear all sizes inputed both in mainDB and the client side table
function clearSizes() {
  mainDB.forEach((item) => {
    item.clearSize(); // clear all sizes in mainDB
  });
  clearRowHeaders();

  baseValue = "";
  document.querySelector("#base-val-input").value = baseValue;
}

// clear measurement inputs from
function clearSpecs() {
  mainDB.forEach((item) => {
    item.clearAllMeasurements(); // clear all measurements in mainDB
  });
  clearMeasurementCells();
}

// fills in the values of the size input elements from mainDB
function fillRowHeaders() {
  let rowHeaders = getRowHeaders();

  rowHeaders.forEach((el, index) => {
    el.value = mainDB[index].size;

    if (mainDB[index].isBaseRow) {
      // highlights the base row if there is one
      el.parentElement.parentElement.classList.add("base-row");
    }
  });
}

// fills in the measurement names headers from mainDB
function fillColHeaders(viewFrom = colStart) {
  let lastColInDB = mainDB[0].getLastFilledCol();
  if (lastColInDB) {
    let lastColNum = extractNum(lastColInDB);
    if (viewFrom > lastColNum) {
      // colStart should not be greater than the col number of the last filled column in mainDB since none of the columns being viewed will be filled
      viewFrom -= numOfDataColsPerView;
      colStart = viewFrom;
    }
  }
  let colHeaders = getColHeaders();

  colHeaders.forEach((el, index) => {
    let col = `measurement-${index + viewFrom}`;

    if (mainDB[0].hasOwnProperty(col)) {
      el.innerText = mainDB[0][`measurement-${index + viewFrom}`].colName;
      if (!isEmpty(el.innerText)) {
        // adds a bg if the col contains text
        el.classList.add("select-bg");
      }
    }
  });
}

// fills in the measurement input values from mainDB
function fillMeasurementCells(event, viewFrom = colStart) {
  let measurementCells = getMeasurementCells();

  measurementCells.forEach((el, index) => {
    let rowNum = ~~(index / numOfDataColsPerView);

    let measurementNum = index % numOfDataColsPerView;

    let colNum = `measurement-${measurementNum + viewFrom}`;

    if (mainDB[rowNum].hasOwnProperty(colNum)) {
      el.value =
        mainDB[rowNum][`measurement-${measurementNum + viewFrom}`].value;
    }
  });
}

// toggles "delete row mode"
function toggleDeleteRowMode(event) {
  let delBtn = event.currentTarget;
  toggleRowDelete = !toggleRowDelete;
  delBtn.classList.toggle("delete-btn-bg");

  let dataRows = getDataRows();

  // adds/removes a background color to/from the "data rows" depending on the status of deleteRowMode
  if (toggleRowDelete) {
    dataRows.forEach((row) => {
      row.classList.add("delete-mode");
    });
  } else {
    dataRows.forEach((row) => {
      row.classList.remove("delete-mode");
    });
  }
}

// deletes the selected row from mainDB and the data row from the "client side table"
function deleteRow(event) {
  if (toggleRowDelete) {
    let rowToDelete = event.currentTarget;

    clearRowHeaders();
    clearMeasurementCells();

    // extract row num of row to be deleted
    let rowNum = extractNum(rowToDelete.id);

    mainDB.splice(rowNum, 1);

    if (mainDB.length === 0) {
      //when the last row is deleted, clear any colheaders, reset the colStart and set the scroll width
      clearColHeaders();
      colStart = 0;
      setScrollWidth();
    }

    // rearrange row numbers in db
    mainDB.forEach((item, index) => {
      item.setRowNum(index);
    });

    // remove last row in table
    let lastRow = tbody.lastElementChild;
    lastRow.remove();

    // fill in the values from mainDB into the client side table
    fillRowHeaders();
    fillMeasurementCells(colStart);
  }
}

// adds a new row to mainDB
function addRowToDB() {
  let rowNum = mainDB.length;
  if (rowNum < maxNumOfRows) {
    let numOfColsInDB = measurementNames.length;

    let newRow = new Row(rowNum, numOfColsInDB);

    // get the first row which has a filled column name
    let rowWithFilledCol = mainDB.find((item) => item.hasFilledCol());

    if (rowWithFilledCol) {
      // if that row is found, assign the column values for the new row to the properties of "rowWithFilledCol"
      newRow.onlyMeasurementProps().forEach((prop) => {
        newRow.appendColumn(rowWithFilledCol[prop].colName);
      });
    }

    let baseRow = mainDB.find((item) => item.isBaseRow);

    // this is to create a feature where rows are added on top when the row number of the lastRowInFocus is less than the row number of the base row otherwise they are appended to the bottom
    if (baseRow && !isEmpty(lastRowNumInFocus)) {
      let baseRowNum = baseRow.row;
      if (lastRowNumInFocus < baseRowNum) {
        // if the row number of the last selected data row is less than the base row number, the new row should be inserted before the last selected data row
        newRow.setRowNum(lastRowNumInFocus);
        mainDB.splice(lastRowNumInFocus, 0, newRow);

        // rearrange row numbers in mainDB
        mainDB.forEach((item, index) => {
          item.setRowNum(index);
        });
      } else {
        // else if the row number of the last selected data row is greater or equal to the base row number, add the new row to the end
        mainDB.push(newRow);
      }
    } else {
      // either there is no base row or lastRowNumInFocus is not defined or both. In this case, simply add the newRow to the end.
      mainDB.push(newRow);
    }
  }
}

// adds a row element to tbody
function addRowToTbody(num = undefined) {
  if (tbody.childElementCount < maxNumOfRows) {
    let rowNum = typeof num === "number" ? num : mainDB.length - 1;

    // create row
    let row = createElement("tr", {
      id: `data-row-${rowNum}`,
      className: "data-row",
      eventListener: {
        eventName: ["click"],
        func: [deleteRow, getLastRowNumInFocus],
      },
    });

    // create cell for size
    let sizeTD = createElement("td", {
      className: "size-cell hover-bg",
      colspan: colHeaderCellNum,
    });

    // create size input
    let sizeInput = createElement("input", {
      maxLength: "11",
      inputType: "text",
      id: `size-input-${rowNum}`,
      placeholder: `Size`,
      className: "row-elem row-header-elem",
      eventListener: { eventName: ["input"], func: [updateSize] },
    });

    //sizeInput.disabled = true;
    // append size input to size cell
    sizeTD.appendChild(sizeInput);

    // use function to create and append cells for measurement input
    const addMeasurementCell = (index) => {
      // create cell for measurement input
      let measurementTD = createElement("td", {
        className: "measurement-cell hover-bg",
        colspan: colHeaderCellNum,
      });

      // create measurement input
      let measurementInput = createElement("input", {
        inputType: "number",
        pattern: "[0-9]+",
        id: `measurement-input-${index + numOfDataColsPerView * rowNum}`,
        className: "row-elem col-elem measurement-elem",
        min: "0",
        eventListener: { eventName: ["input"], func: [updateMeasurement] },
      });

      // append measurement input to measurement cell
      measurementTD.appendChild(measurementInput);

      // append measurement cell to row
      row.appendChild(measurementTD);
    };

    // append size cell to row
    row.appendChild(sizeTD);

    for (let i = 0; i < numOfDataColsPerView; i++) {
      addMeasurementCell(i); // append measurement cells to row
    }

    // append row to table
    tbody.appendChild(row);

    // if rows are being added whiles in delete mode, add the delete mode bg to them
    if (toggleRowDelete) {
      row.classList.add("delete-mode");
    }

    clearRowHeaders();
    clearMeasurementCells();

    fillRowHeaders();
    fillMeasurementCells(colStart);
  }
}

// enters measurement values into mainDB
function updateMeasurement(event) {
  let elem = event.currentTarget;
  let id = extractNum(elem.id);
  let rowNum = ~~(id / numOfDataColsPerView);
  let colNum = (id % numOfDataColsPerView) + colStart;

  // change measurement value in database
  mainDB[rowNum].changeDataValue(elem.value, colNum);
}

// enters size values into mainDB
function updateSize(event) {
  let elem = event.currentTarget;
  let rowNum = extractNum(elem.id);

  // change size value in database
  mainDB[rowNum].setSize(elem.value);
}

// sets the base size
function setBase(event) {
  let baseVal = event.currentTarget.value;

  // check the number "data rows" in the "client side table". If less than the default number of rows, more rows should be added up to make that number
  let numOfRows = tbody.childElementCount;

  if (numOfRows < defaultNumOfRows) {
    for (let i = numOfRows; i < defaultNumOfRows; i++) {
      addRowToDB();
      addRowToTbody();
    }
  }

  // before setting the base, change all the isBaseRow prop for each "mainDB" row to false so that not more than one row becomes the "base row"
  mainDB.forEach((item) => {
    item.isBaseRow = false;
  });

  if (!isEmpty(baseVal) && !onlyWhitespace(baseVal)) {
    // find the first row in "mainDB" whose size property is the same as baseVal
    let baseValInDB = mainDB.find((item) => item.size === baseVal);

    if (baseValInDB) {
      // if baseVal is found, change isBaseRow property of that row to true

      // console.log("baseVal exists in mainDB")
      let rowNum = baseValInDB.row;
      mainDB[rowNum].setBase(true);
    } else {
      // if none of the size properties in each row is the same as the baseValue

      // console.log('baseVal does not exist in db');
      if (isEmpty(mainDB[1].size)) {
        // if the second row in "mainDB" is empty

        // change "size" value to "baseVal" and "isBaseRow" to true
        // console.log('second row in db empty')
        mainDB[1].setSize(baseVal);
        mainDB[1].setBase(true);
      } else {
        // if the second row in "mainDB" is not empty, find the first row whose size property is empty

        // console.log('second row in db not empty')
        let emptySize = mainDB.find((item) => isEmpty(item.size));

        if (emptySize) {
          // if an empty row is found, change isbaserow to true and size to baseVal

          // console.log('empty row found in db')
          let rowNum = emptySize.row;
          mainDB[rowNum].setSize(baseVal);
          mainDB[rowNum].setBase(true);
        } else {
          // if an empty row is not found, add a new row and set its isBaseRow prop to true and size to baseVal

          let prevLength = mainDB.length;
          if (prevLength < maxNumOfRows) {
            // console.log('no empty row found in db so adding one')
            // add row to table
            addRowToDB();
            addRowToTbody();

            mainDB[prevLength].setSize(baseVal);
            mainDB[prevLength].setBase(true);
          }
        }
      }
    }
  }

  clearRowHeaders();
  fillRowHeaders();

  // set baseValue to the size of the base row in mainDB
  baseValue = mainDB.find((item) => item.isBaseRow)
    ? mainDB.find((item) => item.isBaseRow).size
    : "";
}

// adds or deletes columns from both mainDB and the client side table
function addOrDeleteCol(event) {
  let option = event.currentTarget;
  let viewFrom = colStart;

  if (!isEmpty(option.innerText)) {
    if (!delPomMode) {
      if (!addPomMode) {
        // should not be able to add or delete columns whiles creating new poms

        let optionName = option.innerText; // get option text

        if (mainDB.length === 0) {
          // add rows if there are none before doing anything
          addRowToDB();
          addRowToTbody();
        }

        let match = mainDB[0].getColInDB(optionName); // find if there is a match in mainDB for the option selected

        if (!match) {
          // if no match, (optionName is not a column in mainDB)
          // highlight background of option
          option.classList.add("select-bg");

          // add optionName to mainDB
          mainDB.forEach((item) => {
            item.appendColumn(optionName);
          });

          let lastFilledColNumInDB = extractNum(mainDB[0].getLastFilledCol());

          viewFrom =
            ~~(lastFilledColNumInDB / numOfDataColsPerView) *
            numOfDataColsPerView;
        } else {
          // if there is a match (optionName exists as a column in mainDB)

          // remove highlight background of option
          option.classList.remove("select-bg");

          // remove match from mainDB
          mainDB.forEach((item) => {
            item.delAndShiftColsLeftInDB(extractNum(match));
          });

          // after removing a column, if in the current view, no columns will be left showing on the client side table, switch view to the previous set of columns
          // this is executed in the fillColHeaders function
        }

        colStart = viewFrom;

        clearColHeaders();
        clearMeasurementCells();

        fillColHeaders();
        fillMeasurementCells();

        setScrollWidth(); // scroll appears when number of cols in db exceeds the number of cols on the client side table
      }
    }
  }
}

// removes every measurement type header entry. Essentially deletes every column, both from dataBase and the client side table
function clearAllCols() {
  if (!delPomMode) {
    if (!addPomMode) {
      mainDB.forEach((item) => {
        item.clearAllCols();
        item.clearAllMeasurements();
      });

      rmOptionHighlight();

      colStart = 0;
      clearColHeaders();
      clearMeasurementCells();
      fillColHeaders();
      fillMeasurementCells();
      setScrollWidth();
    }
  }
}

// returns the row number of the last data row in focus
function getLastRowNumInFocus(event) {
  lastRowNumInFocus = extractNum(event.currentTarget.id);
  return lastRowNumInFocus;
}

// Sets the width of the scroll bar when the number of columns in "mainDB" exceeds the number of colums in the "client side table"
function setScrollWidth() {
  if (mainDB.length > 0) {
    let lastFilledColInDB = mainDB[0].getLastFilledCol();
    if (
      lastFilledColInDB &&
      extractNum(lastFilledColInDB) >= numOfDataColsPerView
    ) {
      scrollRow = document.getElementById("scroll-row");
      scrollRow.classList.remove("hidden");
      scroll(); // move scroll bar
    } else {
      scrollRow.classList.add("hidden");
    }
  } else {
    scrollRow.classList.add("hidden");
  }
}

// moves the scroll bar to the position that corresponds with colStart
function scroll(viewFrom = colStart) {
  let lastFilledColInDB = mainDB[0].getLastFilledCol();

  // width of the div container the scroll bar is in
  let scrollBarContWidth = scrollBarCont.offsetWidth;

  // numOfViews is the number of parts the number of columns so far in mainDB can be divided into based on the numOfCols the "client side table"
  let numOfViews = ~~(extractNum(lastFilledColInDB) / numOfDataColsPerView) + 1;

  let currViewNum = ~~(viewFrom / numOfDataColsPerView);

  let scrollBarWidth = scrollBarContWidth / numOfViews;

  // set width of scroll bar based on the number of views and move it to the position based on the current view number
  scrollBar.style.width = `${scrollBarWidth}px`;
  scrollBar.style.transform = `translate(${
    scrollBarWidth * currViewNum
  }px, 0px)`;
}

// move scroll bar left
function scrollLeft() {
  let viewFrom = colStart;
  if (viewFrom - numOfDataColsPerView >= 0) {
    viewFrom -= numOfDataColsPerView;
    colStart = viewFrom;
    scroll();

    clearColHeaders();
    clearMeasurementCells();
    fillColHeaders();
    fillMeasurementCells();
  }
}

// move scroll bar right
function scrollRight() {
  let viewFrom = colStart;
  let lastFilledColInDB = mainDB[0].getLastFilledCol();
  let currentViewNum = viewFrom / numOfDataColsPerView + 1;
  let numOfViews = ~~(extractNum(lastFilledColInDB) / numOfDataColsPerView) + 1;

  if (currentViewNum + 1 <= numOfViews) {
    viewFrom += numOfDataColsPerView;
    colStart = viewFrom;
    scroll();

    clearColHeaders();
    clearMeasurementCells();
    fillColHeaders(viewFrom);
    fillMeasurementCells(viewFrom);
  }
}

function createExtraPom(event) {
  if (!delPomMode) {
    let btn = event.currentTarget;
    addPomMode = !addPomMode; // toggle addPomMode
    btn.classList.toggle("blue-bg"); // toggle class that adds bg to btn

    let emptyPomCells = getEmptyPomCells(); // get measurement option cells that have no innerText

    if (addPomMode) {
      if (emptyPomCells.length > 0) {
        // if there are empty pom cells, add an input element to each
        appendInputToEmptyOption();
      } else {
        // create an option row if there are no empty pom cells
        cloneOptionRow();
        appendInputToEmptyOption();
      }
    } else {
      let arr = []; // create empty array
      let optionTextArr = nonEmptyPomCells().map((item) => item.innerText); // get the text contained in only the option cells that have innerText and store in list

      // go through the text in each extra option input, so long as it is not empty and not only whitespace, remove extra space and change it to uppercase. If it is not a duplicate of the other inputs and not a duplicate of any of the other pom cells, add its value to the given array. Remove every input afterwards
      getExtraPomInputs().forEach((item) => {
        let val = item.value;
        if (!isEmpty(val) && !onlyWhitespace(val)) {
          let cleanedVal = val.toUpperCase().trim();
          if (
            !arr.includes(cleanedVal) &&
            !optionTextArr.includes(cleanedVal)
          ) {
            arr.push(cleanedVal);
          }
        }
        item.remove();
      });

      let emptyPomCells = getEmptyPomCells();
      arr.forEach((item, index) => {
        emptyPomCells[index].innerText = item;
        emptyPomCells[index].classList.add("hover-bg", "pointer");
        mainDB.forEach((item) => {
          item.addMeasurementProp(); // add a measurement prop to each row in mainDB so that the number of nonempty options will tally with the number of measurement props in mainDB.
        });
      });
      extraOptionsForEachCategory[categoryValue].push(...arr); // store the extra options in the extra options for each category
      clearBlankExtraOptionRows();
    }
  }
}

function toggleDelPomMode() {
  if (!addPomMode) {
    delPomBtn.classList.toggle("orangeish-bg");
    delPomMode = !delPomMode;

    if (delPomMode) {
      let pomCells = getMeasurementOptions().filter(
        (item) => !isEmpty(item.innerText)
      );

      pomCells.forEach((item) => {
        item.classList.add("orangeish-hover");
      });
    } else {
      let pomCells = getMeasurementOptions().filter(
        (item) => !isEmpty(item.innerText)
      );

      pomCells.forEach((item) => {
        item.classList.remove("orangeish-hover");
      });
    }
  }
}

function delExtraPoms(event) {
  if (delPomMode) {
    let optionText = event.currentTarget.innerText;
    let cat = categoryValue;

    // combine measurementNames with the extra options for the selected category
    let combinedArr = measurementNames.concat(extraOptionsForEachCategory[cat]);

    if (combinedArr.includes(optionText)) {
      let optionIndex = combinedArr.indexOf(optionText);

      // remove the option clicked from the combined array
      combinedArr.splice(optionIndex, 1);
      getMeasurementOptions().forEach((item, index) => {
        if (combinedArr[index]) {
          item.innerText = combinedArr[index];
          if (mainDB[0].getColInDB(item.innerText)) {
            // if the option text is a column in mainDB highlight its bg
            item.classList.add("select-bg");
          } else {
            item.classList.remove("select-bg");
          }
        } else {
          item.innerText = "";
          item.classList.remove(
            "hover-bg",
            "pointer",
            "extra-pom-cell",
            "orangeish-hover",
            "select-bg"
          );
        }
      });
      clearBlankExtraOptionRows(); // delete extra option rows that have no options

      // update measurementNames and extraOptions after deletion
      measurementNames = measurementNames.filter((item) =>
        combinedArr.includes(item)
      );
      extraOptionsForEachCategory[cat] = extraOptionsForEachCategory[
        cat
      ].filter((item) => combinedArr.includes(item));

      if (mainDB.length > 0) {
        // if the selected option is currently in mainDB, delete it from it and refresh table
        let match = mainDB[0].getColInDB(optionText);
        if (match) {
          let colNumInDB = extractNum(match);
          mainDB.forEach((item) => {
            item.delAndShiftColsLeftInDB(colNumInDB);
          });
          clearColHeaders();
          clearMeasurementCells();
          fillColHeaders();
          fillMeasurementCells();
          setScrollWidth();
        }
      }
      mainDB.forEach((item) => {
        // delete the last measurement prop from db so that number of them will match with the number of options available
        item.deleteMeasurementProp(false);
      });
    }
  }
}

function cloneOptionRow() {
  let lastRow = getMeasurementOptionRows().findLast((item) => item);

  let clone = lastRow.cloneNode(true);

  tfoot.insertBefore(clone, lastRow.nextSibling);

  clone.classList.add("extra-pom-row");

  [...clone.children].forEach((child) => {
    child.innerText = "";
    child.classList.remove(
      "hover-bg",
      "pointer",
      "select-bg",
      "original-option"
    );
    child.addEventListener("click", (event) => {
      addOrDeleteCol(event);
      delExtraPoms(event);
    });
  });
}

// goes through all empty option cells and appends an input element each.
function appendInputToEmptyOption() {
  getEmptyPomCells().forEach((item, index) => {
    let inputElem = createElement("input", {
      id: `pom-input-${index}`,
      className: "extra-pom-input center-align",
      maxLength: "11",
      placeholder: "Enter POM",
    });

    item.appendChild(inputElem);
    item.classList.add("extra-pom-cell");
  });
}

// remove any extra pom row, which has none of its cells containing text
function clearBlankExtraOptionRows() {
  getExtraPomRows().forEach((row) => {
    if ([...row.children].every((cell) => isEmpty(cell.innerText))) {
      row.remove();
    }
  });
}

// load extra options for the selected category
function loadExtraOptions() {
  let numOfExtraPomsPerCategory =
    extraOptionsForEachCategory[categoryValue].length;

  if (numOfExtraPomsPerCategory > 0) {
    let numOfExtraPomCells = getExtraOptionCells().length;

    if (numOfExtraPomsPerCategory > numOfExtraPomCells) {
      // check if the number extra poms in list exceeds number of empty option cells. If it does, subtract extra poms from option cells. Take that figure and divide by six. Get the whole part and add 1. use that number to determine number of extra rows needed. append extra poms to empty measurement option cells

      let num = numOfExtraPomsPerCategory - numOfExtraPomCells;

      let numOfExtraPomRows = ~~(num / (numOfOptionsPerRow + 1)) + 1;

      for (let i = 0; i < numOfExtraPomRows; i++) {
        cloneOptionRow();
      }
    }

    // assigns the extra options for each category to the same indexed empty pom cell
    let emptyPomCells = getEmptyPomCells();
    extraOptionsForEachCategory[categoryValue].forEach((item, index) => {
      emptyPomCells[index].innerText = item;
      emptyPomCells[index].classList.add(
        "hover-bg",
        "pointer",
        "extra-pom-cell"
      );

      mainDB.forEach((item) => {
        item.addMeasurementProp();
      });
    });
  }
}

// highlights non empty options that are not in mainDB
function highlightOptions() {
  getMeasurementOptions().forEach((item) => {
    if (
      mainDB[0].getColInDB(item.innerText) &&
      !isEmpty(mainDB[0].getColInDB(item.innerText)) &&
      !isEmpty(item.innerText)
    ) {
      item.classList.add("select-bg");
    }
  });
}

// removes highlight bg from all options
function rmOptionHighlight() {
  getMeasurementOptions().forEach((item) => {
    item.classList.remove("select-bg");
  });
}

// add any option not already a column in mainDB to mainDB
function addAllPoms() {
  if (!delPomMode) {
    if (!addPomMode) {
      if (mainDB.length === 0) {
        // add rows if mainDB is empty
        addRowToDB();
        addRowToTbody();
      }
      getMeasurementOptions().forEach((item) => {
        if (!mainDB[0].getColInDB(item.innerText) && !isEmpty(item.innerText)) {
          mainDB.forEach((row) => {
            row.appendColumn(item.innerText);
          });
        }
      });

      highlightOptions();

      clearColHeaders();
      clearMeasurementCells();

      colStart =
        ~~(extractNum(mainDB[0].getLastFilledCol()) / numOfDataColsPerView) *
        numOfDataColsPerView; // set colStart to the view of the last filled col in mainDB

      fillColHeaders();
      fillMeasurementCells();

      setScrollWidth();
    }
  }
}

// sets the values of the auxilliary inputs
function fillAuxilliaryInputs(cat, style, base, date, fabric) {
  categoryInput.selectedIndex = categoryNames.indexOf(cat);
  if (style) styleInput.value = style;
  if (base) baseInput.value = base;
  if (dateInput) {
    dateInput.value = date;
  }
  fabricInput.value = fabric;
}

// delete all rows in the entire table
function deleteTableRows() {
  let allRows = [...document.querySelectorAll("tr")];

  allRows.forEach((item) => {
    item.remove();
  });
}

// accumulates all chart data, stores it and opens the "generate-chart" page
function generateChart() {
  const db = {
    defaultNumOfRows: defaultNumOfRows,
    maxNumOfRows: maxNumOfRows,
    measurementNames: measurementNames,
    mainDB: mainDB,
    categoryDB: category,
    extraOptionsForEachCategory: extraOptionsForEachCategory,
    chartUnit: tableUnit,
    category: categoryValue,
    style: styleValue,
    fabric: fabricValue,
    base: baseValue,
    colStart: colStart,
  };
  sessionStorage.setItem("db", JSON.stringify(db));
  window.location.href = "generate-chart.html";
}

// creates the rows in thead
function createTableHead(scrn = screen) {
  // create thead elements
  let categoryCell = createElement("th", {
    className: "select-bg",
    innerText: "CATEGORY",
  });

  let categoryInputCell = createElement("th", {
    className: "chart-descriptor",
  });

  let categoryInput = createElement("select", {
    id: "category-select-option",
    name: "category",
    className: "class center-align",
    value: categoryValue,
    eventListener: {
      eventName: ["change"],
      func: [
        setCategoryValue,
        setMeasurementNames,
        restructureDB,
        fillOptionCells,
        rmOptionHighlight,
      ],
    },
  });

  categoryInputCell.appendChild(categoryInput);

  // let categoryDefaultOption = createElement('option', { disabled: "true", innerHTML: 'Select Category' });
  //  categoryDefaultOption.disabled = 'true';

  // categoryInput.appendChild(categoryDefaultOption)

  categoryNames.forEach((item) => {
    let categoryOption = createElement("option", {
      value: item.toLowerCase(),
      innerHTML: item.toUpperCase(),
    });

    categoryInput.appendChild(categoryOption);
  });

  let styleCell = createElement("th", {
    className: "select-bg",
    innerText: "BRAND/ STYLE",
  });

  let styleInputCell = createElement("th", { className: "chart-descriptor" });

  let styleInput = createElement("input", {
    id: "style-input",
    inputType: "text",
    name: "style",
    className: "center-align",
    placeholder: "Enter Style #",
    value: styleValue,
    eventListener: { eventName: ["change"], func: [setStyleValue] },
  });

  styleInputCell.appendChild(styleInput);

  // let baseCell = createElement('th', { className: 'select-bg', innerText: 'BASE SIZE' })

  let baseInputCell = createElement("th", { className: "chart-descriptor" });

  let baseInput = createElement("input", {
    id: "base-input",
    inputType: "text",
    name: "base-input",
    className: "center-align",
    placeholder: "Enter Base Size",
    value: baseValue,
    eventListener: {
      eventName: ["change", "focus"],
      func: [setBase],
    },
  });

  baseInputCell.appendChild(baseInput);

  let dateInputCell = createElement("th", { className: "chart-descriptor" });

  let dateInput = createElement("input", {
    id: "date",
    inputType: "date",
    name: "date",
    className: "center-align bold",
    value: dateValue,
    eventListener: { eventName: ["change"], func: [setDateValue] },
  });

  dateInputCell.appendChild(dateInput);

  let fabricCell = createElement("th", {
    className: "select-bg",
    innerText: "FABRIC TYPE",
  });

  let fabricInputCell = createElement("th", { className: "chart-descriptor" });

  let fabricInput = createElement("input", {
    id: "fabric-input",
    type: "text",
    name: "fabric",
    className: "center-align",
    placeholder: "Enter Fabric",
    value: fabricValue,
    eventListener: { eventName: ["change"], func: [setFabricValue] },
  });

  fabricInputCell.appendChild(fabricInput);

  let titleCell = createElement("th", { innerText: "SIZE CHART" });

  let inchesCell = createElement("th", {
    className: "unit hover-bg pointer",
    eventListener: { eventName: ["click"], func: [switchUnit] },
  });

  let cmCell = createElement("th", {
    className: "unit hover-bg pointer",
    innerText: "CM",
    eventListener: { eventName: ["click"], func: [switchUnit] },
  });

  let addRowCell = createElement("th", {
    className: ["add-row row-manipulation-cell pointer blue-hover"],
    eventListener: { eventName: ["click"], func: [addRowToDB, addRowToTbody] },
  });

  let addRowCellText = createElement("p", {
    className: "blue-hover f-15",
    innerText: "SIZES",
  });

  let addRowCellBtn = createElement("span", {
    innerHTML:
      '<img src="https://cdn.shopify.com/s/files/1/0834/1222/2234/files/Basic_Elements__28121_29-removebg-preview.png?v=1696417719" height="10px" />',
    id: "add-row",
    className: "html-ent",
  });

  addRowCell.appendChild(addRowCellText);

  addRowCell.appendChild(addRowCellBtn);

  const colHeaderCell = () => {
    return createElement("th", {
      className: ["col-elem col-header-elem"],
      colspan: colHeaderCellNum,
    });
  };

  if (scrn === "desktop") {
    // first thead row for desktop
    let desktopHeadOne = createElement("tr");

    desktopHeadOne.appendChild(setColspan(categoryCell, "2"));
    desktopHeadOne.appendChild(setColspan(categoryInputCell, "2"));
    desktopHeadOne.appendChild(setColspan(styleCell, "3"));
    desktopHeadOne.appendChild(setColspan(styleInputCell, "3"));
    // desktopHeadOne.appendChild(setColspan(baseCell, '1'));
    // desktopHeadOne.appendChild(setColspan(baseInputCell, '1'));
    // desktopHeadOne.appendChild(setColspan(dateInputCell, '2'));

    thead.appendChild(desktopHeadOne);

    // second thead row for desktop
    let desktopHeadTwo = createElement("tr");

    desktopHeadTwo.appendChild(setColspan(fabricCell, "2"));
    desktopHeadTwo.appendChild(setColspan(fabricInputCell, "2"));
    // desktopHeadTwo.appendChild(setColspan(inchesCell, '1'));
    // desktopHeadTwo.appendChild(setColspan(cmCell, '1'));
    desktopHeadTwo.appendChild(setColspan(titleCell, "6"));

    thead.appendChild(desktopHeadTwo);

    // third thead row for desktop
    let desktopHeadThree = createElement("tr");

    desktopHeadThree.appendChild(setColspan(addRowCell, "1"));

    for (let i = 0; i < numOfDataColsPerView; i++) {
      desktopHeadThree.appendChild(colHeaderCell());
    }

    thead.appendChild(desktopHeadThree);
  } else if ((scrn = "mobile")) {
    // first thead row for mobile
    let mobileHeadOne = createElement("tr");

    mobileHeadOne.appendChild(setColspan(categoryCell, "3"));
    mobileHeadOne.appendChild(setColspan(categoryInputCell, "3"));

    //mobileHeadOne.appendChild(setColspan(styleInputCell, '1'));

    thead.appendChild(mobileHeadOne);

    // second thead row for mobile
    let mobileHeadTwo = createElement("tr");
    mobileHeadTwo.appendChild(setColspan(styleCell, "3"));
    mobileHeadTwo.appendChild(setColspan(styleInputCell, "3"));

    thead.appendChild(mobileHeadTwo);

    // third thead row for mobile
    let mobileHeadThree = createElement("tr");
    mobileHeadThree.appendChild(setColspan(fabricCell, "3"));
    mobileHeadThree.appendChild(setColspan(fabricInputCell, "3"));
    //		mobileHeadThree.appendChild(setColspan(inchesCell, '1'));
    //	mobileHeadThree.appendChild(setColspan(cmCell, '1'));
    thead.appendChild(mobileHeadThree);

    let mobileHeadFour = createElement("tr");

    mobileHeadFour.appendChild(setColspan(addRowCell, "2"));

    for (let i = 0; i < 2; i++) {
      mobileHeadFour.appendChild(colHeaderCell());
    }

    thead.appendChild(mobileHeadFour);
  }
}

// creates tfoot elements
function createTableFoot(scrn = screen) {
  let scrollCell = createElement("td", {
    id: "scroll-cell",
    colspan: scrollcellCol,
  });

  let scrollItemsCont = createElement("div", { id: "scroll-items-cont" });

  let prevColsBtn = createElement("div", {
    id: "prev-cols",
    className: "pointer press html-ent rotate",
    innerHTML: "&#10140;",
    eventListener: { eventName: ["click"], func: [scrollLeft] },
  });

  let scrollBarCont = createElement("div", { id: "scroll-bar-cont" });

  let scrollBar = createElement("div", { id: "scroll-bar" });

  let nextColsBtn = createElement("div", {
    id: "next-cols",
    className: "pointer press html-ent",
    innerHTML: "&#10140;",
    eventListener: { eventName: ["click"], func: [scrollRight] },
  });

  let deleteCell = createElement("td", {
    id: "delete-row-btn",
    className: "delete-mode pointer row-manipulation-cell orangeish-hover",
    eventListener: { eventName: ["click"], func: [toggleDeleteRowMode] },
  });

  let deleteText = createElement("p", {
    className: "blue-hover f-15",
    innerText: "SIZES",
  });

  let deleteSymbol = createElement("span", {
    className: "html-ent",
    innerHTML: "&#9866;",
  });

  deleteSymbol.innerHTML =
    "<img src='https://cdn.shopify.com/s/files/1/0834/1222/2234/files/plus-and-minus-signs-computer-icons-plus-minus-sign-meno-symbol-png-favpng-NZ9gbcHJZbksiBUrbYkN35rKV-removebg-preview.png?v=1696417710'/>";

  deleteCell.appendChild(deleteText);
  deleteCell.appendChild(deleteSymbol);

  let blank = createElement("input", {
    id: "base-val-input",
    type: "text",
    name: "base",
    className: "center-align",
    placeholder: "Enter Base",
    value: baseValue,
    eventListener: { eventName: ["change"], func: [setBase] },
  });

  let baseInputCell = createElement("th", { className: "chart-descriptor" });

  let baseInput = createElement("input", {
    id: "base-input",
    inputType: "text",
    name: "base-input",
    className: "center-align",
    placeholder: "Enter Size",
    eventListener: {
      eventName: ["change", "focus"],
      func: [setBase],
    },
  });

  baseInputCell.appendChild(baseInput);

  let selectPOMCellNewq = createElement("td", {
    className: "unit bold blue-hover-dark",
    innerHTML: "INCHES",
    eventListener: { eventName: ["click"], func: [switchUnit] },
  });

  let clearSizeCell = createElement("td", {
    id: "clear-size-btn",
    className: "extra-css black-hover pointer bold",
    innerText: "CLEAR ALL SIZES",
    eventListener: { eventName: ["click"], func: [clearSizes] },
  });
  let baseInputCellExtra = createElement("td", {
    id: "base-size-btn",
    className: "pointer bold extra-css",
    innerText: "BASE SIZE",
  });
  let clearSpecsCell = createElement("td", {
    id: "clear-specs-btn",
    className: "blue-hover-light pointer bold extra-css",
    innerText: "RESET ALL POMS",
    eventListener: { eventName: ["click"], func: [resetPoms] },
  });

  let selectPOMCell = createElement("td", {
    className: "bold blackk-bg extra-css",
    innerHTML: "CLEAR ALL SPECS",
    eventListener: { eventName: ["click"], func: [clearSpecs] },
  });

  let selectPOMCellNew = createElement("td", {
    className: "unit bold blue-hover-dark",
    innerHTML: "INCHES",
    eventListener: { eventName: ["click"], func: [switchUnit] },
  });

  const createOptionCell = () => {
    return createElement("td", {
      className: "measurement-option bold original-option",
      eventListener: {
        eventName: ["click"],
        func: [addOrDeleteCol, delExtraPoms],
      },
    });
  };

  let extraPomBtn = createElement("td", {
    id: "extra-pom-btn",
    className: "extra-css pointer blue-hover",
    innerText: "ADD POM(S) +",
    eventListener: { eventName: ["click"], func: [createExtraPom] },
  });

  let delExtraPomBtn = createElement("td", {
    id: "del-pom-btn",
    className: "extra-css pointer orangeish-hover",
    innerText: "REMOVE POM(S) -",
    eventListener: { eventName: ["click"], func: [toggleDelPomMode] },
  });

  let addAllPomsBtn = createElement("td", {
    id: "add",
    className: "extra-css pointer all-poms-btn",
    innerText: "SELECT ALL POM(S)",
    eventListener: { eventName: ["click"], func: [addAllPoms] },
  });

  let clearPomsBtn = createElement("td", {
    id: "clear-pom-btn",
    className: "extra-css pointer black-hover",
    innerText: "UNSELECT ALL POMS",
    eventListener: { eventName: ["click"], func: [clearAllCols] },
  });

  let refCell = createElement("td");

  let refText = createElement("span", {
    innerText: "SIZE CHART GENERATOR BY: ",
  });

  let refLink = createElement("a", {
    className: "pointer",
    innerText: "SMARTPATTERNMAKING.COM",
    href: "https://smartpatternmaking.com",
    target: "_blank",
  });

  refCell.appendChild(refText);
  refCell.appendChild(refLink);

  let generateChartCell = createElement("td", {
    id: "generate-chart",
    className: "pointer hover-bg extra-css",
    innerText: "GENERATE SIZE CHART",
    eventListener: { eventName: ["click"], func: [generateChart] },
  });

  // first row in tfoot same for both mobile and desktop view
  let tfootOne = createElement("tr", { id: "scroll-row", className: "hidden" });

  scrollBarCont.appendChild(scrollBar);
  scrollItemsCont.appendChild(prevColsBtn);
  scrollItemsCont.appendChild(scrollBarCont);
  scrollItemsCont.appendChild(nextColsBtn);
  scrollCell.appendChild(scrollItemsCont);

  tfootOne.appendChild(setColspan(scrollCell, scrollcellCol));

  tfoot.appendChild(tfootOne);

  if (scrn === "desktop") {
    // second row in tfoot
    let desktopFootTwo = createElement("tr");

    desktopFootTwo.appendChild(setColspan(deleteCell, "1"));
    desktopFootTwo.appendChild(setColspan(blank, "1"));
    desktopFootTwo.appendChild(setColspan(clearSizeCell, "2"));

    desktopFootTwo.appendChild(setColspan(clearSpecsCell, "2"));
    desktopFootTwo.appendChild(setColspan(selectPOMCell, "2"));
    desktopFootTwo.appendChild(setColspan(selectPOMCellNew, "2"));

    tfoot.appendChild(desktopFootTwo);

    // option rows in tfoot for desktop
    for (let i = 0; i < numOfOptionRows; i++) {
      let optionRow = createElement("tr", {
        className: "measurement-option-row",
      });
      for (let j = 0; j < numOfOptionsPerRow; j++) {
        let optionCell = setColspan(createOptionCell(), "2");
        optionRow.appendChild(optionCell);
      }
      tfoot.appendChild(optionRow);
    }

    // pom manipulation row in tfoot for desktop
    let desktopFootThree = createElement("tr", { className: "pom-edit-row" });
    desktopFootThree.appendChild(setColspan(clearPomsBtn, "2"));
    desktopFootThree.appendChild(setColspan(addAllPomsBtn, "2"));
    desktopFootThree.appendChild(setColspan(delExtraPomBtn, "2"));
    desktopFootThree.appendChild(setColspan(extraPomBtn, "2"));

    desktopFootThree.appendChild(setColspan(generateChartCell, "2"));

    tfoot.appendChild(desktopFootThree);

    // generate chart row in tfoot
    let desktopFootFour = createElement("tr", { className: "gen-row" });

    desktopFootFour.appendChild(setColspan(refCell, "10"));
    // desktopFootFour.appendChild(setColspan(generateChartCell, '6'));

    tfoot.appendChild(desktopFootFour);
  } else if (scrn === "mobile") {
    // second row in tfoot
    let mobileFootTwo = createElement("tr", { className: "delete-btn-row" });
    let mobileFootTwoExtra = createElement("tr", {
      className: "extra-btn-row",
    });

    mobileFootTwo.appendChild(setColspan(deleteCell, "2"));
    mobileFootTwo.appendChild(setColspan(baseInputCell, "2"));
    mobileFootTwo.appendChild(setColspan(selectPOMCellNewq, "2"));
    mobileFootTwoExtra.appendChild(setColspan(clearSizeCell, "2"));
    mobileFootTwoExtra.appendChild(setColspan(baseInputCellExtra, "2"));
    mobileFootTwoExtra.appendChild(setColspan(selectPOMCell, "2"));

    //mobileFootTwoExtra.appendChild(setColspan(clearSpecsCell, '2'));

    tfoot.appendChild(mobileFootTwo);
    tfoot.appendChild(mobileFootTwoExtra);

    // option rows in tfoot for mobile
    for (let i = 0; i < numOfOptionRows; i++) {
      let optionRow = createElement("tr", {
        className: "measurement-option-row",
      });
      for (let j = 0; j < numOfOptionsPerRow; j++) {
        let optionCell = setColspan(createOptionCell(), "2");
        optionRow.appendChild(optionCell);
      }
      tfoot.appendChild(optionRow);
    }

    // last row in tfoot for mobile
    let mobileFootThree = createElement("tr", { className: "pom-edit-row" });
    let mobileFootThreeExtra = createElement("tr", {
      className: "extra-btn-row",
    });
    mobileFootThree.appendChild(setColspan(delExtraPomBtn, "2"));
    mobileFootThree.appendChild(setColspan(extraPomBtn, "2"));
    mobileFootThree.appendChild(setColspan(clearSpecsCell, "2"));

    mobileFootThreeExtra.appendChild(setColspan(clearPomsBtn, "2"));
    mobileFootThreeExtra.appendChild(setColspan(generateChartCell, "2"));
    mobileFootThreeExtra.appendChild(setColspan(addAllPomsBtn, "2"));

    tfoot.appendChild(mobileFootThree);
    tfoot.appendChild(mobileFootThreeExtra);

    // generate chart row in tfoot
    let mobileFootFour = createElement("tr", { className: "gen-row" });

    mobileFootFour.appendChild(setColspan(refCell, "6"));
    // mobileFootFour.appendChild(setColspan(generateChartCell, '3'));

    tfoot.appendChild(mobileFootFour);
  }
}

window.addEventListener("load", () => {
  let db = JSON.parse(sessionStorage.getItem("db"));
  if (db) {
    // is used to tell if page has been reloaded
    if (db.prevCount === undefined) {
      db.prevCount = db.count;
    } else {
      db.prevCount += 1;
    }
    sessionStorage.setItem("db", JSON.stringify(db));

    if (db.prevCount > db.count) {
      // condition checks if page has been reloaded
      sessionStorage.clear(); // delete session storage when page reloads

      setMeasurementNames();
      for (let i = 0; i < defaultNumOfRows; i++) {
        mainDB.push(new Row(mainDB.length, measurementNames.length));
      }
    } else {
      Object.keys(category).forEach((item) => {
        //keep categories up to date with the one from the previous table
        delete category[item];
        category[item] = db.categoryDB[item];
      });

      db.mainDB.forEach((item) => {
        mainDB.push(Object.assign(new Row(), item));
      });

      colStart = db.colStart;
      tableUnit = db.chartUnit;
      categoryValue = db.category;
      styleValue = db.style;
      fabricValue = db.fabric;
      baseValue = db.base;
      dateValue = db.date;

      setMeasurementNames();
      extraOptionsForEachCategory = db.extraOptionsForEachCategory;
    }
  } else {
    setMeasurementNames();
    for (let i = 0; i < defaultNumOfRows; i++) {
      mainDB.push(new Row(mainDB.length, measurementNames.length));
    }
  }

  // fill in table rows
  createTableHead(screen);
  for (let i = 0; i < mainDB.length; i++) {
    addRowToTbody(i);
  }
  createTableFoot();

  scrollRow = document.getElementById("scroll-row");
  scrollBarCont = document.getElementById("scroll-bar-cont");
  scrollBar = document.getElementById("scroll-bar");

  highlightUnit();
  fillOptionCells();
  fillRowHeaders();
  fillColHeaders();
  fillMeasurementCells();
  setScrollWidth();
  highlightOptions();

  categoryInput = document.getElementById("category-select-option");
  styleInput = document.getElementById("style-input");
  baseInput = document.getElementById("base-input");
  dateInput = document.getElementById("date");
  fabricInput = document.getElementById("fabric-input");
  addPomBtn = document.getElementById("extra-pom-btn");
  delPomBtn = document.getElementById("del-pom-btn");

  fillAuxilliaryInputs(
    categoryValue,
    styleValue,
    baseValue,
    dateValue,
    fabricValue,
    tableUnit
  );

  const inputElements = document.querySelectorAll(".measurement-elem");

  inputElements.forEach(function (input) {
    input.addEventListener('keydown', function(event) {
        // Allow backspace, delete, left arrow, right arrow, and tab key
        if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Tab') {
            return;
        }

        // Prevent non-numeric characters
        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
        }
    });
  });
});

window.addEventListener("unload", deleteTableRows);

window.addEventListener("resize", () => {
  screen = window.outerWidth > 450 ? "desktop" : "mobile";

  numOfDataColsPerView = window.outerWidth > 450 ? 9 : 2;

  if (prevScreen !== screen) {
    deleteTableRows();
    createTableHead(screen);
    for (let i = 0; i < mainDB.length; i++) {
      addRowToTbody();
    }
    createTableFoot();

    colStart = 0;

    highlightUnit();
    fillOptionCells();
    fillRowHeaders();
    fillColHeaders();
    fillMeasurementCells();
    setScrollWidth();
    highlightOptions();

    prevScreen = screen;
  }
});
