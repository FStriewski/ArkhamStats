import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#3f51b5',
    fontWeight: 500,
    fontSize: '16px'
  }
}));

type Props = {
  dataMode: boolean;
  setRelMode: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

export const ModeSwitch = ({
  dataMode,
  setRelMode
}: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <Grid item>
        <Switch
          checked={dataMode}
          onChange={setRelMode}
          name='dataMode'
          color='primary'
        />
        [%]
      </Grid>
    </div>
  );
};
