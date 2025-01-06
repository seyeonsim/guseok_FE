// 작성자 : 심세연

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import "../../styles/new/Carousel.css";

function Carousel() {
    return ( 
    <>
        <div className="slide-container">
            <Swiper 
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                speed={500}
            >
                {/* 슬라이드 1 */}
                <SwiperSlide>
                    <div className="inner-slide slide-1">
                        <div className="inner-text">
                            <h1>문화가 살아 숨 쉬는 도시, <br /> 서울의 오늘을 놓치지 마세요</h1>
                            <p>예술과 감동의 현장, 지금 바로!</p>
                        </div>
                        <div className="inner-img">
                            <img className="icon-png" src={process.env.PUBLIC_URL + '/icon-show.png'} alt="" />
                            <div className="confetti">
                                <img src={process.env.PUBLIC_URL + '/icon-confetti.gif'} alt="" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 슬라이드 2 */}
                <SwiperSlide>
                    <div className="inner-slide slide-2">
                        <div className="inner-text">
                            <h1>도심 속에서 자연을 즐기는<br />가장 쉬운 방법</h1>
                            <p>서울의 푸른 쉼터로 떠나보세요.</p>
                        </div>
                        <div className="inner-img">
                            <img className="icon-png" src={process.env.PUBLIC_URL + '/icon-park.png'} alt="" />
                            <div className="bike">
                                <img src={process.env.PUBLIC_URL + '/icon-bike.png'} alt="" />
                            </div>
                        </div>
                        
                    </div>
                </SwiperSlide>

                {/* 슬라이드 3 */}
                <SwiperSlide>
                    <div className="inner-slide slide-3">
                        <div className="inner-text">
                            <h1>건강한 공존을 위한<br />필수 규칙!</h1>
                            <p>흡연/ 금연구역을 빠르고 쉽게 찾아보기</p>
                        </div>
                        <div className="inner-img">
                            <img className="icon-png" src={process.env.PUBLIC_URL + '/icon-smoking.png'} alt="" />
                            <div className="cloud">
                                <img src={process.env.PUBLIC_URL + '/icon-cloud.png'} alt="" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </>
    );
}

export default Carousel;
