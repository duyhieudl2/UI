import * as request from '../utils/request';

export const chiTietInOut = async (params) =>{
    try{
        const res = await request.get(`/reportTimekeeping?${params}`);
        return res.data;
    }catch(error){
        console.log(error);
    }
}

