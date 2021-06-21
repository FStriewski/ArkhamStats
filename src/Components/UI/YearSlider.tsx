import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import { createStyles, makeStyles } from '@material-ui/core/styles';

type YearSliderProps = {
  year: number;
  handleSetYear: (event: React.ChangeEvent, year: number) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: '550px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center'
    },
    slider: {
      maxWidth: '450px',
      marginBottom: '20px',
      position: 'relative'
    }
  })
);

export const YearSlider = ({
  handleSetYear,
  year
}: YearSliderProps): React.ReactElement => {
  const classes = useStyles();

  const marks = [
    {
      value: 2016,
      label: '2016'
    },
    {
      value: 2017,
      label: '2017'
    },
    {
      value: 2018,
      label: '2018'
    },
    {
      value: 2019,
      label: '2019'
    },
    {
      value: 2020,
      label: '2020'
    },
    {
      value: 2021,
      label: '2021'
    },
    {
      value: 2022,
      label: '2022'
    }
  ];
  return (
    <Paper className={classes.paper}>
      <Slider
        className={classes.slider}
        defaultValue={2020}
        min={2016}
        max={2022}
        step={1}
        marks={marks}
        track={false}
        value={year}
        onChange={handleSetYear}
      />
    </Paper>
  );
};
