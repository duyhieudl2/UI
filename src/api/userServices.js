import * as request from '../utils/request';

export const listUser = async () =>{
    try{
        const res = await request.get('/auth/list-user',{
            params :{},
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}