import React, {useEffect} from 'react';
import {ArkLineChart}  from './Charts/LineChart';
import {getCountsByClass} from '../utils/requests';
import { APIResponse } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {investigatorClassColor} from '../lookups/investigatorList';
import {MODE, determineDataTypeMode} from '../types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const TotalCount = ({year, mode}: {year: number, mode: MODE}) =>  {
  const classes = useStyles();
  const [investigatorClass, setInvestigatorClass] = React.useState('all');
  const [selectedClass, chooseClass] = React.useState<APIResponse>();

  const selectedYear=year.toString();

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getCountsByClass(investigatorClass)
            chooseClass(result)
         }
         fetchData()
        }
        , [investigatorClass]
  )

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInvestigatorClass(event.target.value as string);
  };
  const investigatorClassList = Object.keys(investigatorClassColor).map(entry => ({name: entry, color: investigatorClassColor[entry]}))
  const dataType = determineDataTypeMode(mode)

    return (
      <div className="App">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={investigatorClass}
            onChange={handleChange}
          >
            {investigatorClassList.map((cls) => (
              <MenuItem key={cls.name} value={cls.name}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        Total decks per Month
        <br />
        {selectedClass && selectedClass[dataType] && (
          <>
            <ArkLineChart
              input={selectedClass[dataType][selectedYear]}
              ids={[investigatorClass]}
              year={selectedYear}
              yLimit={1000}
              entity='class'
            />
          </>
        )}
      </div>
    );
}
