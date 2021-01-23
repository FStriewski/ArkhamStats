import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InvestigatorLineChart } from '../Charts/LineChart';
import { InvestigatorBarChart } from '../Charts/BarChart';
import { InvestigatorAreaChart } from '../Charts/AreaChart';
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
  SingleInvestigator
} from '../../types';
import { ViewWrapper, ViewRow, ViewColumn } from '../UI/ViewWrapper';
import { FactBoxes, forComparison } from '../UI/FactBoxes';
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
    (selectedInvestigators[dataType][selectedYear] as SingleInvestigator[]);
  const ids = investigatorCodes;

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedInvestigators && (
                <FactBoxes
                  input={forComparison(ids)}
                  deleteFromSelection={deleteFromSelection}
                  closable
                />
              )}
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
