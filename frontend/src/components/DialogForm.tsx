import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import React, { useRef } from "react"
import { LucideProps, X } from "lucide-react"
import { actions } from "@/types"

type DialogFormProps = {
    iconFooter?: string | React.ComponentType<LucideProps>;
    disabledSubmit?: boolean,
    titleHeader?: string,
    titleButton: any,
    titleButtonFooter?: string,
    classNameButton?: string,
    classNameTitle?: string,
    classNameDialog?: string,
    classNameButtonFooter?: string,
    body: React.ReactNode,
    actions?: actions,
    onsubmit?: VoidFunction,
    onClick?: (e?: Event) => void,
    isOpen: boolean,
    setIsOpen: (e: boolean) => void
}
const DialogForm = (props: DialogFormProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={dialogRef}>
            <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        props.setIsOpen(true);
                        props.onClick?.();
                    }} className={cn(
                        `h-fit p-1 pr-[6px] flex items-center justify-center border-none outline-hidden gap-[1px]`, props.classNameButton
                    )}>{props.titleButton}</Button>
                </DialogTrigger>
                <DialogContent className={cn('rounded-lg p-2', props.classNameDialog)} style={{ zIndex: '50' }}>
                    <DialogHeader className="-mb-2">
                        <DialogTitle className={cn('flex items-center gap-2 border-b pb-2', props.classNameTitle)}>
                            <div className="bg-highlight h-full w-2 rounded-full" />
                            <span>
                                {props.titleHeader}
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        props.onsubmit?.();
                    }}>
                        <div className="relative">
                            {props.body}
                        </div>
                        <DialogFooter className="pt-2 mt-3 border-t flex items-center sm:gap-0 gap-2">
                            <Button type="button" className="bg-white text-black hover:bg-transparent hover:border border flex items-center justify-center gap-1 p-2 h-fit sm:w-fit w-full" onClick={() => props.setIsOpen(false)}><X className="text-[#F27474]" />Thoát</Button>
                            <div className={props.disabledSubmit ? 'cursor-not-allowed' : ''}>
                                <Button type="submit" disabled={props.disabledSubmit} className={cn(`gap-1 p-2 h-fit sm:w-fit w-full ${props.actions === 'INS' ? 'bg-green-600 hover:bg-green-500 text-white flex items-center justify-center' : props.actions === 'UPD' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white'}`, props.classNameButtonFooter)}>
                                    {props.iconFooter && <props.iconFooter className={cn('size-5')} />}{props.titleButtonFooter || 'Lưu'}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default DialogForm