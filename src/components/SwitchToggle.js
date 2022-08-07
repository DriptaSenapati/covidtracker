import React from 'react';
import "./SwitchTogglerCSS.css";
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@material-ui/styles';



export default function SwitchToggle(props) {
    const theme = useTheme()

    const toggle = () => {
        props.toggle(theme.palette.type === "light" ? { mode: "dark" } : { mode: "light" })
    }
    return (
        <div className="SwitchContainer">
            <label className="switch">
                <input type="checkbox" onChange={toggle} checked={theme.palette.type === "light" ? false : true}/>
                <Tooltip title={theme.palette.type === "light" ? "Dark Mode" : "Light Mode"} disableInteractive>
                    <span className="slider round" data-icon={theme.palette.type === "light" ? "\uf186" : "\uf185"}
                        style={{ color: theme.palette.type === "light" ? "black" : "#e69d00" }}></span>
                </Tooltip>

            </label>
        </div>

    )
}
