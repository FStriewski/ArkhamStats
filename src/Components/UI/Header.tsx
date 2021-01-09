import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1,
      marginLeft: '10px'
    }
  })
);

export const Header = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense' style={{ backgroundColor: '#000750' }}>
          <BarChartIcon />
          <Typography variant='h6' className={classes.title}>
            Arkham Stats
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
