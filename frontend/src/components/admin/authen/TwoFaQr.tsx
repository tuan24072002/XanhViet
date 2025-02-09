import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setTwoOtp } from "@/slice/app.slice"
import TwoFaVerify from "./TwoFaVerify"
export default function TwoFaQr() {
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);
    return (
        <>
            {appState.twofa_otp ?
                <TwoFaVerify />
                : <div className='flex flex-col items-center justify-center h-screen gap-6'>
                    <h2 className='text-2xl font-semibold text-text'><>XÁC THỰC 2 LỚP</></h2>
                    <p className="text-center text-text">Vui lòng tải ứng dụng <b className="text-highlight">Google Authenticator</b> hoặc cài tiện ích này trên trình duyệt và scan mã QR dưới đây.</p>
                    <img src={appState.twofa_qr_image} alt="QR" />
                    <p className="text-center text-text">Nhấn <b className="text-highlight">tiếp tục</b> để thực hiện xác thực.</p>
                    <div><button type="button" className={`py-2 px-4 rounded-lg border border-transparent hover:border-highlight bg-highlight text-white cursor-pointer hover:bg-highlight/80 transition-all duration-300`} onClick={() => dispatch(setTwoOtp(true))}>Tiếp tục</button></div>
                </div>
            }
        </>
    )
}