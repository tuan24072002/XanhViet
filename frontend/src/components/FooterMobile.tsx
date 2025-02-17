import { BookOpenText, Home, Phone, SquareChartGantt } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useState } from "react"
const FooterMobile = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="h-[86px] w-screen border-t-2 block sm:hidden border-border">
            <div className="mx-auto p-2 h-full container flex items-center gap-2 justify-around">
                <Link to={'/'} className={cn('flex flex-col items-center justify-center gap-1 h-full w-full text-textHeader', location.pathname === '/' && 'text-highlight')}>
                    <Home />
                    <span className="text-sm">Trang chủ</span>
                </Link>
                <Link to={'/product'} className={cn('flex flex-col items-center justify-center gap-1 h-full w-full text-textHeader', location.pathname === '/product' && 'text-highlight')}>
                    <SquareChartGantt />
                    <span className="text-sm"> Sản phẩm</span>
                </Link>
                <Link to={'/story'} className={cn('flex flex-col items-center justify-center gap-1 h-full w-full text-textHeader', location.pathname === '/story' && 'text-highlight')}>
                    <BookOpenText />
                    <span className="text-sm">Câu chuyện</span>
                </Link>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <button className={cn('flex flex-col items-center justify-center gap-1 h-full w-full cursor-pointer text-textHeader', isOpen && 'text-highlight')}>
                            <Phone />
                            <span className="text-sm"> Liên hệ</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                <p className="text-2xl">Liên hệ với chúng tôi</p>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Nhập tên của bạn *"
                                        className="outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl"
                                    />
                                    <hr className="bg-highlight" />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Nhập số điện thoại *"
                                        className="outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl"
                                    />
                                    <hr className="bg-highlight" />
                                </div>
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Nhập địa chỉ email *"
                                    className="outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl"
                                />
                                <hr className="bg-highlight" />
                            </div>
                            <div>
                                <Textarea
                                    rows={8}
                                    placeholder="Nhập câu hỏi của bạn ở đây *"
                                    className="outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl"
                                />
                                <hr className="bg-highlight" />
                            </div>
                        </div>
                        <DialogFooter className="grid sm:grid-cols-2 gap-4">
                            <Button className="py-8 cursor-pointer text-white uppercase bg-highlight hover:bg-[#cd9b54e1] transition-all duration-300">Gửi</Button>
                            <Button className="py-8 cursor-pointer text-black uppercase bg-transparent border border-highlight hover:bg-highlight hover:text-white transition-all duration-300">Liên hệ</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default FooterMobile