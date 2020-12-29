import React, {useEffect} from 'react';
import {InvestigatorLineChart}  from './Charts/LineChart';
import {InvestigatorBarChart}  from './Charts/BarChart';
import {InvestigatorAreaChart}  from './Charts/AreaChart';
import { getMultipleInvestigatorDistributionByDate} from '../utils/requests';
import {determineDataTypeMode, APIResponse, CHARTTYPE, NUMMODE} from '../types';

type Props = {
  investigatorCodes: string[];
  year: number;
  dataMode: boolean;
  chartType: CHARTTYPE;
  numMode: NUMMODE;
}

export const InvestigatorComparison = ({investigatorCodes, year, dataMode, chartType, numMode}: Props) =>  {
  const [selectedInvestigators, chooseInvestigators] = React.useState<APIResponse>();

  useEffect(
         () => {
          const fetchData = async() => { 
            const result: APIResponse = await getMultipleInvestigatorDistributionByDate(investigatorCodes)
            chooseInvestigators(result)
         }
         fetchData()
        }
        , [investigatorCodes]
  )

  const selectedYear = year.toString();
  const dataType = determineDataTypeMode(dataMode)
  const color = '#FF0000';

    return (
      <div>
        {selectedInvestigators && selectedInvestigators[dataType] && (
          chartType === CHARTTYPE.BAR
          ? <InvestigatorBarChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              dataMode={dataMode}
              color={color}
              numMode={numMode}
              />
              :  chartType === CHARTTYPE.LINE
              ? <InvestigatorLineChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              dataMode={dataMode}
              color={color}
              numMode={numMode}
              />
              : <InvestigatorAreaChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={investigatorCodes}
              dataMode={dataMode}
              numMode={numMode}
            />
        )}
      </div>
    );
}
