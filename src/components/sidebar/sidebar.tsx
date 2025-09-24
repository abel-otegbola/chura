import { useState, type ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../assets/icons/logo";
import { useOutsideClick } from "../../customHooks/useOutsideClick";
import { HamburgerMenu, Home, SmartHome, type IconProps } from "@solar-icons/react";
import { RobotIcon, type Icon } from "@phosphor-icons/react";
import CloseIcon from "../../assets/icons/close";

export interface Link {
    id: number; label: string; icon: ReactElement<IconProps | Icon>, link: string, subtext?: string
}

function Sidebar() {
    const [open, setOpen] = useState(false)
    const pathname = useLocation().pathname;

    const generalLinks: Link[] = [
        { id: 0, label: "Overview", icon: <Home size={20}/>, link: "/account/overview" },
        { id: 1, label: "Predictor", icon: <RobotIcon size={20}/>, link: "/account/predictor" },
        { id: 1, label: "Storage", icon: <SmartHome size={20}/>, link: "/account/storage" },
    ]
    const modalRef = useOutsideClick(setOpen, false)

    return (
        <div ref={modalRef} className="md:sticky top-0 left-0 h-screen md:w-[280px] w-0 md:p-4">
            <button className="md:hidden fixed top-[16px] rounded w-[44px] h-[44px] flex items-center p-2 justify-center dark:bg-[#151515] right-4 md:p-2 z-[10] cursor-pointer" onClick={() => setOpen(!open)}>
                {!open ? <HamburgerMenu size={20} color="currentColor" /> : <CloseIcon color="currentColor" />}
            </button>
            <div className={`flex flex-col md:w-full w-[280px] md:h-full h-[100vh] md:rounded-[20px] md:sticky dark:bg-[#151515] bg-gray-500/[0.09] fixed md:top-0 top-0 py-4 px-4 right-0 overflow-y-auto overflow-x-hidden z-[5] transition-all duration-700 ${open ? "translate-x-[0px] opacity-[1]": "translate-x-[400px] md:translate-x-[0px] md:opacity-[1] opacity-[0]"}`}>  
                <h1 className="flex items-center mb-10">
                    <LogoIcon className="text-primary" width={70} />
                </h1>
                <div className="flex flex-col gap-1">
                    {
                    generalLinks.map(link => {
                            return (
                            <Link key={link.id} onClick={() => setOpen(false)} to={ link.link} className={`relative flex items-center justify-between px-4 py-1 md:rounded-[10px] duration-300 font-medium ${pathname.includes(link.link) ? "bg-primary/[0.12]" : " hover:bg-gray-500/[0.06] over:dark:bg-gray-500/[0.09]"}`}>
                                <div className="flex items-center gap-2">
                                    <span className="w-[30px] text-lg opacity-[0.6]">{link.icon}</span>
                                    <span className="flex-1 py-2 break-normal">{link.label} </span>
                                </div>
                                { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                            </Link>
                            )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar
