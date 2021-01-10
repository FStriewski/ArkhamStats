import React, { useEffect } from 'react';
import { InvestigatorLineChart } from './Charts/LineChart';
import { InvestigatorBarChart } from './Charts/BarChart';
import { InvestigatorAreaChart } from './Charts/AreaChart';
import {
  getMultipleInvestigatorDistributionByDate,
  getMultipleInvestigatorSumByDate
} from '../utils/requests';
import {
  determineDataTypeMode,
  APIResponse,
  CHARTTYPE,
  NUMMODE
} from '../types';

type Props = {
  investigatorCodes: string[];
  year: number;
  handleSetYear: (event: any, year: number) => void;
  dataMode: boolean;
  chartType: CHARTTYPE;
  numMode: NUMMODE;
};

export const InvestigatorComparison = ({
  investigatorCodes,
  year,
  handleSetYear,
  dataMode,
  chartType,
  numMode
}: Props): React.ReactElement => {
  const [
    selectedInvestigators,
    chooseInvestigators
  ] = React.useState<APIResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse =
        numMode === NUMMODE.DIST
          ? await getMultipleInvestigatorDistributionByDate(investigatorCodes)
          : await getMultipleInvestigatorSumByDate(investigatorCodes);
      chooseInvestigators(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorCodes]);

  const selectedYear = year.toString();
  const dataType = determineDataTypeMode(dataMode);
  const color = '#FF0000';

  return (
    <div>
      {selectedInvestigators &&
        selectedInvestigators[dataType] &&
        (chartType === CHARTTYPE.BAR ? (
          <InvestigatorBarChart
            input={selectedInvestigators[dataType][selectedYear]}
            ids={investigatorCodes}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : chartType === CHARTTYPE.LINE ? (
          <InvestigatorLineChart
            input={selectedInvestigators[dataType][selectedYear]}
            ids={investigatorCodes}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : (
          <InvestigatorAreaChart
            input={selectedInvestigators[dataType][selectedYear]}
            ids={investigatorCodes}
            dataMode={dataMode}
            numMode={numMode}
          />
        ))}
    </div>
  );
};
