import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from 'swiper/modules';
import { useAppSelector } from "@/app/hooks";
const Product = () => {
    const appState = useAppSelector(state => state.app);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [products, setProducts] = useState(appState.item.products);
    useEffect(() => {
        setProducts(appState.item.products);
    }, [appState.item.products])
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center w-full h-30">
                <p className="text-3xl font-bold text-textTitle">Sản phẩm</p>
            </div>
            <div className="flex relative overflow-hidden group flex-1">
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    ref={(e) => setPrevEl(e)}
                >
                    <ArrowLeft className="size-8" />
                </button>
                <Swiper
                    centeredSlides={true}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={{ nextEl, prevEl }}
                    modules={[Navigation, Autoplay]}
                    autoplay
                    speed={1000}
                    loop
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 60
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 60
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 40
                        }
                    }}
                >
                    {
                        products.map((product) => (
                            <SwiperSlide
                                key={product.id}
                                className="rounded-[8px] w-103 h-[510px] cursor-pointer flex flex-col shrink-0 lg"
                            >
                                <div className="h-3/4">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1 space-y-2 px-2 pt-2">
                                    <div className="space-y-1">
                                        <h2 className="font-semibold text-textTitle">{product.name}</h2>
                                        <p className="text-textDesc text-sm">{product.description}</p>
                                    </div>
                                    <p className="text-sm font-medium text-textTitle">{product.price}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    ref={(e) => setNextEl(e)}
                >
                    <ArrowRight className="size-8" />
                </button>
            </div>
        </div>
    )
}

export default Product