import http from './index';
export const getRecommenProduct = ({pageNumber, pageSize = 20}) => {
    
    return  http.get('/product/getRecommenProduct',{
        params:{
            pageNumber: pageNumber,
            pageSize: pageSize
        }
    }).then((res) =>{
           if(res.status === 200 && res.data.code > 0){
               return res.data.data;
           } else{
               console.log(res.data.message);
               return false;
           }

    }).catch((err) =>{
        console.log(err)
    })
}

export const getIndexAdvertiseImage = ()=>{
    return  http.get('/advertise/getIndexAdvertiseImage').then((res) =>{
           if(res.status === 200 && res.data.code > 0){
               return res.data.data;
           } else{
               console.log(res.data.message);
               return false;
           }

    }).catch((err) =>{
        console.log(err)
    })
}


