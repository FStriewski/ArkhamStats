import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ModeSwitch } from './ModeSwitch';
import Button from '@material-ui/core/Button';
import { CHARTTYPE } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      // bottom: '50px',
      // left: '300px',
      height: '60px',
      // position: 'absolute',
      cursor: 'pointer',
      backgroundColor: 'white',
      width: '400px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
      // padding: '5px',
      // marginRight: 'auto'
    },
    button: {}
  })
);
type Props = {
  dataMode: boolean;
  setRelMode: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  chartType: CHARTTYPE;
  setChartType: (type: CHARTTYPE) => void;
};

export const Controls = ({
  dataMode,
  setRelMode,
  chartType,
  setChartType
}: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Button
        className={classes.button}
        size='small'
        variant={chartType === CHARTTYPE.BAR ? 'contained' : 'outlined'}
        color='primary'
        onClick={() => setChartType(CHARTTYPE.BAR)}
      >
        Bar
      </Button>
      <Button
        className={classes.button}
        size='small'
        variant={chartType === CHARTTYPE.LINE ? 'contained' : 'outlined'}
        color='primary'
        onClick={() => setChartType(CHARTTYPE.LINE)}
      >
        Line
      </Button>
      <Button
        className={classes.button}
        size='small'
        variant={chartType === CHARTTYPE.AREA ? 'contained' : 'outlined'}
        color='primary'
        onClick={() => setChartType(CHARTTYPE.AREA)}
      >
        Area
      </Button>
      <div>
        <ModeSwitch dataMode={dataMode} setRelMode={setRelMode} />
      </div>
    </Paper>
  );
};
