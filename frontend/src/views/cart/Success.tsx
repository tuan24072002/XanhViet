import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumberToCurrency, parseCurrencyToNumber } from '@/utils/util';

function Success() {
    const navigate = useNavigate();
    const confettiTriggered = useRef(false);
    const getProductCartFromStorage = () => {
        const storedCart = localStorage.getItem("productCart");
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const productCart = getProductCartFromStorage();

    const subtotal = productCart.reduce((acc: any, product: any) => acc + parseCurrencyToNumber(product?.price) * product?.quantity, 0);
    const total = subtotal * 1.1;
    useEffect(() => {
        if (!confettiTriggered.current && productCart.length > 0) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            confettiTriggered.current = true;
        }
        localStorage.setItem('productCart', JSON.stringify([]))
        localStorage.setItem('infoReceive', JSON.stringify({}))
        window.dispatchEvent(new Event("cartUpdated"));
    }, []);
    useEffect(() => {
        if (productCart.length === 0) {
            navigate('/');
        }
    }, [navigate, productCart.length])
    return (
        <div className="h-full p-8">
            <div className="max-w-3xl mx-auto pb-8">
                <Card className="p-8 text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="w-16 h-16 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-textTitle">Đã xác nhận đơn hàng!</h1>
                    <p className="text-text mb-6 ">
                        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được nhận và đang được xử lý.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="w-4 h-4" />
                        <span>Order #123456789</span>
                    </div>
                </Card>

                <Card className="p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6 text-textTitle">Chi tiết đơn hàng</h2>
                    <div className="space-y-6">
                        {productCart.map((product: any) => (
                            <div key={product._id}>
                                <div className="flex gap-4">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-textTitle">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className="text-text font-semibold mt-1">
                                                {product?.price}
                                            </p>
                                            <p className="font-semibold mt-1 text-highlight">
                                                {formatNumberToCurrency(parseCurrencyToNumber(product?.price) * product?.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Separator className="mt-4" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tổng phụ</span>
                            <span className="font-medium text-text">${formatNumberToCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Vận chuyển</span>
                            <span className="font-medium text-text">${(formatNumberToCurrency(subtotal / 10))}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                            <span className='text-text'>Tổng cộng</span>
                            <span className='text-highlight tracking-wider'>${formatNumberToCurrency(total)}</span>
                        </div>
                    </div>
                </Card>

                <div className="text-center">
                    <Button asChild className='bg-highlight hover:bg-highlight/80 text-white'>
                        <Link to="/product">Tiếp tục mua sắm</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Success;