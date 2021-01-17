import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography } from '@material-ui/core';
import { Meta } from '../../types';
import { lookupInvestigator } from '../../lookups/helpers';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      justifyContent: 'left'
      // flexGrow: 1
    },
    paper: {
      height: 100,
      width: 100,
      marginRight: '20px',
      padding: '8px'
    }
  })
);

type Props = {
  id: string;
  meta: Meta;
};

export const FactBoxes = ({ id, meta }: Props): React.ReactElement => {
  const classes = useStyles();
  const investigator = lookupInvestigator(id);

  const facts = [
    { name: 'Class:', val: investigator.faction },
    { name: 'Total Decks:', val: meta.numDecks[id] }
  ];

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center'>
          {facts.map((fact) => (
            <Grid key={fact.name} item>
              <Paper className={classes.paper}>
                <Typography
                  variant='subtitle2'
                  style={{
                    textAlign: 'left',
                    paddingTop: '5px',
                    color: '#6a6969'
                  }}
                >
                  {fact.name}
                </Typography>
                <Typography
                  variant='h5'
                  style={{
                    textAlign: 'right',
                    paddingTop: '10px',
                    color: investigator.color
                  }}
                >
                  {fact.val}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
