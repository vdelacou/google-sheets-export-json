import { google, sheets_v4 } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { NO_GOOGLE_ACCESS_TOKEN, NO_GOOGLE_CLIENT_ID, NO_GOOGLE_CLIENT_SECRET, NO_GOOGLE_REFRESH_TOKEN } from '../../error_code';

/**
 * Get the google sheet client, need have environement variable GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET GOOGLE_ACCESS_TOKEN GOOGLE_REFRESH_TOKEN
 *
 * @throws NO_GOOGLE_ACCESS_TOKEN NO_GOOGLE_CLIENT_ID NO_GOOGLE_CLIENT_SECRET NO_GOOGLE_REFRESH_TOKEN
 */
export const getGoogleSheetClient = (): sheets_v4.Sheets => {
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

  const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  oAuth2Client.credentials = { access_token: process.env.GOOGLE_ACCESS_TOKEN, refresh_token: process.env.GOOGLE_REFRESH_TOKEN };
  const sheetClient = google.sheets({ version: 'v4', auth: oAuth2Client });
  return sheetClient;
};
