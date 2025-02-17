import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatNumberToCurrency, parseCurrencyToNumber, validateEmail } from '@/utils/util';
import { FormikErrors, useFormik } from 'formik';
import { getFormErrorMessage, isFormFieldInvalid } from '@/utils/validate';
type InfoProps = {
    lastName: string,
    middleName: string,
    firstName: string,
    email: string,
    phone: string,
    address: string
}
function InfoReceive() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const getProductCartFromStorage = () => {
        const storedCart = localStorage.getItem("productCart");
        return storedCart ? JSON.parse(storedCart) : [];
    };
    const formik = useFormik<InfoProps>({
        initialValues: {
            lastName: "",
            middleName: "",
            firstName: "",
            email: "",
            phone: "",
            address: ""
        },
        validate: (data) => {
            const errors: FormikErrors<InfoProps> = {};
            if (!data.lastName) {
                errors.lastName = 'Vui lòng nhập họ!';
            }
            if (!data.middleName) {
                errors.middleName = 'Vui lòng nhập tên đệm!';
            }
            if (!data.firstName) {
                errors.firstName = 'Vui lòng nhập tên!';
            }
            if (!data.phone) {
                errors.phone = 'Vui lòng nhập số điện thoại!';
            }
            if (!data.address) {
                errors.address = 'Vui lòng nhập địa chỉ nhận hàng!';
            }
            if (!data.email) {
                errors.email = 'Vui lòng nhập email!';
            }
            if (!validateEmail(data.email)) {
                errors.email = 'Vui lòng nhập đúng định dạng email!';
            }
            return errors;
        },
        onSubmit: (data) => {
            setLoading(true);
            localStorage.setItem('infoReceive', JSON.stringify(data));
            setTimeout(() => {
                navigate('/success');
            }, 1500);
        }
    });
    const productCart = getProductCartFromStorage();
    const subtotal = productCart.reduce((acc: any, product: any) => acc + parseCurrencyToNumber(product?.price) * product?.quantity, 0);
    const total = subtotal * 1.1;
    useEffect(() => {
        if (productCart.length === 0) {
            navigate('/');
        }
    }, [navigate, productCart.length])
    return (
        <div className="h-full p-8">
            <div className="max-w-4xl mx-auto pb-8">
                <div className="flex items-center gap-3 mb-8">
                    <InfoIcon className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-semibold text-textTitle">Thông tin nhận hàng</h1>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <Card className="p-6 mb-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Họ</Label>
                                <Input
                                    id="lastName"
                                    value={formik.values.lastName}
                                    onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
                                    placeholder="Nguyễn"
                                />
                                {
                                    isFormFieldInvalid('lastName', formik) && getFormErrorMessage('lastName', formik)
                                }
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="middleName">Tên đệm</Label>
                                <Input
                                    id="middleName"
                                    value={formik.values.middleName}
                                    onChange={(e) => formik.setFieldValue('middleName', e.target.value)}
                                    placeholder="Văn"
                                />
                                {
                                    isFormFieldInvalid('middleName', formik) && getFormErrorMessage('middleName', formik)
                                }
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Tên</Label>
                                <Input
                                    id="firstName"
                                    value={formik.values.firstName}
                                    onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
                                    placeholder="A"
                                />
                                {
                                    isFormFieldInvalid('firstName', formik) && getFormErrorMessage('firstName', formik)
                                }
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                    placeholder="abc@example.com"
                                />
                                {
                                    isFormFieldInvalid('email', formik) && getFormErrorMessage('email', formik)
                                }
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input
                                    id="phone"
                                    value={formik.values.phone}
                                    onChange={(e) => formik.setFieldValue('phone', e.target.value)}
                                    placeholder="+84 999 999 999"
                                />
                                {
                                    isFormFieldInvalid('phone', formik) && getFormErrorMessage('phone', formik)
                                }
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">Địa chỉ nhận hàng</Label>
                                <Input
                                    id="address"
                                    value={formik.values.address}
                                    onChange={(e) => formik.setFieldValue('address', e.target.value)}
                                    placeholder="123 Hai Bà Trưng, P.1, Q.1"
                                />
                                {
                                    isFormFieldInvalid('address', formik) && getFormErrorMessage('address', formik)
                                }
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 mb-6">
                        <h2 className="sm:text-xl text-lg font-semibold mb-6 text-textTitle">Chi tiết đơn hàng</h2>

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
                                <span className='text-highlight tracking-wider'>${formatNumberToCurrency(total)}</span>
                            </div>
                        </div>
                    </Card>

                    <div className='grid grid-cols-2 gap-6'>
                        <Button
                            type='button'
                            className="w-full text-lg h-12 bg-slate-200 border border-slate-400 text-slate-600 hover:bg-slate-200/50 cursor-pointer"
                            onClick={() => navigate('/cart')}
                        >
                            Trở về
                        </Button>
                        <Button
                            type='submit'
                            className="w-full text-lg h-12 bg-highlight hover:bg-highlight/80 transition-colors cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Đặt hàng"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InfoReceive;