import React from 'react';
import './home.scss';

import Swiper from 'src/components/Swiper';
import CommonFooter from 'src/components/commonFooter';
import Banner from './children/banner';
import RecommendList from './children/recommendList';
import Loading from 'src/components/loading/loading';
import InvesmentDetail from 'src/pages/invesmentDetail/invesmentDetail'
import {Route} from 'react-router-dom';
import {getRecommenProduct, getIndexAdvertiseImage} from 'src/api/home_api';
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
        let htmlDOM = document.documentElement;
        document.body.onscroll = () => {
            if(htmlDOM.scrollTop + htmlDOM.offsetHeight == htmlDOM.scrollHeight){
                if(!this.state.isLastPage){
                    this._getRecommenProduct({pageNumber: ++this.state.curpage})
                }
            }
        }
      
        
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
    render(){
        return (
            <div className="home-page">
                <div className="banner-swiper">
                    <Swiper list={this.state.adList} height="374px"></Swiper>
                </div>
                <Banner bannerState="noLogin"></Banner>
                <RecommendList list={this.state.recommendList}></RecommendList>
                {this.state.showLoading && <Loading></Loading>}
                <CommonFooter></CommonFooter>
                <Route exact  path="/home/invesmentDetail/:id" component={InvesmentDetail} />
            </div>
        )
    }
}

export default Home;