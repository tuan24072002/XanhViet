import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import FloatingLabelInput from "@/components/common/FloatingLabelInput";
import { Button } from "@/components/ui/button";
import { completed } from "@/utils/alert";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";

const Home = () => {
    const navigate = useNavigate();
    const appState = useAppSelector(state => state.app);
    const [showDialogPromotion, setShowDialogPromotion] = useState(true);
    const [hiddenPopup, setHiddenPopup] = useState<CheckedState>(localStorage.getItem('hiddenPopup') !== null);
    const handleClosePopuup = () => {
        setShowDialogPromotion(false)
        if (hiddenPopup && !localStorage.getItem('hiddenPopup')) {
            const nowPlus8 = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
            localStorage.setItem('hiddenPopup', String(nowPlus8.getTime()))
        } else {
            localStorage.removeItem('hiddenPopup')
        }
    }
    useEffect(() => {
        const storedTime = localStorage.getItem('hiddenPopup');
        const now = Date.now();
        if (now > Number(storedTime)) {
            localStorage.removeItem('hiddenPopup');
            setShowDialogPromotion(true);
            setHiddenPopup(false);
        } else {
            setShowDialogPromotion(false);
            setHiddenPopup(true);
        }
    }, [])
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
                {
                    showDialogPromotion && <>
                        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] z-10 lg:block hidden" />
                        <div className="absolute top-[100px] left-1/2 -translate-x-1/2 rounded-2xl w-[90%] max-w-4xl z-20 lg:block hidden">
                            <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 relative">
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
                                <Button
                                    onClick={() => handleClosePopuup()}
                                    className="absolute top-2 right-2 bg-transparent hover:bg-transparent text-text hover:text-red-600 border border-black hover:border-red-600 !p-0 size-fit transition-all duration-300">
                                    <X />
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="hiddenPopup" checked={hiddenPopup} onCheckedChange={(checked) => setHiddenPopup(checked ?? false)} />
                                    <Label htmlFor="hiddenPopup" className="cursor-pointer" >Ẩn đi trong 12h</Label>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Home