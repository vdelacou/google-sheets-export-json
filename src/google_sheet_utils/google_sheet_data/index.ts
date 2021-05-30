import { sheets_v4 } from 'googleapis';
import { FIRST_ROW_NOT_FOUND, SHEET_DATA_NOT_FOUND, SHEET_GRID_DATA_NOT_FOUND } from '../../error_code';
import { findSheetByTitle } from '../find_sheet_by_title';

/**
 * Get the data from the sheets and check if the first row have the KEYS_VALUE, so it means that the spreadsheet use the JSON Noob format
 *
 * @throws {FIRST_CELL_NOT_KEY}
 * @throws {FIRST_ROW_NOT_FOUND}
 * @throws {KEYS_VALUE}
 * @throws {SHEET_DATA_NOT_FOUND}
 * @throws {SHEET_GRID_DATA_NOT_FOUND}
 * @throws {SHEET_TITLE_NOT_FOUND}
 */
export const getSheetData = async (sheetClient: sheets_v4.Sheets, spreadsheetId: string, sheetTitle: string): Promise<sheets_v4.Schema$GridData> => {
  const spreadsheet = await sheetClient.spreadsheets.get({
    includeGridData: true,
    spreadsheetId,
  });
  if (!spreadsheet.data.sheets) {
    throw new Error(SHEET_DATA_NOT_FOUND);
  }
  const sheet = findSheetByTitle(spreadsheet.data.sheets, sheetTitle);
  // check if we have first row
  const { data } = sheet;
  if (!data || !data[0]) {
    throw new Error(SHEET_GRID_DATA_NOT_FOUND);
  }
  if (!data[0].rowData || !data[0].rowData[0]) {
    throw new Error(FIRST_ROW_NOT_FOUND);
  }

  return data[0];
};
