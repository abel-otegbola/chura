import { DeviceTabletSpeakerIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState, type ReactElement } from "react";

interface Theme {
    id: string | number, img: ReactElement, title: string
}

type Themes = Array<Theme>


function ThemeSelector() {
    const [theme, setTheme] = useState("")

    const themes: Themes = [
        { id: 0, img: <DeviceTabletSpeakerIcon />, title: "System" },
        { id: 1, img: <SunIcon />, title: "light" },
        { id: 2, img: <MoonIcon />, title: "dark" },
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
        <button onClick={() => setTheme(theme === "System" ? "light" : theme === "light" ? "dark" : "System" )}  >                      
            {
            themes.map(item => {
                return (
                    <span key={item.id} className={`relative text-[20px] ${item.title === theme ? "block" : "hidden"}`} aria-label={"Theme setting changed to "+ theme} >{item.img}</span>
                )
            })}
        </button>
    )
}

export default ThemeSelector;