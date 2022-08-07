import { Card } from '@material-ui/core'
import React from 'react';
import "./Dashboard.css";
import { useTheme } from '@material-ui/styles';
import { animated, config, useSpring, useSprings } from 'react-spring';
import SparkLine from './SparkLine';
import { format } from "date-fns";
import DataController from './DataController';


// const envEndPoints = process.env;


export default function Dashboard(props) {
    const theme = useTheme()
    const { data,updateData,loadingRef } = props;
    const mode = data.mode;
    const countData = data.data.Dashboard[mode];
    
    // const [countData, setCountData] = useState({
    //     "isLoaded": false,
    //     "data": {}
    // })
    // const [lastDate, setLastDate] = useState('');
    // const [lastDaydata,setLastDaydata] = useState(30);

    

    const spring = useSpring(
        { to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 100 }, delay: 200, config: config.slow }
    )

    

    const TriggerChange = (e) => {
        e.target.classList.toggle("clicked");
        var node = e.target;
        var id = e.target.id;
        var child = node.parentNode.children;
        for (var i = 0; i < child.length; i++) {
            if (child[i].id !== id) {
                child[i].classList.remove("clicked");
            }
        }
        props.callbackState(id);
    }




    

    var headerStyle = {
        textAlign: "center",
        letterSpacing: "2px"
    }

    const formatDate = format(new Date(data.data.UpdatedTill),"do MMMM',' yyyy");
    const sampleData = countData.Lastdays;
    const dashdata = countData.Response;
    const LatestDate = mode === "cum" ? `Updated till ${formatDate}` : `On ${formatDate}`;

    const springs = useSprings(Object.keys(dashdata).length, Object.keys(dashdata).map(item => ({
        from: { number: dashdata[item].COUNT - dashdata[item].Increment },
        number: dashdata[item].COUNT,
        delay: 200,
        config: config.default,
    })));

    // console.log(springs);

    const sparklineColor = {
        "confirmed": "rgb(238, 88, 78)",
        "deceased": "rgb(112, 110, 110)",
        "recovered": "rgb(146, 238, 84)"
    }
    // console.log("dashboard")


    return (
        <animated.div className={props.className} style={{ marginTop: "50px", ...spring }}>
            <h2 style={theme.palette.type === "light" ? { ...headerStyle, color: "black" } : { ...headerStyle, color: "chocolate" }}>Corona Dashboard</h2>
            <DataController data={data} updateData={updateData} loadingRef={loadingRef} />
            <div style={{ textAlign: "center", fontFamily: 'FontAwesome', color: "#636060" }}>{LatestDate}</div>
            <div className="cardContainer">
                {
                    Object.keys(dashdata).map((key) => {
                        return (
                            <Card className={`${key} ${key === "confirmed" ? "clicked" : undefined}`} onClick={TriggerChange} key={key} id={key}>
                                Total {key}
                                <div style={{ pointerEvents: "none" }}>
                                    <div style={{ pointerEvents: "none", textAlign: "center", fontSize: "10px" }}>
                                        {dashdata[key].Increment >= 0 ? `+${dashdata[key].Increment}` : dashdata[key].Increment}
                                    </div>
                                    <animated.div>
                                        {springs[Object.keys(dashdata).indexOf(key)].number.to(n => n.toFixed(0))}
                                    </animated.div>
                                    
                                </div>
                                <div style={{ height: "50px", width: "100%", textAlign: "center", pointerEvents: "none" }}>
                                    <SparkLine width={150} height={40} data={sampleData[key.toLowerCase()]} colors={sparklineColor[key.toLowerCase()]} />
                                </div>
                            </Card>
                        )
                    })
                }
            </div>

        </animated.div>
    )
}
