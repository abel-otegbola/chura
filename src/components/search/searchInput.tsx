import { useState, type InputHTMLAttributes } from "react";
import SearchIcon from "../../assets/icons/search";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    type?: string;
    value?: string | number;
    error?: string | undefined;
    placeholder?: string;
}

export default function SearchInput({ className, disabled, name, value, onChange, error, placeholder, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)
    
    return (
        <div>

            <div className={`flex items-center px-[13px] py-[10px] gap-2 relative rounded-[8px] lg:w-[287px] w-full border duration-500 
                ${error && !focus ? "border-red-500 text-red-500 " : "border-[#A2A1A81A]"}
                ${focus ? "border-primary dark:border-primary" : ""}
                ${className}
            `}>
                <SearchIcon color="#808080"/>
                <input 
                    className={`w-full outline-none bg-transparent 2xl:text-[13px] text-[11px] py-0 placeholder:text-gray-500 
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    id={name}
                    disabled={disabled}
                    type="search"
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                />
            </div>
            { error && !focus ? <p className="text-[11px] text-red-500">{error}</p> : "" }
        </div>
    )
}