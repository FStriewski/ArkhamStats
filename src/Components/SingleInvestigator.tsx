import React, { useEffect } from 'react';
import { InvestigatorLineChart } from './Charts/LineChart';
import { InvestigatorBarChart } from './Charts/BarChart';
import { InvestigatorAreaChart } from './Charts/AreaChart';
import {
  getInvestigatorDistributionByDate,
  getInvestigatorSumByDate
} from '../utils/requests';
import {
  APIResponse,
  CHARTTYPE,
  determineDataTypeMode,
  NUMMODE
} from '../types';
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { investigatorList } from '../lookups/investigatorList';

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120
  // },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

type Props = {
  year: number;
  handleSetYear: (event: any, year: number) => void;
  dataMode: boolean;
  chartType: CHARTTYPE;
  numMode: NUMMODE;
  investigatorCode: string;
};

export const SingleInvestigator = ({
  year,
  handleSetYear,
  dataMode,
  chartType,
  numMode,
  investigatorCode
}: Props): React.ReactElement => {
  const classes = useStyles();
  // const [investigatorCode, setInvestigatorCode] = React.useState('01004');
  const [
    selectedInvestigators,
    chooseInvestigators
  ] = React.useState<APIResponse>();

  const selectedYear = year.toString();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse =
        numMode === NUMMODE.DIST
          ? await getInvestigatorDistributionByDate(investigatorCode)
          : await getInvestigatorSumByDate(investigatorCode);
      chooseInvestigators(result);
    };
    fetchData().catch((e) => console.log(e));
  }, [investigatorCode]);

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setInvestigatorCode(event.target.value as string);
  // };
  const dataType = determineDataTypeMode(dataMode);
  return (
    <>
      {selectedInvestigators &&
        selectedInvestigators[dataType] &&
        (chartType === CHARTTYPE.BAR ? (
          <InvestigatorBarChart
            input={selectedInvestigators[dataType][selectedYear]}
            ids={[investigatorCode]}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : chartType === CHARTTYPE.LINE ? (
          <InvestigatorLineChart
            input={selectedInvestigators[dataType][selectedYear]}
            ids={[investigatorCode]}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : (
          <InvestigatorAreaChart
            input={selectedInvestigators[dataType][selectedYear]}
            ids={[investigatorCode]}
            dataMode={dataMode}
            numMode={numMode}
          />
        ))}
    </>
  );
};
