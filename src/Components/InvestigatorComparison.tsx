import React, {useState, useEffect} from 'react';
import {ArkLineChart}  from './Charts/LineChart';
import { getInvestigatorComparisonByDate} from '../utils/requests';
import {APIResponse} from '../types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const InvestigatorComparison = ({investigatorCodes}) =>  {
  const classes = useStyles();
  // const [investigatorCodes, setInvestigatorCodes] = React.useState<string[]>([]);
  const [selectedInvestigators, chooseInvestigators] = React.useState<APIResponse>();

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getInvestigatorComparisonByDate(investigatorCodes)
            chooseInvestigators(result)
         }
         fetchData()
        }
        , [investigatorCodes]
  )

    return (
      <div className="App">
        {/* <FormControl className={classes.formControl}></FormControl> */}
        {selectedInvestigators && selectedInvestigators.datapoints && (
          <>
            <ArkLineChart
              input={selectedInvestigators.datapoints["2019"]}
              ids={investigatorCodes}
              year="2019"
            />
            <ArkLineChart
              input={selectedInvestigators.datapoints["2020"]}
              ids={investigatorCodes}
              year="2020"
            />
          </>
        )}
      </div>
    );
}
