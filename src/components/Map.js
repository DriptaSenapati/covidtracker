import React,{ useState,memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import LinearGradient from './LinerGradient';
import { animated,config,useSpring } from 'react-spring';


const COLOR_RANGE_CONFIRMED = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
];


const COLOR_RANGE_RECOVERED = [
    '#eaffde',
    '#d0ebc0',
    '#a5c98f',
    '#83ab6a',
    '#6a9450',
    '#517a37',
    '#3e6625',
    '#2e5218',
    '#254710'
];

const COLOR_RANGE_DECEASED = [
    "#dbdbdb",
    "#c7c7c7",
    "#b0b0b0",
    "#999999",
    "#878686",
    "#737373",
    "#5e5e5e",
    "#474747"
]

const COLOR_STROKE = {
    confirmed: "rgba(255, 98, 46,0.5)",
    recovered: 'rgba(75, 189, 0,0.5)',
    deceased: "rgba(138, 138, 138,0.5)"
}

const COLOR_STROKE_HOVERED = {
    confirmed: "#ff70a7",
    recovered: 'rgba(75, 189, 0,1)',
    deceased: "rgba(138, 138, 138,1)"
}


function Map({ Mapdata,topoJSON,currentCase,MapdataID,JSONdataID,JSONPropertiesID,setHoverInfo }) {

    var colorScale;

    switch (currentCase) {
        case "confirmed":
            colorScale = scaleQuantile()
                .domain(Mapdata[`${currentCase}`].map(d => d.COUNT))
                .range(COLOR_RANGE_CONFIRMED);
            break;
        case "recovered":
            colorScale = scaleQuantile()
                .domain(Mapdata[`${currentCase}`].map(d => d.COUNT))
                .range(COLOR_RANGE_RECOVERED);
            break;
        case "deceased":
            colorScale = scaleQuantile()
                .domain(Mapdata[`${currentCase}`].map(d => d.COUNT))
                .range(COLOR_RANGE_DECEASED);
            break;
        default:
            colorScale = scaleQuantile()
                .domain(Mapdata.data.confirmed.map(d => d.COUNT))
                .range(COLOR_RANGE_CONFIRMED);
            break;
    }


    const gradientData = () => {
        var grad_data;
        switch (currentCase) {
            case "confirmed":
                grad_data = {
                    fromColor: COLOR_RANGE_CONFIRMED[0],
                    toColor: COLOR_RANGE_CONFIRMED[COLOR_RANGE_CONFIRMED.length - 1],
                    min: 0,
                    max: Mapdata.confirmed.reduce((max, item) => (item.COUNT > max ? item.COUNT : max), 0)
                }
                break;
            case "recovered":
                grad_data = {
                    fromColor: COLOR_RANGE_RECOVERED[0],
                    toColor: COLOR_RANGE_RECOVERED[COLOR_RANGE_RECOVERED.length - 1],
                    min: 0,
                    max: Mapdata.recovered.reduce((max, item) => (item.COUNT > max ? item.COUNT : max), 0)
                }
                break;
            case "deceased":
                grad_data = {
                    fromColor: COLOR_RANGE_DECEASED[0],
                    toColor: COLOR_RANGE_DECEASED[COLOR_RANGE_DECEASED.length - 1],
                    min: 0,
                    max: Mapdata.deceased.reduce((max, item) => (item.COUNT > max ? item.COUNT : max), 0)
                }
                break;
            default:
                grad_data = {
                    fromColor: COLOR_RANGE_CONFIRMED[0],
                    toColor: COLOR_RANGE_CONFIRMED[COLOR_RANGE_CONFIRMED.length - 1],
                    min: 0,
                    max: Mapdata.confirmed.reduce((max, item) => (item.COUNT > max ? item.COUNT : max), 0)
                }
                break;
        }
        return grad_data;
    }

    const PROJECTION_CONFIG = {
        scale: 1000,
        center: [83.061037, 24.094613]
    };




    const geographyStyle = {
        default: {
            outline: 'black',
            transition: "all 1s ease"
        },
        hover: {
            transition: 'all 250ms',
            outline: 'none',
            stroke: COLOR_STROKE_HOVERED[currentCase],
            strokeWidth: 2,
            opacity: 0.5
        },
        pressed: {
            outline: 'none'
        }
    };
    //const colorScale = scaleQuantile().domain(data.map(d => d.value)).range(COLOR_RANGE);

    const onMouseEnter = (geo, current = { COUNT: 0,Inc : 0 }) => {
            // setTooltipContent(`${geo.properties[`${JSONPropertiesID}`]}: ${current.COUNT}`);
            return(
                () => {
                    setHoverInfo({
                        name: geo.properties[`${JSONPropertiesID}`],
                        value: current.COUNT,
                        Inc: current.Inc
                    })
                }
            )
            
    };

    const onMouseLeave = () => {
        setHoverInfo('');
    };

    const spring = useSpring(
        { to: { opacity: 1,y: 0 }, from: { opacity: 0,y: 100 },delay: 800,config: config.slow }
    )

    return (
        <animated.div style = {{minHeight: "500px",...spring}}>
            {/* <ReactTooltip type='info'>{TooltipContent}</ReactTooltip> */}
            <ComposableMap projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={600}
                height={650}
                viewBox='0 70 600 550'
                preserveAspectRatio="xMidYMid meet"
                data-tip="" style={{ width: "100%", height: "100%" }}
                overflow="visible">

                <Geographies geography={topoJSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            let targetGeo = geo[`${JSONdataID}`] === undefined ? geo.properties[`${JSONdataID}`] : geo[`${JSONdataID}`];
                            const current = Mapdata[`${currentCase}`].find(s => s[`${MapdataID}`] === targetGeo);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={geographyStyle}
                                    stroke={COLOR_STROKE[currentCase]}
                                    fill={current ? colorScale(current.COUNT) : "transparent"}
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                />
                            );
                        })
                    }
                </Geographies>

            </ComposableMap>
            <LinearGradient data={gradientData()}/>
        </animated.div>
    )
}

export default memo(Map);
