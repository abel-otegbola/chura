import { useState } from "react";
import type { Permission } from "../../interfaces";
import Checkbox from "../checkbox/checkbox";
import { useOutsideClick } from "../../customHooks/useOutsideClick";

interface GroupDropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value?: number[] | string[];
    onChange: (value: (string | number)[]) => void;
    error?: string | undefined;
    options?: Permission[];
    placeholder?: string
    variant?: "outlined" | "filled" | "standard"
}

export default function GroupDropdown({
    className,
    disabled,
    label,
    name,
    options,
    value,
    onChange,
    error,
    variant = "outlined"
}: GroupDropdownProps) {
    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState("")

    // Tailwind classes for each variant
    const variantClasses = {
        outlined: "border border-primary/[0.12] bg-transparent rounded-[10px]",
        filled: "filled bg-[#F8F8F8] rounded h-[29px]",
        standard: "border-b border-gray-300 bg-transparent rounded-none"
    };

    const dropDownRef = useOutsideClick(setFocus, false)

    return (
        <div className={`relative flex flex-col ${className}`}>
            <div className="flex justify-between gap-4">
                {label ? (
                    <label
                        htmlFor={name}
                        className={`text-[12px] ${focus ? "text-primary" : ""}`}
                    >
                        {label}
                    </label>
                ) : (
                    ""
                )}
            </div>

            <div
                ref={dropDownRef}
                className={`flex items-center relative w-full pl-1 duration-500 z-[1] 
                    ${variantClasses[variant]}
                    ${error && !focus ? "border-red-500 text-red-500" : ""}
                    ${focus ? "border-primary dark:border-primary shadow-input-active" : ""}
                    ${className}
                `}
            >
                    <input type="text" 
                        className="w-full h-full outline-none"
                        onFocus={() => setFocus(true)}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                <div
                    className={`absolute bottom-[120%] rounded-[10px] p-2 w-[400px] outline-none bg-white shadow-lg cursor-pointer duration-300
                        ${disabled ? "opacity-[0.25]" : ""}
                        ${focus ? "h-[310px] opacity-[1]" : "h-[0px] opacity-[0]"}
                    `}
                    id={name}
                >
                    <div className="overflow-y-auto h-full w-full">
                        
                    {
                        options?.map(group => (
                            <div key={group.group}  className="flex flex-col py-2 gap-1 w-full">
                                <h1 className="flex items-center gap-1 my-[2px] font-semibold">
                                    <Checkbox id={group.group} value={""}
                                        check={group.permissions.every(permission => 
                                            Array.isArray(value) ? (value as number[]).includes(permission.id) : false
                                        )} 
                                        onCheck={(checked) => {
                                            if (checked) {
                                            // Add all permissions in this group
                                            const permissionIds = group.permissions.map(p => p.id);
                                            const newValue = Array.from(new Set([
                                                ...(Array.isArray(value) ? value : []), 
                                                ...permissionIds
                                            ]));
                                            onChange(newValue);
                                            } else {
                                            // Remove all permissions in this group
                                            const permissionIds = new Set(group.permissions.map(p => p.id));
                                            const newValue = Array.isArray(value) 
                                                ? value.filter(id => !permissionIds.has(+id))
                                                : [];
                                            onChange(newValue);
                                            }
                                        }} />
                                    <label htmlFor={group.group}></label>{group.group}
                                </h1>
                                {
                                    group.permissions.filter(item => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1).map(permission => (
                                        <div key={permission.id} className="flex items-center gap-2 my-[2px]">
                                            <Checkbox id={permission.name} value={""} check={(value as number[])?.includes(permission.id)} onCheck={(value) => value ? onChange([permission.id]) : {}} />
                                            <label htmlFor={permission.name}>{permission.name}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    </div>
                </div>

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