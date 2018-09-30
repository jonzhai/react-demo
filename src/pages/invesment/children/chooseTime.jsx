

import React from 'react';
import {Icon} from 'antd';
import '../style/chooseTime.scss';
let timeLists = [30,60,90,180,270,360];

export default function ChooseTime({close, chooseTime, curTime}){
    return (
        <div className="chooseTime">
            <Icon type="close" className="iconfont" theme="outlined"  onClick={()=>{close()}}/>
            <div className="content">
                <div className="title-container">
                    <h2 className="title">持有时限选择</h2>
                    <p className="detail">选择适合自己的周期</p>
                </div>
                <div className="all-time-container">
                    <p className="title"> 全部时限</p>
                    {
                        timeLists.map((item, index) => {
                            return (
                                <p className={curTime === item ? "time-item active": "time-item"} key={index} onClick={()=>{chooseTime(item)}}>{item}日</p>
                            )
                        })
                    }
                </div>
            </div>
        
        </div>
    )
}