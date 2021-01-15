import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controls } from './UI/Controls';
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
  root: {
    flexGrow: 1
  },
  viewWrapper: {
    // justifyContent: 'center'
  },
  chartBundle: {
    width: '1000px',
    justify: 'right'
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
      <Title content='Investigator Portrait' />
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
        {selectedInvestigator && (
          <>
            <InvestigatorPerTotalPieChart
              meta={selectedInvestigator.meta}
              ids={[investigatorCode]}
            />
            <InvestigatorPerFactionPieChart
              meta={selectedInvestigator.meta}
              ids={[investigatorCode]}
            />
          </>
        )}
        <YearSlider handleSetYear={handleSetYear} year={year} />
      </div>
    </div>
  );
};
