import { useEffect, useRef, useState, } from "react"
import Header from "@/components/Header"
import { ShoppingCartIcon } from "lucide-react"
import FooterMobile from "@/components/FooterMobile"
import { Toaster } from "@/components/ui/sonner"
import { useNavigate } from "react-router-dom"
type Props = {
    children: JSX.Element
    target: string
}
const Layout = (props: Props) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    // const [showContact, setShowContact] = useState(false);
    const [countCart, setCountCart] = useState<number>(() => {
        const stored = localStorage.getItem("productCart");
        try {
            return JSON.parse(stored || "[]").length;
        } catch {
            return 0;
        }
    });

    const updateCartCount = () => {
        const productCart = JSON.parse(localStorage.getItem("productCart") || "[]");
        setCountCart(productCart.length);
    };

    useEffect(() => {
        updateCartCount();
        const handleCartUpdated = () => updateCartCount();
        window.addEventListener("cartUpdated", handleCartUpdated);
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "productCart") {
                updateCartCount();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdated);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="flex flex-col h-[100dvh] overflow-hidden relative">
            <Header count={countCart} />
            <div className="flex-1 overflow-y-auto overflow-x-hidden lg:px-6 md:px-4 px-2" ref={containerRef}>
                {props.children}
                <Toaster />
            </div>
            <div className="p-5 w-fit block sm:hidden rounded-full bg-transparent  border border-highlight absolute right-4 bottom-28 cursor-pointer z-20" onClick={() => {
                navigate('/cart');
            }}>
                <div className="size-full relative">
                    <ShoppingCartIcon className="size-5 text-highlight" />
                    {
                        countCart > 0 && <div className="absolute -top-3 -right-3 bg-white p-[1px] rounded-full">
                            <span className="text-sm size-4 flex items-center justify-center  font-bold text-red-500 select-none">{countCart < 99 ? countCart : '+99'}</span>
                        </div>
                    }
                </div>
            </div>
            <FooterMobile />
            {/* <button className={cn("absolute bottom-[96px] sm:bottom-10 sm:right-10 right-4 py-3 px-6 border border-highlight rounded-full bg-white cursor-pointer z-50 hover:bg-highlight select-none hover:text-white shadow transition-all duration-500 text-text", showContact ? 'translate-x-100' : 'translate-x-0')} onClick={() => setShowContact(true)}>Liên hệ</button>
            {
                showContact &&
                <div className={cn("absolute bottom-[96px] sm:bottom-10 sm:right-10 right-4 transition-all duration-1000 w-64 z-50 flex items-center gap-2", showContact ? 'translate-x-0' : 'translate-x-100')}>
                    <a href="tel:0587928264" className="bg-white size-15 flex items-center justify-center rounded-full shadow-xl cursor-pointer">
                        <Phone className="text-highlight" />
                    </a>
                    <div className="bg-white size-15 flex items-center justify-center rounded-full shadow-xl cursor-pointer">
                        <a href="https://zalo.me/0587928264" target="_blank" className="bg-white size-15 flex items-center justify-center rounded-full shadow-xl cursor-pointer">
                            <img src={Assets.Icons.ZaloChat} alt="" />
                        </a>
                    </div>
                    <div className="bg-white size-15 flex items-center justify-center rounded-full shadow-xl cursor-pointer">
                        <a href="https://www.messenger.com/t/IAm.TuanSeven.Info/" target="_blank" className="bg-white size-15 flex items-center justify-center rounded-full shadow-xl cursor-pointer">
                            <img src={Assets.Icons.MessChat} alt="" />
                        </a>
                    </div>
                    <button onClick={() => setShowContact(false)} className="bg-white size-15 flex items-center justify-center rounded-full shadow-xl cursor-pointer">
                        <X className="text-highlight" />
                    </button>
                </div>
            } */}
        </div>
    )
}

export default Layout