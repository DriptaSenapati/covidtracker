import React from 'react';
import styled  from 'styled-components';
import SwitchToggle from './SwitchToggle';
//import { useTheme } from 'styled-components';
import { useTheme } from '@material-ui/styles';


const Div = styled.div`
    color: ${props => props.theme.palette.type === "light"? "#161625" : "white"};
    height: 10vh;
    background-color: ${props => props.theme.palette.type === "light"? "white" : "#161625"};
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    box-shadow: -4px 10px 33px -10px rgba(4,63,117,0.75);
    -webkit-box-shadow: -4px 10px 33px -10px rgba(4,63,117,0.75);
    -moz-box-shadow: -4px 10px 33px -10px rgba(4,63,117,0.75);
    position: relative;

    @media (max-width: 768px) {
        justify-content: left;
        padding-left: 20px;
    }
`;




export default function Navbar(props) {
    const theme = useTheme()

    const getTheme = (theme) => {
        props.callback(theme);
    }
    return (
        <>
        <Div theme = {theme}>
            Covid19<span style = {{color: "chocolate"}}>India</span>
            <SwitchToggle toggle = {getTheme}/>
        </Div>
        
        </>
    )
}
