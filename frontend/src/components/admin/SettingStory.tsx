import { useAppDispatch, useAppSelector } from "@/app/hooks"
import TextEditor from "./TextEditor"
import { applySetting, postInit, resetActionState, updateBannerStory, updateStory } from "@/slice/app.slice";
import { forwardRef, useEffect, useState } from "react";
import { completed, confirm, failed, processing } from "@/utils/alert";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import UploadBannerStory from "./UploadBannerStory";

type SettingStoryProps = {
    setIsApply: (e: boolean) => void,
    isApply: boolean
}
const SettingStory = forwardRef<HTMLDivElement, SettingStoryProps>(({ setIsApply, isApply }, ref) => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app)
    const [markdown, setMarkdown] = useState<string>(appState.item.stories.content);
    const [img, setImg] = useState(appState.item.stories.banner);
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
        await dispatch(updateStory({ stories: markdown }));
    }
    const handleSaveBanner = async () => {
        await dispatch(updateBannerStory({ banner: img }));
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
    return (
        <div className="h-[calc(100vh-250px)] flex flex-col relative" ref={ref}>
            <div className="px-2 py-4 flex-1  overflow-y-auto">
                <Accordion type="single" collapsible defaultValue="Content" className="w-full space-y-2">
                    <AccordionItem value="Content">
                        <AccordionTrigger className="bg-highlight text-white rounded-lg px-4 cursor-pointer">Content</AccordionTrigger>
                        <AccordionContent>
                            <TextEditor markdown={markdown} setMarkdown={setMarkdown} handleApply={handleApply} handleInitial={handleInitial} handleSave={handleSave} isApply={isApply} setIsApply={setIsApply} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="Banner">
                        <AccordionTrigger className="bg-highlight text-white rounded-lg px-4 cursor-pointer">Banner</AccordionTrigger>
                        <AccordionContent>
                            <UploadBannerStory handleSaveBanner={handleSaveBanner} handleApply={handleApply} img={img} setImg={setImg} setIsApply={setIsApply} isApply={isApply} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
    )
});

export default SettingStory