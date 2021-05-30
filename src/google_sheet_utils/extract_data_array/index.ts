import { sheets_v4 } from 'googleapis';
import merge from 'lodash.merge';
import { getCellValue } from '../get_cell_value';

/**
 * Extract all the datas in the grid and render as an object
 *
 * @param data
 *
 * @returns an object
 */
export const extractDataArray = (data: sheets_v4.Schema$GridData): Record<string, unknown>[] => {
  const headerArray: string[] = [];
  const objectArray = [];

  const rowData = data.rowData;
  if (rowData) {
    // get the header values
    if (rowData[0] && rowData[0].values) {
      let currentColNumberAfterkeys = 0;
      while (rowData[0].values[currentColNumberAfterkeys]) {
        const headerName = rowData[0].values[currentColNumberAfterkeys];
        if (headerName && headerName.effectiveValue && headerName.effectiveValue.stringValue) {
          headerArray.push(headerName.effectiveValue.stringValue);
        }
        currentColNumberAfterkeys += 1;
      }
    }
    // get the cell value
    for (let row = 1; row < rowData.length; row += 1) {
      const values = rowData[row].values;
      const hasEffectiveValue = values && values[0] && values[0].effectiveValue;
      if (hasEffectiveValue) {
        let rowValue = {};
        for (let col = 0; col < headerArray.length; col += 1) {
          rowValue = merge(rowValue, { [`${headerArray[col]}`]: getCellValue(data, row, col) });
        }
        objectArray.push(rowValue);
      }
    }
  }

  return objectArray;
};
