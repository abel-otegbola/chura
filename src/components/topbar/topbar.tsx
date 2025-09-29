import SearchInput from "../../components/search/searchInput";
import ThemeSelector from "../themeSelector/themeSelector";

function Topbar({ heading, subText }: { heading: string, subText: string }) {

    return (
        <div className="flex justify-between items-center w-full md:pl-2 pl-4 md:py-6 py-4 md:pr-4 pr-18 z-[3]">
            <div className="flex flex-col gap-1">
                <h1 className="2xl:text-[20px] 2xl:text-[18px] text-[16px] font-semibold">{heading}</h1> 
                <p className="2xl:text-[14px] 2xl:text-[12px] text-[12px] text-gray-500 font-light">{subText}</p>
            </div>
            <div className="flex items-center gap-4">
                <SearchInput placeholder="Search" className="sm:flex hidden md:hidden lg:flex" />
                {/* <UserMenu /> */}
                <ThemeSelector />
            </div>
        </div>
    )
}

export default Topbar
