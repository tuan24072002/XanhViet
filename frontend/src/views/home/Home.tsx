import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="h-[calc(100vh-86px)] w-screen overflow-hidden">
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    loop
                    pagination={{
                        clickable: true,
                    }}
                    speed={1000}
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="h-full w-full"
                >
                    <SwiperSlide onClick={() => navigate('/product')}>
                        <img
                            src="https://cf.shopee.vn/file/38924b9daade5d897d0bc5ae0e32b4a7"
                            alt="Slide 1"
                            className="lg:object-cover w-full h-full object-fill"
                        />
                    </SwiperSlide>
                    <SwiperSlide onClick={() => navigate('/product')}>
                        <img
                            src="https://wisebusiness.edu.vn/wp-content/uploads/2023/04/chien-luoc-marketing-cua-cocoon-thanh-phan.jpg"
                            alt="Slide 2"
                            className="lg:object-cover w-full h-full object-fill"
                        />
                    </SwiperSlide>
                    <SwiperSlide onClick={() => navigate('/product')}>
                        <img
                            src="https://www.elle.vn/wp-content/uploads/2021/03/25/428996/cocoon-thuan-chay-vietnam.jpg"
                            alt="Slide 3"
                            className="lg:object-cover w-full h-full object-fill"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Home