import React from 'react';
import {Link} from 'react-router-dom';
import './style/banner.scss';

 const Banner = ({bannerState, profit})=>{
    return (
        <div className="banner-container ">
            <div className="content">
                {(() =>{
                    switch (bannerState){
                        case 'noLogin':
                            return <a className="immediatelyLogin">立即登录<span className="icon iconfont icon-right_b"></span></a>;
                            break;
                        case 'noProfit': 
                            return  <Link  to="/investment" className="noProfit immediatelyLogin">您暂无收益，<span className="getInfo">去了解投资项目</span><span className="icon iconfont icon-right_b"></span></Link>;
                            break;
                        case 'profit':
                            return (
                                <div className="todayProfit" v-if="bannerState === 'profit'" >
                                    <p className="title">今日收益（元）</p>
                                    <p className="detail-profit">{profit}</p>
                                </div>
                            )
                            break;
                        default: 
                            return <a className="immediatelyLogin">立即登录<span className="icon iconfont icon-right_b"></span></a>;
                    }
                        
                })()}
                <p className="investmentPlatform"><span className="question"></span>如何投资汽车众筹平台</p>
            </div>
        </div>
    )
} 
export default Banner;