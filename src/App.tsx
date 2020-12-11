import React, {useState, useEffect} from 'react';
import {HeatChart}  from './Components/HeatChart';
import {ArkLineChart}  from './Components/LineChart';
import {getIDeckByDate} from './utils/requests';
import {HeatHistogram, APIResponse, LineHistogram} from './types';
import {heatmapParser } from './utils/parser';

//{"datapoints":{"2016":[{"date":"2016-01","value":0},{"date":"2020-12","value":0}]},"meta":{"investigator":"1004","total":896}}


function App() {
  const [lineData, setLineData] = React.useState<APIResponse>()

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getIDeckByDate('1002')
            setLineData(result)
            console.log(lineData)
         }
         fetchData()
        }
        , []
  )


  return (
    <div className="App">
      Investigator Decks per Month
      {lineData && lineData.datapoints &&  <ArkLineChart input={lineData.datapoints['2020']}/> }
    </div>
  );
}

export default App;
