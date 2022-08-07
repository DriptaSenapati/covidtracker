import React, { useEffect, useRef, useMemo, memo } from 'react';
import formatDate from "./../helpers/ChageDateFormat"
import { DataDate, abbreviateNumber } from './../helpers/ChartHelpers';
import { interpolatePath } from 'd3-interpolate-path';
import * as d3 from "d3";
import useMeasure from 'react-use-measure';
import { differenceInDays } from "date-fns";
import _ from 'underscore';

function Charts({ data, dates, colorTheme, stateVal, updateStateVal, dataMinMax }) {

    const [wrapperRef, { width }] = useMeasure();
    var highlightDate = stateVal.highlightDate;

    // const [highlightDate, sethighlightDate] = useState("");
    const diffDays = useMemo(() => {
        return differenceInDays(DataDate(dates[dates.length - 1]), DataDate(dates[0]))
    }, [data, dates])

    let svgHeight = 200;


    const svgRef = useRef();
    let margin = {
        top: 20, right: 35, bottom: 25, left: 25
    }


    const xScale = useMemo(() => {
        return d3.scaleTime()
            .clamp(true)
            .domain([
                DataDate(dates[0]),
                DataDate(dates[dates.length - 1])
            ]).range([margin.left, width - margin.right])
    }, [dates, margin])



    const yScale = useMemo(() => {
        let scaleVal = dataMinMax ? dataMinMax : Object.values(_.pick(data,...dates));

        return d3.scaleLinear().clamp(true)
            .domain([Math.min(...scaleVal), Math.max(...scaleVal)])
            .range([svgHeight - margin.bottom, margin.top])
    }, [data, margin, dataMinMax])



    useEffect(() => {
        if (width <= 0) return;
        const svg = d3.select(svgRef.current)
            .attr("overflow", "visible")
            .attr("width", width)
            .attr("height", svgHeight)
            .style("background", colorTheme.background)
            .style("border-radius", "10px")



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

        const yAxis = d3.axisRight(yScale).ticks(4).tickPadding(4)
            .tickFormat((num) => abbreviateNumber(num));
        svg
            .select(".y-axis")
            .style("transform", `translateX(${width - margin.right}px)`)
            .attr("stroke", colorTheme.lineColor)
            .style('color', colorTheme.lineColor)
            .transition()
            .duration(500)
            .call(yAxis);



        const myLine = d3.line()
            .x((value) => {
                return xScale(DataDate(value))
            })
            .y((value) => yScale(data[value]))
            .curve(d3.curveCardinal);



        svg
            .selectAll(".line")
            .data([dates])
            .join(
                (enter) =>
                    enter
                        .append("path")
                        .attr("class", "line")
                        .attr("d", myLine)
                        .attr("fill", "none")
                        .attr("stroke", colorTheme.lineColor)
                        .attr("stroke-width", "4"),
                (update) =>
                    update.call((update) => update
                        .transition()
                        .duration(500)
                        .attrTween('d', function (d) {
                            var previous = d3.select(this).attr('d');
                            var current = myLine(d);
                            return interpolatePath(previous, current);
                        })
                    )
            )


        svg
            .selectAll("circle.normal")
            .data(diffDays <= 30 ? dates : [])
            .join(
                (enter) =>
                    enter
                        .append("circle")
                        .attr("class", "normal")
                        .attr("cx", (date) => {
                            return (xScale(DataDate(date)))
                        })
                        .attr("cy", (date) => yScale(data[date]))
                        .attr("fill", colorTheme.circleColor)
                        .attr("r", "2")
                        .attr("stroke", "none")
            )
            .transition()
            .attr("cx", (date) => {
                return (xScale(DataDate(date)))
            })
            .attr("cy", (date) => yScale(data[date]))


        const mousemove = (ev) => {
            const x = d3.pointer(ev)[0];
            const date = xScale.invert(x);
            updateStateVal({
                ...stateVal,
                highlightDate: formatDate(date)
            })
        }

        function mouseout(ev) {
            updateStateVal({
                ...stateVal,
                highlightDate: dates[dates.length - 1]
            })
        }




        svg.selectAll('*').attr('pointer-events', 'none');
        svg
            .on('mousemove', mousemove)
            .on('mouseout', mouseout)

    }, [width, dates, diffDays, dataMinMax])

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // console.log(xScale(DataDate("01/14/2022")));
        // svg
        //     .selectAll("circle.normal")
        //     .attr("r", (date) => date === highlightDate ? 6 : 2)
        //     .style("opacity", (date) => {
        //         if (date !== highlightDate) {
        //             if (diffDays <= 30) {
        //                 return 1;
        //             }
        //             else return 0;
        //         }
        //     })
        svg
            .selectAll("circle.condense")
            .data(diffDays <= 30 ? [] : [highlightDate])
            .join(
                (enter) =>
                    enter
                        .append("circle")
                        .attr("class", "condense")
                        .transition()
                        .duration(500)
                        .attr("cx", (date) => xScale(DataDate(date)))
                        .attr("cy", (date) => yScale(data[date]))
                        .attr("fill", colorTheme.circleColor)
                        .attr("r", "6")
                        .attr("stroke", "none")
                        .attr('pointer-events', 'none'),
                (update) =>
                    update.call((update) => update
                        .attr("cx", (date) => xScale(DataDate(date)))
                        .attr("cy", (date) => {
                            return yScale(data[date])
                        })
                    ),
                (exit) => exit.call((exit) => exit.remove())

            )



        if (diffDays <= 30) {
            svg
                .selectAll("circle")
                .attr("r", (date) => date === highlightDate ? 6 : 2)
        }else{
            svg
                .selectAll("circle")
                .attr("cx", (date) => date === highlightDate && xScale(DataDate(date)))
                .attr("cy", (date) => date === highlightDate && yScale(data[date]))
        }



    }, [highlightDate, width, dataMinMax, diffDays, xScale, yScale, dates])


    return (
        <div ref={wrapperRef} style={{ width: "100%", marginBottom: "30px" }}>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    if (prevProps.data !== nextProps.data) {
        return false;
    } else if (prevProps.highlightDate !== nextProps.highlightDate) {
        return false;
    } else if (prevProps.dataMinMax !== nextProps.dataMinMax) {
        return false;
    } if (prevProps.dates !== nextProps.dates) {
        return false;
    } else return true;
}

export default memo(Charts, areEqual);
