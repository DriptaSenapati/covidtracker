import React, { useState } from 'react';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { DatePickerComponent } from "./../Themes/DatePickersTheme";
import { useTheme } from '@material-ui/styles';

function DatePickers({ label }) {
    const [selectedDate, handleDateChange] = useState(null);
    const theme = useTheme()

    const themedate = createTheme({
        overrides: {
            MuiInputLabel: {
                root: {
                    color: DatePickerComponent.Date[theme.palette.type].inputText
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
            type: theme.palette.type === "light"? "light" : "dark",
            primary: {
                main: "#d48b3f"
            },
            secondary: {
                main: "#d48b3f"
            }
        }
    })


    return (
        <div>
            <ThemeProvider theme={themedate}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        value={selectedDate}
                        label={label}
                        variant="inline"
                        onChange={date => handleDateChange(date)}
                        format="yyyy/MM/dd"
                    />
                </MuiPickersUtilsProvider>
            </ThemeProvider>

        </div>
    )
}

export default DatePickers;
