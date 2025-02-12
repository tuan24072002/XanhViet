import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const ProductDetail = () => {
    const params = useParams();
    const appState = useAppSelector(state => state.app);
    const [products, setProducts] = useState(appState.listProduct);
    const productDetail = products.find(item => item._id === params.id)
    useEffect(() => {
        setProducts(appState.listProduct);
    }, [appState.listProduct])

    return (
        <div className="flex flex-col gap-10 pt-6 h-full max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 w-full md:h-[400px] h-full">
                <div className="flex justify-center">
                    <div className="w-full h-[400px] bg-white/50 overflow-hidden group rounded-lg border border-highlight">
                        <img src={productDetail?.imageSrc} alt="" className="w-full h-full object-contain group-hover:scale-150 transition-all duration-300" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 relative">
                    <h2 className="lg:text-4xl text-2xl font-semibold text-textTitle">{productDetail?.name}</h2>
                    <p className="lg:text-lg text-textTitle">{productDetail?.subName}</p>
                    <div className="flex items-center gap-1">
                        <Star className="fill-yellow-500 text-yellow-500" />
                        <Star className="fill-yellow-500 text-yellow-500" />
                        <Star className="fill-yellow-500 text-yellow-500" />
                        <Star className="fill-yellow-500 text-yellow-500" />
                        <Star className="fill-yellow-500 text-yellow-500" />
                        <span>+99 đánh giá</span>
                    </div>
                    <p className="text-lg tracking-widest font-semibold text-highlight">{productDetail?.price}</p>
                    <div className="md:absolute md:ml-0 ml-auto bottom-0 right-0 flex items-center gap-4">
                        <Button
                            onClick={() => toast("Thêm giỏ hàng thành công", {
                                description: format(new Date(), "EEEE, dd MMMM yyyy 'lúc' h:mm a", { locale: vi }),
                            })}
                            className="border border-highlight bg-highlight/10 text-highlight hover:bg-highlight hover:text-white transition-all duration-300 cursor-pointer">
                            <ShoppingCart />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button className="border border-transparent bg-highlight text-white hover:bg-highlight/10 hover:text-highlight hover:border-highlight transition-all duration-300 cursor-pointer">
                            <ShoppingBag />
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-textHeader"><span className="text-highlight">{productDetail?.name}</span> – Làn Da Sạch Sâu, Mịn Màng Tươi Mới</h2>
                {
                    productDetail?.description !== '' ?
                        <p className="text-lg text-textDesc leading-8">${productDetail?.description}</p>
                        : <p className="text-lg text-textDesc leading-8">Làm sạch là bước quan trọng giúp làn da luôn khỏe mạnh và tươi tắn. <span className="text-highlight">{productDetail?.name}</span> với chiết xuất hoa hồng thiên nhiên không chỉ giúp loại bỏ bụi bẩn, bã nhờn và lớp trang điểm cứng đầu, mà còn mang lại cảm giác dịu nhẹ, tươi mát ngay từ lần đầu sử dụng. Công thức không cồn, không gây kích ứng, phù hợp với mọi loại da, kể cả da nhạy cảm.<br />
                            Với khả năng làm sạch sâu mà không làm khô da, sản phẩm giúp cân bằng độ ẩm, se khít lỗ chân lông và mang lại làn da mềm mịn, rạng rỡ. Hương hoa hồng nhẹ nhàng còn tạo cảm giác thư giãn, giúp bạn tận hưởng mỗi lần chăm sóc da như một liệu trình spa ngay tại nhà.</p>
                }
            </div>
        </div>
    )
}

export default ProductDetail