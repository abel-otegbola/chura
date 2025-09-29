import { DeviceTabletSpeakerIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState, type ReactElement } from "react";

interface Theme {
    id: string | number, img: ReactElement, title: string
}

type Themes = Array<Theme>


function ThemeSelector() {
    const [theme, setTheme] = useState("")

    const themes: Themes = [
        { id: 0, img: <DeviceTabletSpeakerIcon size={20} />, title: "System" },
        { id: 1, img: <SunIcon size={20} />, title: "light" },
        { id: 2, img: <MoonIcon  size={20}/>, title: "dark" },
    ]
    useEffect(() => {
        if(theme === 'light') {
            // Whenever the user explicitly chooses light mode
            localStorage.theme = 'light'
        }
        else if(theme === 'dark') {
            // Whenever the user explicitly chooses dark mode
            localStorage.theme = 'dark'
        }  
        else {
            // Whenever the user explicitly chooses to respect the OS preference
            localStorage.removeItem('theme')
        }  
    }, [theme])
    
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return (
        <div className="flex items-center gap-1 dark:bg-gray-500/[0.1] bg-gray-500/[0.03] p-1 rounded-[8px]">
        {
            themes.map(item => (
                <button 
                    key={item.id} 
                    onClick={() => setTheme(item.title)} 
                    className={`p-2 dark:bg-gray-500/[0.05] bg-gray-500/[0.03] rounded relative text-[20px] ${item.title === theme ? "text-secondary" : "text-gray-500"}`} 
                    aria-label={"Theme setting changed to "+ theme} 
                >                      
            
                    <span >{item.img}</span>
                        
                </button>
            ))
        }
        </div>
        
    )
}

export default ThemeSelector;