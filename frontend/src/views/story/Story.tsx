import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { FormikErrors, useFormik } from "formik"
import { completed } from "@/utils/alert"
import { getFormErrorMessage, isFormFieldInvalid } from "@/utils/validate"
import { validateEmail } from "@/utils/util"
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
            completed(`Gửi thành công`);
            formik.resetForm();
        }
    });
    return (
        <>
            <div className="container mx-auto h-full pt-10" >
                <div className="flex md:flex-row flex-col gap-6 h-[calc(100vh-126px)] pb-6">
                    <div className="md:w-3/12 w-full">
                        <h2 className="text-2xl font-semibold text-textTitle">Câu chuyện thương hiệu</h2>
                    </div>
                    <div className="flex-1 flex flex-col text-lg scroll-smooth scroll-hidden overflow-y-auto">
                        <div className="h-10">
                            {/* Slogan */}
                            <p className="italic text-text">COCOON - Mỹ phẩm thuần chay - cho nét đẹp thuần Việt</p>
                        </div>
                        <div className="flex-1 space-y-6 mt-4">
                            <div className="space-y-1">
                                <p className="font-semibold text-textTitle">Ý nghĩa thương hiệu</p>
                                <p className="text-text">
                                    Cocoon nghĩa là “cái kén”, cái kén như là “ngôi nhà” để ủ ấp, nuôi dưỡng con sâu nhỏ để đến một ngày sẽ hóa thành nàng bướm xinh đẹp và lộng lẫy. Từ ý nghĩa như thế, Cocoon chính là “ngôi nhà” để chăm sóc làn da, mái tóc của người Việt Nam, giúp cho họ trở nên xinh đẹp, hoàn thiện hơn và tỏa sáng theo cách của chính họ. Cocoon ra đời với một lý do đơn giản là làm đẹp cho người Việt từ chính những nguồn nguyên liệu gần gũi, quen thuộc. Tạo hóa cũng rất ưu ái cho thiên nhiên Việt Nam chúng ta một thế giới thực vật vô cùng phong phú từ cây trái đến thảo dược. Bên trong chúng ẩn chứa những dưỡng chất quý giá không chỉ ăn rất ngon mà còn rất tốt khi đưa lên làn da và mái tóc. Chính vì thế, chẳng có lý do gì để chúng tôi từ chối một nguồn nguyên liệu sẵn có và tuyệt vời đến vậy.<br />
                                    Mỹ phẩm cũng giống như thực phẩm đều là những “món ăn bổ dưỡng” mang đến vẻ đẹp cho con người. Với sự tiến bộ của xã hội, con người có xu hướng tìm kiếm các loại thức ăn từ thực vật để bảo vệ sức khỏe. Song hành với tư duy này, mỹ phẩm thuần chay cũng bắt đầu trở thành xu hướng yêu thích của nhiều người theo lối sống xanh. Đó chính là lý do thôi thúc Cocoon nghiên cứu và không ngừng cho ra đời những sản phẩm mỹ phẩm 100% thuần chay giữ trọn dưỡng chất của thực vật Việt Nam, an toàn, lành tính, không sử dụng thành phần từ động vật và nói không với thử nghiệm trên động vật.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-textTitle">Triết lý</p>
                                <p className="text-text">
                                    Chúng tôi là những người yêu thiên nhiên, luôn say đắm trong việc khám phá các nguyên liệu quen thuộc trong đời sống hằng ngày của người Việt Nam từ rau củ, trái cây, để làm sao để đưa chúng vào trong các sản phẩm mỹ phẩm mà các chất dinh dưỡng của chúng được giữ lại một cách nguyên vẹn và hoàn hảo. Những thực phẩm này rất giàu vitamin, chất chống oxi hóa và các khoáng chất để tăng cường sức khỏe của làn da. Vậy còn gì tuyệt vời hơn là đưa chúng lên làn da của bạn một cách trọn vẹn nhất có thể. Qua quá trình nghiên cứu và thử nghiệm, những công thức được hình thành và trở nên hoàn hảo. Chúng đã phát huy tác dụng và đáp ứng được mong mỏi của người Việt: an toàn và hiệu quả.<br />
                                    Đối với chúng tôi, những gì đưa lên da phải an toàn, hiệu quả và không có nguồn gốc từ động vật
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-textTitle">Sứ mệnh</p>
                                <p className="text-text">
                                    Chúng tôi được sinh ra để mang lại cho bạn một làn da, một mái tóc luôn khỏe mạnh, trẻ trung và tràn đầy sức sống từ những nguồn nguyên liệu đơn giản và gần gũi mà bạn ăn hằng ngày. Chúng tôi luôn giữ một nhiệm vụ trong tâm trí: áp dụng các lợi ích của thực phẩm quanh ta kết hợp với sự hiểu biết khoa học để tạo ra các sản phẩm mỹ phẩm an toàn và hiệu quả cho tất cả mọi người.<br />
                                    Hành trình gian nan tìm đến vẻ đẹp thật sự không phải là nhiệm vụ của riêng bạn, chúng tôi sẽ cùng bạn đi trên hành trình đó. Luôn luôn là như vậy, mãi mãi là như vậy.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-textTitle">Cam kết</p>
                                <p className="text-text">
                                    <span className="font-semibold">100% nguyên liệu có nguồn gốc rõ ràng và an toàn cho làn da:</span> đây là lời hứa và cam kết tuyệt đối của chúng tôi. Tất cả thành phần nguyên liệu trong các sản phẩm của chúng tôi đều có chứng từ chứng minh nguồn gốc xuất xứ từ các nhà cung cấp nguyên liệu trong và ngoài nước. Tất cả các sản phẩm mỹ phẩm trước khi được đưa ra thị trường đều được nghiên cứu từ 12 đến 24 tháng, được thử nghiệm để vượt qua các bài kiểm tra về vi sinh, pH, độ ổn định theo thời gian, theo nhiệt độ, độ kích ứng (theo tiêu chuẩn của trung tâm DRC Nhật Bản có chi nhánh tại Thái Lan) và phải đáp ứng đầy đủ các quy định và việc lưu thông trên thị trường theo quy định của Bộ Y tế Việt Nam. Tất nhiên, các sản phẩm của chúng tôi được điều chế sẽ không có các thành phần như paraben, formaldehyde, phthalates, hydroquinone, triclosan,.... Trên thực tế, chúng tôi cấm hàng trăm thành phần nguy hại và thường xuyên cập nhật danh sách này theo tiêu chuẩn của bộ y tế Việt Nam. Chúng tôi luôn luôn làm điều này vì chúng tôi tôn trọng luật pháp và làn da của bạn.<br />
                                    <span className="font-semibold">100% thuần chay:</span> chúng tôi không sử dụng các nguyên liệu có nguồn gốc từ động vật thường thấy trong mỹ phẩm như : mật ong, sáp ong, mỡ lông cừu, nhau thai cừu, dịch ốc sên, dầu gan cá mập, tơ tằm,.. Thay vào đó chúng tôi vận dụng và phát huy tối đa kha năng của các hoạt chất, chiết xuất từ thực vật mà không cần đến sự hỗ trợ của các nguyên liệu có nguồn gốc từ động vật.<br />
                                    <span className="font-semibold">100% không bao giờ thử nghiệm trên động vật:</span> các công thức mỹ phẩm của Cocoon được nghiên cứu và được thử nghiệm bằng các bài kiểm tra trong phòng thí nghiệm (in-Vitro test) hoặc trên các tình nguyện viên (in-Vivo test). Đồng thời các nhà cung cấp nguyên liệu cũng song hành và cam kết rằng họ cũng không thử nghiệm trên động vật trong quá trình nghiên cứu và sản xuất ra nguyên liệu đó. Chúng tôi không thực hiện các bài thử nghiệm lên động vật như: thỏ, chuột, lòng đỏ trứng gà đã thụ tinh,... vì tính nhân đạo và lời hứa bất di bất dịch với khách hàng và cộng đồng.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-textTitle">Cam kết luôn đi đôi với hành động</p>
                                <p className="text-text">
                                    COCOON rất vinh dự là thương hiệu mỹ phẩm Việt Nam đầu tiên được thông qua trong chương trình Leaping Bunny cam kết không thử nghiệm trên động vật cũng như không có sự tàn ác đối với động vật của tổ chức Cruelty Free International và được chứng nhận không thử nghiệm trên động vật từ tổ chức bảo vệ quyền lợi động vật PETA.<br />
                                    Chúng tôi không thực hiện các thử nghiệm trên động vật và cũng không yêu cầu các công ty, tổ chức hoặc cá nhân nào khác thực hiện các thử nghiệm trên động vật dưới thương hiệu của chúng tôi. COCOON tự hào khi tham gia vào hai chương trình toàn cầu Leaping Bunny của Cruelty Free International và Beauty Without Bunnies của PETA. Đây là hai chương trình bảo vệ và cam kết không có sự tàn ác đối với động vật uy tín nhất trên thế giới. Trong đó, Leaping Bunny được xem là “tiêu chuẩn vàng” toàn cầu cho các sản phẩm mỹ phẩm, chăm sóc cá nhân và gia dụng. Tính đến nay, trên toàn thế giới đã có hơn 1.000 thương hiệu được chấp thuận trong chương trình này.<br />
                                    Tất cả các sản phẩm mỹ phẩm mang thương hiệu COCOON đều được phê duyệt theo chương trình Leaping Bunny và PETA và được gắn biểu tượng “con thỏ” trên bao bì để giúp người tiêu dùng dễ dàng nhận biết. Chúng tôi tuân thủ các chính sách và chủ động giám sát các nhà cung cấp để đảm bảo rằng sản phẩm của chúng tôi tiếp tục tuân thủ các tiêu chí của Leaping Bunny và PETA.<br />
                                    Ngoài ra, các sản phẩm của COCOON là 100% thuần chay, được đăng ký bởi tổ chức The Vegan Society - một tổ chức từ thiện giáo dục lâu đời trên thế giới, cung cấp thông tin và hướng dẫn về các khía cạnh khác nhau của cuộc sống thuần chay. Với biểu tượng “hoa hướng dương”, The Vegan Society cũng là một trong những chứng nhận uy tín xác thực cho các sản phẩm không có thành phần từ động vật và không thử nghiệm trên động vật.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-textTitle">Cocoon tự hào là thương hiệu mỹ phẩm 100% sản xuất tại Việt Nam</p>
                                <p className="text-text">
                                    Giá trị thương hiệu<br />
                                    The COCOON ORIGINAL VIETNAM believes that beauty products should be cruelty free. We are proud to be Leaping Bunny approved. A global programme, Leaping Bunny requires cruelty free standards over and above legal requirements.<br />
                                    All of our own brand cosmetic and personal care products are approved under the Cruelty Free International Leaping Bunny programme, the internationally recognisable gold standard for cruelty free products. We adhere to a fixed cut-off date policy and proactively mgg onitor our suppliers to ensure that our products continue to adhere to the Leaping Bunny criteria. Our supplier monitoring system is also independently audited.<br />
                                    For more information about Cruelty Free International, Leaping Bunny and Leaping Bunny criteria, please visit www.crueltyfreeinternational.org
                                </p>
                            </div>
                        </div>
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