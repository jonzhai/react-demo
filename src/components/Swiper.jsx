import React from 'react';
import {Carousel} from 'antd';


const SwiperItem = ({item, height}) =>{
    let ht = height ? height : "auto";
    return (
        <a href={item.href} style={{width: "100%",height: '100%',display: 'block'}}>
            <img src={item.image.src} style={{width: "100%",height: ht,display: 'block'}}/> 
        </a>
    )
}

 const Swiper = ({list, height}) => {
    return (
        <Carousel>
            {list && list.length > 0 && list.map((item, index) => {
                return <SwiperItem key={index} item={item} height={height}></SwiperItem>
            })}
        </Carousel>
    )
}
export default Swiper;