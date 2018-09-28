
import React from 'react';
import {DEFAULT_IP} from 'src/tools/config';
import {toPrecent} from 'src/tools/tools';
import {NavLink} from 'react-router-dom';
import "../style/listItem.scss";
 const ListItem = ({item}) =>{
    return (
        <li  className="list-item" >
            <div className="img-container">
                {item.photo && <img src={DEFAULT_IP + item.photo.src} alt=""/>}
                {
                    (()=>{
                        if(item.isNew || item.isHot){
                            return <div className={item.isNew === 1 ? "bandge blue-bg" : "bandge red-bg"}>{item.isNew === 1 ? '最新': '最热'}</div>
                        }
                    })()
                }
                
            </div>
            <div className="yield-container">
                <p className="yield-rate">{toPrecent(item.minAnnualEarn)}%</p>
                <p className="yield-desc">保底年化</p>
            </div>
            <div className="invesment-regulation">
                <p className="invesment-underline">{item.startInversPrice}起投</p>
                <p className="lock-days">锁定期<span>{item.inversCycle}</span>天</p>
            </div>
            <div className="go-invesment">
                <NavLink   className="invesment-btn"  to = {{pathname:`/invesment/invesmentDetail/${item.id}`}}>投资</NavLink>
            {/* <span className="invesment-btn" >投资</span> */}
            </div>
        </li>
    )
} 

export default ListItem;