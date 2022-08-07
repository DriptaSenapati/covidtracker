import { createGlobalStyle } from 'styled-components';

let localTheme = window.localStorage.getItem("Theme");
 
const GlobalStyle = createGlobalStyle`
::-webkit-scrollbar {
    width: 7px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme === "light" ? "#b3b3b3" : "#7d8fba"};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme === "light" ? "white" : "#141431"};
  }
`;
 
export default GlobalStyle;