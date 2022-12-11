import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:5081/api'
}) 

export const get = async (url, options = {}) =>{
    const response = await request.get(url, options);
    return response.data;
}

export default request;