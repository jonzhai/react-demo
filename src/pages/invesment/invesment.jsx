

import React from 'react';
import Scroll from 'src/components/scroll/scroll';
import{getType} from 'src/tools/tools';
import {Icon} from "antd";
import{ getCategorys,
        getProductByCid,
        getInvestAdvertiseImage,
        getInvestProductAdImage
    } from 'src/api/inversment_api' ;
import "./style/invesment.scss";
import {toEllipsis} from 'src/tools/tools';
import {DEFAULT_IP} from 'src/tools/config';
import ListItem from './children/listItem';
import CommonFooter from 'src/components/commonFooter';
import InvesmentDetail from 'src/redux/containers/invesmentDetail';
import {Route} from 'react-router-dom';
class Inversment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            classifyList: [],
            showArrow: false,
            curIndex: 0,
            curCid: 0,
            curTime: 90,
            curCity: {},
            curPage: 1,
            isLastPage: false,
            topAds: {},
            hotLists: [],
            commonLists: [],
            swipLists: [],
            showChooseTime: false,
            showChooseCity: false,
            showLoading: false

        }
    }
    componentWillMount(){
        this._getCategorys();
        this._getInvestAdvertiseImage();
        this._getInvestProductAdImage();
    }
    componentDidMount(){
        this.promise.then(()=>{
            setTimeout(() => {
                this._setAdsWidth();
           },20)
        })
        this.promise2.then(()=>{
            setTimeout(() => {
                this._setSwiperAdsWidth();
           },20)
        })
    }
     _getCategorys(){
        this.promise =  new Promise((resolve, reject) => {
            getCategorys().then((data) => {
                this.setState({
                    classifyList: data,
                    curCid: data[0] ? data[0].cid : ''
                })
                this._getProductByCid();
                resolve();
            }).catch((err) => {
                console.log(err)
                reject()
            })
        });
    }
    async _getInvestAdvertiseImage(){
        let topAds = await getInvestAdvertiseImage();
        this.setState({
            topAds: topAds.list[0]
        })
    }
    async _getProductByCid(params){
        this.setState({
            showLoading: true
        })
        let baseParams = {
            cid: this.state.curCid,
            cityId: this.state.curCity.cityId,
            lat: this.state.curCity.lat,
            lng: this.state.curCity.lng,
            cycle: this.state.curTime,
            pageNumber: this.state.curPage,
            pageSize:12
        }
        let data = await getProductByCid(Object.assign({},baseParams,params)),
            productsList = this.state.hotLists.concat(this.state.commonLists, data.list);
        this.setState({
            isLastPage: data.isLastPage,
            curPage: data.pageNum,
            hotLists: productsList.slice(0,4),
            commonLists: productsList.slice(4),
            showLoading: false
        })
    }
    _getInvestProductAdImage(){
        this.promise2 =  new Promise((resolve, reject) => {
            getInvestProductAdImage().then((data) => {
                this.setState({
                    swipLists: data.list
               })
                resolve();
            }).catch((err) => {
                console.log(err)
                reject()
            })
        });
    }
    _setAdsWidth(){
        let parentWidth = 0,
            parentNode = this.refs.classify,
            lis =  Array.from(parentNode.children);
        if(lis.length > 0){
            lis.forEach(item => {
                parentWidth += item.offsetWidth;
            })
            parentNode.style.width = parentWidth+"px";
            if(parentWidth > document.body.clientWidth){
                this.setState({
                    showArrow: true
                })
            }
            setTimeout(()=>{
                this.navScroll.refresh();
            },20)
        }
    }
    _setSwiperAdsWidth(){
        let parentWidth = 0,
            parentNode = this.refs.ads,
            lis =  Array.from(parentNode.children);
        if(lis.length > 0){
            lis.forEach(item => {
                parentWidth += (item.offsetWidth+16);
            })
            parentNode.style.width = (parentWidth +16) + "px";
        }
    }
    pullingDown(){
        console.log("down")
        this.listScroll.finishPullDown();
        
    }
    pullingUp(){
        console.log("up")
        if(!this.state.isLastPage){
            this._getProductByCid({pageNumber: ++this.state.curPage});
        }
        this.listScroll.finishPullUp();
    }
    changeClassify(item,index){
        // const target = e.target;
        this.setState({
            curIndex: index,
            curCid: item.cid,
            curPage: 1,
            hotLists: [],
            commonLists: []
        })
        let lis = this.refs.classify.children;

        this.navScroll.scrollToElement(lis[index],0);
        this._getProductByCid({cid: item.cid});
    }
    render(){
        return (
            <div id="invesment">
                <div className="classify-container">
                    <Scroll 
                         ref = {(node)=>{
                             this.navScroll = node;
                         }}
                        scrollY={false}
                    >
                        <ul className="classify" ref="classify" >
                            {
                                getType(this.state.classifyList) === "Array" && this.state.classifyList.map((item,index) => {
                                    return (
                                        <li 
                                            key={index}
                                            className={index == this.state.curIndex ? "active" : ""}
                                            ref="lis"
                                            onClick={this.changeClassify.bind(this,item,index)}
                                        >{item.name}</li>
                                    )
                                })
                            }
                        </ul>
                        {this.state.showArrow && <Icon className="icon-right-arrow" type="right" theme="outlined" />}
                        {/* <img className="icon-right-arrow" src="./img/right_arrow.png" v-if="classifyList.length > 4">  */}
                    </Scroll>
                </div> 
                <div className="timeAndRegion">
                    <div className="time-btn" onClick={()=>{this.setState({showChooseTime: true})}}>
                        <span>持有时限</span>
                        <span>{this.state.curTime}日</span>
                        <Icon className="iconfont" type="down" theme="outlined" />
                    </div>
                    <div className="region-btn" onClick={()=>{this.setState({showChooseCity: true})}} >
                        <span >地区</span>
                        <span>{ toEllipsis(this.state.curCity.name, 5)}</span>
                        <Icon className="iconfont" type="down" theme="outlined" />
                    </div>
                </div>
                    
                <div className="lists-container" >
                    <Scroll 
                        ref={(node)=>{this.listScroll = node}} 
                        probeType={2} 
                        listenScroll={false}
                        pullup={this.pullingUp.bind(this)}
                        pullingDown={this.pullingDown.bind(this)}
                    >
                        <div>
                            <div className="bannerContainer" ref="bannerContainer">
                                <a href={this.state.topAds.href}>
                                    {this.state.topAds.image && <img className="needsclick" src={DEFAULT_IP + this.state.topAds.image.src} alt=""/>}
                                </a>
                            </div>
                            <ul  className="list-container" ref="hotLists">

                                {
                                    this.state.hotLists.length > 0 && this.state.hotLists.map((item,index) => {
                                        return <ListItem item={item} key = {index}></ListItem>
                                    })
                                }
                            </ul>
                            {this.state.swipLists.length > 0 && (
                                <div className="ads-container">
                                    <Scroll 
                                        ref={(node) =>{this.adScroll = node}}
                                        scrollY={false}
                                    >
                                        <ul  className="ads" ref="ads">
                                            {
                                                this.state.swipLists.map((item,index) => {
                                                    return (
                                                        <li 
                                                            ref="ad"
                                                            key={index}
                                                        >
                                                            <a href={item.href}>
                                                                {item.image && <img className="needsclick"  src={DEFAULT_IP + item.image.src}/>}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        
                                        </ul>
                                    </Scroll>
                                </div>
                            ) }
                            <ul  className="list-container" ref="lists">
                                {
                                    this.state.commonLists.length > 0 && this.state.commonLists.map((item,index) => <ListItem item={item} key = {index}></ListItem>)
                                }
                            </ul>
                            <p className="underline" v-show="isLastPage">已经到底了...</p>
                            {
                                this.state.showLoading && (
                                    <div className="loading-container">
                                        <Icon className="icon" type="loading" theme="outlined" />
                                        加载中...
                                    </div>
                                )
                            }
                        </div>
                    </Scroll>
                </div> 
                <div className="footer-container" ref="footer">
                    <CommonFooter></CommonFooter>
                </div>
                {/*<transition-group name="fade">
                    <choose-time v-show="showChooseTime"  @close="closeChooseTime" key="chooseTime" :curTime="curTime"></choose-time>
                    <choose-city v-show="showChooseCity"  @close="closeChooseCity"  key="chooseCity" :curCity="curCity" :isShow="showChooseCity"></choose-city>
                </transition-group>

                <router-view></router-view> */}
                {/* <Route   path="invesmentDetail/:id" component={InvesmentDetail} /> */}
                <Route  path={`${this.props.match.url}/invesmentDetail/:id`} component={InvesmentDetail}/>
             
            </div>
        )
    }
}

export default Inversment;