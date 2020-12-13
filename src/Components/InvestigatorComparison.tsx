import React, {useState, useEffect} from 'react';
import {ArkLineChart}  from './Charts/LineChart';
import { getInvestigatorComparisonByDate} from '../utils/requests';
import {APIResponse} from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const InvestigatorComparison = ({investigatorCodes, year}: {investigatorCodes: string[], year: number}) =>  {
  const classes = useStyles();
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

  const selectedYear = year.toString();


    return (
      <div className="App">
        {/* <FormControl className={classes.formControl}></FormControl> */}
        {selectedInvestigators && selectedInvestigators.datapoints && (
          <>
            <ArkLineChart
              input={selectedInvestigators.datapoints[selectedYear]}
              ids={investigatorCodes}
              year={selectedYear}
            />
          </>
        )}
      </div>
    );
}
