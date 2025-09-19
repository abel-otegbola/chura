import type { Icon } from "@phosphor-icons/react";
import type { IconProps } from "@solar-icons/react";
import { useState, type ReactElement } from "react";

interface dropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string | undefined;
    options?: (string | number)[];
    placeholder?: string
    variant?: "outlined" | "filled" | "standard",
    lefticon?: ReactElement<Icon | IconProps>
}

export default function Dropdown({
    className,
    disabled,
    label,
    name,
    options,
    value,
    onChange,
    error,
    variant = "outlined",
    lefticon
}: dropdownProps) {
    const [focus, setFocus] = useState(false);

    // Tailwind classes for each variant
    const variantClasses = {
        outlined: "border border-gray-500/[0.3] bg-transparent rounded-[10px]",
        filled: "filled bg-[#F8F8F8] rounded h-[29px]",
        standard: "border-b border-gray-300 bg-transparent rounded-none"
    };

    return (
        <div className={`relative flex flex-col ${className}`}>
            <div className="flex justify-between gap-4 mb-2">
                {label ? (
                    <label
                        htmlFor={name}
                        className={`font-bold text-[12px]`}
                    >
                        {label}
                    </label>
                ) : (
                    ""
                )}
            </div>

            <div
                className={`flex items-center relative w-full duration-500 z-[1] p-[10px]
                    ${variantClasses[variant]}
                    ${error && !focus ? "border-red-500 text-red-500" : ""}
                    ${focus ? "border-secondary dark:border-secondary shadow-input-active" : ""}
                    ${className}
                `}
            >
            { lefticon ? <span className={`${focus ? "text-secondary" : value !== "--select--" ? "text-secondary" : "text-gray-500"}`}>{lefticon}</span>: "" }
                <select
                    className={`p-1 w-[96%] outline-none bg-transparent cursor-pointer
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    value={value}
                    id={name}
                    onClick={() => setFocus(!focus)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    disabled={disabled}
                >
                    {options?.map((option) => (
                        <option
                            className="flex gap-2 items-center dark:bg-[#101010]"
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}
                </select>

                {error && !focus ? (
                    <p className="absolute right-2 px-2 text-[12px] bg-white dark:bg-black text-red-500 backdrop-blur-sm">
                        {error}
                    </p>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}