import { Eye, EyeClosed, type IconProps } from "@solar-icons/react";
import { useState, type InputHTMLAttributes, type ReactElement } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | undefined;
    variant?: 'default' | 'secondary';
    ref?: React.RefObject<HTMLInputElement | null>
    lefticon?: ReactElement<IconProps>
}

export default function Input({ onChange, error, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)
    const [show, setShow] = useState(false)

    const variants = {
        default: 'border border-gray-500/[0.3] rounded-[10px]',
        secondary: 'border border-transparent border-b-[#DBDBDB] rounded'
    }
    
    return (
        <div className="flex flex-col w-full gap-[2px]">

            <div className={`flex items-center px-[12px] py-[12px] gap-2 relative w-full duration-500 
                ${error && !focus ? "border border-red-500 text-red-500 " : ""}
                ${focus ? "border border-secondary dark:border-secondary" : ""}
                ${props.className}
                ${variants[props.variant || 'default']}
            `}>
            { props.label ? <label htmlFor={props.name} className={`absolute left-[28px] dark:bg-[#101010] bg-white p-[2px] px-2 font-light duration-500 ${focus ? "text-secondary -top-[11px] text-[11px]" : props.value !== "" ? "-top-[11px] text-[11px] text-gray-500" : "text-gray-500 top-[10px] text-[14px]"}`}>{props.label}</label> : "" }
            { props.lefticon ? <span className={`${focus ? "text-secondary" : props.value !== "" ? "text-secondary" : "text-gray-500"}`}>{props.lefticon}</span>: "" }
                <input 
                    className={`w-full outline-none bg-transparent text-[14px]
                        ${props.className} 
                        ${props.disabled ? "opacity-[0.25]" : ""}
                    `}
                    id={props.name}
                    type={props.type === "password" && show ? "text" : props.type}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                />

                { props.type === "password" ? 
                    <button 
                        tabIndex={1} 
                        className="absolute right-2 top-[8px] px-2 p-2 cursor-pointer" 
                        title="toggle show password" 
                        aria-checked={show} 
                        onClick={(e) => {setShow(!show); e.preventDefault()}}
                    >
                        { show ? <Eye size={16} /> : <EyeClosed size={16} /> }
                    </button>
                : "" }
            </div>
            { error && !focus ? <p className="text-[11px] text-red-500">{error}</p> : "" }
        </div>
    )
}