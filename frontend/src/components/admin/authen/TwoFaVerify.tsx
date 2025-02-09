import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { resetActionStateCodeVerify, verify2fa } from "@/slice/app.slice";
import { completed, failed, warning } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
export default function TwoFaVerify() {
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const handleVerify = (pin: string) => {
        if (pin.length === 6) {
            dispatch(verify2fa({
                token: value,
            }))
        }
    }
    useEffect(() => {
        switch (appState.statusVerify) {
            case "completed":
                completed('Xác thực thành công!');
                navigate('/admin')
                dispatch(resetActionStateCodeVerify())
                break
            case "failed":
                failed(appState.error)
                dispatch(resetActionStateCodeVerify())
                break
        }
    }, [appState])
    const handleNotQr = () => {
        warning({ title: 'Cảnh báo', text: 'Vui lòng <a href="https://zalo.me/0587928264" target="_blank" class="contact-admin">liên hệ admin</a> để reset mã QR' })
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <h2 className='text-2xl font-semibold text-text'><>XÁC THỰC 2 LỚP</></h2>
            {appState.status === "loading" ?
                <Loader />
                :
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(e) => {
                        setValue(e)
                    }}
                    onComplete={(e) => {
                        handleVerify(e);
                    }}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className={cn('size-15')} />
                        <InputOTPSlot index={1} className={cn('size-15')} />
                        <InputOTPSlot index={2} className={cn('size-15')} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} className={cn('size-15')} />
                        <InputOTPSlot index={4} className={cn('size-15')} />
                        <InputOTPSlot index={5} className={cn('size-15')} />
                    </InputOTPGroup>
                </InputOTP>
            }
            <p className="text-sm text-text">Vui lòng nhập 6 ký tự từ ứng đụng <b className="text-highlight">Google Authenticator</b> để xác thực.</p>
            <p className="text-sm cursor-pointer hover:underline text-text" onClick={handleNotQr}>Bạn không có ảnh QR?</p>
        </div>
    )
}