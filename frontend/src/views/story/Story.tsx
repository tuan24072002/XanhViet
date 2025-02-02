import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { FormikErrors, useFormik } from "formik"
import { completed, processing } from "@/utils/alert"
import { getFormErrorMessage, isFormFieldInvalid } from "@/utils/validate"
import { validateEmail } from "@/utils/util"
import { useAppSelector } from "@/app/hooks"
import Markdown from 'react-markdown'
type ContactStoryProps = {
    email: string,
}
const Story = () => {
    const formik = useFormik<ContactStoryProps>({
        initialValues: {
            email: "",
        },
        validate: (data) => {
            const errors: FormikErrors<ContactStoryProps> = {};
            if (!data.email) {
                errors.email = 'Vui lòng nhập email!';
            }
            if (!validateEmail(data.email)) {
                errors.email = 'Vui lòng nhập đúng định dạng email!';
            }
            return errors;
        },
        onSubmit: () => {
            processing('', false);
            setTimeout(() => {
                completed(`Gửi thành công`);
                formik.resetForm();
            }, 1000);
        }
    });
    const appState = useAppSelector(state => state.app);
    return (
        <>
            <div className="container mx-auto h-full pt-10" >
                <div className="flex md:flex-row flex-col gap-6 h-[calc(100vh-126px)] pb-6">
                    <div className="md:w-3/12 w-full">
                        <h2 className="text-2xl font-semibold text-textTitle">Câu chuyện thương hiệu</h2>
                    </div>
                    <div className="flex-1 flex flex-col text-lg scroll-smooth scroll-hidden overflow-y-auto">
                        <Markdown className="text-textTitle leading-8">{appState.item.stories}</Markdown>
                    </div>
                </div>
                <div className="grid grid-cols-2 h-[calc(100vh-86px)] overflow-hidden">
                    <div >
                        <img src="https://cocoonvietnam.com/_nuxt/img/footer-image.5d68be7.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full lg:px-36 md:px-18 sm:px-12 pl-2 flex flex-col">
                        <div className="flex-1">
                            <h2 className="md:text-5xl font-semibold py-10 w-full text-textTitle">Đăng ký để nhận thông tin khuyến mãi sớm nhất</h2>
                            <form onSubmit={formik.handleSubmit} className="text-highlight">
                                <div className="relative group flex items-center">
                                    <Input
                                        className="bg-transparent border-none outline-none placeholder:text-highlight"
                                        placeholder="Nhập địa chỉ email"
                                        value={formik.values.email}
                                        onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                    />
                                    <button type="submit"><ArrowRight className="cursor-pointer" /></button>
                                    <hr
                                        className={cn("w-0 h-[2px] bg-highlight absolute left-0 bottom-0 transition-all duration-300 ease-in-out group-focus-within:w-full", isFormFieldInvalid('email', formik) && "bg-red-500")}
                                    />
                                </div>
                                <p className="italic text-sm mt-2">Đăng ký để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm.</p>
                                {
                                    isFormFieldInvalid('email', formik) && getFormErrorMessage('email', formik)
                                }
                            </form>
                        </div>
                        <div className="flex flex-col gap-6 h-fit pb-20">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex flex-col space-y-2">
                                    <h2 className="text-lg font-semibold text-textTitle">Sản phẩm</h2>
                                    <Link to={'/product'} className="relative group w-fit text-text">
                                        Sản phẩm mới
                                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full`)} />
                                    </Link>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <h2 className="text-lg font-semibold text-textTitle">Về chúng tôi</h2>
                                    <Link to={'/story'} className="relative group w-fit text-text">
                                        Câu chuyện thương hiệu
                                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full`)} />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <h2 className="text-lg font-semibold text-textTitle">Liên hệ</h2>
                                <div>
                                    <Link to={'tel:+84906623246'} className="relative group w-fit text-text">
                                        +84 906623246
                                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full`)} />
                                    </Link>
                                </div>
                                <div>
                                    <Link to={'mailto:abc@gmail.com'} className="relative group w-fit text-text">
                                        abc@gmail.com
                                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full`)} />
                                    </Link>
                                </div>
                                <div>
                                    <Link to={'https://www.google.com/maps?q=12 Bến Văn Đồn'} target="_blank" className="relative group w-fit text-text">
                                        12 Đ. Bến Vân Đồn, Phường 5, Quận 4, Hồ Chí Minh
                                        <span className={cn(`absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full`)} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Story