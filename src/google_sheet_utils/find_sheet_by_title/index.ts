import { sheets_v4 } from 'googleapis';
import { SHEET_TITLE_NOT_FOUND } from '../../error_code';

/**
 * Find the sheet among a list of sheets by title
 *
 * @param sheets a list of sheets
 * @param sheetTitle the title to find
 *
 * @returns the sheet with title
 *
 * @throws {SHEET_TITLE_NOT_FOUND} if cannot find a sheet with the title
 */
export const findSheetByTitle = (sheets: sheets_v4.Schema$Sheet[], sheetTitle: string): sheets_v4.Schema$Sheet => {
  const sheet = sheets.find((value) => {
    if (!value.properties) {
      return false;
    }
    return value.properties.title === sheetTitle;
  });

  if (!sheet) {
    throw new Error(SHEET_TITLE_NOT_FOUND);
  }

  return sheet;
};
