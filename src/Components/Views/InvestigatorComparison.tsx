import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ILineChart } from '../Charts/LineChart';
import { IBarChart } from '../Charts/BarChart';
import { IAreaChart } from '../Charts/AreaChart';
import {
  ComparisonPieChart,
  InvestigatorPerTotalPieChart
} from '../Charts/PieChart';
import {
  getMultipleInvestigatorDistributionByDate,
  getMultipleInvestigatorSumByDate
} from '../../utils/requests';
import {
  determineDataTypeMode,
  APIResponse,
  CHARTTYPE,
  NUMMODE,
  CONTEXTMODE,
  SinglePoint
} from '../../types';
import { ViewWrapper, ViewRow, ViewColumn } from '../UI/ViewWrapper';
import { FactBoxes, forInvComparison } from '../UI/FactBoxes';
import { lookupInvestigator } from '../../lookups/helpers';

type Props = {
  investigatorCodes: string[];
  year: number;
  dataMode: boolean;
  chartType: CHARTTYPE;
  numMode: NUMMODE;
  deleteFromSelection: (event) => void;
};

const useStyles = makeStyles(() => ({
  pieChartBundle: {
    margin: '0 auto'
  }
}));

export const InvestigatorComparison = ({
  investigatorCodes,
  year,
  dataMode,
  chartType,
  deleteFromSelection,
  numMode
}: Props): React.ReactElement => {
  const [
    selectedInvestigators,
    chooseInvestigators
  ] = React.useState<APIResponse>();
  const classes = useStyles();

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
    (selectedInvestigators[dataType][selectedYear] as SinglePoint[]);

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedInvestigators && (
                <FactBoxes
                  input={forInvComparison(investigatorCodes)}
                  deleteFromSelection={deleteFromSelection}
                  closable
                />
              )}
              {selectedInvestigators &&
                selectedInvestigators[dataType] &&
                (chartType === CHARTTYPE.BAR ? (
                  <IBarChart
                    input={input}
                    ids={investigatorCodes}
                    dataMode={dataMode}
                    numMode={numMode}
                    context={CONTEXTMODE.INVESTIGATOR}
                  />
                ) : chartType === CHARTTYPE.LINE ? (
                  <ILineChart
                    input={input}
                    ids={investigatorCodes}
                    dataMode={dataMode}
                    numMode={numMode}
                    context={CONTEXTMODE.INVESTIGATOR}
                  />
                ) : (
                  <IAreaChart
                    input={input}
                    ids={investigatorCodes}
                    dataMode={dataMode}
                    numMode={numMode}
                    context={CONTEXTMODE.INVESTIGATOR}
                  />
                ))}
            </>
          </ViewColumn>
          <div style={{ margin: '0 auto' }}>
            {selectedInvestigators && (
              <div className={classes.pieChartBundle}>
                <ComparisonPieChart
                  meta={selectedInvestigators.meta}
                  ids={investigatorCodes}
                  factionCodes={investigatorCodes.map(
                    (id) => lookupInvestigator(id).faction_code
                  )}
                />
                <InvestigatorPerTotalPieChart
                  meta={selectedInvestigators.meta}
                  ids={investigatorCodes}
                  factionCodes={investigatorCodes.map(
                    (id) => lookupInvestigator(id).faction_code
                  )}
                />
              </div>
            )}
          </div>
        </>
      </ViewRow>
    </ViewWrapper>
  );
};
