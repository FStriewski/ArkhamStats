import React, {useState, useEffect} from 'react';
import {ArkLineChart}  from './Charts/LineChart';
import {getInvestigatorByDate, getInvestigatorComparisonByDate} from '../utils/requests';
import {APIResponse} from '../types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {investigatorList} from '../utils/investigatorList';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const InvestigatorComparison = () =>  {
  const classes = useStyles();
  const [investigatorCodes, setInvestigatorCodes] = React.useState<string[]>([]);
  const [selectedInvestigators, chooseInvestigators] = React.useState<APIResponse>();

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getInvestigatorComparisonByDate(investigatorCodes)
            chooseInvestigators(result)
            console.log(selectedInvestigators)
         }
         fetchData()
        }
        , [investigatorCodes]
  )

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInvestigatorCodes([event.target.value as string]);
  };

    return (
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Investigator</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={investigatorCodes[0]}
          onChange={handleChange}
        >
          {investigatorList.map( inv => 
            <MenuItem key={inv.code} value={inv.code}>{inv.name}</MenuItem>
            )}
        </Select>
      </FormControl>
      Decks per Month
      <br/>
      {selectedInvestigators && selectedInvestigators.datapoints[0] &&  <ArkLineChart input={selectedInvestigators.datapoints[0]['2020']}/> }
    </div>
  );
}