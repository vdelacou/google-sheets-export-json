import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { FIRST_ROW_NOT_FOUND, NO_GOOGLE_ACCESS_TOKEN, NO_GOOGLE_CLIENT_ID, NO_GOOGLE_CLIENT_SECRET, NO_GOOGLE_REFRESH_TOKEN, SHEET_GRID_DATA_NOT_FOUND } from '../../error_code';
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
export const getSheetData = async (spreadsheetId: string, sheetTitle: string) => {
  const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  oAuth2Client.credentials = { access_token: process.env.GOOGLE_ACCESS_TOKEN, refresh_token: process.env.GOOGLE_REFRESH_TOKEN };
  const sheetClient = google.sheets({ version: 'v4', auth: oAuth2Client });
  return sheetClient;
  const spreadsheet = await sheetClient.spreadsheets.get({
    includeGridData: true,
    spreadsheetId,
  });
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

/**
 * Need have environement variable GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET GOOGLE_ACCESS_TOKEN GOOGLE_REFRESH_TOKEN
 *
 */
export const validGoogleEnvironnementVariable = (): void => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error(NO_GOOGLE_CLIENT_ID);
  }
  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(NO_GOOGLE_CLIENT_SECRET);
  }
  if (!process.env.GOOGLE_ACCESS_TOKEN) {
    throw new Error(NO_GOOGLE_ACCESS_TOKEN);
  }
  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error(NO_GOOGLE_REFRESH_TOKEN);
  }
};
