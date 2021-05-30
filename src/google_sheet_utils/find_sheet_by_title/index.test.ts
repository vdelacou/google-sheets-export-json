import { sheets_v4 } from 'googleapis';
import { findSheetByTitle } from '.';
import { SHEET_TITLE_NOT_FOUND } from '../../error_code';

const spreadsheet: sheets_v4.Schema$Sheet[] = [
  {
    properties: {
      title: 'Sheet1',
    },
    data: [],
  },
  {
    properties: {
      title: 'Sheet2',
    },
    data: [],
  },
  {
    data: [],
  },
];

describe('Find Sheet By Title', () => {
  test('should return Error with message SHEET_TITLE_NOT_FOUND', () => {
    try {
      // act
      findSheetByTitle(spreadsheet, 'title_not_exists');
    } catch (e) {
      // assert
      const error = e as Error;
      expect(error.message).toBe(SHEET_TITLE_NOT_FOUND);
    }
  });

  test('should return the sheet with correct title ', () => {
    // act
    const sheet = findSheetByTitle(spreadsheet, 'Sheet2');
    // assert
    expect(sheet).toBe(spreadsheet[1]);
  });
});
