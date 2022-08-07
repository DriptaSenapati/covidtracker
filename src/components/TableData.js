import React,{ memo } from 'react'
import TableTools from './TableTools';

// const TableTools = React.lazy(() => import("./TableTools.js"));

function TableData(props) {
    const {data} = props;
    return (
        <div className={props.className}>

                <TableTools Data={data.data.Table[data.mode]} IncData={data.data.Map[data.mode]}/>
            
        </div>
    )
}

export default memo(TableData);