import React, { useEffect } from 'react';
import { ClassLineChart } from '../Charts/LineChart';
import { ClassBarChart } from '../Charts/BarChart';
import { ClassAreaChart } from '../Charts/AreaChart';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode,
  APIResponse,
  SingleInvestigator
} from '../../types';

import { investigatorClassColor } from '../../lookups/lists';
import {
  getClassDistributionByDate,
  getClassSumByDate
} from '../../utils/requests';
import { ViewWrapper, ViewRow, ViewColumn } from '../UI/ViewWrapper';
import { FactBoxes, forComparison } from '../UI/FactBoxes';

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
  // const [investigatorClass, setInvestigatorClass] = React.useState('all');

  const [selectedClassDist, chooseClassDist] = React.useState<APIResponse>();
  const [selectedClassSum, chooseClassSum] = React.useState<APIResponse>();

  const selectedYear = year.toString();
  const investigatorClass = iclassSelection[0];

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse = await getClassDistributionByDate(
        investigatorClass
      );
      chooseClassDist(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorClass]);

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse = await getClassSumByDate(investigatorClass);
      chooseClassSum(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorClass]);

  const investigatorClassList = Object.keys(investigatorClassColor).map(
    (entry) => ({
      name: entry,
      color: investigatorClassColor[entry] as string
    })
  );
  const dataType = determineDataTypeMode(dataMode);
  const color =
    investigatorClass === 'all'
      ? '#000000'
      : (investigatorClassColor[investigatorClass] as string);
  const input =
    selectedClassDist &&
    selectedClassDist[dataType] &&
    (selectedClassDist[dataType][selectedYear] as SingleInvestigator[]);
  const ids = investigatorClass;

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedClassDist && (
                <FactBoxes
                  deleteFromSelection={deleteFromSelection}
                  input={forComparison([ids])}
                  closable
                />
              )}

              {selectedClassDist &&
                selectedClassDist[dataType] &&
                (chartType === CHARTTYPE.BAR ? (
                  <ClassBarChart
                    input={input}
                    ids={[investigatorClass]}
                    color={color}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ) : chartType === CHARTTYPE.LINE ? (
                  <ClassLineChart
                    input={input}
                    ids={[investigatorClass]}
                    color={color}
                    dataMode={dataMode}
                    numMode={numMode}
                  />
                ) : (
                  <ClassAreaChart
                    input={input}
                    ids={[investigatorClass]}
                    color={color}
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
