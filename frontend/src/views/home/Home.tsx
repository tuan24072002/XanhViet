import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import FloatingLabelInput from "@/components/common/FloatingLabelInput";
import { Button } from "@/components/ui/button";
import { completed } from "@/utils/alert";

const Home = () => {
    const navigate = useNavigate();
    const appState = useAppSelector(state => state.app);

    return (
        <div className="h-[calc(100vh-86px)] w-screen overflow-hidden">
            <div className="h-full w-full relative">
                <Swiper
                    direction="horizontal"
                    slidesPerView={1}
                    loop
                    pagination={{
                        clickable: true,
                    }}
                    speed={1000}
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="h-full w-full"
                >
                    {
                        appState.item?.banner?.length > 0 && appState.item.banner.map((item, index) => (
                            <SwiperSlide onClick={() => navigate('/product')} key={index}>
                                <img
                                    src={item}
                                    alt={`Slide ${index}`}
                                    className="w-full h-full lg:object-fill object-contain"
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-highlight/10 backdrop-blur-[2px] z-10" />
                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 rounded-2xl shadow-highlight w-[90%] max-w-4xl z-20">
                    <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4">
                        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-highlight">
                            Đăng ký nhận thông tin ưu đãi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FloatingLabelInput
                                label="Tên"
                                className="bg-white/50 backdrop-blur-sm focus-within:bg-white transition-all duration-300"
                            />
                            <FloatingLabelInput
                                label="Số điện thoại"
                                className="bg-white/50 backdrop-blur-sm focus-within:bg-white transition-all duration-300"
                            />
                            <FloatingLabelInput
                                label="Email"
                                className="bg-white/50 backdrop-blur-sm focus-within:bg-white transition-all duration-300"
                            />
                        </div>
                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={() => completed('Cảm ơn bạn đã điền thông tin!')}
                                className="px-20 py-3 text-lg text-white bg-highlight hover:bg-highlight/90 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Gửi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home