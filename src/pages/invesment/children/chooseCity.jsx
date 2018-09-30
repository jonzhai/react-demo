import React from 'react';
import {Icon} from 'antd';
import Scroll from 'src/components/scroll/scroll';
import {getAllAreaData} from 'src/api/inversment_api';

import "../style/chooseCity.scss";
export default class ChooseCity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lcationCity: {},
            finalCity: {},
            citys: []
        }
    }
    componentWillMount(){
        this._getAllAreaData();
        this.location();
    }
    componentDidUpdate(prevProps,prevState){
        //显示状态由false变为true时，滚动到之前选择的位置
        if(!prevProps.show){
            this.listScroll.refresh();
            if(!this.props.curCity){return};
            this.finalCity = this.props.curCity;
            let activeCity = document.querySelector('.elClass');
            if(!activeCity){return}
            this.listScroll.scrollToElement(activeCity,0,true,true)
        }
    }
     //定位
     location(){
        let me = this;
        return new Promise((resolve,reject) => {
             let citylocation = new window.qq.maps.CityService({
                complete : function(result){
                    // console.log(result)
                    // debugger;
                    me.setState({
                        lcationCity:  result.detail,
                        finalCity: result.detail
                    })
                    if(result.detail.name){
                        resolve();
                    }else{
                        reject();
                    }
                }
            });
            //调用searchLocalCity();方法    根据用户IP查询城市信息。
            citylocation.searchLocalCity();
        })
       
    }
    relocation(){
        this.location().then(() => {
            this.props.close();
            this.props.chooseCity(this.state.finalCity);
            
        }).catch((err) => {
            console.log(err)
        })
    }
    toggleCity(index_m){
        //默认展开，没有open属性

        let newCitys = this.state.citys.map((item,index)=>{
            if(index_m === index){
                if(typeof item.open === 'undefined' ){
                    item.open = true;
                }else{
                    item.open = !item.open;
                }
            }
            return item;
        })
       this.setState({
           citys: newCitys
       })
        //重新计算元素高度
        this.listScroll.refresh();
    }
    selectCity(city){
        if(!city){return};
        this.setState({
            finalCity: city
        })
        this.props.chooseCity(city);
    }
    async _getAllAreaData(){
        let citys = await getAllAreaData();
        this.setState({
            citys: citys
        })
    }

    render(){
        return (
            <div className="chooseCity">
                <Icon type="close" className="iconfont" theme="outlined"  onClick={()=>{this.props.close()}}/>
                <div className="content">
                    <div className="title-container">
                        <h2 className="title">城市选择</h2>
                        <p className="detail">定制所在城市的内容</p>
                    </div>
                    <div className="scroll-wrapper">
                    <Scroll 
                        ref={
                            (node)=>{this.listScroll = node}
                        }
                    >
                        <div className="all-city-container">
                            <div className="curCity-container">
                                <p className="title">当前城市</p>
                                <div className="curCity">
                                    <span className="city" data-city={this.state.lcationCity} className={this.state.lcationCity.name === this.state.finalCity.name ? "active elClass":''}>{this.state.lcationCity.name}</span>
                                    <div className="getCity" onClick={this.relocation.bind(this)}>
                                        <Icon type="environment" className="iconfont" theme="outlined" />
                                        重新定位
                                    </div>
                                    
                                </div>
                            </div>
                           {/* <div className="mainCity-container" v-cloak>
                                <p className="title">{{mainCity.province}}</p>
                                <ul>
                                    <li className="city border-1px" v-for="(city,index) in mainCity.citys" :key="index" :data-city="city" :className="{active: city == finalCity}" >{{city}}</li>
                                </ul>
                            </div>  */}
                            {
                                this.state.citys.length > 0 &&  this.state.citys.map((item,index)=>{
                                    return (
                                        <div className="otherCity-container"  key={index}  ref="otherCity" >
                                            <div className="title" onClick={()=>{this.toggleCity(index)}}>
                                                <span>{item.name}</span>
                                                <div>
                                                    {/* <span className="icon iconfont icon-arrow-down"  click="toggleCity(item)" v-if="item.open"></span> */}
                                                    {item.open && <Icon type="down" className="iconfont" theme="outlined" />}
                                                    {!item.open &&<Icon type="up" className="iconfont" theme="outlined"  />}
                                                    {/* <span className="icon iconfont icon-right1" click="toggleCity(item)" v-if="!item.open"></span> */}
                                                </div>
                                            </div>
                                            {
                                                item.open && (
                                                    <ul >
                                                        {item.citys && item.citys.map((city,index2)=>{
                                                            return (
                                                                <li   key={index2} onClick={()=>{this.selectCity(city)}} className={city.name === this.state.finalCity.name ? "city active elClass":'city'}>{city.name}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                )
                                            }
                                            
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </Scroll>
                    </div>
                </div>
            </div>
        )
    }
} 