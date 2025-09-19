
import { useState, type TextareaHTMLAttributes,  } from "react";

interface inputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value?: string | number;
    error?: string | undefined;
    placeholder?: string;
}

export default function Textarea({ className, disabled, label, name, value, onChange, placeholder, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)

    return (
        <div className="flex flex-col w-full gap-1">
            { label ? <label htmlFor={name} className={` ${focus ? "text-primary" : ""}`}>{label}</label> : "" }

                <textarea 
                    className={`py-2 p-1 w-full outline-none bg-transparent h-[100px]
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                ></textarea>
        </div>
    )
}