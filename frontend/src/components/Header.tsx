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
import { useAppSelector } from "@/app/hooks"
import { FormikErrors, useFormik } from "formik"
import { completed } from "@/utils/alert"
import { getFormErrorMessage, isFormFieldInvalid } from "@/utils/validate"
import { validateEmail } from "@/utils/util"
type ContactProps = {
    name: string,
    phone: string,
    email: string,
    question: string,
}
type HeaderProps = {
    count: number
}
const Header = ({ count }: HeaderProps) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const appState = useAppSelector(state => state.app);
    const formik = useFormik<ContactProps>({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            question: "",
        },
        validate: (data) => {
            const errors: FormikErrors<ContactProps> = {};
            if (!data.name) {
                errors.name = 'Vui lòng nhập tên!';
            }
            if (!data.phone) {
                errors.phone = 'Vui lòng nhập số điện thoại!';
            }
            if (!data.email) {
                errors.email = 'Vui lòng nhập email!';
            }
            if (!validateEmail(data.email)) {
                errors.email = 'Vui lòng nhập đúng định dạng email!';
            }
            if (!data.question) {
                errors.question = 'Vui lòng nhập câu hỏi!';
            }
            return errors;
        },
        onSubmit: (data) => {
            completed(`Cảm ơn bạn ${data.name} đã gửi phản hồi đến cho chúng tôi.`);
            setIsOpen(false);
        }
    });

    return (
        <div className="h-[86px] w-screen border-b-2 sm:block hidden border-border">
            <div className="mx-auto h-full container flex items-center justify-between lg:px-6 md:px-4 px-2">
                <div className="text-lg text-textHeader flex items-center gap-8">
                    <Link to={'/'} className="relative group">
                        Trang chủ
                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-textHeader transition-all duration-500 group-hover:w-full`, location.pathname === '/' && 'w-full')} />
                    </Link>
                    <Link to={'/product'} className="relative group">
                        Sản phẩm
                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-textHeader transition-all duration-500 group-hover:w-full`, location.pathname.includes('/product') && 'w-full')} />
                    </Link>
                    <Link to={'/story'} className="relative group">
                        Câu chuyện
                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-textHeader transition-all duration-500 group-hover:w-full`, location.pathname === '/story' && 'w-full')} />
                    </Link>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <button className="relative group cursor-pointer border-none outline-none text-textHeader" onClick={() => { setIsOpen(true); formik.resetForm(); }}>
                                Liên hệ
                                <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-textHeader transition-all duration-500 group-hover:w-full`, isOpen && 'w-full')} />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <p className="text-2xl text-textTitle">Liên hệ với chúng tôi</p>
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="Nhập tên của bạn *"
                                                className={cn(`outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl`)}
                                                value={formik.values.name}
                                                onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                            />
                                            <hr className={cn("bg-highlight", isFormFieldInvalid('name', formik) && 'bg-red-500')} />
                                            {
                                                isFormFieldInvalid('name', formik) && getFormErrorMessage('name', formik)
                                            }
                                        </div>
                                        <div>
                                            <Input
                                                type="number"
                                                min={0}
                                                placeholder="Nhập số điện thoại *"
                                                className={cn(`outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl`)}
                                                value={formik.values.phone}
                                                onChange={(e) => formik.setFieldValue('phone', e.target.value)}
                                            />
                                            <hr className={cn("bg-highlight", isFormFieldInvalid('phone', formik) && 'bg-red-500')} />
                                            {
                                                isFormFieldInvalid('phone', formik) && getFormErrorMessage('phone', formik)
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            type="text"
                                            placeholder="Nhập địa chỉ email *"
                                            className={cn(`outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl`)}
                                            value={formik.values.email}
                                            onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                        />
                                        <hr className={cn("bg-highlight", isFormFieldInvalid('email', formik) && 'bg-red-500')} />
                                        {
                                            isFormFieldInvalid('email', formik) && getFormErrorMessage('email', formik)
                                        }
                                    </div>
                                    <div>
                                        <Textarea
                                            rows={8}
                                            placeholder="Nhập câu hỏi của bạn ở đây *"
                                            className={cn(`outline-none ring-offset-0 px-0 border-none text-highlight placeholder:text-highlight text-xl`)}
                                            value={formik.values.question}
                                            onChange={(e) => formik.setFieldValue('question', e.target.value)}
                                        />
                                        <hr className={cn("bg-highlight", isFormFieldInvalid('question', formik) && 'bg-red-500')} />
                                        {
                                            isFormFieldInvalid('question', formik) && getFormErrorMessage('question', formik)
                                        }
                                    </div>
                                </div>
                                <DialogFooter className="grid grid-cols-2 mt-6">
                                    <Button className="py-8 cursor-pointer text-white uppercase bg-highlight hover:bg-highlight/80 transition-all duration-300">Gửi</Button>
                                    <Button className="py-8 cursor-pointer text-textHeader uppercase bg-transparent border border-highlight hover:bg-highlight hover:text-white transition-all duration-300">Liên hệ</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Link to={'/cart'} className="relative group">
                        Giỏ hàng
                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-textHeader transition-all duration-500 group-hover:w-full`, location.pathname === '/cart' && 'w-full')} />
                        {
                            count > 0 && <div className="absolute -top-2 -right-2 bg-white p-[1px] rounded-full">
                                <span className="text-sm size-4 flex items-center justify-center  font-bold text-red-500 select-none">{count < 99 ? count : '+99'}</span>
                            </div>
                        }
                    </Link>
                </div>
                <div className="size-20 flex items-center justify-center">
                    <img src={appState.item?.logo ?? ""} alt="Logo" className="size-full object-cover rounded-full mix-blend-multiply scale-90" />
                </div>
            </div>
        </div>
    )
}

export default Header