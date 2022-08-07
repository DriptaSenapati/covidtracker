import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from "d3";
import { feature } from "topojson-client";
import { STATE_NAMES, STATE_POP } from '../helpers/commonHelpers';
import { MapTheme } from './../Themes/ComponentThemes';
import MapLagend from './MapLagend';


const indiajson = require("./../data/india_new.json");

function NewMap({ currentCase, Mapdata, setHoverInfo, hoverInfo, isdistrictview,
    districtData }) {
    const svgRef = useRef();

    const height = 488;

    // const Mapdata = useMemo(() => {
    //     const f = feature(indiajson, indiajson.objects[`${isdistrictview ? "distrcits" : "states"}`]).features;
    //     let targetNumerator = isdistrictview ? districtData[currentCase] : Statedata[currentCase];
    //     targetNumerator.map((item) => {
    //         let tag = isdistrictview ? "dt_code" : "CODE";
    //         if(isdistrictview){
    //             let st = f.find(k => k.properties.dt_code === item.dt_code).st_nm;
    //             return {
    //                 ...item,
    //                 COUNT : Math.ceil(item.COUNT / STATE_POP[tag])
    //             }
    //         }
    //     })

    // }, [Statedata,isdistrictview])

    const [minVal, maxVal] = useMemo(() => {
        let counts;
        if (!isdistrictview) counts = Mapdata[`${currentCase}`].map(d => d.COUNT);
        else counts = districtData[currentCase].map(d => d.COUNT);
        return ([Math.min(...counts) < 0 ? 0 : Math.min(...counts), Math.max(...counts)])
    }, [Mapdata, currentCase, isdistrictview]);

    console.log(minVal, maxVal);

    const colorScale = useMemo(() => {
        return (d3.scaleLinear().domain([minVal, maxVal]).interpolate(() => d3.interpolateRgb(MapTheme.colors[currentCase][1], MapTheme.colors[currentCase][0])))
    }, [Mapdata, currentCase,minVal, maxVal])


    const getColor = useCallback(
        (d) => {
            let st_code = Object.keys(STATE_NAMES).find(k => STATE_NAMES[k] === d.id);
            let countVal = Mapdata[`${currentCase}`].find(k => k.CODE === st_code).COUNT;
            // if(isperLakhview) countVal = Math.ceil(countVal / STATE_POP[st_code]);
            return (colorScale(countVal))
        },
        [Mapdata, currentCase,isdistrictview]
    );

    const getColorDistrict = useCallback(
        (d) => {
            let target = districtData[`${currentCase}`].find(k => k.dt_code === d.properties.dt_code);
            let countVal = target === undefined ? 0 : target.COUNT;
            return (colorScale(countVal))
        },
        [districtData, currentCase, isdistrictview]
    );

    const strokeWidth = useCallback(
        (d) => {
            let t;
            if (isdistrictview) t = d.properties.district === undefined ? "none" : d.properties.district;
            else t = d.id === undefined ? "none" : d.id;
            return (hoverInfo.name === t ? "1.8" : "0.8")
        },
        [Mapdata, currentCase, hoverInfo, isdistrictview]
    );

    const stokecolor = useCallback(
        (d) => {
            let t;
            if (isdistrictview) t = d.properties.district === undefined ? "none" : d.properties.district;
            else t = d.id === undefined ? "none" : d.id;
            return (hoverInfo.name === t ? MapTheme.stroke.hover[currentCase] : MapTheme.stroke.color[currentCase])
        },
        [Mapdata, currentCase, hoverInfo, isdistrictview]
    );

    const strokeopacity = useCallback(
        (d) => {
            let t;
            if (isdistrictview) t = d.properties.district === undefined ? "none" : d.properties.district;
            else t = d.id === undefined ? "none" : d.id;
            return (hoverInfo.name === t ? "1" : "0.2")
        },
        [Mapdata, currentCase, hoverInfo, isdistrictview]
    );

    const pathGenerator = d3.geoPath(d3.geoIdentity());

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const t = d3.transition().duration(200);
        svg
            .attr("viewBox", `0 0 ${432} ${height}`)




        // svg
        //     .selectAll(".country")
        //     .data(feature(indiajson, indiajson.objects["states"]).features)
        //     .join("path")
        //     .attr("class", "country")
        //     .attr("d", (d) => pathGenerator(d))

        svg
            .select(".content")
            .selectAll("path")
            .data(feature(indiajson, indiajson.objects["states"]).features)
            .join(
                (enter) => enter
                    .append("path")
                    .attr("d", (d) => {
                        return (pathGenerator(d))
                    })
                    .style("cursor", "pointer")
                    .transition(t)
                    .attr("fill", getColor)
                    .attr("stroke", stokecolor)
                    .attr("stroke-width", strokeWidth)
                ,
                (update) => update
                    .transition(t)
                    .attr("fill", isdistrictview ? "transparent" : getColor)
                    .attr("stroke", stokecolor)
                    .attr("stroke-width", strokeWidth)
            )
            .on("mouseover", (e, d) => {
                let st_code = Object.keys(STATE_NAMES).find(k => STATE_NAMES[k] === d.id);
                setHoverInfo({
                    name: d.id,
                    value: Mapdata[currentCase].find(k => k.CODE === st_code).COUNT,
                    Inc: Mapdata[currentCase].find(k => k.CODE === st_code).Inc
                })
            })
            .on("mouseout", (e, d) => {
                setHoverInfo("")
            })


    }, [Mapdata, currentCase, getColor, hoverInfo, isdistrictview])


    useEffect(() => {
        // return;
        const svg = d3.select(svgRef.current);
        const t = d3.transition().duration(200);
        svg
            .select(".district-border")
            .selectAll("path")
            .data(feature(indiajson, indiajson.objects["districts"]).features)
            .join(
                (enter) => enter
                    .append("path")
                    .attr("d", (d) => {
                        return (pathGenerator(d))
                    })
                    .style("cursor", "pointer")
                    .transition(t)
                    .attr("fill", getColorDistrict)
                    .attr("stroke", stokecolor)
                    .attr("stroke-opacity", strokeopacity)
                    .attr("stroke-width", strokeWidth)
                    .style("opacity", 0)
                ,
                (update) => update
                    .transition(t)
                    .attr("fill", getColorDistrict)
                    .attr("stroke", stokecolor)
                    .attr("stroke-width", strokeWidth)
                    .attr("stroke-opacity", strokeopacity)
                    .style("opacity", isdistrictview ? 1 : 0)
            )
            .on("mouseenter", (e, d) => {
                setHoverInfo({
                    name: d.properties.district,
                    value: districtData[currentCase].find(k => k.dt_code === d.properties.dt_code) === undefined ? 0 : districtData[currentCase].find(k => k.dt_code === d.properties.dt_code).COUNT,
                    Inc: districtData[currentCase].find(k => k.dt_code === d.properties.dt_code) === undefined ? 0 : districtData[currentCase].find(k => k.dt_code === d.properties.dt_code).Inc
                })
            })
            .on("mouseout", (e, d) => {
                setHoverInfo("")
            })

        if (isdistrictview) {
            svg.select(".content")
                .style("pointer-events", "none")
            svg.select(".district-border")
                .style("pointer-events", "all")


            // svg.select(".content").selectAll("path").transition().duration(100).attr("fill-opacity", 0)
        } else {
            svg.select(".content")
                .style("pointer-events", "all")
            svg.select(".district-border")
                .style("pointer-events", "none")
            // svg.select(".content").selectAll("path").transition().duration(100).attr("fill-opacity", 1)
        }


    }, [isdistrictview, hoverInfo, currentCase, districtData])



    return (
        <div style={{ width: "90%", margin: "0px auto 30px" }}>
            <svg ref={svgRef} >
                <g className="content" />
                <g className="district-border" />
            </svg>
            <MapLagend minmaxVal={[minVal, maxVal]} rampcolor={[MapTheme.colors[currentCase][1], MapTheme.colors[currentCase][0]]} />
        </div>
    )
}

export default NewMap