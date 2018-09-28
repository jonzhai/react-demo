import React from 'react';

import {getProductDetails} from 'src/api/invesmentDetail_api'
import {DEFAULT_IP} from 'src/tools/config';
import './invesmentDetail.scss';
import SwiperItem from 'src/components/swiperItem_invesmentDetail';
import {Carousel} from 'antd';
import{Link} from 'react-router-dom';
import Scroll from 'src/components/scroll/scroll';
import SliderH from 'src/components/slider/sliderFreeH';
import Detail from './children/detail';
import Particulars from './children/particulars';



class InvesmentDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            curIndex: 1

        }
    }
   componentWillMount(){
        this._getProductDetails(this.props.match.params);
    } 
    async _getProductDetails({id}){
        let data = await getProductDetails(id);
        this.setState({
           ...data
        })
    }
    pullingDown(e){
        this.scroll.finishPullDown();
    }
    toPrecent(val) {
        return `${(val*100).toFixed(2)}`;
    }
    toDecimal(val, num) {
        if (typeof val === "number") {
            return val.toFixed(num);
        } else {
            return val;
        }
    }
    changeTab(index){
        this.slider.goToPage(index,0,200);
        this.setState({
            curIndex: index
        })
    }
    getCurPageIndex(index){
        this.setState({
            curIndex: index
        })
    }
    loadImage(){
        this.slider.refresh();
    }
    render(){
        return (
            <div className="invesmentDetail">
                <div className="scroll-container">
                    <Scroll 
                         ref = {(node)=>{
                            this.scroll = node;
                        }}
                        pullingDown={()=>{this.pullingDown()}}
                    >  
                        <div>
                            <div className="swiper-container"  ref="sliderWrapper">
                                {/* <Swiper list={this.state.photo}></Swiper> */}
                                <Carousel autoplay style={{width: "100%",height: "100%"}}>
                                    {this.state && this.state.photo && this.state.photo.length > 0 && this.state.photo.map((item, index) => {
                                        return <SwiperItem key={index} item={item}></SwiperItem>
                                    })}
                                </Carousel>
                            </div>
                            <div className="product-info">
                                <p className="product-info-head">{this.state.pName}</p>
                                <div className="product-info-body">
                                    <div className="left-part">
                                        <p className="detail-title">保底年化利率</p>
                                        <p className="annualEarn">{ this.toPrecent(this.state.minAnnualEarn)}<span className="little">%</span></p>
                                    </div>
                                    <div className="middle-part">
                                        <p className="detail-title">剩余金额(元)</p>
                                        <p className="dark">{this.state.remainCrowdPrice}</p>
                                    </div>
                                    <div className="right-part">
                                        <p className="detail-title">锁定期</p>
                                        <p className="dark">{this.state.inversCycle}天</p>
                                    </div>
                                </div>
                                <div className="product-info-foot">
                                    <span className="inversUnderline">{ this.toDecimal(this.state.startInversPrice,2)}元 起投</span>
                                    <span>产品规模{ this.toDecimal(this.state.crowdPrice/10000, 2)}万</span>
                                </div>
                            </div>
                            {
                                this.state.inverstorImages &&
                                this.state.inverstorImages.length > 0 &&
                                <div className="investor-container" v-if="">
                                    <div className="investor-img">
                                        {
                                            this.state.inverstorImages && this.state.inverstorImages.length>0 && this.state.inverstorImages.map((item,index) => {
                                                return <img src={!item.src ? require('./img/userDefault.png'): DEFAULT_IP+item.src} alt="" key={index}/>
                                            })
                                        }
                                    </div>
                                    <Link tag="div" className="investors" to={{path: "/invermentRecord"}}>
                                        共 <span className="investor-count">{this.state.totalInverstor}</span> 人投资<span className="icon iconfont icon-right1"></span>
                                    </Link> 
                                </div>
                            }
                            
                            <div className="productDetail-container">
                                <div className="nav" click="refreshScroll">
                                    <div className="left" className={this.state.curIndex === 0 ? "active":""} onClick={()=>{this.changeTab(0)}}>
                                        <span>详情</span>
                                    </div>
                                    <div className="left" className={this.state.curIndex === 1 ? "active":""} onClick={()=>{this.changeTab(1)}}>
                                        <span>明细</span>
                                    </div>
                                </div>
                                <div className="swiper2-container" >
                                    {/*滑动效果  */}
                                    <SliderH initSlide="initSlide" getCurPageIndex={this.getCurPageIndex.bind(this)} ref={(node)=>{this.slider = node}}> 
                                        {this.state.pContent && <Particulars pContent={this.state.pContent}></Particulars>}
                                        {this.state.productItem && <Detail productItem={this.state.productItem}  loadImage={this.loadImage.bind(this)} curCount={this.props.curCount}></Detail>}
                                    </SliderH> 
                                    {/* <transition name="fade">
                                        <Particulars pContent="this.state.pContent" v-if="!showDetail"></Particulars>
                                        <Detail productItem="this.state.productItem" photoIp="this.state.photoIp" v-if="showDetail" loadImage='loadImage'></Detail>
                                    </transition> */}
                                </div>
                            </div>
                        </div>
                
                    </Scroll>
                </div>
                <div className="loading-container" v-show="showLoading">
                    {/* <loading></loading> */}
                </div>
                <div className="fixed-footer">
                    <div className="servers">
                        <span className="icon"></span>
                        <span className="kefu">客服</span>
                    </div>
                    <div className="control-btn">
                        <span className="history-btn" click="toInvermentRecord">投资记录</span>
                        <span className="fast-btn" click="toInvesmenImmediate">立即投资</span>
                        {/* <Link  className="history-btn" to="{path'/invermentRecord'}">投资记录</Link> 
                        <Link   className="fast-btn" to="{path`/invesmenImmediate/${id}`}">立即投资</Link>  */}
                    </div>
                </div>
                {/*客服弹出层  */}
                <div className="servers-mock">
                    <div className="servers">
                        <div className="wx"></div>
                        <div className="phone"></div>
                    </div>
                </div>
            </div>
        )
    }

}
export default InvesmentDetail;