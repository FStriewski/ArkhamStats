import React, {useEffect} from 'react';
import {ArkLineChart}  from './Charts/LineChart';
import { getInvestigatorComparisonByDate} from '../utils/requests';
import {APIResponse} from '../types';
import {MODE, determineDataTypeMode} from '../types';

export const InvestigatorComparison = ({investigatorCodes, year, mode}: {investigatorCodes: string[], year: number, mode: MODE}) =>  {
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
  const dataType = determineDataTypeMode(mode)

    return (
      <div className="App">
        {/* <FormControl className={classes.formControl}></FormControl> */}
        {selectedInvestigators && selectedInvestigators[dataType] && (
          <>
            <ArkLineChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              year={selectedYear}
            />
          </>
        )}
      </div>
    );
}
