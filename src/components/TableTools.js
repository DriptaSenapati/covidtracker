import React, { useState, memo,useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Cell from './Cell';
import Table from './Table';
import Spinner from './Spinner';

// const EnvEndPoints = process.env;

// const toTitleCase = (str) => {
//     return str.replace(
//         /\w\S*/g,
//         function (txt) {
//             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         }
//     );
// }

const getValProps = (props) => {
    var COUNT = props.data[props.tagName];
    return COUNT
}

// const generateStatewiseCumData = (data, callback) => {
//     var columns = []
//     var dataT = []
//     var cols = Object.keys(data).map((item) => {
//         return (
//             toTitleCase(item)
//         )
//     });
//     columns.push({
//         "title": "STATE/UT",
//         field: "STATE/UT",
//         cellStyle: {
//             // backgroundColor: ComponentThemes.Table[theme.palette.type].rowHeadColor,
//             borderRadius: "10px",
//             position: "sticky",
//             left: 0,
//             textAlign: "center"
//         },
//         render: rowData => {
//             return <Tooltip title={`Click to see details for ${rowData.id}`} placement="top-start" disableInteractive><div>{rowData["STATE/UT"]}</div>
//             </Tooltip>
//         }
//     })
//     cols.forEach((item) => {
//         columns.push({
//             title: ` ${item}`,
//             field: `${item}`,
//             cellStyle: {
//                 borderRadius: "10px",
//                 textAlign: "center",
//             },
//             filtering: false,
//             customSort: (a, b) => getValProps(a[item].props) - getValProps(b[item].props)
//         })
//     })
//     var states = data.confirmed.map((item) => {
//         return (
//             item["STATE/UT"]
//         )
//     })
//     for (let i = 0; i < states.length; i++) {
//         var temp_r = {};
//         for (let j = 0; j < columns.length; j++) {
//             if (columns[j].field === "STATE/UT") {
//                 temp_r[columns[j].field] = states[i];
//             } else {
//                 temp_r[columns[j].field] = <Cell data={data} tagName={columns[j].field.toLowerCase()} stateName={states[i]} />;
//             }
//         }
//         // eslint-disable-next-line
//         dataT.push({ ...temp_r, id: `${data.confirmed.find(s => s["STATE/UT"] === temp_r["STATE/UT"]).CODE}` });
//     }
//     dataT = dataT.sort((a, b) => (getValProps(a.Confirmed.props) > getValProps(b.Confirmed.props)) ? -1 : ((getValProps(b.Confirmed.props) > getValProps(a.Confirmed.props)) ? 1 : 0))
//     callback({
//         columns: columns,
//         data: dataT
//     })
// }


const generateTableData = (data, callback, incData = null) => {

    var columns = Object.keys(data[0]).map((key) => {
        var res;
        if (key !== "CODE") {

            if (key === "STATE/UT") {
                res = {
                    title: key,
                    field: key,
                    cellStyle: {
                        borderRadius: "10px",
                        position: "sticky",
                        left: 0,
                        textAlign: "center"
                    },
                    render: rowData => {
                        return (
                            <Tooltip title={`Click to see details for ${rowData.CODE}`} placement="top-start" disableInteractive><div>{rowData["STATE/UT"]}</div>
                            </Tooltip>
                        )
                    }
                }
            } else {
                res = {
                    title: key,
                    field: key,
                    cellStyle: {
                        borderRadius: "10px",
                        textAlign: "center",
                    },
                    filtering: false,
                    customSort: (a, b) => getValProps(a[key].props) - getValProps(b[key].props)
                }
            }
        }
        return res;
    })

    columns = columns.filter(function (element) {
        return element !== undefined;
    });

    data = data.filter(function (element) {
        return element["STATE/UT"] !== "Total";
    });

    var dataT = incData ? data.map((key) => {
        const res_data = {}

        for (const [k, v] of Object.entries(key)) {
            if (k !== "STATE/UT" && k !== "CODE") {
                res_data[k] = <Cell data={key} tagName={k} incData={incData} />
            } else {
                res_data[k] = v
            }
        }

        return res_data;
    }) : data;
    callback({
        isLoaded: true,
        columns: columns,
        data: dataT
    })
}


function TableTools({ Data, IncData }) {
    // const [stateData, setStateData] = useState({
    //     "isLoaded": false,
    //     "data": {}
    // });
    const stateData = Data;
    const [tableData, setTableData] = useState({
        "isLoaded": false
    })

    console.log("Table Rendered");


    // useEffect(() => {
    //     const updateState = async () => {
    //         const url = `${EnvEndPoints.REACT_APP_API}/${EnvEndPoints.REACT_APP_STATEWISECUM}`;
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         setStateData({ ...stateData, data: parsedData, isLoaded: true });
    //     }
    //     updateState();
    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        const updateTableData = () => {
            generateTableData(stateData, setTableData, IncData);

        }
        updateTableData();
        // eslint-disable-next-line
    }, [stateData])

    return (
        <div>

            {tableData.isLoaded ? <Table columns={tableData.columns} data={tableData.data} /> : <Spinner />}

        </div>

    )
}

export default memo(TableTools);
