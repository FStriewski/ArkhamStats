import React, {useState, useEffect} from 'react';
import {HeatChart}  from './Components/HeatChart';
import {getIDeckByDate} from './utils/requests';
import {HeatHistogram, Response} from './types';
import {heatmapParser, lineParser} from './utils/parser';


function App() {
  const [heatData, setHeatData] = React.useState<HeatHistogram[]>()
  const [lineData, setLineData] = React.useState<any[]>()

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: Response = await getIDeckByDate('1004')
            console.log(result)
            setHeatData(heatmapParser(result))
            setLineData(lineParser(result))
            // console.log(lineData)
         }
         fetchData()
        }
        , []
  )


  return (
    <div className="App">
      Investigator Decks per Day
      {/* {data && data.length && data.map( year => <FChart key={year.year} input={year}/>) } */}
    </div>
  );
}

export default App;
