import * as request from '../utils/request';

export const listPosition = async () =>{
    try{
        const res = await request.get('/auth/list-user',{
            params :{},
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}

export const createUser = async (values) =>{
    try{
        const res = await request.post('/auth/login',values);
        return res.data;
    }catch(error){
        console.log(error);
    }
}