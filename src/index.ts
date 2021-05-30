import dotenv from 'dotenv';
import { getGoogleSheetClient } from './google_sheet_utils/google_sheet_client';
import { logger } from './lib/log';
dotenv.config();

const log = logger();

(async () => {
  log.info('Start');
  const sheetClient = getGoogleSheetClient();
  const spreadsheet = await sheetClient.spreadsheets.get({
    includeGridData: true,
    spreadsheetId: '1Q0wGZ1rMdbl8i6EwdKYNgE1H-JyFqI2X2TenjtPaOqQ',
  });
  console.log(JSON.stringify(spreadsheet.data.sheets));
  log.info(`End`);
})().catch((e) => {
  log.error(e);
});
