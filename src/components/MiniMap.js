import React, { useEffect, useRef, useMemo, memo } from 'react';
import { DataDate } from './../helpers/ChartHelpers';
import * as d3 from "d3";
import useMeasure from 'react-use-measure';
import formatDate from "./../helpers/ChageDateFormat";

function MiniMap({ data, dates, colorTheme, stateVal, updateStateVal }) {

    var selectionDate = stateVal.selectionDate;

    const [wrapperRef, { width }] = useMeasure();
    const svgRef = useRef();
    let svgHeight = 50;

    let margin = {
        top: 0, right: 0, bottom: 0, left: 0
    }

    const xScale = useMemo(() => {
        return d3.scaleTime()
            .clamp(true)
            .domain([
                DataDate(dates[0]),
                DataDate(dates[dates.length - 1])
            ]).range([margin.left, width - margin.right])
    }, [dates, margin, selectionDate])


    const yScale = useMemo(() => {
        return d3.scaleLinear().clamp(true)
            .domain([Math.min(...Object.values(data)), Math.max(...Object.values(data))])
            .range([svgHeight - margin.bottom, margin.top])
    }, [data, margin])


    useEffect(() => {
        if (width <= 0) return;
        const svg = d3.select(svgRef.current)
            .attr("overflow", "visible")
            .attr("width", width)
            .attr("height", svgHeight)
            .style("background", "rgb(32 31 31 / 15%)")

        const xAxis = d3.axisBottom(xScale)
            .ticks(6)

        svg
            .select(".x-axis")
            .style("transform", `translateY(${svgHeight - margin.bottom}px)`)
            .attr("stroke", colorTheme.lineColor)
            .style('color', colorTheme.lineColor)
            .style('font-weight', '100')
            .transition()
            .duration(500)
            .call(xAxis);

        var areaGen = d3.area()
            .x((date) => xScale(DataDate(date)))
            .y0(yScale(0))
            .y1((date) => yScale(data[date]))

        svg.select(".trend").selectAll(".trendarea")
            .data([dates])
            .join(
                (enter) =>
                    enter.append("path")
                        .attr("class", "trendarea")
                        .attr("fill", "rgba(255, 95, 74,0.5)")
                        .attr("stroke", "rgba(255, 95, 74,1)")
                        .attr("d", areaGen)
                        .style("pointer-events", "none")
            )
            .attr("d", areaGen)

        // const myLine = d3.line()
        //     .x((value) => {
        //         return xScale(DataDate(value))
        //     })
        //     .y((value) => yScale(data[value]))
        //     .curve(d3.curveLinear);

        // svg.select(".trendline")
        //     .selectAll(".line")
        //     .data([dates])
        //     .join(
        //         (enter) =>
        //             enter
        //                 .append("path")
        //                 .attr("class", "line")
        //                 .attr("d", myLine)
        //                 .attr("fill", "none")
        //                 .attr("stroke", (d) => {
        //                     console.log(d);
        //                     return "rgba(255, 95, 74,1)"
        //                 })
        //                 .attr("stroke-width", "2")
        //                 .style("pointer-events", "none")
        //     )
        //     .transition()
        //     .duration(500)
        //     .attr("d", myLine)



    }, [width, data, dates])



    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const brush = d3.brushX()
            .extent([
                [0, 0],
                [width, svgHeight],
            ])
            .on("start brush end", (event) => {
                if (event.selection) {
                    if (event.sourceEvent === undefined) return;
                    const indexSelection = event.selection.map(xScale.invert);
                    updateStateVal({
                        "selectionDate": indexSelection,
                        "highlightDate": formatDate(indexSelection[1])
                    })
                }
            });

        const beforebrushstarted = (event) => {
            const selection = d3.brushSelection(svg.select('.brush').node());
            if (!selection) return;

            const dx = selection[1] - selection[0];
            const [[cx]] = d3.pointers(event);
            const [x0, x1] = [cx - dx / 2, cx + dx / 2];
            const [X0, X1] = xScale.range();

            const sel = x1 > X1 ? [X1 - dx, X1] : x0 < X0 ? [X0, X0 + dx] : [x0, x1]
            svg
                .select('.brush')
                .call(
                    brush.move,
                    sel
                );
        }

        svg.select(".brush").call(brush)
            .call((g) => g
                .select(".overlay")
                .attr("cursor", "pointer")
                .datum({ type: "selection" })
                .on('mousedown touchstart', beforebrushstarted))


        svg.select(".brush").call(brush.move, selectionDate.map(xScale))
        // svg.select(".brush .selection").attr("stroke", "none")
        //.attr("fill","rgba(255, 255, 255,0.3)")


    }, [width, data, dates, selectionDate])



    return (
        <div ref={wrapperRef} style={{ width: "100%", marginBottom: "30px" }}>
            <svg ref={svgRef}>
                <defs>
                    <clipPath id="clipPath">
                        <rect
                            x={0}
                            y={0}
                            width={width}
                            height={svgHeight}
                        />
                    </clipPath>
                    <mask id="mask">
                        <rect
                            x={0}
                            y={0}
                            width={width}
                            height={svgHeight}
                            fill="hsl(0, 0%, 20%)"
                        />
                        <use href="#selection" fill="white" />
                    </mask>

                </defs>



                <g className="brush" clipPath="url(#clipPath)">
                    <g mask="url(#mask)">
                        <rect className="overlay" fill='rgba(108,117,125,.2509803' />
                        <g className="trend" />
                        <rect className="selection" id="selection" style={{ cursor: "pointer" }} />
                    </g>

                </g>
                <g className="x-axis" />
            </svg>
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    if (prevProps.data !== nextProps.data) {
        return false;
    } else if (prevProps.dates !== nextProps.dates) {
        return false;
    } else if (prevProps.stateVal.selectionDate !== nextProps.stateVal.selectionDate) {
        return false;
    } else return true;
}


export default memo(MiniMap, areEqual)
