import React, { useEffect } from 'react';
import { InvestigatorLineChart } from './Charts/LineChart';
import { InvestigatorBarChart } from './Charts/BarChart';
import { InvestigatorAreaChart } from './Charts/AreaChart';
import {
  getInvestigatorDistributionByDate,
  getInvestigatorSumByDate
} from '../utils/requests';
import {
  APIResponse,
  CHARTTYPE,
  determineDataTypeMode,
  SingleInvestigator,
  NUMMODE
} from '../types';

type Props = {
  year: number;
  dataMode: boolean;
  chartType: CHARTTYPE;
  numMode: NUMMODE;
  investigatorCode: string;
};

export const SingleInvestigatorComponent = ({
  year,
  dataMode,
  chartType,
  numMode,
  investigatorCode
}: Props): React.ReactElement => {
  const [
    selectedInvestigators,
    chooseInvestigators
  ] = React.useState<APIResponse>();

  const selectedYear = year.toString();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse =
        numMode === NUMMODE.DIST
          ? await getInvestigatorDistributionByDate(investigatorCode)
          : await getInvestigatorSumByDate(investigatorCode);
      chooseInvestigators(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorCode]);

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setInvestigatorCode(event.target.value as string);
  // };
  const dataType = determineDataTypeMode(dataMode);
  const input =
    selectedInvestigators &&
    selectedInvestigators[dataType] &&
    (selectedInvestigators[dataType][selectedYear] as SingleInvestigator[]);
  return (
    <>
      {selectedInvestigators &&
        selectedInvestigators[dataType] &&
        (chartType === CHARTTYPE.BAR ? (
          <InvestigatorBarChart
            input={input}
            ids={[investigatorCode]}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : chartType === CHARTTYPE.LINE ? (
          <InvestigatorLineChart
            input={input}
            ids={[investigatorCode]}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : (
          <InvestigatorAreaChart
            input={input}
            ids={[investigatorCode]}
            dataMode={dataMode}
            numMode={numMode}
          />
        ))}
    </>
  );
};
