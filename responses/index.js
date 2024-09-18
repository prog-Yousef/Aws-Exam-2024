const sendResponse = (statusCode, data) => {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  };
  
  const sendError = (statusCode, data) => {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    };
  };
  
  module.exports = { sendResponse, sendError };