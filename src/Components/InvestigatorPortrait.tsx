import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controls } from './UI/Controls';
import {
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode,
  APIResponse
} from '../types';
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
    justify: 'right',
    float: 'right'
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
    selectedInvestigators,
    chooseInvestigators
  ] = React.useState<APIResponse>();

  const selectedYear = year.toString();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse = (await getInvestigatorDistributionByDate(
        investigatorCode
      )) as APIResponse;
      chooseInvestigators(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorCode]);

  const dataType = determineDataTypeMode(dataMode);
  const color: string = null;

  return (
    <div className={classes.viewWrapper}>
      <Title content='Investigator Portrait' />
      {/* <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Investigator</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={investigatorCode}
          onChange={handleDropdown}
        >
          {investigatorList.map((inv) => (
            <MenuItem key={inv.code} value={inv.code}>
              {inv.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <div className={classes.chartBundle}>
        <Controls
          dataMode={dataMode}
          setRelMode={setMode}
          chartType={chartType}
          setChartType={setChartType}
        />
        {selectedInvestigators &&
          selectedInvestigators[dataType] &&
          (chartType === CHARTTYPE.BAR ? (
            <InvestigatorBarChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={[investigatorCode]}
              dataMode={dataMode}
              color={color}
              numMode={NUMMODE.DIST}
            />
          ) : chartType === CHARTTYPE.LINE ? (
            <InvestigatorLineChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={[investigatorCode]}
              dataMode={dataMode}
              color={color}
              numMode={NUMMODE.DIST}
            />
          ) : (
            <InvestigatorAreaChart
              input={selectedInvestigators[dataType][selectedYear]}
              ids={[investigatorCode]}
              dataMode={dataMode}
              color={color}
              numMode={NUMMODE.DIST}
            />
          ))}
        {/* <SingleInvestigator
          year={year}
          dataMode={dataMode}
          chartType={chartType}
          numMode={NUMMODE.DIST}
          handleSetYear={handleSetYear}
          investigatorCode={investigatorCode}
        />
      </div> */}
        <YearSlider handleSetYear={handleSetYear} year={year} />
      </div>
    </div>
  );
};
