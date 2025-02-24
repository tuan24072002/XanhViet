import { useEffect, useRef, useState, } from "react"
import Header from "@/components/Header"
import { ShoppingCartIcon } from "lucide-react"
import FooterMobile from "@/components/FooterMobile"
import { Toaster } from "@/components/ui/sonner"
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet';
type Props = {
    children: JSX.Element
    target: string,
    title: string
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
        <>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            <div className="flex flex-col h-[100dvh] overflow-hidden relative">
                <Header count={countCart} />
                <div className="flex-1 overflow-y-auto overflow-x-hidden" ref={containerRef}>
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
            </div>
        </>
    )
}

export default Layout