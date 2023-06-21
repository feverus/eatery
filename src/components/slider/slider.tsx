import { SliderProps } from './slider.props'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import C from './slider.module.scss'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function Slider(props:SliderProps) {  
  const slideArray = (props.images.length>0)?
    props.images.map((src, id) => 
      <SwiperSlide
          key={'slide_' + src}
          className={C.swiperSlide}
      >
          <img src={src} />
      </SwiperSlide>):
      <></>

  return (
    <Swiper        
        spaceBetween={30}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        loop={true}
        slidesPerView={1}
        slidesPerGroup={1}
        autoHeight={false}
        centeredSlides={true}
        className={C.swiper}
    >
        {slideArray}
    </Swiper>        
  )
}