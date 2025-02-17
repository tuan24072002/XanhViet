import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumberToCurrency, parseCurrencyToNumber } from '@/utils/util';
import { useEffect, useState } from 'react';
import Assets from '@/assets';
import { warning } from '@/utils/alert';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
function Cart() {
    const navigate = useNavigate();
    const getProductCartFromStorage = () => {
        const storedCart = localStorage.getItem("productCart");
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const [productCart, setProductCart] = useState(() => getProductCartFromStorage());

    const subtotal = productCart.reduce((acc: any, product: any) => acc + parseCurrencyToNumber(product?.price) * product?.quantity, 0);
    const total = subtotal * 1.1;

    const handleRemove = (id: string) => {
        setProductCart((prevCart: any) => prevCart.filter((item: any) => item._id !== id));
    };
    const handlePlus = (id: string) => {
        setProductCart((prevCart: any) =>
            prevCart.map((item: any) =>
                item._id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    const handleMinus = (id: string) => {
        setProductCart((prevCart: any) => {
            const updatedCart = prevCart.map((item: any) => {
                if (item._id === id) {
                    if (item.quantity === 1) {
                        warning({ text: 'Số lượng tối thiểu là 1. Vui lòng kiểm tra lại!', title: 'Cảnh báo' });
                        return item;
                    }
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            return updatedCart;
        });
    };
    const handleOnChangeQuantity = (e: any, id: string) => {
        if (e.target.value === '') {
            return;
        }
        if (e.target.value > 100) {
            return warning({ text: 'Số lượng tối đa là 100. Vui lòng kiểm tra lại!', title: 'Cảnh báo' });
        }
        setProductCart((prevCart: any) => {
            const updatedCart = prevCart.map((item: any) => {
                if (item._id === id) {
                    if (item.quantity < 1) {
                        warning({ text: 'Số lượng tối thiểu là 1. Vui lòng kiểm tra lại!', title: 'Cảnh báo' });
                        return item;
                    }
                    return { ...item, quantity: Number(e.target.value) };
                }
                return item;
            });
            return updatedCart;
        });
    }

    useEffect(() => {
        localStorage.setItem("productCart", JSON.stringify(productCart));
        window.dispatchEvent(new Event("cartUpdated"));
    }, [productCart]);
    return (
        <div className="h-full overflow-hidden">
            <div className={`max-w-6xl mx-auto h-full ${productCart.length > 0 && 'pt-10'}`}>
                {
                    productCart.length > 0 ?
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="lg:col-span-2">
                                <ScrollArea className='lg:h-[calc(100vh-180px)] h-auto'>
                                    <Card className="p-6">
                                        {productCart.map((product: any, index: number) => (
                                            <div key={product?._id}>
                                                <div className="flex gap-6">
                                                    <img
                                                        src={product?.imageSrc}
                                                        alt={product?.name}
                                                        className="w-32 h-32 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1 relative">
                                                        <div className="flex justify-between">
                                                            <h3 className="sm:text-lg font-medium text-textTitle">{product?.name}</h3>
                                                            <Button variant="ghost" size="icon" className={`text-destructive cursor-pointer`} onClick={() => handleRemove(product?._id)}>
                                                                <Trash2 className="w-5 h-5" />
                                                            </Button>
                                                        </div>
                                                        <p className="sm:text-lg font-semibold mt-2 text-highlight">
                                                            {product?.price}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-4">
                                                            <Button variant="outline" size="icon" className="rounded-full cursor-pointer" onClick={() => handleMinus(product?._id)}>
                                                                <MinusIcon className="w-4 h-4" />
                                                            </Button>
                                                            <input type="number" name="quantity" id="quantity" value={product?.quantity} onChange={(e) => handleOnChangeQuantity(e, product._id)} className='text-lg font-medium w-8 text-center text-text border-none outline-none' />
                                                            <Button variant="outline" size="icon" className="rounded-full cursor-pointer" onClick={() => handlePlus(product?._id)}>
                                                                <PlusIcon className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                        <p className='absolute bottom-0 right-0 sm:block hidden'>Tổng phụ: <span className='text-lg font-semibold text-highlight'>{formatNumberToCurrency(parseCurrencyToNumber(product?.price) * product?.quantity)}</span></p>
                                                    </div>
                                                </div>
                                                {index < productCart.length - 1 && (
                                                    <Separator className="my-6" />
                                                )}
                                            </div>
                                        ))}
                                    </Card>
                                </ScrollArea>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }} className="lg:col-span-1">
                                <Card className="p-6">
                                    <h2 className="sm:text-xl text-lg font-semibold mb-6">Chi tiết đơn hàng</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tổng phụ</span>
                                            <span className="font-medium">${formatNumberToCurrency(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Vận chuyển</span>
                                            <span className="font-medium">${(formatNumberToCurrency(subtotal / 10))}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between sm:text-lg font-semibold">
                                            <span>Tổng cộng</span>
                                            <span>${formatNumberToCurrency(total)}</span>
                                        </div>
                                    </div>

                                    <Button onClick={() => navigate('/info-receive')} className="w-full mt-6 text-lg h-12 bg-highlight hover:bg-highlight/80 transition-colors cursor-pointer">
                                        Thanh toán
                                    </Button>
                                </Card>
                            </motion.div>
                        </div>
                        : <div className='size-full flex flex-col items-center justify-center gap-6'>
                            <img src={Assets.Images.emptyBox3} alt="" className='size-60 mix-blend-multiply' />
                            <p className='text-center leading-10 text-lg'>Giỏ hàng của bạn đang trống.<br />
                                Hãy chọn thêm sản phẩm để mua sắm nhé.</p>
                        </div>
                }

            </div>
        </div>
    );
}

export default Cart;