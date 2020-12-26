import React, {useEffect} from 'react';
import {InvestigatorLineChart}  from './Charts/LineChart';
import { getInvestigatorComparisonByDate} from '../utils/requests';
import {APIResponse} from '../types';
import {determineDataTypeMode} from '../types';

export const InvestigatorComparison = ({investigatorCodes, year, mode}: {investigatorCodes: string[], year: number, mode: boolean}) =>  {
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
      <div>
        {selectedInvestigators && selectedInvestigators[dataType] && (
            <InvestigatorLineChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              year={selectedYear}
              mode={mode}
            />
        )}
      </div>
    );
}
