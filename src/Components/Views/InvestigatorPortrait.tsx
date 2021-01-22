import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controls } from '../UI/Controls';
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
import { FactBoxes } from '../UI/FactBoxes';
import { getInvestigatorDistributionByDate } from '../../utils/requests';
import { YearSlider } from '../UI/YearSlider';
import { lookupInvestigator } from '../../lookups/helpers';

type Props = {
  dataMode: boolean;
  chartType: CHARTTYPE;
  setChartType: (type: CHARTTYPE) => void;
  year: number;
  handleSetYear: (event: React.ChangeEvent, year: number) => void;
  setMode: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  investigatorCode: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  viewWrapper: {
    // flexGrow: 1
  },
  pieChartBundle: {
    margin: '0 auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  control: {
    marginLeft: 'auto'
  },
  pieContainer: {
    marginTop: '50px'
  }
}));

export const InvestigatorPortrait = ({
  dataMode,
  chartType,
  setChartType,
  setMode,
  year,
  handleSetYear,
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

  return (
    <ViewWrapper>
      <ViewRow>
        <>
          <ViewColumn>
            <>
              {selectedInvestigator && (
                <FactBoxes meta={meta} id={investigatorCode} />
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
            <>
              <div className={classes.pieContainer}>
                {selectedInvestigator && (
                  <div className={classes.pieChartBundle}>
                    <InvestigatorPerFactionPieChart
                      meta={selectedInvestigator.meta}
                      ids={[investigatorCode]}
                      factionCode={
                        lookupInvestigator(investigatorCode).faction_code
                      }
                    />
                    <InvestigatorPerTotalPieChart
                      meta={selectedInvestigator.meta}
                      ids={[investigatorCode]}
                      factionCode={
                        lookupInvestigator(investigatorCode).faction_code
                      }
                    />
                  </div>
                )}
              </div>
            </>
          </div>
          <YearSlider handleSetYear={handleSetYear} year={year} />
          <Controls
            dataMode={dataMode}
            setRelMode={setMode}
            chartType={chartType}
            setChartType={setChartType}
          />
        </>
      </ViewRow>
    </ViewWrapper>
  );
};
