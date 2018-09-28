import React from 'react';
// import {Carousel} from 'antd';
import {DEFAULT_IP} from 'src/tools/config';
import {clacMeter} from 'src/tools/dom';
const SwiperItem = ({item}) =>{
    return (
        <a href={item.link} style={{width: "100%",height: '100%',display: 'block'}}>
            <img src={DEFAULT_IP +item.src} style={{width: "100%",height: clacMeter(374),display: 'block'}}/> 
        </a>
    )
}

//  const Swiper = ({list}) => {
//     return (
//         <Carousel autoplay style={{width: "100%",height: "100%"}}>
//             {list && list.length > 0 && list.map((item, index) => {
//                 return <SwiperItem key={index} item={item}></SwiperItem>
//             })}
//         </Carousel>
//     )
// }
export default SwiperItem;