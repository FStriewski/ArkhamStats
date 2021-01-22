import React, { useEffect } from 'react';
import { InvestigatorLineChart } from '../Charts/LineChart';
import { InvestigatorBarChart } from '../Charts/BarChart';
import { InvestigatorAreaChart } from '../Charts/AreaChart';
import {
  getMultipleInvestigatorDistributionByDate,
  getMultipleInvestigatorSumByDate
} from '../../utils/requests';
import {
  determineDataTypeMode,
  APIResponse,
  CHARTTYPE,
  NUMMODE,
  SingleInvestigator
} from '../../types';
import { ViewWrapper, ViewRow, ViewColumn } from '../UI/ViewWrapper';

type Props = {
  investigatorCodes: string[];
  year: number;
  dataMode: boolean;
  chartType: CHARTTYPE;
  numMode: NUMMODE;
};

export const InvestigatorComparison = ({
  investigatorCodes,
  year,
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
  const input =
    selectedInvestigators &&
    selectedInvestigators[dataType] &&
    (selectedInvestigators[dataType][selectedYear] as SingleInvestigator[]);

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            {selectedInvestigators &&
              selectedInvestigators[dataType] &&
              (chartType === CHARTTYPE.BAR ? (
                <InvestigatorBarChart
                  input={input}
                  ids={investigatorCodes}
                  dataMode={dataMode}
                  numMode={numMode}
                />
              ) : chartType === CHARTTYPE.LINE ? (
                <InvestigatorLineChart
                  input={input}
                  ids={investigatorCodes}
                  dataMode={dataMode}
                  numMode={numMode}
                />
              ) : (
                <InvestigatorAreaChart
                  input={input}
                  ids={investigatorCodes}
                  dataMode={dataMode}
                  numMode={numMode}
                />
              ))}
          </ViewColumn>
        </>
      </ViewRow>
    </ViewWrapper>
  );
};
