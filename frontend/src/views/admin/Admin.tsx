import { FormikErrors, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeSetting, resetActionStateCodeVerify, setAdminVerify } from "@/slice/app.slice";
import { completed, failed, processing } from "@/utils/alert";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingGeneral from "@/components/admin/SettingGeneral";
import { AppModel } from "@/model/App.model";
import SettingProduct from "@/components/admin/SettingProduct";
import SettingStory from "@/components/admin/SettingStory";
import SettingHome from "@/components/admin/SettingHome";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const [isApply, setIsApply] = useState(false);
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
        if (!appState.adminVerify) {
            navigate('/')
        }
    }, [appState.adminVerify, navigate])
    return (
        appState.adminVerify ?
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="bg-white/90 w-[95%] h-[90%] rounded-[8px] shadow flex flex-col">
                    <div className="h-20 px-10 flex items-center justify-between border-b-2">
                        <div className="flex items-center relative">
                            <div className="bg-highlight w-3 h-full absolute left-0 rounded-full" />
                            <h2 className="text-2xl font-semibold text-textTitle pl-4">Trang admin</h2>
                        </div>
                        <X className="text-2xl cursor-pointer text-highlight" onClick={() => {
                            dispatch(setAdminVerify(false))
                        }} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Tabs defaultValue="general" className="w-full h-full p-2 relative">
                            <TabsList className="w-full justify-start gap-2 h-16 bg-white">
                                <TabsTrigger value="general" className="py-4 px-10 max-w-28 data-[state=active]:data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight cursor-pointer">Cài đặt chung</TabsTrigger>
                                <TabsTrigger value="home" className="py-4 px-10 max-w-28 data-[state=active]:data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight cursor-pointer">Trang chủ</TabsTrigger>
                                <TabsTrigger value="product" className="py-4 px-10 max-w-28 data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight cursor-pointer">Sản phẩm</TabsTrigger>
                                <TabsTrigger value="story" className="py-4 px-10 max-w-28 data-[state=active]:bg-highlight data-[state=active]:text-white bg-white text-text border border-highlight cursor-pointer">Câu chuyện</TabsTrigger>
                            </TabsList>
                            <TabsContent value="home" asChild>
                                <SettingHome setIsApply={setIsApply} isApply={isApply} />
                            </TabsContent>
                            <TabsContent value="general" asChild>
                                <SettingGeneral formik={formikSetting} setIsApply={setIsApply} isApply={isApply} />
                            </TabsContent>
                            <TabsContent value="product" asChild>
                                <SettingProduct />
                            </TabsContent>
                            <TabsContent value="story" asChild>
                                <SettingStory setIsApply={setIsApply} isApply={isApply} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div> : <></>
    )
}

export default Admin