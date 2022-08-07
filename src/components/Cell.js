import React from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { animated, config, useSpring } from 'react-spring';

export default function Cell({ data,tagName,incData }) {
    var objData = incData[tagName.toLowerCase()].find(s => s["STATE/UT"] === data["STATE/UT"]);
    var inc = objData.Inc;

    const { number } = useSpring({
        from: { number: Math.floor(data[tagName] / 2) },
        number: data[tagName],
        delay: 200,
        config: config.molasses
      })


    const styles = {
        'recovered':{
            textColor: "#6fe871"
        },
        "confirmed":{
            textColor: "#ff5454"
        },
        "deceased":{
            textColor: "#606060"
        }
    }

    const getIncDiv = () => {
        var div;
        switch (tagName.toLowerCase()) {
            case "confirmed":
                div = <div style = {{color : `${styles.confirmed.textColor}`}}>{inc > 0 && <><ArrowUpwardRoundedIcon/>{inc}</>}</div>
                break;
            case "recovered":
                div = <div style = {{color : `${styles.recovered.textColor}`}}>{inc > 0 && <><ArrowUpwardRoundedIcon/>{inc}</>}</div>
                break;
            case "deceased":
                div = <div style = {{color : `${styles.deceased.textColor}`}}>{inc > 0 && <><ArrowUpwardRoundedIcon/>{inc}</>}</div>
                break;
            default:
                div = <div style = {{color : `${styles.confirmed.textColor}`}}>{inc > 0 && <><ArrowUpwardRoundedIcon/>{inc}</>}</div>
                break;
        }
        return div;
    }

    return (
        <div>
            {getIncDiv()}
            <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
        </div>
    )
}
