import React, { useEffect } from 'react';
import { ClassLineChart } from './Charts/LineChart';
import { ClassBarChart } from './Charts/BarChart';
import { ClassAreaChart } from './Charts/AreaChart';
import {
  getClassDistributionByDate,
  getClassSumByDate
} from '../utils/requests';
import {
  APIResponse,
  CHARTTYPE,
  NUMMODE,
  determineDataTypeMode
} from '../types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { investigatorClassColor } from '../lookups/investigatorList';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
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
  investigatorClass: string;
  dataType: any;
  color: string;
};

export const TotalCount = ({
  year,
  handleSetYear,
  dataMode,
  chartType,
  numMode,
  investigatorClass,
  dataType,
  color
}: Props): React.ReactElement => {
  const classes = useStyles();
  // const [investigatorClass, setInvestigatorClass] = React.useState('all');
  const [selectedClass, chooseClass] = React.useState<APIResponse>();

  const selectedYear = year.toString();

  useEffect(() => {
    const fetchData = async () => {
      const result: APIResponse =
        numMode === NUMMODE.DIST
          ? await getClassDistributionByDate(investigatorClass)
          : await getClassSumByDate(investigatorClass);
      chooseClass(result);
    };
    fetchData();
  }, [investigatorClass]);

  // const changeInvestigatorClass = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setInvestigatorClass(event.target.value as string);
  // };
  // const investigatorClassList = Object.keys(
  //   investigatorClassColor
  // ).map((entry) => ({ name: entry, color: investigatorClassColor[entry] }));
  // const dataType = determineDataTypeMode(dataMode);
  // const color =
  //   investigatorClass === 'all'
  //     ? '#000000'
  //     : investigatorClassColor[investigatorClass];

  return (
    <div>
      {/* <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Class</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={investigatorClass}
          onChange={handleChange}
        >
          {investigatorClassList.map((cls) => (
            <MenuItem key={cls.name} value={cls.name}>
              {cls.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {selectedClass &&
        selectedClass[dataType] &&
        (chartType === CHARTTYPE.BAR ? (
          <ClassBarChart
            input={selectedClass[dataType][selectedYear]}
            ids={[investigatorClass]}
            color={color}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : chartType === CHARTTYPE.LINE ? (
          <ClassLineChart
            input={selectedClass[dataType][selectedYear]}
            ids={[investigatorClass]}
            color={color}
            dataMode={dataMode}
            numMode={numMode}
          />
        ) : (
          <ClassAreaChart
            input={selectedClass[dataType][selectedYear]}
            ids={[investigatorClass]}
            color={color}
            dataMode={dataMode}
            numMode={numMode}
          />
        ))}
    </div>
  );
};
