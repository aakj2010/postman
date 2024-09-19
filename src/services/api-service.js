import axios from 'axios';

export const sendRequest = async ({ url, method, headers, body }) => {
  try {
    const response = await axios({
      url,
      method,
      headers: headers.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {}),
      data: body,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
