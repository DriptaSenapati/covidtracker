import React from 'react'
import { animated,useSpring } from 'react-spring';

function SparkLine({ data,height, width, colors }) {

    const { x } = useSpring({
        from: { x: 0 },
        x: 1,
        delay: 400,
        config: {
            duration: 1500
        }
      })

    const springCircle = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 1500
    })

    // const data = [20, 30, 100, 200];

    const getD = (values, viewBoxWidth, viewBoxHeight, decimals = 2) => {
        let l = [];
        const maxX = values.length - 1;
        const maxY = Math.max(...values);
        for (let i = 0; i <= maxX; i++) {
            l.push(
                Math.round(i / maxX * viewBoxWidth, decimals) + ',' +
                Math.round(viewBoxHeight - (values[i] / maxY * viewBoxHeight) + (values[i] / maxY * viewBoxHeight)*0.3, decimals),
            );
        }
        return({
            path: `M ${l.join(' L ')}`,
            circleCenter: [Math.round(1 * viewBoxWidth, decimals),Math.round(viewBoxHeight - (values[maxX] / maxY * viewBoxHeight) + (values[maxX] / maxY * viewBoxHeight)*0.3, decimals)]
        });
    };

    let derivedPath = getD(data, width - (width*0.03), height - (height*0.1));
    return (
        <animated.svg
            preserveAspectRatio="none"
            version="1.1"
            viewBox={`0 0 ${width} ${height}`}
            strokeDasharray={300}
            strokeDashoffset={x.to(x => (1 - x) * 300)}
            style={{ overflow: "visible" }}
        >
            

            <path
                d={derivedPath.path}
                stroke={colors}
                fill = "transparent"
                strokeWidth={2}
            />
            <animated.circle style = {springCircle} cx={derivedPath.circleCenter[0]} cy={derivedPath.circleCenter[1]} r={3} stroke={colors} fill={colors} strokeWidth={2}/>
        </animated.svg>
    )
}

export default SparkLine;
