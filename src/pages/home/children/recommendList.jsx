import React from 'react';
import {Link} from 'react-router-dom';
// import LazyLoad from 'react-lazy-load';
import {toEllipsis, toPrecent} from 'src/tools/tools';
import {DEFAULT_IP} from 'src/tools/config';
import './style/recommendList.scss';
const Item = ({item}) => {
    return (
        <Link className="item" to={{pathname: `/home/invesmentDetail/${item.id}`}}>
            <div className="img-container">
                {/* <LazyLoad> */}
                    <img src={DEFAULT_IP+item.photo[0].src} alt={item.id}/> 
                {/* </LazyLoad> */}
            </div>
            <p className="describe">{toEllipsis(item.pName, 20)}</p>
            <div className="item-info">
                <span className="percent">+{toPrecent(item.annualEarn)}%</span>
                <span className="lock-day">锁定期{item.inversCycle}天</span>
            </div>
        </Link>
    )
};


const List = ({list}) =>{
    return (
        <div className="recommend">
            <div className="title-container">
                <p className="title">最新推荐</p>   
            </div> 
            <div className="recommendLists">
                {
                    list.map((item,index) => {
                        return (<Item key={index} item={item}></Item>);
                    })
                }
            </div>
        </div>
    )
}

export default List;