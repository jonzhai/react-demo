import React from 'react';
import './home.scss';

import SwiperItem from 'src/components/swiperItem_home';
import CommonFooter from 'src/components/commonFooter';
import Banner from './children/banner';
import RecommendList from './children/recommendList';
import Loading from 'src/components/loading/loading';
// import InvesmentDetail from 'src/pages/invesmentDetail/invesmentDetail'
import InvesmentDetail from 'src/redux/containers/invesmentDetail';
import {Route} from 'react-router-dom';
import {getRecommenProduct, getIndexAdvertiseImage} from 'src/api/home_api';
import {Carousel,Icon} from 'antd';
import Scroll from 'src/components/scroll/scroll';
class Home extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            adList: [],
            curItem: 0,
            recommendList:[],
            curpage: 0,
            isLastPage: false,
            showLoading: false
        }
    }
  
    componentWillMount(){
       this._getRecommenProduct({pageNumber: 1});
       this._getIndexAdvertiseImage();
    } 
    componentDidMount() {
        // let htmlDOM = document.documentElement;
        // document.body.onscroll = () => {
        //     console.log(1)
        //     if(htmlDOM.scrollTop + htmlDOM.offsetHeight == htmlDOM.scrollHeight){
        //         if(!this.state.isLastPage){
        //             this._getRecommenProduct({pageNumber: ++this.state.curpage})
        //         }
        //     }
        // }
      
        
    }
    async _getRecommenProduct(params){
        this.setState({
            showLoading: true
        })
        let data = await getRecommenProduct(params);
        if(data.list && data.list.length > 0 ){
            let list = [...this.state.recommendList,...data.list];
            this.setState({
                recommendList: list,
                curpage: data.pageNum,
                isLastPage: data.isLastPage,
                showLoading: false
            })
        }
    }
    async _getIndexAdvertiseImage(){
        let data = await getIndexAdvertiseImage();
        if(data.list && data.list.length > 0 ){
            this.setState({
                adList: data.list
            })
        }
    }
    setCurItem(index){
        this.setState({
            curItem:  index
        })
    }
    pullup(){
        console.log("up")
        if(!this.state.isLastPage){
            this._getRecommenProduct({pageNumber: ++this.state.curpage})
        }
        this.child.finishPullUp();
    }
    pullingDown(){
        console.log("down")
        this.child.finishPullDown();
        
    }
    render(){
        return (
            <div className="home-page">
                
                <div className="scroll-container">
                    <Scroll 
                       
                        pullup = {()=>{this.pullup()}}
                        pullingDown = {()=>{this.pullingDown()}}
                        ref = {(node)=>{
                            this.child = node;
                        }}
                    >
                        <div>
                            <div className="banner-swiper">
                                {/* <Swiper list={this.state.adList}></Swiper> */}
                                <Carousel autoplay style={{width: "100%",height: "100%"}}>
                                    {this.state.adList && this.state.adList.length > 0 && this.state.adList.map((item, index) => {
                                        return <SwiperItem key={index} item={item}></SwiperItem>
                                    })}
                                </Carousel>
                            </div>
                            <Banner bannerState="noLogin"></Banner>
                            <RecommendList list={this.state.recommendList}></RecommendList>
              
                            {this.state.showLoading && <Loading></Loading>}
                        </div>
                    </Scroll>
                </div>
                
                <CommonFooter></CommonFooter>
                {/* <Route   path="invesmentDetail/:id" component={InvesmentDetail} /> */}
                <Route path={`${this.props.match.url}/invesmentDetail/:id`} component={InvesmentDetail}/>
            </div>
        )
    }
}

export default Home;