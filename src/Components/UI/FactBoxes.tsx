import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography } from '@material-ui/core';
import { Meta } from '../../types';
import { lookupInvestigator } from '../../lookups/helpers';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // position: 'absolute',
      // left: '100px'
    },
    paper: {
      height: 80,
      marginRight: '20px',
      padding: '10px 25px',
      border: '1px solid grey'
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
    { name: 'Name:', val: investigator.name },
    { name: 'Class:', val: investigator.faction },
    { name: 'Total Decks:', val: meta.numDecks[id] }
  ];

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='flex-start'>
          {facts.map((fact) => (
            <Grid key={fact.name} item>
              <Paper className={classes.paper}>
                <Typography
                  variant='subtitle2'
                  style={{
                    textAlign: 'left',
                    paddingTop: '5px',
                    marginLeft: '-15px',
                    color: '#6a6969'
                  }}
                >
                  {fact.name}
                </Typography>
                <Typography
                  variant='h5'
                  style={{
                    textAlign: 'right',
                    marginRight: '-15px',
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
