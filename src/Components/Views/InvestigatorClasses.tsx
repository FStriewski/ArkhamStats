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

  const [selectedClass, chooseClass] = React.useState<APIResponse>();
  const investigatorClass = iclassSelection[0];

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse =
        numMode === NUMMODE.DIST
          ? await getClassDistributionByDate(investigatorClass)
          : await getClassSumByDate(investigatorClass);

      chooseClass(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorClass]);

  // const investigatorClassList = Object.keys(investigatorClassColor).map(
  //   (entry) => ({
  //     name: entry,
  //     color: investigatorClassColor[entry] as string
  //   })
  // );
  const selectedYear = year.toString();
  const dataType = determineDataTypeMode(dataMode);
  const input =
    selectedClass &&
    selectedClass[dataType] &&
    (selectedClass[dataType][selectedYear] as SinglePoint[]);

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedClass && (
                <FactBoxes
                  deleteFromSelection={deleteFromSelection}
                  input={forClassComparison(iclassSelection)}
                  closable
                />
              )}
              {selectedClass &&
                selectedClass[dataType] &&
                (chartType === CHARTTYPE.BAR ? (
                  <IBarChart
                    input={input}
                    ids={[investigatorClass]}
                    context={CONTEXTMODE.ICLASS}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ) : chartType === CHARTTYPE.LINE ? (
                  <ILineChart
                    input={input}
                    ids={[investigatorClass]}
                    context={CONTEXTMODE.ICLASS}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ) : (
                  <IAreaChart
                    input={input}
                    ids={[investigatorClass]}
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
