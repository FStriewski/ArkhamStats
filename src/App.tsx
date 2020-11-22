import React, {useState, useEffect} from 'react';
import {HeatChart}  from './Components/HeatChart';
import {LineChart}  from './Components/LineChart';
import {getIDeckByDate} from './utils/requests';
import {HeatHistogram, Response, LineHistogram} from './types';
import {heatmapParser, lineChartParser} from './utils/parser';


function App() {
  const [heatData, setHeatData] = React.useState<HeatHistogram[]>()
  const [lineData, setLineData] = React.useState<LineHistogram[]>()

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: Response = await getIDeckByDate('1002')
            setHeatData(heatmapParser(result))
            setLineData(lineChartParser(result))
            console.log(lineData)
         }
         fetchData()
        }
        , []
  )


  return (
    <div className="App">
      Investigator Decks per Day
      {lineData && lineData.length && lineData.map( year => <LineChart input={year}/>) }
    </div>
  );
}

export default App;
