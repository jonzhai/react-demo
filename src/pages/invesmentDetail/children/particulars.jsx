import React from 'react';
import "./style/particulars.scss";
const Particulars = ({pContent})=>{
    let isEmpty = false;
    if(!pContent.carLocation && !pContent.carInfo && !pContent.introduction){
        isEmpty = true;
    }else{
        isEmpty = false;
    }
    return (
        <div className="particulars">
            {
                (()=>{
                    if(!isEmpty){
                        return( 
                            <div className="info">
                                <div className="item">
                                    <p className="title">汽车位置</p>
                                    <p className="content">{pContent.carLocation}</p>
                                </div>
                                <div className="item">
                                    <p className="title">汽车信息</p>
                                    <p className="content">{pContent.carInfo}</p>
                                </div>
                                <div className="item">
                                    <p className="title">项目介绍</p>
                                    <p className="content">{pContent.introduction}</p>
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div className="noInfo">
                                <div className="item">
                                    <p className="title">汽车信息</p>
                                    <div className="img-container">
                                        <img  src= {require("../img/noCarInfo@2x.png")}  alt="没有相关信息"/>
                                    </div>
                                    <p className="desc">这里很干净，什么信息也没有~</p>
                                </div>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}

export default Particulars;
