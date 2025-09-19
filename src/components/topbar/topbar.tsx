import { Bell } from "@solar-icons/react";
import SearchInput from "../../components/search/searchInput";
import { Link } from "react-router-dom";
import ThemeSelector from "../themeSelector/themeSelector";

function Topbar({ heading, subText }: { heading: string, subText: string }) {

    return (
        <div className="md:flex hidden justify-between items-center w-full md:pl-2 pl-4 md:py-6 py-4 md:pr-4 pr-18 z-[3]">
            <div className="flex flex-col gap-1">
                <h1 className="2xl:text-[20px] 2xl:text-[18px] text-[16px] font-semibold">{heading}</h1> 
                <p className="2xl:text-[14px] 2xl:text-[12px] text-[12px] text-gray-500 font-light">{subText}</p>
            </div>
            <div className="flex items-center gap-4">
                <SearchInput placeholder="Search" className="sm:flex hidden md:hidden lg:flex" />
                <Link to={"/account/notifications"} className="p-[12px] rounded-[10px] bg-[#A2A1A81A] hover:bg-gray-500/[0.06]">
                    <Bell size={20} color="currentColor" weight="Outline" />
                </Link>
                {/* <UserMenu /> */}
                <button className="p-[12px] flex items-center justify-center rounded-[10px] bg-[#A2A1A81A] hover:bg-gray-500/[0.06]">
                    <ThemeSelector />
                </button>
            </div>
        </div>
    )
}

export default Topbar
