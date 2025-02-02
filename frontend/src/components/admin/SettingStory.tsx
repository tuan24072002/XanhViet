import { useAppDispatch, useAppSelector } from "@/app/hooks"
import TextEditor from "./TextEditor"
import { applySetting, postInit, resetActionState, updateStory } from "@/slice/app.slice";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { completed, confirm, failed, processing } from "@/utils/alert";
type SettingStoryProps = {
    setIsApply: (e: boolean) => void,
    isApply: boolean
}
const SettingStory = ({ setIsApply, isApply }: SettingStoryProps) => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app)
    const [markdown, setMarkdown] = useState<string>(appState.item.stories);
    const handleApply = async () => {
        await dispatch(applySetting());
    }
    const handleInitial = () => {
        confirm('Bạn có chắc muốn thiết lập lại không? Điều này sẽ làm tất cả dữ liệu quay về ban đầu!', async () => await dispatch(postInit()))
    }
    const handleSave = async () => {
        await dispatch(updateStory({ stories: markdown }));
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
        <div className="h-[calc(100vh-250px)] flex flex-col">
            <TextEditor markdown={markdown} setMarkdown={setMarkdown} />
            <div className="h-20 px-10 flex items-center justify-end gap-4 border-t-2">
                <Button onClick={handleInitial} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Thiết lập lại</Button>
                <Button onClick={() => {
                    handleApply();
                    setIsApply(false);
                }} disabled={!isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Áp dụng</Button>
                <Button onClick={() => {
                    handleSave();
                    setIsApply(true);
                }} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Lưu</Button>
            </div>
        </div>
    )
}

export default SettingStory