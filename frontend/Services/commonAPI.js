import axios from "axios";

export const commonAPI = async (httpMethod, url, reqBody) => {
  try {
    return await axios({
      method: httpMethod,
      url,
      ...(reqBody ? { data: reqBody } : {})
    });
  } catch (error) {
    console.error("API request failed:", error.message);
    throw error;
  }
};
