import React, { useEffect } from 'react';
import { ILineChart } from '../Charts/LineChart';
import { IBarChart } from '../Charts/BarChart';
import { IAreaChart } from '../Charts/AreaChart';
import {
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode,
  APIResponse,
  SinglePoint,
  CONTEXTMODE
} from '../../types';
import {
  getClassDistributionByDate,
  getClassSumByDate
} from '../../utils/requests';
import { ViewWrapper, ViewRow, ViewColumn } from '../UI/ViewWrapper';
import { FactBoxes, forClassComparison } from '../UI/FactBoxes';

type Props = {
  dataMode: boolean;
  iclassSelection: string[];
  chartType: CHARTTYPE;
  numMode: NUMMODE;
  year: number;
  deleteFromSelection: (event) => void;
};

export const InvestigatorClasses = ({
  dataMode,
  chartType,
  year,
  iclassSelection,
  deleteFromSelection,
  numMode
}: Props): React.ReactElement => {
  if (!iclassSelection.length) {
    return;
  }

  const [selectedClasses, chooseClass] = React.useState<APIResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse =
        numMode === NUMMODE.DIST
          ? await getClassDistributionByDate(iclassSelection)
          : await getClassSumByDate(iclassSelection);

      chooseClass(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [iclassSelection]);

  const selectedYear = year.toString();
  const dataType = determineDataTypeMode(dataMode);
  const input =
    selectedClasses &&
    selectedClasses[dataType] &&
    (selectedClasses[dataType][selectedYear] as SinglePoint[]);

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedClasses && (
                <FactBoxes
                  deleteFromSelection={deleteFromSelection}
                  input={forClassComparison(iclassSelection)}
                  closable
                />
              )}
              {selectedClasses &&
                selectedClasses[dataType] &&
                (chartType === CHARTTYPE.BAR ? (
                  <IBarChart
                    input={input}
                    ids={iclassSelection}
                    context={CONTEXTMODE.ICLASS}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ) : chartType === CHARTTYPE.LINE ? (
                  <ILineChart
                    input={input}
                    ids={iclassSelection}
                    context={CONTEXTMODE.ICLASS}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ) : (
                  <IAreaChart
                    input={input}
                    ids={iclassSelection}
                    context={CONTEXTMODE.ICLASS}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ))}
            </>
          </ViewColumn>
        </>
      </ViewRow>
    </ViewWrapper>
  );
};
