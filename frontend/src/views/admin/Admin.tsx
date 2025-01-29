import { getFormErrorMessage, isFormFieldInvalid } from "@/utils/validate";
import { FormikErrors, useFormik } from "formik";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { applySetting, changeSetting, checkCode, postInit, resetActionStateCodeVerify, setAdminVerify } from "@/slice/app.slice";
import { completed, failed, processing } from "@/utils/alert";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingGeneral from "@/components/admin/SettingGeneral";
import { AppModel } from "@/model/App.model";
import SettingProduct from "@/components/admin/SettingProduct";

type AdminProps = {
    codeSecurity: string
}
const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const [isApply, setIsApply] = useState(false);
    const formik = useFormik<AdminProps>({
        initialValues: {
            codeSecurity: ""
        },
        validate: (data) => {
            const errors: FormikErrors<AdminProps> = {};
            if (!data.codeSecurity || data.codeSecurity.length < 6) {
                errors.codeSecurity = 'Vui lòng nhập mã code để tiếp tục tác vụ này!';
            }
            return errors;
        },
        onSubmit: (data) => {
            dispatch(checkCode({ codeSecurity: data.codeSecurity }));
        }
    });
    const formikSetting = useFormik<AppModel>({
        initialValues: appState.item,
        validate: (data) => {
            const errors: FormikErrors<AppModel> = {};
            if (!data.logo) {
                errors.logo = 'Vui lòng thêm logo'
            }
            if (!data.backgroundColor) {
                errors.backgroundColor = 'Vui lòng chọn màu nền'
            }
            if (!data.textHeaderColor) {
                errors.textHeaderColor = 'Vui lòng chọn màu chữ đầu trang'
            }
            if (!data.highlightColor) {
                errors.highlightColor = 'Vui lòng chọn màu nổi bật'
            }
            if (!data.textTitleColor) {
                errors.textTitleColor = 'Vui lòng chọn màu chữ tiêu đề'
            }
            if (!data.textColor) {
                errors.textColor = 'Vui lòng chọn màu chữ'
            }
            if (!data.textDescColor) {
                errors.textDescColor = 'Vui lòng chọn màu chữ mô tả'
            }
            if (!data.borderColor) {
                errors.borderColor = 'Vui lòng chọn màu viền'
            }
            return errors;
        },
        onSubmit: (data) => {
            const payload = {
                backgroundColor: data.backgroundColor,
                textHeaderColor: data.textHeaderColor,
                highlightColor: data.highlightColor,
                textTitleColor: data.textTitleColor,
                textColor: data.textColor,
                textDescColor: data.textDescColor,
                borderColor: data.borderColor,
            }
            dispatch(changeSetting(payload))
            setIsApply(true);
        }
    });
    useEffect(() => {
        switch (appState.statusVerify) {
            case 'failed':
                failed(appState.error);
                dispatch(resetActionStateCodeVerify());
                break;
            case "loading":
                processing();
                break;
            case 'completed':
                completed(appState.checkCodeSuccessString);
                dispatch(resetActionStateCodeVerify());
                dispatch(setAdminVerify(true));
                break;
        }
    }, [dispatch, appState])
    useEffect(() => {
        if (formik.values.codeSecurity.length === 6) {
            formik.handleSubmit();
        }
    }, [formik.values.codeSecurity])
    const handleApply = async () => {
        await dispatch(applySetting());
    }
    const handleInitial = async () => {
        await dispatch(postInit());
    }

    return (
        !appState.adminVerify ?
            <div className="flex items-center justify-center h-screen w-screen">
                <form onSubmit={formik.handleSubmit} className="w-md flex flex-col justify-center items-center gap-4">
                    <InputOTP
                        maxLength={6}
                        value={formik.values.codeSecurity}
                        onChange={(value) => formik.setFieldValue('codeSecurity', value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className={cn('size-15', isFormFieldInvalid('codeSecurity', formik) && 'border-red-500')} />
                            <InputOTPSlot index={1} className={cn('size-15', isFormFieldInvalid('codeSecurity', formik) && 'border-red-500')} />
                            <InputOTPSlot index={2} className={cn('size-15', isFormFieldInvalid('codeSecurity', formik) && 'border-red-500')} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} className={cn('size-15', isFormFieldInvalid('codeSecurity', formik) && 'border-red-500')} />
                            <InputOTPSlot index={4} className={cn('size-15', isFormFieldInvalid('codeSecurity', formik) && 'border-red-500')} />
                            <InputOTPSlot index={5} className={cn('size-15', isFormFieldInvalid('codeSecurity', formik) && 'border-red-500')} />
                        </InputOTPGroup>
                    </InputOTP>
                    {
                        isFormFieldInvalid('codeSecurity', formik) &&
                        <div className="h-3 flex items-center" >
                            {getFormErrorMessage("codeSecurity", formik)}
                        </div>
                    }
                </form>
            </div>
            : <div className="h-screen w-screen flex items-center justify-center">
                <div className="bg-white/90 w-[95%] h-[90%] rounded-[8px] shadow flex flex-col">
                    <div className="h-20 px-10 flex items-center justify-between border-b-2">
                        <div className="flex items-center relative">
                            <div className="bg-highlight w-3 h-full absolute left-0 rounded-full" />
                            <h2 className="text-2xl font-semibold text-textTitle pl-4">Trang admin</h2>
                        </div>
                        <X className="text-2xl cursor-pointer text-highlight" onClick={() => {
                            dispatch(setAdminVerify(false))
                            navigate('/')
                        }} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Tabs defaultValue="general" className="w-full h-full p-2">
                            <TabsList className="w-full justify-start gap-2 h-16 bg-white">
                                <TabsTrigger value="general" className="py-4 px-10 max-w-28 data-[state=active]:data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight">Cài đặt chung</TabsTrigger>
                                <TabsTrigger value="product" className="py-4 px-10 max-w-28 data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight">Sản phẩm</TabsTrigger>
                                <TabsTrigger value="story" className="py-4 px-10 max-w-28 data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight">Câu chuyện</TabsTrigger>
                            </TabsList>
                            <TabsContent value="general" asChild>
                                <SettingGeneral formik={formikSetting} setIsApply={setIsApply} />
                            </TabsContent>
                            <TabsContent value="product" asChild>
                                <SettingProduct />
                            </TabsContent>
                            <TabsContent value="story" asChild>
                                <div className="size-full p-2">
                                    Cài đặt câu chuyện
                                </div>
                            </TabsContent>
                        </Tabs>

                    </div>
                    <div className="h-20 px-10 flex items-center justify-end gap-4 border-t-2">
                        <Button onClick={handleInitial} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Thiết lập lại</Button>
                        <Button onClick={() => {
                            handleApply();
                            setIsApply(false);
                        }} disabled={!isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Áp dụng</Button>
                        <Button onClick={() => {
                            formikSetting.handleSubmit();
                        }} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Lưu</Button>
                    </div>
                </div>
            </div>
    )
}

export default Admin