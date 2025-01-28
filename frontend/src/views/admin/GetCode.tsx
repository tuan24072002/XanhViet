import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { getCode } from "@/slice/app.slice";
import { completed, failed } from "@/utils/alert";
import { ArrowLeft, Copy } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const GetCode = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const [valueOtp, setValueOtp] = useState<string>(`${appState.item.codeSecurity}`);
    const handleCopy = () => {
        navigator.clipboard
            .writeText(valueOtp)
            .then(() => {
                completed("Đã sao chép vào bộ nhớ đệm!");
            })
            .catch(() => {
                failed("Sao chép thất bại!");
            });
    };
    useEffect(() => {
        dispatch(getCode());
    }, [dispatch])
    useEffect(() => {
        setValueOtp(`${appState.item.codeSecurity}`)
    }, [appState.item.codeSecurity])
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="grid grid-cols-1 w-md gap-6">
                <div className="w-full flex items-center justify-center gap-4">
                    <InputOTP maxLength={6} readOnly value={valueOtp}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="size-12" active />
                            <InputOTPSlot index={1} className="size-12" active />
                            <InputOTPSlot index={2} className="size-12" active />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} className="size-12" active />
                            <InputOTPSlot index={4} className="size-12" active />
                            <InputOTPSlot index={5} className="size-12" active />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="border-2 border-highlight hover:bg-highlight hover:text-white transition-all duration-300 cursor-pointer p-2 rounded-sm" onClick={handleCopy}>
                        <Copy />
                    </div>
                </div>
                <div onClick={() => navigate('/admin')} className="flex items-center justify-start cursor-pointer gap-2 w-fit pl-6 text-text hover:text-textTitle">
                    <ArrowLeft /> Quay về trang admin
                </div>
            </div>
        </div>
    )
}

export default GetCode