import { cn } from "@/lib/utils"
import { Eye, EyeOff, LucideProps } from "lucide-react";
import { Label } from "./label";
import { ClassNameValue } from "tailwind-merge";
import { InputWithCustomize } from "./inputWithCustomize";
type InputCustomizeProps = {
    Icon?: string | React.ComponentType<LucideProps>,
    className?: ClassNameValue,
    required?: boolean,
    label: string,
    type?: string,
    value: any,
    id?: string,
    name?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showPass?: boolean,
    setShowPass?: (e: boolean) => void,
    maxLength?: number,
    disabled?: boolean,
    classNameInput?: ClassNameValue
}
const InputCustomize = ({ Icon, label, required, type = "text", value, onChange, className, id, name, showPass, setShowPass, maxLength, disabled, classNameInput }: InputCustomizeProps) => {
    return (
        <div className={cn("bg-white shadow-sm border rounded-xl overflow-hidden flex items-center justify-center relative group h-14", className, disabled && 'bg-gray-200')}>
            <div className="flex items-center justify-center w-[50px]">
                {
                    Icon && <Icon className="size-8 pl-2 text-highlight" />
                }
            </div>
            <div className="flex-1 flex flex-col items-start justify-center">
                <Label className="text-lg text-text flex items-center gap-1">
                    {required && <span className="text-red-600">*</span>}
                    {label}
                </Label>
                <InputWithCustomize
                    id={id}
                    name={name}
                    autoComplete="off"
                    maxLength={maxLength}
                    type={(type === 'password' && showPass) ? 'text' : (type === 'password' && !showPass) ? 'password' : type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={cn('border-none outline-hidden w-full bg-transparent pl-0 text-text', classNameInput)}
                />
            </div>
            {
                type === 'password' && <button
                    type="button"
                    onClick={() => setShowPass && setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-main"
                >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            }
        </div>
    )
}

export default InputCustomize