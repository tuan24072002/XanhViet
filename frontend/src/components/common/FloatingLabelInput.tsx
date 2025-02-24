import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const FloatingLabelInput = ({
    id,
    label,
    type = 'text',
    error,
    className
}: {
    id?: string;
    label: string;
    type?: string;
    error?: boolean;
    className?: string;
}) => {
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className={cn(
            "relative w-full group",
            className
        )}>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                className={cn(
                    "h-14 w-full px-4 pt-4 pb-1 border-2 transition-all duration-200 bg-background",
                    "placeholder:text-transparent focus:placeholder:text-muted-foreground",
                    "focus:border-highring-highlight focus:ring-2 focus:ring-highlight",
                    error && "!border-destructive !ring-destructive !focus:border-destructive !focus:ring-destructive",
                    (value !== "" || isFocus) && "border-highring-highlight ring-2 ring-highlight",
                )}
            />
            <Label
                htmlFor={id}
                className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-200 cursor-text",
                    "group-focus-within:text-xs group-focus-within:top-2 !group-focus-within:translate-0 group-focus-within:text-primary",
                    (value !== "" || isFocus) && "text-xs !top-2 !translate-0",
                    error && "!text-destructive",
                )}
            >
                {label}
            </Label>
            {error && (
                <div className="absolute -bottom-5 left-0 text-xs text-destructive">
                    This field is required
                </div>
            )}
        </div>
    );
};

export default FloatingLabelInput;