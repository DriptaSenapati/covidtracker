import React, { useState, memo, useMemo } from 'react';
// import Map from './Map';
import MapTools from './MapTools';
import NewMap from './NewMap';
import { feature } from "topojson-client";
import { STATE_NAMES,STATE_POP } from '../helpers/commonHelpers';


const INDIA_JSON = require("./../data/india.topo.json");
const INDIA_DIS_JSON = require("./../data/india.json");
// const EnvEndPoints = process.env;


function MapVisulizer(props) {
    const {data,currentCase} = props;
    const [hoverInfo,setHoverInfo] = useState("");
    const [districtView,setDistrictView] = useState(false);
    // const [ratioview,setRatioview] = useState(false);
    const [perlakhview,setPerlakhview] = useState(false);
    console.log("Map Rendered");
    
    // const mapData = props.data.isLoaded ? { ...props.data, data: props.data.data.Cumulative.Map } : props.data;

    // const mapData = props.data.isLoaded ? { ...props.data,data: props.data.data.District } : props.data;

    const Mapdata = useMemo(() => {
        const d = data.data.Map[data.mode][currentCase];
        if(perlakhview){
            // const indiajson = require("./../data/india_new.json");
            // const features = feature(indiajson, indiajson.objects["states"]).features;
            const cData = d.map((item) => {
                return {
                    ...item,
                    COUNT: Math.round(item.COUNT / STATE_POP[item.CODE]*100000)
                }
            })
            return {
                ...data.data.Map[data.mode],
                [currentCase]: cData
            };
        }else{
            let cData = data.data.Map[data.mode];
            return cData;
        }
    }, [perlakhview,currentCase,data.data.Map[data.mode],data.mode])

    const districtData = useMemo(() => {
        const d = data.data.District[data.mode][currentCase];
        if(perlakhview){
            const indiajson = require("./../data/india_new.json");
            const features = feature(indiajson, indiajson.objects["districts"]).features;
            const cData = d.map((item) =>{
                let dt_code = item.dt_code;
                let st_features = features.find(k => k.properties.dt_code == dt_code);
                let st = st_features === undefined ? undefined : Object.keys(STATE_NAMES).find(k => STATE_NAMES[k] === st_features.properties.st_nm)
                return {
                    ...item,
                    COUNT: st_features === undefined ? 0 : Math.round(item.COUNT / STATE_POP[st]*100000)
                }
            })
            return {
                ...data.data.District[data.mode],
                [currentCase]: cData
            };
        }else{
            let cData = data.data.District[data.mode];
            return cData;
        }
    }, [perlakhview,currentCase,data.data.District,data.mode])
    
    
    return (
        <div className={props.className}>

            <MapTools
                caseState={currentCase}
                hoverInfo={hoverInfo}
                dashData = {data.data.Dashboard[data.mode]}
                districtView = {districtView}
                setDistrictView = {setDistrictView}
                ratioview = {perlakhview}
                setRatioview = {setPerlakhview}
            />
            {/* <Map
                Mapdata={data.data.Map[data.mode]}
                topoJSON={INDIA_JSON}
                currentCase={currentCase}
                MapdataID="CODE"
                JSONdataID="id"
                JSONPropertiesID="name" 
                setHoverInfo={setHoverInfo}/> */}

            <NewMap currentCase={currentCase} Mapdata={Mapdata}
            setHoverInfo={setHoverInfo} hoverInfo = {hoverInfo} isdistrictview = {districtView}
            districtData = {districtData}/>

            {/* <Map Mapdata={data.data.District[data.mode]} topoJSON={INDIA_DIS_JSON} currentCase={currentCase} MapdataID="dt_code"
             JSONdataID="dt_code" JSONPropertiesID="district" setHoverInfo={setHoverInfo}/> */}

        </div>


    )
}

export default memo(MapVisulizer);
