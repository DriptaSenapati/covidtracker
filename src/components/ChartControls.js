import React, { useMemo, useState } from 'react';
import { FormControl, Select, MenuItem, InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { format, sub } from "date-fns";
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import formatDate from "./../helpers/ChageDateFormat";
import Box from '@mui/material/Box';
import styled from 'styled-components';
import "./ChartControls.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@material-ui/styles';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles({
    selctionWidth: {
        width: "100%",
        flex: 0.7
    }

});

const DateValDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-transform: capitalize;
`;

const ControlerContainer = styled.div`
    width: 100%;
    margin-bottom: 30px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    position: ${props => props.pinned ? "sticky" : "unset"};
    top: 0;
    background: ${props => props.usetheme === "light" ? "#eeeeee" : "#24293b"};
    transition: all 0.4s ease;
`;

const CustomInput = styled.input`
    border-radius: 5px;
    padding: 7px;
    background: transparent;
    outline:none;
    border: 1px solid ${props => props.usetheme === "light" ? "black" : "#b8b8b8"};
    color: ${props => props.usetheme === "light" ? "black" : "#b8b8b8"};
    ${window.innerWidth <= 1000 && "max-width: 150px"}
`;

const CustomPin = styled.span`
    opacity: ${props => props.pinned ? 1 : 0.5};
    transform: ${props => props.pinned ? "rotateZ(45deg)" : "rotateZ(0deg)"};
    transition: all 0.2s ease;
    position: absolute;
    top: 10%;
    right: 5%;
    cursor:pointer;
    &:hover{
        opacity: 1
    }
`;

const DateSelector = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    flex-direction: ${window.innerWidth > 1000 ? "row" : "column"};
`;

function ChartControls({ data, controllerState, setControllerState, allState, setAllState, processedData }) {
    const states = data.States;
    const theme = useTheme();

    const [pinned, setPinned] = useState(false);
    const [open, setOpen] = useState(false);

    const themeDateRange = createTheme({
        palette: {
            mode: theme.palette.type,
        }
    })

    const themeSwitch = createTheme({
        palette: {
            secondary: {
                main: theme.palette.type === "light" ? "#3d3c3c" : "#b8b8b8",
            },
        }
    })

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(2),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            width: "100%",
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // '&:focus': {
            //     borderRadius: 4,
            //     borderColor: '#80bdff',
            //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            // },
        },
    }))(InputBase);



    const classes = useStyles();

    // window.addEventListener('scroll',function(){
    //     if(containerRef.current === undefined) return;
    //     const top = containerRef.current.getBoundingClientRect().top;
    //     console.log(top);
    //     if(top <= 0){
    //         containerRef.current.style.background = "#ffffffe6";
    //     }else{
    //         containerRef.current.style.background = "unset";
    //     }
    // })



    const [minDate, maxDate] = useMemo(() => {
        var target = Object.keys(data.Charts.daily.confirmed[0]);
        var startDate = target[2];
        var endDate = target[target.length - 1];
        return [startDate, endDate]
    }, [data.Charts.daily]);

    const prevofHighlightedDate = useMemo(() => {
        let highDate = new Date(allState.highlightDate);
        let prvDate = sub(highDate, { days: 1 });
        return format(prvDate, "MM'/'dd'/'yyyy")
    }, [allState.highlightDate]);



    return (
        <ControlerContainer usetheme={theme.palette.type} pinned={pinned}>
            <div className="dateHover" style={{ padding: "20px", textAlign: "center", position: "relative" }}>
                {format(new Date(allState.highlightDate), "do MMMM',' yyyy")}
                <Tooltip title={pinned ? "Unpin it" : "Pin it"} placement="top" arrow>
                    <CustomPin className="pinn-icon" pinned={pinned} onClick={() => setPinned(pinned ? false : true)}>
                        <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                    </CustomPin>
                </Tooltip>
                <DateValDiv className="datevalue">
                    {["confirmed", "recovered", "deceased"].map((item) => {
                        let incrementVal = processedData[item][0][allState.highlightDate] - processedData[item][0][prevofHighlightedDate]
                        return (
                            <div key={item} className={`datevalue_${item}`}>
                                <div>{item}</div>
                                <div className='datevalue_counts'>
                                    <span>{processedData[item][0][allState.highlightDate]}</span>
                                    <div>{incrementVal > 0 ? `+${incrementVal}` : incrementVal}</div>
                                </div>
                            </div>
                        )
                    })}
                </DateValDiv>
            </div>
            <div className="stateselector" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                <span style={{ flex: "0.3" }}>Select State</span>
                <FormControl className={classes.selctionWidth}>

                    <Select
                        labelId="state-select-label"
                        value={controllerState.selectedState}
                        id="state-select"
                        onChange={(e) => setControllerState({
                            ...controllerState,
                            selectedState: e.target.value
                        })}
                        input={<BootstrapInput />}
                    >
                        {states.map((item) => {
                            return (
                                <MenuItem key={item} value={item["CODE"]}>{item["CODE"] === 'TT' ? "India" : item["STATE/UT"]}</MenuItem>)
                        })}
                    </Select>

                </FormControl>
                <Tooltip title="Reset State" placement="top" arrow>
                    <span style={{ marginLeft: "20px", cursor: "pointer" }} onClick={() => controllerState.selectedState !== "TT" && setControllerState({
                        ...controllerState,
                        selectedState: "TT"
                    })}><i className="fa fa-undo" aria-hidden="true"></i></span>
                </Tooltip>


            </div>
            <DateSelector>
                <span>Date Range:</span>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ThemeProvider theme={themeDateRange}>
                        <DateRangePicker
                            value={allState.selectionDate}
                            open={window.innerWidth > 1000 ? open : null}
                            onChange={(newValue) => {
                                if (newValue[0] !== null && newValue[1] !== null) setAllState({
                                    highlightDate: formatDate(newValue[1]),
                                    selectionDate: newValue
                                })
                            }}
                            disableAutoMonthSwitching={true}
                            minDate={new Date(minDate)}
                            maxDate={new Date(maxDate)}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <CustomInput ref={startProps.inputRef} {...startProps.inputProps} usetheme={theme.palette.type} disabled = {window.innerWidth > 1000} />
                                    <Box sx={{ mx: 1 }}> to </Box>
                                    <CustomInput ref={endProps.inputRef} {...endProps.inputProps} usetheme={theme.palette.type} disabled = {window.innerWidth > 1000}/>
                                </React.Fragment>
                            )}
                        />
                    </ThemeProvider>
                </LocalizationProvider>

                {window.innerWidth > 1000 &&
                    <Tooltip title={open ? "Close Calender" : "Open Calender"} placement="top" arrow>
                        <span onClick={() => setOpen(open ? false : true)} style={{ cursor: "pointer", transform: "scale(1.2)" }}>
                            {open ? <i className="fa fa-times-circle-o" aria-hidden="true"></i> : <i className="fa fa-calendar-o" aria-hidden="true"></i>}
                        </span>
                    </Tooltip>
                }


            </DateSelector>
            <div style={{ padding: "20px" }}>
                <span style={{ marginRight: "20px" }}>Scale Mode: </span>

                <FormControlLabel
                    control={
                        <ThemeProvider theme={themeSwitch}>
                            <Switch
                                color="secondary"
                                checked={controllerState.isUniform}
                                onChange={() => setControllerState({
                                    ...controllerState,
                                    isUniform: controllerState.isUniform ? false : true
                                })}
                                size='small'
                            />
                        </ThemeProvider>

                    }
                    label="Uniform"
                />

            </div>

        </ControlerContainer >
    )
}

export default ChartControls
