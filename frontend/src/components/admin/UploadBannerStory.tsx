import { Label } from "../ui/label";
import { Button } from "../ui/button";

const UploadBannerStory = ({ handleSaveBanner, img, setImg, handleApply, setIsApply, isApply, }: { handleSaveBanner: VoidFunction, img: string, setImg: (e: string) => void, handleApply: VoidFunction, setIsApply: (e: boolean) => void, isApply: boolean }) => {
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;
            setImg(base64String)
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
    };
    return (
        <>
            <Label htmlFor="file" className="border border-highlight rounded-lg relative mt-2 h-[calc(100vh-520px)] flex items-center justify-center overflow-hidden">
                <img src={img} alt="Banner Story" className="size-full object-contain" />
                <input type="file" name="file" id="file" hidden value={''} onChange={handleChangeImage} />
            </Label>
            <div className="h-20 px-10 flex items-center justify-end gap-4 border-t-2 absolute w-full bottom-0">
                <Button onClick={() => {
                    handleApply();
                    setIsApply(false);
                }} disabled={!isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Áp dụng</Button>
                <Button onClick={() => {
                    handleSaveBanner();
                    setIsApply(true);
                }} disabled={isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Lưu ảnh</Button>
            </div>
        </>
    )
}

export default UploadBannerStory