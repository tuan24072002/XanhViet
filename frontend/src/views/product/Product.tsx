import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from 'swiper/modules';
import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "@/model/App.model";
const Product = () => {
    const navigate = useNavigate();
    const appState = useAppSelector(state => state.app);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [products, setProducts] = useState(appState.listProduct);
    useEffect(() => {
        setProducts(appState.listProduct);
    }, [appState.listProduct])
    const handleBuyNow = (product: ProductModel) => {
        const productCart = localStorage.getItem('productCart');
        let arr = productCart ? JSON.parse(productCart) : [];

        const existingProduct = arr.find((item: any) => item._id === product._id);

        if (existingProduct) {
            arr = arr.map((item: any) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            arr.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('productCart', JSON.stringify(arr));
        window.dispatchEvent(new Event("cartUpdated"));
        navigate('/cart');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center w-full h-30">
                <p className="text-3xl font-bold text-textTitle">Sản phẩm</p>
            </div>
            <div className="flex items-center justify-center overflow-hidden flex-1">
                <div className="size-full max-h-[500px] relative group overflow-hidden">
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
                                slidesPerView: 4,
                                spaceBetween: 60
                            },
                            896: {
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
                        className="w-full h-full"
                    >
                        {
                            products?.length > 0 && products.map((product, index) => {
                                return (
                                    <SwiperSlide
                                        key={product._id + index}
                                        className="rounded-[8px] flex flex-col shrink-0 lg border"
                                    >
                                        <div className="h-2/3 overflow-hidden">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.name}
                                                className="w-full h-full object-contain mix-blend-multiply rounded hover:scale-110 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="h-1/6 space-y-2 px-2 pt-2" onClick={() => navigate(`/product/${product._id}`)}>
                                            <div className="space-y-1">
                                                <h2 className="font-semibold text-textTitle cursor-pointer">{product.name}</h2>
                                                <p className="text-textDesc text-sm">{product.subName}</p>
                                            </div>
                                            <p className="text-sm font-medium text-highlight">{product.price}</p>
                                        </div>
                                        <div className="h-1/6 w-full relative">
                                            <Button
                                                onClick={() => handleBuyNow(product)}
                                                className="py-2 px-4 border bg-highlight hover:bg-highlight/80 cursor-pointer text-white w-fit transition-all duration-300 absolute right-2 bottom-2">
                                                <p className="text-sm">Mua ngay</p>
                                            </Button>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
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
        </div>
    )
}

export default Product