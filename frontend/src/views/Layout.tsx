import { useRef, useState, } from "react"
import Header from "@/components/Header"
import { cn } from "@/lib/utils"
import { Phone, X } from "lucide-react"
import Assets from "@/assets"
import FooterMobile from "@/components/FooterMobile"
type Props = {
    children: JSX.Element
    target: string
}
const Layout = (props: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showContact, setShowContact] = useState(false);
    return (
        <div className="flex flex-col h-[100dvh] overflow-hidden relative">
            <Header />
            <div className="flex-1 overflow-y-auto overflow-x-hidden" ref={containerRef}>
                {props.children}
            </div>
            <FooterMobile />
            <button className={cn("absolute bottom-[96px] sm:bottom-10 sm:right-10 right-4 py-3 px-6 border border-highlight rounded-full bg-white cursor-pointer z-50 hover:bg-highlight hover:text-white shadow transition-all duration-500 text-text", showContact ? 'translate-x-100' : 'translate-x-0')} onClick={() => setShowContact(true)}>Liên hệ</button>
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
            }
        </div>
    )
}

export default Layout