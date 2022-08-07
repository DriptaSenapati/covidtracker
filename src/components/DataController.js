import React, { useState } from 'react';
import { ComponentThemes } from "./../Themes/HomeTheme";
import styled from 'styled-components';
import { animated, config, useSpring, useSprings } from 'react-spring';
import { useTheme } from '@material-ui/styles';
import { API_ENDPOINT } from "./../helpers/commonHelpers";
import { format } from "date-fns";
import { useUpdateEffect } from 'react-use';
import Tooltip from '@mui/material/Tooltip';
import MuiDate from './MuiDate';


const ModeSwitch = styled.div`
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 768px) {
        width: 50%;
    }
`;

const Animatedwords = styled.div`
    color: #f09a37;
`;

const MainControllerDiv = styled.div`
    margin: auto;
    margin-bottom: 20px;
    text-align: center;
    width: 90%;
    height: ${(props) => props.isOpen ? "100px" : "20px"};
    overflow: hidden;
    transition: all 0.2s ease;
`;

const ControllerDiv = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

function DataController({ data, updateData, loadingRef }) {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    // const minmaxDate = {
    //     minDate: data.data.dates.firstDate,
    //     maxDate: data.data.dates.lastDate
    // }

    const [minmaxDate, setMinMaxDate] = useState({
        minDate: data.data.dates.firstDate,
        maxDate: data.data.dates.lastDate
    })


    const [formData, setFormData] = useState({
        "mode": data.mode === "cum" ? true : false,
        "onDateData": new Date(data.data.UpdatedTill)
    })
    //const [mode, setMode] = useState("Cumulative");
    const words = ["Cumulative", "Daily"];
    const { scroll } = useSpring({
        scroll: formData.mode ? 0 : 20,
        from: { scroll: 0 },
        delay: 200,
        config: config.default
    })

    // const spring = useSpring(
    //     { to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 100 }, delay: 200, config: config.slow }
    // )


    useUpdateEffect(() => {
        var mode = formData.mode ? "cum" : "daily";
        updateData({
            ...data,
            mode: mode
        })
    }, [formData.mode])

    useUpdateEffect(async () => {
        loadingRef.current.continuousStart();

        var filename = format(formData.onDateData, "MM'-'dd'-'yyyy");
        if (formData.onDateData.getTime() === new Date(minmaxDate.maxDate).getTime()) {
            console.log("Yes");
            filename = "current"
        }

        let resData = await fetch(`${API_ENDPOINT}india_${filename}.json`);
        let parsedData = await resData.json();
        loadingRef.current.complete();
        updateData({
            ...data,
            data: parsedData
        })
        // eslint-disable-next-line
    }, [formData.onDateData])


    return (
        <MainControllerDiv isOpen={isOpen}>
            <ControllerDiv>
                <ModeSwitch>
                    <div style={{ color: "#636060" }}>Mode:</div>
                    <Tooltip title="Click to change" placement="top" arrow>
                        <animated.div
                            style={{
                                position: 'relative',
                                height: "20px",
                                width: "fit-content",
                                overflow: 'hidden',
                                background: "rgba(255, 166, 64, 0.5)",
                                borderRadius: "9px"
                            }}
                            scrollTop={scroll}>
                            {words.map((word, i) => (
                                <Animatedwords
                                    key={`${word}_${i}`}
                                    style={{ height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <span style={{
                                        cursor: "pointer",
                                        padding: "1px 5px"
                                    }}
                                        onClick={() => setFormData({
                                            ...formData,
                                            mode: formData.mode ? false : true
                                        })}
                                    >{word}</span>
                                </Animatedwords>
                            ))}
                        </animated.div>
                    </Tooltip>

                </ModeSwitch>
                <Tooltip title="History" placement="top" arrow>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "30px",
                        height: "20px",
                        cursor: "pointer",
                        color: "#636060",
                        transform: isOpen ? "rotateZ(-180deg)" : "rotateZ(0deg)",
                        transition: "all 0.2s ease"
                    }} onClick={() => setIsOpen(isOpen ? false : true)}>
                        <i className="fa fa-history" aria-hidden="true"></i>
                    </div>
                </Tooltip>


            </ControllerDiv>

            <div className="history" style={{ marginTop: "20px" }}>
                <MuiDate label="On Date" defaultDate={formData.onDateData}
                    maxDate={minmaxDate.maxDate} minDate={minmaxDate.minDate}
                    callbackChange={setFormData}
                    disabled={false}
                    value="onDateData"
                    formData={formData}
                />
            </div>
        </MainControllerDiv >

    )
}

export default DataController;
