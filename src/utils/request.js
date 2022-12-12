import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:5081/api'
}) 

export const get = async (url, options = {}) =>{
    const response = await request.get(url, options);
    return response.data;
}

export const post = async (url, payload) =>{
    const body = {};
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] ||
        typeof payload[key] === "boolean" ||
        typeof payload[key] === "number"
      ) {
        body[key] = payload[key];
      }
      return {};
    });

    const response = await request.post(url, body);
    return response.data;
}


export default request;