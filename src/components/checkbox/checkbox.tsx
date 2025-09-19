import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import CheckIcon from "../../assets/icons/check";

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    error?: string | undefined;
    size?: number | undefined;
    onCheck: (aug0: boolean) => void;
    check?: boolean
}

export default function Checkbox({ className, disabled, label, check, onCheck, name, size, ...props }: CheckboxProps) {
    const [focus, setFocus] = useState(false)
    const [checked, setChecked] = useState(false)

    const handleChecked = () => {
        onCheck(!checked)
        setChecked(!checked); setFocus(true)
    }

    useEffect(() => {
        setChecked(check || false)
    }, [check])

    return (
        <div className="flex items-center w-fit gap-1">
            <button 
                className={` rounded border flex justify-center items-center
                    ${disabled ? "opacity-[0.25]" : ""} 
                    ${check ? "text-white border-none bg-secondary" : "border-gray-500/[0.4]"} 
                    ${focus ? "outline outline-primary/[0.2] outline-offset" : ""} 
                    ${className} 
                `}
                style={{ height: size || "20px", width: size || "20px" }}
                onClick={(e) => { handleChecked(); e.preventDefault() }}
                onBlur={() => setFocus(false)}
                {...props}
            >
                {check ? <CheckIcon width={size || 20} color="#00FF70" /> : ""}
            </button>

            { label ? <label htmlFor={name} >{label}</label> : "" }
        </div>
    )
}