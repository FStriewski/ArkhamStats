import React from 'react';
import {FChart}  from './Components/FChart';
import {histogram} from './Processor/histogram';
import {parser} from './Processor/parser';

import { default as json } from './Resources/sample.json';

function App() {
    
  const rawdata = histogram(json, '01004');
  const data = parser(rawdata);

  return (
    <div className="App">
      <FChart input={data}/>
    </div>
  );
}

export default App;
