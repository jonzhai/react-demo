import React from 'react';
import {DEFAULT_IP} from 'src/tools/config';
import "./style/detail.scss";
function toDate2(val){
    let date = new Date(val);
    return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
}

const Detail = ({productItem,loadImage,curCount,location})=>{
    return (
        <div className="detail">
            <div className="carNum">车架号：{productItem.carframNum}</div>
            {
                (()=>{
                    if(curCount){
                        return (
                            <div className="alreadyLog" v-if="curCount">
                            <p className="invoice-title">发票信息</p>
                            <p className="invoice-money">
                                <span>发票金额</span>
                                <span>￥{productItem.invoicePrice}</span>
                            </p>
                            <p className="invoice-date">
                                <span>开票日期</span>
                                <span>{toDate2(productItem.invoiceDate)}</span>
                            </p>
                            <div className="vehicle-certificate-container">
                                <p className="title">车辆合格证</p>
                                {
                                    productItem.carCertified && productItem.carCertified.length > 0 && productItem.carCertified.map((item,index) =>{
                                        return <img className="vehicle-certificate" onLoad={loadImage}  src={DEFAULT_IP+item.src} alt="" key={index} />
                                    })
                                }
                            </div>
                        </div>
                        )
                    }else{
                        return (
                            <div className="notLog" >
                                <p className="title">发票信息</p>
                                <img className="nologin" src={require('../img/nologin@2x.png')} alt="未登录" click="toLogin"/>
                            </div>
                        )
                    }


                })()
            }
           
           
        </div>
    )
}


export default Detail;