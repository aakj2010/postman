import axios from 'axios';

export const sendRequest = async ({ url, method, headers, body }) => {
  try {
    // Convert headers array into an object
    const headersObj = headers.reduce((acc, { key, value }) => {
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    const response = await axios({
      url,
      method,
      headers: headersObj,
      data: body,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
