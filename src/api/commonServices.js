import * as request from '../utils/request';

export const listPosition = async () =>{
    try{
        const res = await request.get('/common/list-position',{
            params :{},
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}
