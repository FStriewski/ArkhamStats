import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      paper: {
      width: '200px',
      height: '40px',
      display: "flex",
      padding: '10px',
      justifyContent: "center",
      float: 'right'
    },
  })
);
type Props = {mode: boolean; setRelMode: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;}

export const ModeSwitch = ({mode, setRelMode}: Props) => {
  const classes = useStyles();

  return (
  <Paper className={classes.paper}>
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Absolute</Grid>
          <Grid item>
            <AntSwitch checked={mode} onChange={setRelMode} name="mode" />
          </Grid>
          <Grid item>Relative</Grid>
        </Grid>
      </Typography>
    </FormGroup>
    </Paper>
  );
}