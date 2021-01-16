import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controls } from './UI/Controls';
import Grid from '@material-ui/core/Grid';

import {
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode,
  APIResponse,
  DataPoints
} from '../types';
import {
  InvestigatorPerFactionPieChart,
  InvestigatorPerTotalPieChart
} from './Charts/PieChart';
import { InvestigatorLineChart } from './Charts/LineChart';
import { InvestigatorBarChart } from './Charts/BarChart';
import { InvestigatorAreaChart } from './Charts/AreaChart';
import { getInvestigatorDistributionByDate } from '../utils/requests';
import { YearSlider } from './UI/YearSlider';
import { Title } from './UI/Title';
import { lookupInvestigator } from '../lookups/investigatorList';

type Props = {
  dataMode: boolean;
  chartType: CHARTTYPE;
  setChartType: (type: CHARTTYPE) => void;
  year: number;
  handleSetYear: (event: any, year: number) => void;
  setMode: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  investigatorCode: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  viewWrapper: {
    flexGrow: 1
  },
  pieChartBundle: {
    display: 'flex',
    flexDirection: 'column'
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

  return (
    <div className={classes.viewWrapper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title content='Investigator Portrait' />
        </Grid>
        <Grid item xs={9}>
          {selectedInvestigator &&
            (selectedInvestigator[dataType] as DataPoints) &&
            (chartType === CHARTTYPE.BAR ? (
              <InvestigatorBarChart
                input={selectedInvestigator[dataType][selectedYear]}
                ids={[investigatorCode]}
                dataMode={dataMode}
                numMode={NUMMODE.DIST}
              />
            ) : chartType === CHARTTYPE.LINE ? (
              <InvestigatorLineChart
                input={selectedInvestigator[dataType][selectedYear]}
                ids={[investigatorCode]}
                dataMode={dataMode}
                numMode={NUMMODE.DIST}
              />
            ) : (
              <InvestigatorAreaChart
                input={selectedInvestigator[dataType][selectedYear]}
                ids={[investigatorCode]}
                dataMode={dataMode}
                numMode={NUMMODE.DIST}
              />
            ))}
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            marginTop: '30px',
            marginLeft: '-30px',
            border: '1px solid #e0e0e0'
          }}
        >
          <Grid container spacing={1}>
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
          </Grid>
        </Grid>
      </Grid>
      <YearSlider handleSetYear={handleSetYear} year={year} />
      <Controls
        dataMode={dataMode}
        setRelMode={setMode}
        chartType={chartType}
        setChartType={setChartType}
      />
    </div>
  );
};
