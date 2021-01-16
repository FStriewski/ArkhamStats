import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controls } from './UI/Controls';
import Grid from '@material-ui/core/Grid';

import {
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode,
  APIResponse,
  SingleInvestigator,
  DataPoints
} from '../types';
import {
  InvestigatorPerFactionPieChart,
  InvestigatorPerTotalPieChart
} from './Charts/PieChart';
import { InvestigatorLineChart } from './Charts/LineChart';
import { InvestigatorBarChart } from './Charts/BarChart';
import { InvestigatorAreaChart } from './Charts/AreaChart';
import {
  getInvestigatorDistributionByDate,
  getInvestigatorSumByDate
} from '../utils/requests';
import { YearSlider } from './UI/YearSlider';
import { Title, SubTitle } from './UI/Title';
import {
  lookupInvestigator,
  investigatorClassColor
} from '../lookups/investigatorList';

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
    // justifyContent: 'center'
  },
  chartBundle: {
    // width: '1000px'
    // justify: 'right'
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

  // datapoints_absolute: {
  //   2016: [{date: "2016-01", 01004: 0}

  return (
    <div className={classes.viewWrapper}>
      {/* <div> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title content='Investigator Portrait' />
        </Grid>
        <Grid item xs={7}>
          <div className={classes.chartBundle}>
            <Controls
              dataMode={dataMode}
              setRelMode={setMode}
              chartType={chartType}
              setChartType={setChartType}
            />
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
          </div>
        </Grid>
        <Grid
          item
          xs={5}
          style={{
            marginTop: '20px',
            marginBottom: '60px',
            marginLeft: '-30px',
            border: '1px solid #e0e0e0'
          }}
        >
          <Grid container spacing={3}>
            {selectedInvestigator && (
              <>
                <Grid item xs={6}>
                  <InvestigatorPerFactionPieChart
                    meta={selectedInvestigator.meta}
                    ids={[investigatorCode]}
                    factionCode={
                      lookupInvestigator(investigatorCode).faction_code
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <InvestigatorPerTotalPieChart
                    meta={selectedInvestigator.meta}
                    ids={[investigatorCode]}
                    factionCode={
                      lookupInvestigator(investigatorCode).faction_code
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>

      <YearSlider handleSetYear={handleSetYear} year={year} />
    </div>
  );
};
