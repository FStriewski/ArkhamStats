import React, {useState, useEffect} from 'react';
import {ArkLineChart}  from './Components/LineChart';
import {getInvestigatorByDate, getInvestigatorComparisonByDate} from './utils/requests';
import {HeatHistogram, APIResponse, LineHistogram} from './types';
import {heatmapParser } from './utils/parser';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {investigatorList} from './utils/investigatorList';
import {Header} from './Components/UI/Header';
import {Tabbar} from './Components/UI/Tabbar';

//{"datapoints":{"2016":[{"date":"2016-01","value":0},{"date":"2020-12","value":0}]},"meta":{"investigator":"1004","total":896}}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [investigatorCode, setInvestigator] = React.useState('01004');

  const [lineData, setLineData] = React.useState<APIResponse>();
  const [mdata, setMdata] = React.useState<APIResponse>();

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getInvestigatorByDate(investigatorCode)
            setLineData(result)
            console.log(lineData)
         }
         fetchData()
        }
        , [investigatorCode]
  )
  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getInvestigatorComparisonByDate(['01004', '02002'])
            setMdata(result)
            console.log(mdata)
         }
         fetchData()
        }
        , []
  )


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInvestigator(event.target.value as string);
  };



  return (
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Investigator</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={investigatorCode}
          onChange={handleChange}
        >
          {investigatorList.map( inv => 
            <MenuItem value={inv.code}>{inv.name}</MenuItem>
            )}
        </Select>
      </FormControl>
      Investigator Decks per Month
      <br/>
      {lineData && lineData.datapoints &&  <ArkLineChart input={lineData.datapoints['2020']}/> }
    </div>
  );
}

export default App;
