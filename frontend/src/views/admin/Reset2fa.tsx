import { useAppDispatch } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { reset2fa } from "@/slice/app.slice";
import { confirm } from "@/utils/alert"
import { useNavigate } from "react-router-dom";

const Reset2fa = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleReset = () => {
        confirm('Bạn có chắc muốn đặt lại xác thực 2 lớp?', async () => {
            await dispatch(reset2fa())
            setTimeout(() => {
                navigate('/getcode')
            }, 1000);
        })
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Button className="bg-red-500 hover:bg-red-600 cursor-pointer px-4 py-2" onClick={handleReset}>Reset</Button>
        </div>
    )
}

export default Reset2fa