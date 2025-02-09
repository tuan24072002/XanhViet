import { useAppDispatch, useAppSelector } from "@/app/hooks"
import TwoFaQr from "./TwoFaQr"
import TwoFaVerify from "./TwoFaVerify";
import { useEffect } from "react";
import { generate2fa, resetState } from "@/slice/app.slice";
import { failed } from "@/utils/alert";

const Authentication = () => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    useEffect(() => {
        dispatch(generate2fa());
    }, [dispatch]);
    useEffect(() => {
        switch (appState.status) {
            case "failed":
                failed(appState.error)
                dispatch(resetState())
                break;
        }
    }, [appState])
    return (
        appState.twofa_qr ?
            <TwoFaQr />
            : <TwoFaVerify />
    )
}

export default Authentication