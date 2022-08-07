import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DesktopDatePicker';
// import { ThemeProvider } from "@material-ui/styles";
import { DatePickerComponent } from "./../Themes/DatePickersTheme";
import { useTheme } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';



const CustomInput = styled.input`
    border-radius: 5px;
    padding: 7px;
    background: transparent;
    outline:none;
    border: 1px solid ${props => props.usetheme === "light" ? "black" : "#b8b8b8"};
    color: ${props => props.usetheme === "light" ? "black" : "#b8b8b8"};
`;

function MuiDate({ label, defaultDate, maxDate, minDate, disabled, callbackChange, value, formData }) {
    const theme = useTheme()
    //const [value, setValue] = React.useState(new Date(defaultDate));

    const handleChange = (newValue) => {
        callbackChange({
            ...formData,
            [value]: newValue
        });
    };

    const themedate = createTheme({
        overrides: {
            MuiInputLabel: {
                root: {
                    color: `${DatePickerComponent.Date[theme.palette.type].inputText} !important`
                }
            },
            MuiInputBase: {
                root: {
                    color: DatePickerComponent.Date[theme.palette.type].inputText
                },
                input: {
                    color: DatePickerComponent.Date[theme.palette.type].inputText
                }
            }

        },
        palette: {
            mode: theme.palette.type === "light" ? "light" : "dark",
            primary: {
                main: "#f09a37",
            },
            secondary: {
                main: "#d48b3f"
            }
        }
    })


    return (
            <ThemeProvider theme={themedate}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={label}
                        inputFormat="MM/dd/yyyy"
                        value={defaultDate}
                        onChange={handleChange}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <CustomInput ref={inputRef} {...inputProps} usetheme={theme.palette.type} disabled/>
                                {InputProps?.endAdornment}
                            </div>
                        )}
                        disabled={disabled}
                        maxDate={new Date(maxDate)}
                        minDate={new Date(minDate)}
                        disableCloseOnSelect={false}
                        clearable={false}
                        desktopModeMediaQuery='@media (pointer: fine)'
                    />
                </LocalizationProvider>
            </ThemeProvider>
    )
}

export default MuiDate;
