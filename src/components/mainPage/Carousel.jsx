import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Carousel() {
    return ( <>
    <div>
        <Swiper modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        speed={500}
        >
            {/* .map 활용하면 될 듯 */}
            <SwiperSlide>
                <div  style={{height: '300px'}}>
                    <div>
                        <h1>문화가 살아 숨 쉬는 도시, 서울</h1>
                        <p>어쩌고저쩌고</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
    </div>
    </> );
}

export default Carousel;