import { HuePicker } from "react-color"
import { Label } from "../ui/label"
import { FormikProps } from "formik"
import { AppModel } from "@/model/App.model"
import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import ClickOutside from "../ClickOutside"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { completed, confirm, failed, processing } from "@/utils/alert"
import { applySetting, postInit, resetActionState, uploadLogo } from "@/slice/app.slice"
import { Button } from "../ui/button"
type SettingGeneralProps = {
    formik: FormikProps<AppModel>,
    setIsApply: (e: boolean) => void,
    isApply: boolean
}
const SettingGeneral = forwardRef<HTMLDivElement, SettingGeneralProps>(({ formik, setIsApply, isApply }, ref) => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);

    const [openBackgroundColor, setOpenBackgroundColor] = useState(false);
    const [openTextTitleColor, setOpenTextTitleColor] = useState(false);
    const [openTextDescColor, setOpenTextDescColor] = useState(false);
    const [openTextColor, setOpenTextColor] = useState(false);
    const [openBorderColor, setOpenBorderColor] = useState(false);
    const [openTextHeaderColor, setOpenTextHeaderColor] = useState(false);
    const [openHighlightColor, setOpenHighlightColor] = useState(false);

    const backgroundColorPickRef = useRef<HTMLDivElement>(null);
    const textTitleColorPickRef = useRef<HTMLDivElement>(null);
    const textDescColorPickRef = useRef<HTMLDivElement>(null);
    const textColorPickRef = useRef<HTMLDivElement>(null);
    const borderColorPickRef = useRef<HTMLDivElement>(null);
    const textHeaderColorPickRef = useRef<HTMLDivElement>(null);
    const highlightColorPickRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        setOpenBackgroundColor(false);
        setOpenTextTitleColor(false);
        setOpenTextDescColor(false);
        setOpenTextColor(false);
        setOpenBorderColor(false);
        setOpenTextHeaderColor(false);
        setOpenHighlightColor(false);
    }, []);

    ClickOutside(backgroundColorPickRef, close);
    ClickOutside(textTitleColorPickRef, close);
    ClickOutside(textDescColorPickRef, close);
    ClickOutside(textColorPickRef, close);
    ClickOutside(borderColorPickRef, close);
    ClickOutside(textHeaderColorPickRef, close);
    ClickOutside(highlightColorPickRef, close);
    const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;
            dispatch(uploadLogo({ logo: base64String }));
            formik.setFieldValue("logo", base64String);
            setIsApply(true);
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
    };
    useEffect(() => {
        switch (appState.statusAction) {
            case 'failed':
                failed(appState.error);
                dispatch(resetActionState());
                break;
            case "loading":
                processing('', false);
                break;
            case 'completed':
                completed('Cập nhật thành công!');
                dispatch(resetActionState());
                break;
        }
    }, [dispatch, appState])
    useEffect(() => {
        formik.setValues(appState.item);
    }, [appState.item])
    const handleApply = async () => {
        await dispatch(applySetting());
    }
    const handleInitial = () => {
        confirm('Bạn có chắc muốn thiết lập lại không? Điều này sẽ làm tất cả dữ liệu quay về ban đầu!', async () => await dispatch(postInit()))
    }
    return (
        <div className="flex flex-col h-[calc(100vh-250px)]" ref={ref}>
            <div className="size-full p-2 space-y-4 overflow-y-auto pb-20 flex-1">
                <div className="size-40 rounded-full bg-background mx-auto mb-6">
                    <label htmlFor="file" className="size-full flex items-center justify-center cursor-pointer">
                        <img src={formik.values.logo} alt="Logo" className="size-4/5 object-contain mix-blend-multiply" />
                    </label>
                    <input type="file" name="file" id="file" hidden value={''} onChange={handleChangeLogo} />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <Label>Màu chữ đầu trang</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenTextHeaderColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.textHeaderColor }} />
                            <p>{formik.values.textHeaderColor}</p>
                        </div>
                        {openTextHeaderColor && <div className="size-fit" ref={textHeaderColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.textHeaderColor}
                                onChangeComplete={(color) => formik.setFieldValue('textHeaderColor', color.hex)}
                            />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Màu chữ tiêu đề</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenTextTitleColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.textTitleColor }} />
                            <p>{formik.values.textTitleColor}</p>
                        </div>
                        {openTextTitleColor && <div className="size-fit" ref={textTitleColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.textTitleColor}
                                onChangeComplete={(color) => formik.setFieldValue('textTitleColor', color.hex)}
                            />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Màu chữ mô tả</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenTextDescColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.textDescColor }} />
                            <p>{formik.values.textDescColor}</p>
                        </div>
                        {openTextDescColor && <div className="size-fit" ref={textDescColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.textDescColor}
                                onChangeComplete={(color) => formik.setFieldValue('textDescColor', color.hex)}
                            />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Màu chữ</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenTextColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.textColor }} />
                            <p>{formik.values.textColor}</p>
                        </div>
                        {openTextColor && <div className="size-fit" ref={textColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.textColor}
                                onChangeComplete={(color) => formik.setFieldValue('textColor', color.hex)}
                            />
                        </div>}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <Label>Màu nền</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenBackgroundColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.backgroundColor }} />
                            <p>{formik.values.backgroundColor}</p>
                        </div>
                        {openBackgroundColor && <div className="size-fit" ref={backgroundColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.backgroundColor}
                                onChangeComplete={(color) => formik.setFieldValue('backgroundColor', color.hex)}
                            />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Màu viền</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenBorderColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.borderColor }} />
                            <p>{formik.values.borderColor}</p>
                        </div>
                        {openBorderColor && <div className="size-fit" ref={borderColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.borderColor}
                                onChangeComplete={(color) => formik.setFieldValue('borderColor', color.hex)}
                            />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Màu nổi bật</Label>
                        <div className="p-2 bg-gray-200 rounded gap-2 flex items-center justify-between">
                            <div onClick={() => setOpenHighlightColor(prev => !prev)} className="rounded-sm h-8 w-24 cursor-pointer" style={{ backgroundColor: formik.values.highlightColor }} />
                            <p>{formik.values.highlightColor}</p>
                        </div>
                        {openHighlightColor && <div className="size-fit" ref={highlightColorPickRef}>
                            <HuePicker
                                className="mt-2"
                                color={formik.values.highlightColor}
                                onChangeComplete={(color) => formik.setFieldValue('highlightColor', color.hex)}
                            />
                        </div>}
                    </div>
                </div>
            </div>
            <div className="h-20 px-10 flex items-center justify-end gap-4 border-t-2">
                <Button onClick={handleInitial} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Thiết lập lại</Button>
                <Button onClick={() => {
                    handleApply();
                    setIsApply(false);
                }} disabled={!isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Áp dụng</Button>
                <Button onClick={() => {
                    formik.handleSubmit();
                }} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Lưu</Button>
            </div>
        </div>
    )
});

export default SettingGeneral