import http from './index';
export const getProductDetails = (id) => {
    
    return  http.get('/product/getProductDetails',{
        params:{
            id: id
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




