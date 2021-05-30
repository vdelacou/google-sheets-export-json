import { sheets_v4 } from 'googleapis';

/**
 *
 * Get a cell value with row and col
 *
 * @param data the data from sheets
 * @param row the row index
 * @param col the column index
 *
 * @returns {string | number | boolean | Date | null}
 */
export const getCellValue = (data: sheets_v4.Schema$GridData, row: number, col: number): string | number | boolean | Date | null => {
  let result: string | number | boolean | Date | null = null;
  if (data.rowData && data.rowData[row]) {
    const rowData = data.rowData[row];
    if (rowData.values && rowData.values[col]) {
      const { effectiveValue } = rowData.values[col];
      if (effectiveValue !== undefined) {
        if (effectiveValue.numberValue !== undefined && effectiveValue.numberValue !== null) {
          const { effectiveFormat } = rowData.values[col];
          if (effectiveFormat && effectiveFormat.numberFormat && (effectiveFormat.numberFormat.type === 'DATE' || effectiveFormat.numberFormat.type === 'DATE_TIME')) {
            result = new Date(Math.round((effectiveValue.numberValue.valueOf() - (25567 + 2)) * 86400) * 1000);
          } else {
            result = effectiveValue.numberValue.valueOf();
          }
        }
        if (effectiveValue.boolValue !== undefined && effectiveValue.boolValue !== null) {
          result = effectiveValue.boolValue;
        }
        if (effectiveValue.stringValue) {
          result = effectiveValue.stringValue.valueOf();
        }
      }
    }
  }
  return result;
};
