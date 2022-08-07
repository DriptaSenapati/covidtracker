import React from 'react'
import styled from 'styled-components';
import { animated, config, useSpring } from 'react-spring';
import "./Maptools.css";
import { MapTheme } from './../Themes/ComponentThemes';
import Tooltip from '@material-ui/core/Tooltip';


const Div = styled(animated.div)`
    margin: 50px 0px 0px 20px;
    min-height: 70px;
    color: ${props => props.id === "confirmed" ? "rgb(255 86 74)" : props.id === "recovered" ? "rgb(139, 255, 62)" : "rgb(112, 110, 110)"};
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
`;

const CustomSVG = styled.svg`
    & *{
        stroke: ${props => MapTheme.colors[props.caseState][0]};
        stroke-width: 20;
    }
`;

const Districtswitch = styled.div`
    width:40px;
    height:40px;
    display: flex;
    justify-content:center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    background: ${props => props.districtView ? MapTheme.colors[props.caseState][1] : "rgba(163, 163, 163,0.1)"};


    &:hover {
        background: ${props => MapTheme.colors[props.caseState][1]};
    }
`;

const Percentswitch = styled.div`
    width:40px;
    height:40px;
    display: flex;
    justify-content:center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    background: ${props => props.ratioview ? MapTheme.colors[props.caseState][1] : "rgba(163, 163, 163,0.1)"};


    &:hover {
        background: ${props => MapTheme.colors[props.caseState][1]};
    }
`;

const Mapmode = styled.div`
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;

    & div {
        margin-right: 5px;
    }
`;

export default function MapTools({ caseState, hoverInfo, dashData, districtView,
    setDistrictView, ratioview, setRatioview }) {

    const spring = useSpring(
        { to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 100 }, delay: 500, config: config.slow }
    )

    // const getNameValue = (hoverInfo,dashData) => {

    // }

    const { number } = useSpring({
        from: { number: hoverInfo === "" ? dashData.Response[caseState].COUNT / 2 : hoverInfo.value / 2 },
        number: hoverInfo === "" ? dashData.Response[caseState].COUNT : hoverInfo.value,
        delay: 100,
        config: {
            duration: 100
        }
    })

    // const getInc = (inc) => {
    //     return inc > 0 ? `+${inc}` : inc;
    // }

    const letter = " " + caseState;
    console.log(caseState);

    return (
        <Div id={caseState} style={spring}>
            <div className="hoverdiv">
                <div className="name">
                    {hoverInfo === "" ? "India" : hoverInfo.name}
                </div>
                <p style={{textTransform: "capitalize"}}>{letter}</p>
                <animated.div className="nameValue">
                    {number.to(n => n.toFixed(0))}
                </animated.div>
                <span style={hoverInfo === "" ? { fontSize: "14px",opacity: 0 } : { fontSize: "14px",opacity: 1 }}>
                    {hoverInfo !== "" ? hoverInfo.Inc > 0 ? `+${hoverInfo.Inc}` : hoverInfo.Inc : "None"}
                </span>
            </div>
            <Mapmode>
                <Tooltip title={districtView ? "Off District View" : "On District View"} placement="top" arrow>
                <Districtswitch districtView={districtView} onClick={() => setDistrictView(!districtView)} caseState={caseState}>
                    <CustomSVG xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 414 531" caseState={caseState}>
                        <path id="side1" fill="none" stroke="#000" stroke-width="4.68px" fill-rule='evenodd'
                            d="M304,451l-0.192-277.221,27.12-1.235c5.392-.246,9.825,12.695,9.9,28.9l0.8,169.569C341.866,421.443,317.762,439.519,304,451Z" />
                        <path id="side1_copy" data-name="side1 copy" class="cls-1" fill="none" stroke="#000" stroke-width="4.68px" fill-rule='evenodd'
                            d="M100,451l0.192-277.221-27.12-1.235c-5.392-.246-9.825,12.695-9.9,28.9l-0.8,169.569C62.134,421.443,86.238,439.519,100,451Z" />
                        <path class="cls-1" fill="none" stroke="#000" stroke-width="4.68px" fill-rule='evenodd' d="M116.653,73.784H281.62c10.353,0,18.865,10.952,19.012,24.462l3.755,345.733c0.147,13.51-8.127,24.463-18.481,24.463,0,0-24.809,1.785-38.919-16.309-11.31-14.5-26.956-30.985-44.078-30.985-12.455,0-32.848,12.367-43.422,29.355-13.99,22.475-38.547,17.939-38.547,17.939-10.354,0-18.866-10.953-19.012-24.463L98.172,98.246C98.026,84.736,106.3,73.784,116.653,73.784Z" />
                        <circle cx="139.922" cy="171.219" r="9.578" />
                        <path id="Ellipse_1_copy" data-name="Ellipse 1 copy" fill-rule='evenodd' d="M243.417,161.609a9.62,9.62,0,1,1-9.584,9.619A9.6,9.6,0,0,1,243.417,161.609Z" />
                        <circle id="Ellipse_1_copy_2" data-name="Ellipse 1 copy 2" cx="139.922" cy="236.641" r="9.578" />
                        <path id="Ellipse_1_copy_2-2" data-name="Ellipse 1 copy 2" fill-rule='evenodd' d="M243.417,227.022a9.62,9.62,0,1,1-9.584,9.619A9.6,9.6,0,0,1,243.417,227.022Z" />
                        <circle id="Ellipse_1_copy_3" data-name="Ellipse 1 copy 3" cx="143.75" cy="302.063" r="9.594" />
                        <circle id="Ellipse_1_copy_3-2" data-name="Ellipse 1 copy 3" cx="247.25" cy="302.063" r="9.594" />
                        <circle id="Ellipse_1_copy_4" data-name="Ellipse 1 copy 4" cx="247.25" cy="355.922" r="9.594" />
                        <circle id="Ellipse_1_copy_5" data-name="Ellipse 1 copy 5" cx="143.75" cy="355.922" r="9.594" />
                    </CustomSVG>
                </Districtswitch>
                </Tooltip>
                
                {/* <Percentswitch ratioview={ratioview} onClick={() => setRatioview(!ratioview)} caseState={caseState}>
                    <i className="fa fa-percent" aria-hidden="true"></i>
                </Percentswitch> */}

            </Mapmode>
        </Div>
    )
}
