import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import Charts from './Charts';
import { chartDataFormat } from './../helpers/ChartHelpers';
import { animated, config, useSpring } from 'react-spring';
import { ChartTheme } from "./../Themes/ChartTheme";
import { getUniformScale } from "./../helpers/ChartHelpers"
import formatDate from "./../helpers/ChageDateFormat"
import MiniMap from './MiniMap';
import { sub, add } from "date-fns";
import ChartControls from './ChartControls';
import { API_ENDPOINT } from "./../helpers/commonHelpers";
import Spinner from './Spinner';



const Div = styled(animated.div)`
    width: 100%;
    margin-top: 50px;
`;

function ChartExplorer({ data }) {

    // const [highlightDate, sethighlightDate] = useState("");

    const [chartData, setChartData] = useState({
        isLoaded: false,
        cData: ""
    });

    const [allState, setAllState] = useState({
        "selectionDate": [sub(new Date(data.data.UpdatedTill), { days: 30 }), new Date(data.data.UpdatedTill)],
        "highlightDate": data.data.UpdatedTill
    });

    const [controllerState, setControllerState] = useState({
        selectedState: 'TT',
        isUniform: true
    })


    const spring = useSpring(
        { to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 100 }, delay: 1000, config: config.slow }
    )

    // var defaultDates = data.data.mode === "cum" ? data.data.Charts.cum['confirmed'][1] : data.data.Charts.daily['confirmed'][1];

    useEffect(() => {
        const fetchChartsData = async () => {
            const url = `${API_ENDPOINT}states.json`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setChartData({
                isLoaded: true,
                cData: parsedData
            })
        }
        fetchChartsData();
    }, []);


    const getDates = useMemo(() => {

        // let startIx = defaultDates.indexOf(formatDate(allState.selectionDate[0]))
        // let endIx = defaultDates.indexOf(formatDate(allState.selectionDate[1]))

        // let diffdays = differenceInDays(allState.selectionDate[1],allState.selectionDate[0]);
        var res_dates = []

        // for (var i = 0;i <= diffdays; i++){
        //     let evalDate = add(allState.selectionDate[0],{days: i});
        //     res_dates.push(formatDate(evalDate))
        // }
        let currDate = formatDate(allState.selectionDate[0]);
        let i = 0;
        while (currDate !== formatDate(allState.selectionDate[1])) {
            let evalDate = add(allState.selectionDate[0], { days: i });
            res_dates.push(formatDate(evalDate));
            currDate = formatDate(evalDate);
            i = i + 1;
        }

        return res_dates
    }, [allState])


    const processedData = useMemo(() => {
        if (chartData.isLoaded) {
            var t_data = {
                minimap: {},
                charts: {}
            }
            var mData = chartData.cData["Charts"][data.mode];
            ["confirmed", "recovered", "deceased"].forEach((item) => {
                t_data.charts[item] = chartDataFormat(controllerState.selectedState, mData[item], getDates);
                t_data.minimap[item] = chartDataFormat(controllerState.selectedState, mData[item]);
            })
            return t_data;
        }

    }, [controllerState.selectedState, data.mode, getDates, chartData])







    useEffect(() => {
        var newState = [sub(new Date(data.data.UpdatedTill), { days: 30 }), new Date(data.data.UpdatedTill)]
        setAllState((prvstate) => prvstate.selectionDate !== newState.selectionDate && {
            "selectionDate": newState,
            "highlightDate": data.data.UpdatedTill
        })

    }, [data.data.UpdatedTill])

    if (!chartData.isLoaded) return (<Spinner />);

    return (
        <Div style={spring}>
            <ChartControls data={chartData.cData} controllerState={controllerState}
                setControllerState={setControllerState}
                allState={allState}
                setAllState={setAllState}
                processedData={processedData.minimap}
            />

            <MiniMap
                data={processedData.minimap["confirmed"][0]}
                dates={processedData.minimap["confirmed"][1]}
                colorTheme={ChartTheme["confirmed"]}
                stateVal={allState}
                updateStateVal={setAllState}
            />
            {["confirmed", "recovered", "deceased"].map((item) => {
                return <Charts data={processedData.minimap[item][0]} dates={getDates}
                    key={item} colorTheme={ChartTheme[item]} stateVal={allState} updateStateVal={setAllState}
                    dataMinMax={controllerState.isUniform ? getUniformScale(chartData.cData["Charts"][data.mode], controllerState.selectedState, getDates) : undefined}
                />
            })}
        </Div>
    )
}

export default ChartExplorer
