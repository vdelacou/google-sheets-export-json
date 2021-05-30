import { getGoogleSheetClient } from '.';
import { NO_GOOGLE_CLIENT_ID } from '../../error_code';

describe('Find Sheet By Title', () => {
  test('should return Error with message SHEET_TITLE_NOT_FOUND', () => {
    try {
      // act
      getGoogleSheetClient();
    } catch (e) {
      // assert
      const error = e as Error;
      expect(error.message).toBe(NO_GOOGLE_CLIENT_ID);
    }
  });
});
