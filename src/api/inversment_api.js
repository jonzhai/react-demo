import http from './index';
export const getCategorys = () => {
    
    return  http.get('/product/getCategorys').then((res) =>{
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


export const getProductByCid = ({cid,pageNumber,pageSize,cityId,lat,lng,cycle}) =>{
    return  http.get('/product/getProductByCid',{
        params:{
            cid: cid,
            pageNumber: pageNumber,
            pageSize: pageSize,
            cityId: cityId,
            lat: lat,
            lng: lng,
            cycle: cycle
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

export const getInvestAdvertiseImage = () => {
    
    return  http.get('/advertise/getInvestAdvertiseImage').then((res) =>{
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

export const getInvestProductAdImage = () => {
    
    return  http.get('/advertise/getInvestProductAdImage').then((res) =>{
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