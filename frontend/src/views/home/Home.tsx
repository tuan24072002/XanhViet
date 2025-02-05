import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
const Home = () => {
    const navigate = useNavigate();
    const appState = useAppSelector(state => state.app);
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
                    {
                        appState.item?.banner?.length > 0 && appState.item.banner.map((item, index) => (
                            <SwiperSlide onClick={() => navigate('/product')} key={index}>
                                <img
                                    src={item}
                                    alt={`Slide ${index}`}
                                    className="lg:object-cover w-full h-full object-fill"
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Home