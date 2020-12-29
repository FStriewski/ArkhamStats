import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ModeSwitch } from './ModeSwitch';
import Button from '@material-ui/core/Button';
import { CHARTTYPE } from '../../types';


const useStyles = makeStyles(() =>
  createStyles({
      paper: {
      width: '500px',
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px',
      float: 'right'
    },
    button: {
      margin: '0 10px'
    }
  })
);
type Props = {
  dataMode: boolean; 
  setRelMode: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  chartType:  CHARTTYPE;
  setChartType: (type: CHARTTYPE) => void;
}

export const Controls = ({dataMode, setRelMode, chartType, setChartType}: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div>
        <Button className={classes.button} size='small' variant={chartType === CHARTTYPE.BAR ? "contained" : "outlined"} color="primary" onClick={()=> setChartType(CHARTTYPE.BAR)}>
        Bar
        </Button>
        <Button className={classes.button} size='small'  variant={chartType === CHARTTYPE.LINE ? "contained" : "outlined"} color="primary" onClick={()=> setChartType(CHARTTYPE.LINE)}>
        Line
        </Button>
        <Button className={classes.button} size='small' variant={chartType === CHARTTYPE.AREA ? "contained" : "outlined"} color="primary" onClick={()=> setChartType(CHARTTYPE.AREA)}>
        Area
        </Button>
      </div>
      <div>
      <ModeSwitch dataMode={dataMode} setRelMode={setRelMode} />
      </div>
    </Paper>
  );
}