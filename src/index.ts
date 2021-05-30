// import { getGoogleSheetClient } from './google_sheet_utils/google_sheet_client';
// (async () => {
//   log.info('Start');
//   const sheetClient = getGoogleSheetClient();
//   const spreadsheet = await sheetClient.spreadsheets.get({
//     includeGridData: true,
//     spreadsheetId: '1Q0wGZ1rMdbl8i6EwdKYNgE1H-JyFqI2X2TenjtPaOqQ',
//   });
//   console.log(JSON.stringify(spreadsheet.data.sheets));
//   log.info(`End`);
// })().catch((e) => {
//   log.error(e);
// });
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { NO_GOOGLE_ACCESS_TOKEN, NO_GOOGLE_CLIENT_ID, NO_GOOGLE_CLIENT_SECRET, NO_GOOGLE_REFRESH_TOKEN } from './error_code';
import { extractDataArray } from './google_sheet_utils/extract_data_array';
import { getSheetData } from './google_sheet_utils/google_sheet_data';

dotenv.config();

export const exportJson = async (spreadsheet_id: string, sheetTitle: string, configInput?: GsejConfigInput): Promise<Record<string, unknown>[]> => {
  // check config
  const config = checkConfig(configInput);
  // get google sheet api
  const oAuth2Client = new OAuth2Client(config.clientId, config.clientSecret);
  oAuth2Client.credentials = { access_token: config.accessToken, refresh_token: config.refreshToken };
  const googleSheetApi = google.sheets({ version: 'v4', auth: oAuth2Client });
  // get data
  const data = await getSheetData(googleSheetApi, spreadsheet_id, sheetTitle);
  const result = extractDataArray(data);
  return result;
};

/**
 * Check if we have correct config to setup google client and access to the sheet
 *
 * @throws {NO_GOOGLE_CLIENT_ID}
 * @throws {NO_GOOGLE_CLIENT_SECRET}
 * @throws {NO_GOOGLE_ACCESS_TOKEN}
 * @throws {NO_GOOGLE_REFRESH_TOKEN}
 */
export const checkConfig = (config?: GsejConfigInput): GsejConfig => {
  let clientId = process.env.GOOGLE_CLIENT_ID;
  if (config && config.clientId) {
    clientId = config.clientId;
  }
  if (!clientId) {
    throw new Error(NO_GOOGLE_CLIENT_ID);
  }
  let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (config && config.clientSecret) {
    clientSecret = config.clientSecret;
  }
  if (!clientSecret) {
    throw new Error(NO_GOOGLE_CLIENT_SECRET);
  }
  let accessToken = process.env.GOOGLE_ACCESS_TOKEN;
  if (config && config.accessToken) {
    accessToken = config.accessToken;
  }
  if (!accessToken) {
    throw new Error(NO_GOOGLE_ACCESS_TOKEN);
  }
  let refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (config && config.refreshToken) {
    refreshToken = config.refreshToken;
  }
  if (!refreshToken) {
    throw new Error(NO_GOOGLE_REFRESH_TOKEN);
  }
  return {
    clientId,
    clientSecret,
    accessToken,
    refreshToken,
  };
};

export type GsejConfigInput = {
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type GsejConfig = {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
};
