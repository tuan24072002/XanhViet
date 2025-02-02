import { useEffect, useRef, useState } from "react"
import ProductGrid from "./ProductGrid"
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import ModalProduct from "./ModalProduct";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { completed, failed, processing } from "@/utils/alert";
import { getSetting, resetActionState } from "@/slice/app.slice";

const SettingProduct = () => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const gridRef = useRef<JqxGrid>(null);
    useEffect(() => {
        switch (appState.status) {
            case 'failed':
                failed(appState.error);
                break;
            case "loading":
                processing();
                break;
            case "completed":
                break;
        }
    }, [appState.status])
    useEffect(() => {
        switch (appState.statusAction) {
            case 'failed':
                failed(appState.error);
                break;
            case "loading":
                processing('', false);
                break;
            case 'completed':
                completed(appState.action === 'INS' ? 'Thêm thành công' : appState.action === 'UPD' ? 'Cập nhật thành công' : 'Xóa thành công');
                setIsOpenDialog(false);
                setTimeout(() => {
                    dispatch(getSetting());
                    dispatch(resetActionState());
                }, 1000);
                break;
        }
    }, [dispatch, appState])
    return (
        <div>
            <ModalProduct isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
            <ProductGrid setIsOpenDialog={setIsOpenDialog} gridRef={gridRef} />
        </div>
    )
}

export default SettingProduct