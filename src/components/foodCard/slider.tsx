import { useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type p = {
    images:Array<string>
}

const Slider = (props:p) => {  
    return (
      <>
        <Swiper        
            spaceBetween={30}
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
            loop={true}
            slidesPerView={1}
            slidesPerGroup={1}
            className="mySwiper"
            autoHeight={false}
            style={{height:'300px'}}
            centeredSlides={true}
        >
            {props.images.map((src, id) => 
            <SwiperSlide
                key={id}
                style={{display:'flex', justifyContent:'center'}}>
                <img src={src} />
            </SwiperSlide>)}         
        </Swiper>        
      </>
    );
  }
  
  export default Slider