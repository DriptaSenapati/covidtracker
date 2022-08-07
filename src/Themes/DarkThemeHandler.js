import { useState,useEffect } from "react";


export function DarkThemeHandler(){
    const [theme, setTheme] = useState({
        mode: 'light'
    });


    const setThemeHandler = (theme) => {
        window.localStorage.setItem('Theme',theme.mode);
        setTheme(theme);
    }

    useEffect(() => {
        let localTheme = window.localStorage.getItem("Theme");
        var t = localTheme ? {mode: localTheme} : theme;
        setThemeHandler(t)
        // eslint-disable-next-line
    }, [])

    return [ theme,setThemeHandler ];
}