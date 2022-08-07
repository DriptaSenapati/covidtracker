import React, { useState, useEffect, useRef, Suspense } from 'react';
import styled from 'styled-components';
import LoadingBar from 'react-top-loading-bar'
import "./Home.css";
// import TableData from './TableData';
// import DataController from './DataController';
// import Dashboard from './Dashboard';
import { useTheme } from '@material-ui/styles';
// import ChartExplorer from './ChartExplorer';
import Spinner from './Spinner';
// import MapVisulizer from './MapVisulizer';
import { API_ENDPOINT } from "./../helpers/commonHelpers";

const MapVisulizer = React.lazy(() => import("./MapVisulizer.js"));
const Dashboard = React.lazy(() => import("./Dashboard.js"));
const ChartExplorer = React.lazy(() => import("./ChartExplorer.js"));
const DataController = React.lazy(() => import("./DataController.js"));
const TableData = React.lazy(() => import("./TableData.js"));


const MainContainer = styled.div`
  display:flex;
  justify-content:space-between;
  width: 80vw;
  margin: auto;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    width: 95vw;
  }
`;





export default function Home() {
  const theme = useTheme();
  const [Data, setData] = useState({
    "isLoaded": false,
    "data": []
  });

  const [currentCase, setCurrestcase] = useState('confirmed');
  const ref = useRef(null);



  useEffect(() => {
    const updateState = async () => {
      const url = `${API_ENDPOINT}india_current.json`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setData({
        isLoaded: true,
        data: parsedData,
        mode: "cum"
      })
    }
    updateState();
    // eslint-disable-next-line
  }, [])



  console.log(Data);


  return (
    <>
      <LoadingBar color={theme.palette.type === "light" ? "#3b3b3b" : "#03ad69"} ref={ref} height={3} shadowStyle={{ boxShadow: "10px 10px 21px 0px rgba(59,59,59,0.36)" }} />
      <MainContainer>
        <div style={{ flex: 1 }}>

          {Data.isLoaded ?
            <Suspense fallback={<Spinner />}>
              <Dashboard callbackState={setCurrestcase} data={Data} updateData={setData} loadingRef={ref} />
            </Suspense> : <Spinner />}

          {Data.isLoaded ?
            <Suspense fallback={<Spinner />}>
              <MapVisulizer data={Data} currentCase={currentCase} />
            </Suspense> : <Spinner />}

          {Data.isLoaded ?
            <Suspense fallback={<Spinner />}>
              <TableData data={Data} />
            </Suspense> : <Spinner />}




        </div>
        <div style={{ flex: 1 }}>
          <div style={{margin: "50px auto 30px",minHeight: "200px"}}></div>

          {Data.isLoaded ?
            <Suspense fallback={<Spinner />}>
              <ChartExplorer data={Data} />
            </Suspense> : <Spinner />}



        </div>
      </MainContainer>
    </>
  )
}
