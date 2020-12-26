import React, {useEffect} from 'react';
import {InvestigatorLineChart}  from './Charts/LineChart';
import {InvestigatorBarChart}  from './Charts/BarChart';
import { getInvestigatorComparisonByDate} from '../utils/requests';
import {APIResponse, CHARTTYPE} from '../types';
import {determineDataTypeMode} from '../types';

type Props = {
  investigatorCodes: string[];
  year: number;
  mode: boolean;
  chartType: CHARTTYPE;
}

export const InvestigatorComparison = ({investigatorCodes, year, mode, chartType}: Props) =>  {
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
          chartType === CHARTTYPE.BAR
          ? <InvestigatorBarChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              year={selectedYear}
              mode={mode}
            />
          :  <InvestigatorLineChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              year={selectedYear}
              mode={mode}
            />
        )}
      </div>
    );
}
