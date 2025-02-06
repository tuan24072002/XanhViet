import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { applySetting, postInit, resetActionState, updateBanner } from "@/slice/app.slice";
import { Button } from "../ui/button";
import { completed, confirm, failed, processing } from "@/utils/alert";
import { forwardRef, useEffect, useState } from "react";
import { Pen, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
type SettingHomeProps = {
    setIsApply: (e: boolean) => void,
    isApply: boolean
}
const SettingHome = forwardRef<HTMLDivElement, SettingHomeProps>(({ setIsApply, isApply }, ref) => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app)
    const [banners, setBanners] = useState<string[]>(appState.item.banner);

    const handleChangeBanner = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            setBanners((prev) => {
                const updatedBanners = [...prev];
                updatedBanners[index] = base64String;
                return updatedBanners;
            });
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
        reader.readAsDataURL(file);
    };
    const handleCancelBanner = (index: number) => {
        setBanners(prev => prev.filter((_, i) => i !== index));
    };

    const handleApply = async () => {
        await dispatch(applySetting());
    }
    const handleInitial = () => {
        confirm('Bạn có chắc muốn thiết lập lại không? Điều này sẽ làm tất cả dữ liệu quay về ban đầu!', async () => {
            await dispatch(postInit());
            setIsApply(false);
        })
    }
    const handleSave = async () => {
        if (banners.some(item => item === '')) {
            return failed('Không được để trống banner. Vui lòng kiếm tra lại!');
        }
        await dispatch(updateBanner({ banner: banners }));
    }
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
        setBanners(appState.item.banner);
    }, [appState.item.banner])
    return (
        <div ref={ref}>
            <Button onClick={() => setBanners(prev => [...prev, ""])} className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-fit justify-center border-none outline-hidden w-fit bg-green-500 hover:bg-green-600 cursor-pointer flex items-center gap-1 p-2 absolute right-4 top-4"><Plus />Thêm</Button>
            <div className="h-[calc(100vh-250px)] flex flex-col">
                <div className="px-2 py-4 flex-1 overflow-y-auto mb-10">
                    <div className={cn(`grid ${banners.length < 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4 size-full`)}>
                        {banners.map((url, index) => (
                            url !== "" ?
                                <div key={index} className="relative group size-full min-h-[320px]">
                                    <img
                                        src={url}
                                        alt={`Banner ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg shadow overflow-hidden"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all duration-300 rounded-lg" />
                                    <Label
                                        htmlFor={`file${index}`}
                                        className="flex flex-col items-center justify-center gap-2 text-white text-sm font-bold rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    >
                                        <Pen className="size-5" />
                                        Cập nhật ảnh
                                        <input type="file" name="file" id={`file${index}`} hidden value='' onChange={(e) => handleChangeBanner(e, index)} />
                                    </Label>
                                    <button onClick={() => handleCancelBanner(index)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-600 bg-transparent hover:bg-white cursor-pointer rounded transition-all duration-300"><X /></button>
                                </div>
                                : <div key={index} className="relative group size-full min-h-[320px]">
                                    <div className="absolute inset-0 bg-highlight transition-all duration-300 rounded-lg" />
                                    <Label
                                        htmlFor={`file${index}`}
                                        className="flex flex-col items-center justify-center gap-2 text-white text-sm font-bold transition-all duration-300 rounded-lg absolute inset-0"
                                    >
                                        <Pen className="size-5" />
                                        Thêm ảnh
                                        <input type="file" name="file" id={`file${index}`} hidden value='' onChange={(e) => handleChangeBanner(e, index)} />
                                    </Label>
                                    <button onClick={() => handleCancelBanner(index)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-600 bg-transparent hover:bg-white cursor-pointer rounded transition-all duration-300"><X /></button>
                                </div>
                        ))}
                    </div>
                </div>
                <div className="h-20 px-10 flex items-center justify-end gap-4 border-t-2">
                    <Button onClick={handleInitial} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Thiết lập lại</Button>
                    <Button onClick={() => {
                        handleApply();
                        setIsApply(false);
                    }} disabled={!isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Áp dụng</Button>
                    <Button onClick={() => {
                        handleSave();
                        setIsApply(true);
                    }} disabled={isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Lưu</Button>
                </div>
            </div>
        </div>
    )
});

export default SettingHome