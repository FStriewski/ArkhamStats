import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ViewWrapper, ViewRow, ViewColumn } from '../UI/ViewWrapper';
import {
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode,
  APIResponse,
  DataPoints,
  SingleInvestigator
} from '../../types';
import {
  InvestigatorPerFactionPieChart,
  InvestigatorPerTotalPieChart
} from '../Charts/PieChart';
import { InvestigatorLineChart } from '../Charts/LineChart';
import { InvestigatorBarChart } from '../Charts/BarChart';
import { InvestigatorAreaChart } from '../Charts/AreaChart';
import { FactBoxes, forPortrait } from '../UI/FactBoxes';
import { getInvestigatorDistributionByDate } from '../../utils/requests';
import { lookupInvestigator } from '../../lookups/helpers';

type Props = {
  dataMode: boolean;
  chartType: CHARTTYPE;
  year: number;
  investigatorCode: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  pieChartBundle: {
    margin: '0 auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  control: {
    marginLeft: 'auto'
  }
}));

export const InvestigatorPortrait = ({
  dataMode,
  chartType,
  year,
  investigatorCode
}: Props): React.ReactElement => {
  const classes = useStyles();

  const [
    selectedInvestigator,
    chooseInvestigators
  ] = React.useState<APIResponse>();

  const selectedYear = year.toString();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse = await getInvestigatorDistributionByDate(
        investigatorCode
      );
      chooseInvestigators(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorCode]);

  const dataType = determineDataTypeMode(dataMode);
  const input =
    selectedInvestigator &&
    (selectedInvestigator[dataType] as DataPoints) &&
    (selectedInvestigator[dataType][selectedYear] as SingleInvestigator[]);
  const meta = selectedInvestigator && selectedInvestigator.meta;
  const ids = [investigatorCode];
  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedInvestigator && (
                <FactBoxes input={forPortrait({ ids, meta })} />
              )}
              {selectedInvestigator &&
                (selectedInvestigator[dataType] as DataPoints) &&
                (chartType === CHARTTYPE.BAR ? (
                  <InvestigatorBarChart
                    input={input}
                    ids={[investigatorCode]}
                    dataMode={dataMode}
                    numMode={NUMMODE.DIST}
                  />
                ) : chartType === CHARTTYPE.LINE ? (
                  <InvestigatorLineChart
                    input={input}
                    ids={[investigatorCode]}
                    dataMode={dataMode}
                    numMode={NUMMODE.DIST}
                  />
                ) : (
                  <InvestigatorAreaChart
                    input={input}
                    ids={[investigatorCode]}
                    dataMode={dataMode}
                    numMode={NUMMODE.DIST}
                  />
                ))}
            </>
          </ViewColumn>
          <div style={{ margin: '0 auto' }}>
            {selectedInvestigator && (
              <div className={classes.pieChartBundle}>
                <InvestigatorPerFactionPieChart
                  meta={selectedInvestigator.meta}
                  ids={[investigatorCode]}
                  factionCodes={[
                    lookupInvestigator(investigatorCode).faction_code
                  ]}
                />
                <InvestigatorPerTotalPieChart
                  meta={selectedInvestigator.meta}
                  ids={[investigatorCode]}
                  factionCodes={[
                    lookupInvestigator(investigatorCode).faction_code
                  ]}
                />
              </div>
            )}
          </div>
        </>
      </ViewRow>
    </ViewWrapper>
  );
};
