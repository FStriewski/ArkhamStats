import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    box: {
      display: "flex",
      flexDirection: 'row',
      alignItems: 'center',
    },
}));

type Props = {mode: boolean; setRelMode: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;}

export const ModeSwitch = ({mode, setRelMode}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <Grid item>Absolute</Grid>
      <Grid item>
        <Switch
          checked={mode}
          onChange={setRelMode}
          name="mode"
          color="primary"
      />
      </Grid>
      <Grid item>Relative</Grid>
    </div>
  );
}