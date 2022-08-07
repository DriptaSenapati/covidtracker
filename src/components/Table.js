import React from 'react';
import { useTheme,ThemeProvider } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { createTheme } from '@material-ui/core/styles';
import "./Table.css";
import Export from './../helpers/csvExport';
import {ComponentThemes} from "./../Themes/TableTheme";
import { animated,config,useSpring } from 'react-spring';





export default function Table({ columns, data }) {
    const theme = useTheme()
    console.log("Main Table Rendered");
    var curTheme = ComponentThemes.Table[theme.palette.type];
    const propsAn = useSpring({ to: { opacity: 1,y: 0 }, from: { opacity: 0,y: 100 },delay: 500,config: {
        ...config.slow
    } })

    const themeT = createTheme({
        overrides: {
            MuiTableRow: {
                root: {
                    '&.MuiTableRow-hover:hover': {
                        cursor: 'pointer'
                        // '& .MuiTableCell-body': {
                        //     backgroundColor: "#d1f4ff"
                        // }
                    }
    
                }
            },
            MuiTableCell: {
                head: {
                    backgroundColor: `${curTheme.headerStyleColor} !important`
                },
                root: {
                    '& .MuiTableCell-body:first-child':{
                        backgroundColor: `${curTheme.rowHeadColor} !important`
                    },
                    borderBottom: "transparent",
                    fontSize: "12px !important"
                }
            },
            MuiPaper: {
                elevation2: {
                    boxShadow: "none !important"
                }
            },
            MuiTableBody: {
                root: {
                    '& tr:nth-of-type(even)':{
                        backgroundColor: `${curTheme.oddColor} !important`
                    }
                }
            }
            
        },
        palette: {
            type: theme.palette.type,
            background: {
                paper: curTheme.backgroundPaper,
            }
        }
        
    })
    
    return (
        <animated.div style={{ width: '98%', margin: "auto", padding: `${window.innerWidth < 1000 ? "0px" : "10px"}`,...propsAn }}>
            
            <ThemeProvider theme={themeT}>
                <MaterialTable
                    title="Corona Table"
                    columns={columns}
                    data={data}
                    options={{
                        tableLayout: "fixed",
                        isLoading: true,
                        paging: false,
                        headerStyle: {
                            borderRadius: "10px",
                            margin: "10px",
                        },
                        exportButton: { csv: true },
                        exportCsv: (columns, data) => {
                            Export(columns, data, "export");
                        }
                    }}
                    onRowClick={(evt, rowData) => {
                        console.log(rowData);
                        alert("clicked");
                    }}
                    style={{
                        padding: "10px",
                        borderRadius: "20px"
                    }}
                />
            </ThemeProvider>

        </animated.div>

    )
}
