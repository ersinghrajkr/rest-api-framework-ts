// # Custom logging utility
// src/utils/logger.ts
import fs from 'fs';

export const logRequestResponse = (test: Mocha.Context, request: any, response: any, error?: string) => {
  const log = {
    request: {
      method: request.method,
      url: request.url,
      payload: request._data,
    },
    response: {
      status: response?.statusCode || 'N/A',
      payload: response?.body || 'N/A',
    },
    error,
  };

  // Attach log to the Mocha test object for HTML reporting
  test.context = log;

  // Optionally log to a file
  fs.appendFileSync('./reports/request_response_log.json', JSON.stringify(log, null, 2));
};
